import api from '@/services';
import type { AxiosResponse } from 'axios';

export interface FormData {
  email: string;
  password: string;
}

interface SigninService {
  token: string;
  expires: string;
  error: string;
}

export async function signinService(formData: FormData): Promise<AxiosResponse<SigninService>> {
  return await api.post('/auth/login', formData);
}
