import api from '@/api';
import type { Article } from '@/types';
import type { AxiosResponse } from 'axios';

interface GetPostsArg {
  language: string;
}

export async function getPosts({ language }: GetPostsArg): Promise<AxiosResponse<Article[]>> {
  return await api.get<Article[]>('/posts/', {
    headers: {
      Language: language,
    },
  });
}

interface GetPostByIdArg {
  language: string;
  postId: string;
}

export async function getPostById({ language, postId }: GetPostByIdArg): Promise<AxiosResponse> {
  return await api.get(`/posts/${postId}`, {
    headers: {
      Language: language,
    },
  });
}

interface GetAuthPostsArg {
  language: string;
  access: string;
}

export async function getAuthPosts({
  language,
  access,
}: GetAuthPostsArg): Promise<AxiosResponse<Article[]>> {
  return await api.get<Article[]>('/api/posts/', {
    headers: {
      Authorization: `Bearer ${access}`,
      Language: language,
    },
  });
}

interface GetAuthPostByIdArg {
  language: string;
  access: string;
  postId: string;
}

export async function getAuthPostById({
  language,
  access,
  postId,
}: GetAuthPostByIdArg): Promise<AxiosResponse> {
  return await api.get(`/api/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${access}`,
      Language: language,
    },
  });
}

interface CreatePostFormData extends Partial<Article> {
  language: string;
}

interface CreatePostArg {
  access: string;
  formData: CreatePostFormData;
}

export async function createPost({ formData, access }: CreatePostArg): Promise<AxiosResponse> {
  return await api.post('/api/posts/', formData, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}

export async function updatePostById({ formData, access }: CreatePostArg): Promise<AxiosResponse> {
  return await api.put(`/api/posts/${formData.id}`, formData, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}

export async function deletePostById({
  id,
  access,
}: {
  id: string | number;
  access: string;
}): Promise<AxiosResponse> {
  return await api.delete(`/api/posts/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}
