import api from '@/services';
import type { Article } from '@/types';
import type { AxiosResponse } from 'axios';

export async function getPostsService(): Promise<AxiosResponse<Article[]>> {
  return await api.get<Article[]>('/posts/');
}

interface GetPostByIdResponse {
  post_info: Article;
  comments: null;
  autorized: boolean;
  userId: number;
  userType: string;
}

export async function getPostByIdService({
  id,
}: {
  id: string;
}): Promise<AxiosResponse<GetPostByIdResponse>> {
  return await api.get<GetPostByIdResponse>(`/posts/${id}`);
}

interface Arg {
  formData: Partial<Article>;
  access: string;
}

export async function createPostService({ formData, access }: Arg): Promise<AxiosResponse> {
  return await api.post('/api/posts/', formData, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}
