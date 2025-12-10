export interface PayOrderResponse {
  data: PaymentData;
}

export interface PayOrderResponseType {
  data: PayOrderResponse;
}

export interface PaymentData {
  url: string; // короткая ссылка на оплату
  price: string; // "190000" (как строка)
  order_id: number; // 1325
  raw: RawPayment;
}

export interface RawPayment {
  token: string; // "A100..."
  state: string; // "offer"
  description: string; // "Заказ #1325"
  params: {
    order_id: string; // "1325"
    [k: string]: string;
  };
  merchant: {
    name: string; // "Интернет-магазин “Креативик Store”"
    logoUrl: string; // "/merch-logo/default.png"
    url: string; // "https://3dkreativik.store"
  };
  amount: number; // 190000
  currency: string; // "RUB"
  providerAlias: string; // "gcs"
  options: PaymentOptions;
}

export interface PaymentOptions {
  mirPayMerchantToken?: string;
  mirPayPaymentToken?: string;
  mirPayLink?: string;
  expiredCardsAllowed?: boolean;
  sberPayEnabled?: boolean;
  gazpromPayEnabled?: boolean;
  offerTimeout?: number; // мс
  offerStartedAt?: number; // epoch ms
  successBackUrl?: string;
  failedBackUrl?: string;
  lang?: string; // "ru"
  paymentPageUrl?: string; // полная страница оплат
}
