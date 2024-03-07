import { apiClient } from '@/services';
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
  return await apiClient.get<Post[]>('/posts');
}
