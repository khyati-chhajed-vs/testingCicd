interface UserData {
  user_id;
  email: string;
  phone_number: string;
  user_name: string;
}

interface CreateUserBody {
  userData: UserData[];
}

export interface CreateUserRequest {
  Body: CreateUserBody;
}
