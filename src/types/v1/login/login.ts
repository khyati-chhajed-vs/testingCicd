interface loginBody {
  user_email: string;
  user_mobile: string;
  password: string;
}

export interface loginRequest {
  Body: loginBody;
}
