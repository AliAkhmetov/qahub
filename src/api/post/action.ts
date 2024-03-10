import api from '@/api';

interface LikeArg {
  formData: { postId: number; type: boolean };
  access: string;
}

export async function like({ formData, access }: LikeArg) {
  return await api.post(`/api/posts/${formData.postId}/likes/`, formData, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}

interface CommentArg {
  formData: {
    postId: number;
    content: string;
  };
  access: string;
}

export async function comment({ formData, access }: CommentArg) {
  return await api.post(`/api/posts/${formData.postId}/comments/`, formData, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}
