export const isHashHref = (href: string) => href.startsWith('#');

export function slugify(text: string): string {
  const map: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  return text
    .toLowerCase()
    .split('')
    .map((char) => map[char] ?? char) // заменяем по карте
    .join('')
    .replace(/[^a-z0-9\s-]/g, '') // удаляем всё лишнее
    .trim()
    .replace(/\s+/g, '-') // пробелы → тире
    .replace(/-+/g, '-'); // несколько тире → одно
}

export function getRandomItems<T>(arr: T[], count: number): T[] {
    return arr.slice().sort(() => 0.5 - Math.random()).slice(0, count);
}

export const formatPrice = (n?: number | null) =>
    typeof n === "number"
        ? n.toLocaleString("ru-RU")
        : "";
