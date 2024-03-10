export interface Article {
  id: number;
  createdBy: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  categories: string;
  categoriesInt: number[];
  likes: number;
  likedByMe: boolean;
  dislikes: number;
  dislikedByMe: boolean;
  myLikeId: number;
  status: string;
  readTime: number;
  imageLink: string;
}
