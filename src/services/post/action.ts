import api from '@/services';

export async function likeService({
  formData,
  access,
}: {
  formData: { postId: number; type: boolean };
  access: string;
}) {
  return await api.post(`/api/posts/${formData.postId}/likes/`, formData, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}
