import{
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createUserAccount, signInAccount , signOutAccount} from '@/lib/appwrite/api';
import { QUERY_KEYS } from "@/lib/appwrite/react-query/queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  });
};
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
export const useLikePost = () =>
  {
      const queryClient = useQueryClient();

      return useMutation({
          mutationFn : ({_id, likesArray}) => likePost(_id, likesArray),
          onSuccess : (data) => {
            queryClient.invalidateQueries({
              queryKey : [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
              queryKey : [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
              queryKey : [QUERY_KEYS.GET_CURRENT_USER]
            })
          }
      })
  }