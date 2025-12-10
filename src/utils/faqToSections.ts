// @entities/support/utils/faqToSections.ts
import type { FaqItem, Section } from '@entities/support/types';

function slugify(str: string, fallback: string): string {
  const base = str
    .toLowerCase()
    .trim()
    .replace(/<\/?[^>]+(>|$)/g, '') // вырезаем HTML на всякий
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');

  return base || fallback;
}

export function faqToSections(faq: FaqItem): Section[] {
  const translation = faq.translation;

  if (!translation) return [];

  const html = translation.description || '';
  const sections: Section[] = [];

  // защита на всякий случай (SSR и т.п.)
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    const plain = html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .trim();

    if (plain) {
      sections.push({
        id: 'section-intro',
        title: translation.title,
        type: 'text',
        content: plain,
      });
    }

    return sections;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  let index = 0;

  body.childNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    index += 1;

    // <p> → text section
    if (tag === 'p') {
      const text = el.textContent?.trim() ?? '';
      if (text) {
        sections.push({
          id: slugify(text.slice(0, 40), `paragraph-${index}`),
          type: 'text',
          content: text,
        });
      }
      return;
    }

    // <figure><img /></figure> → image section
    if (tag === 'figure') {
      const img = el.querySelector('img');
      if (img && img.src) {
        sections.push({
          id: slugify(img.alt || `image-${index}`, `image-${index}`),
          type: 'image',
          src: img.src,
          title: img.alt || undefined,
        });
      }
      return;
    }

    // <ul>/<ol> → list section
    if (tag === 'ul' || tag === 'ol') {
      const items = Array.from(el.querySelectorAll('li'))
        .map((li) => li.textContent?.trim() || '')
        .filter(Boolean);

      if (items.length) {
        sections.push({
          id: `list-${index}`,
          type: 'list',
          items,
        });
      }
      return;
    }

    // при желании можно добавить обработку <blockquote>, <h2> и т.п.
  });

  // если по какой-то причине ничего не распарсилось — хотя бы plain text
  if (!sections.length) {
    const plain = html.replace(/<[^>]+>/g, '').trim();
    if (plain) {
      sections.push({
        id: 'section-fallback',
        title: translation.title,
        type: 'text',
        content: plain,
      });
    }
  }

  return sections;
}
