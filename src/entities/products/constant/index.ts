export enum PRODUCT_URL {
  BASE = '/product',
  PRINTER = 'printer/:titleId', // относительный
  SPOOL = 'spool/:titleId', // относительный
  ITEM = ':titleId', // относительный параметр
  DETAIL = ':titleId/:detailId',
}
