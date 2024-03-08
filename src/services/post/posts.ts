import api from '@/services';
import type { AxiosResponse } from 'axios';

interface Post {
  id: number;
  createdBy: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  categories: string;
  categoriesInt: number;
  likes: number;
  dislikes: number;
  myLikeId: number;
  status: string;
  readTime: number;
  imageLink: string;
}

export async function getPostsService(): Promise<AxiosResponse<Post[]>> {
  return await api.get<Post[]>('/posts');
}

interface Arg {
  formData: {
    title: string;
    content: string;
    categoriesInt: number[];
    imageLink: string;
    readTime: number;
  };
  access: string;
}

export async function createPostService({ formData, access }: Arg): Promise<AxiosResponse> {
  return await api.post('/api/posts/', formData, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}
