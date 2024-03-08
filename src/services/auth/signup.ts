import api from '@/services';
import type { AxiosResponse } from 'axios';

export interface FormData {
  email: string;
  username: string;
  password: string;
}

interface SignupService {}

export async function signupService(formData: FormData): Promise<AxiosResponse<SignupService>> {
  return await api.post('/auth/registration', formData);
}
