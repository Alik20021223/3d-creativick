import { Section } from "../types";
import rosAtom from '@assets/rosatom-img.svg'

export const ItemSupportMock: Section[] = [
  {
    id: "intro",
    title: "Введение",
    type: "text",
    content:
      "Для современного мира экономическая повестка сегодня создаёт необходимость включения...",
  },
  {
    id: "img1",
    title: "test-2",
    type: "image",
    src: rosAtom,
    caption: "Описание изображения, источник: docs.example",
  },
  {
    id: "quote1",
    title: "test-3",
    type: "quote",
    content:
      "Однозначно, базовые сценарии поведения пользователей могут быть функционально разнесены...",
  },
  {
    id: "end",
    title: "Заключение",
    type: "text",
    content: "Подводя итог, можно отметить...",
  },
];
