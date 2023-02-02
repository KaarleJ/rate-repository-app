import { AUTHENTICATE, SIGN } from "../graphql/mutations";

import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient, useMutation } from '@apollo/client';

export const useSignIn = () => {
  const [ authenticate, result] = useMutation(AUTHENTICATE)
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await authenticate({ variables: { username, password }})
    authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
  }
  
  return [ signIn, result];
};

export const useSignUp = () => {
  const [ sign ] = useMutation(SIGN);
  const [ authenticate, result ] = useMutation(AUTHENTICATE)

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    await sign({ variables: { username, password}})
    const { data } = await authenticate({ variables: { username, password }})
    authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
  }
  
  return [ signUp, result];
};