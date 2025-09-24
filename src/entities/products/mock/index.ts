import KatushkaImg from '@assets/katushka-card.png';
import CosmoPersom from '@assets/cosmo-person.png';
import PrinterCard from '@assets/test-photo.png';
import JupiterImg from '@assets/Юпитер.png';
import { BadgesMockItems } from '@utils/mock';

export const infoPrinter = {
  title: 'Принтер',
  badges: [],
  description:
    'Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.',
  price: 1900,
  oldPrice: 3900,
  showColors: true,
  showWeights: false,
  initialColor: 'black',
};

export const infoSpool = {
  title: 'Катушка',
  badges: [],
  description:
    'Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.',
  price: 1900,
  oldPrice: 3900,
  showColors: true,
  showWeights: true,
  initialColor: 'red',
  weights: [250, 500, 750],
  initialWeight: 500,
};

export const infoSeries = {
  title: 'Космический флот',
  badges: BadgesMockItems,
  description:
    'Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.',
  price: 1900,
  oldPrice: 3900,
  showColors: false,
  showWeights: false,
};

export const infoDetail = {
  title: 'Астронавт',
  badges: BadgesMockItems,
  subtitle: 'Модель из Серии Космический флот',
  description:
    'Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.',
  showColors: false,
  showWeights: false,
};


export const ImagesItems = [
  { src: KatushkaImg, alt: 'Катушка жёлтая — вид 1' },
  { src: CosmoPersom, alt: 'Катушка жёлтая — вид 2' },
  { src: PrinterCard, alt: 'Катушка жёлтая — вид 3' },
  { src: KatushkaImg, alt: 'Катушка жёлтая — вид 4' },
  { src: CosmoPersom, alt: 'Катушка жёлтая — вид 5' },
  { src: JupiterImg, alt: 'Катушка жёлтая — вид 5' },
];
