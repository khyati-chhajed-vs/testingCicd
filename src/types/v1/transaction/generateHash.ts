interface GenerateHashBody {
  hash_string_without_salt: string;
}

export interface GenerateHashRequest {
  Body: GenerateHashBody;
}
