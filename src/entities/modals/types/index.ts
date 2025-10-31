export type ModalKey =
  | 'auth_otp'
  | 'success_auth_otp'
  | 'register_otp'
  | 'register_form'
  | 'register_success'
  | 'email_otp'
  | 'change_email_form'
  | 'change_email_success';

export type VerifyCodeResponse = {
  timestamp: string;
  status: boolean;
  message: string;
  data: {
    token: string;
    email: string;
  };
};

export type VerifyVars = { code: string; signal?: AbortSignal };

export interface User {
  id: number;
  uuid: string;
  firstname: string;
  lastname: string | null;
  empty_p: boolean;
  email: string;
  birthday: string; // формат: ISO строка "YYYY-MM-DD HH:mm:ssZ"
  gender: 'male' | 'female' | string; // если сервер может вернуть другое
  active: number; // 1 или 0
  my_referral: string;
  role: 'user' | 'admin' | string;
  email_verified_at: string | null;
  registered_at: string;
  created_at: string;
  updated_at: string;
  wallet: unknown | null; // если потом будет объект — можно уточнить
}

export interface RegisterData {
  token: string;
  user: User;
}

export interface RegisterResponse {
  timestamp: string;
  status: boolean;
  message: string;
  data: RegisterData;
}

export type LkLoginPayload = {
  email: string;
};

export type LkLoginResponse = {
  status: boolean;
  message: string;
  data: [];
};

export type RegisterFormPayload = {
  email: string;
  firstname: string;
  gender: 'male' | 'female';
  birthday: string;
};

export type AuthCheckResponse = {
  status: boolean;
  message: string;
  data: {
    userRegistered: boolean;
  };
};
