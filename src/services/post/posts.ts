import api from '@/services';
import type { Article } from '@/types';
import type { AxiosResponse } from 'axios';

interface GetPostsArg {
  language: string;
}

export async function getPostsService({
  language,
}: GetPostsArg): Promise<AxiosResponse<Article[]>> {
  return await api.get<Article[]>('/posts/', {
    headers: {
      Language: language,
    },
  });
}

export async function getAuthPostsService({
  language,
}: GetPostsArg): Promise<AxiosResponse<Article[]>> {
  return await api.get<Article[]>('/api/posts/', {
    headers: {
      Language: language,
    },
  });
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

export async function getAuthPostByIdService({
  id,
  access,
  language,
}: {
  id: string;
  language: string;
  access: string;
}): Promise<AxiosResponse<GetPostByIdResponse>> {
  return await api.get<GetPostByIdResponse>(`/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${access}`,
      Language: language,
    },
  });
}

interface Arg {
  formData: Partial<Article>;
  access: string;
  language?: string;
}

export async function createPostService({
  formData,
  language,
  access,
}: Arg): Promise<AxiosResponse> {
  return await api.post('/api/posts/', formData, {
    headers: {
      Authorization: `Bearer ${access}`,
      Language: language,
    },
  });
}

export async function updatePostService({
  formData,
  access,
  language,
}: Arg): Promise<AxiosResponse> {
  return await api.put(`/api/posts/${formData.id}`, formData, {
    headers: {
      Authorization: `Bearer ${access}`,
      Language: language,
    },
  });
}

export async function deletePostService({
  id,
  access,
}: {
  id: string | number;
  access: string;
}): Promise<AxiosResponse> {
  return await api.delete(`/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}
