// @entities/support/types.ts

export type Section =
  | {
      id: string;
      title?: string;
      type: 'text';
      content: string;
    }
  | {
      id: string;
      title?: string;
      type: 'image';
      src: string;
    }
  | {
      id: string;
      title?: string;
      type: 'quote';
      content: string;
    }
  | {
      id: string;
      title?: string;
      type: 'callout';
      content: string;
    }
  | {
      id: string;
      title?: string;
      type: 'list';
      items: string[];
    }
  | {
      id: string;
      title?: string;
      type: 'video';
      videoType: 'vk' | 'rutube' | 'dzen';
      url: string;
    };

export type SendContactForm = {
  name: string;
  email: string;
  phone?: string | undefined;
  company?: string | undefined;
  message?: string | undefined;
};

// entities/support/types.ts

export interface FaqButtons {
  app_store_button_link: string;
  google_play_button_link: string;
}

export interface PageTranslation {
  id: number;
  locale: string; // 'ru', 'en' и т.п.
  title: string;
  description: string; // HTML-строка
}

export interface PageCategory {
  id: number;
  slug: string; // 'support', 'bug-fixes', 'slicer'
  active: boolean;
  created_at: string; // ISO-строка даты
  updated_at: string; // ISO-строка даты
  translations: PageTranslation[];
  locales: string[]; // ['ru', 'en', ...]
}

export interface PageGalleryItem {
  id: number;
  title: string; // "103-1763143892.webp"
  type: string; // 'receipts' | 'products' | ...
  loadable_type: string; // "App\\Models\\Page"
  loadable_id: number;
  path: string; // полный URL
  base_path: string; // "api.3dkreativik.store/storage/images/"
}

export interface MediaLink {
  id: number;
  url: string;
  type: 'vk' | 'rutube' | 'dzen';
}

export interface FaqItem {
  id: number;
  page_category_id: number;
  type: string; // 'faq' (но оставим string на будущее)
  img: string;
  active: boolean;
  buttons: FaqButtons;
  created_at: string;
  updated_at: string;

  category: PageCategory;

  // Текущий перевод под выбранную локаль (может быть null)
  translation: PageTranslation | null;

  // Все переводы страницы
  translations: PageTranslation[];

  locales: string[];

  galleries: PageGalleryItem[];
}

export interface FaqResponse {
  data: FaqItem[];
}

export interface FaqResponseById {
  data: FaqItem;
}

export type AppSettingKey = 'user_agreement' | 'offer_agreement' | 'slicer' | 'user_instruction' | 'phone';

export interface AppSetting {
  id: number;
  key: AppSettingKey; // например: "user_agreement"
  value: string; // может быть URL, текст, число — зависит от ключа
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  deleted_at: string | null; // soft delete
}

export type AppSettingsResponse = {
  data: AppSetting[];
};
