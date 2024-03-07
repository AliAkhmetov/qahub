import { apiClient } from '@/services';

interface FormData {
  email: string;
  username: string;
  password: string;
}

interface SignupService {}

export async function signupService(formData: FormData): Promise<SignupService> {
  return await apiClient.post('/auth/registration', formData);
}
