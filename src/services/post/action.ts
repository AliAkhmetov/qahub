import api from '@/services';

export async function likeService({ id, access }: { id: number; access: string }) {
  return await api.post(
    `/api/posts/${id}/likes/`,
    { postId: id, type: false },
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
}

export async function dislikeService({ id, access }: { id: number; access: string }) {
  return await api.post(
    `/api/posts/${id}/dislikes/`,
    { postId: id, type: false },
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
}
