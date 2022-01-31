import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BoolRes = {
  __typename?: 'BoolRes';
  success: Scalars['Boolean'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: LoginResponse;
  login: LoginResponse;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  input: Scalars['String'];
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPosts: Array<Maybe<Post>>;
  myAccount: User;
  findUserByTag: User;
  randomUser: User;
};


export type QueryFindUserByTagArgs = {
  tag: Scalars['String'];
};

export type U_Account = {
  __typename?: 'U_Account';
  username: Scalars['String'];
  tag: Scalars['String'];
  short: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  lastOnline: Scalars['String'];
  private: Scalars['Boolean'];
  blockedIds: Array<Maybe<Scalars['String']>>;
  tokenVersion: Scalars['Int'];
  pro: Scalars['Boolean'];
};

export type U_BetaIds = {
  __typename?: 'U_BetaIds';
  hostedIds: Array<Maybe<Scalars['String']>>;
  joinedIds: Array<Maybe<Scalars['String']>>;
};

export type U_Profile = {
  __typename?: 'U_Profile';
  bannerUrl: Scalars['String'];
  pictureUrl: Scalars['String'];
  description: Scalars['String'];
  followingIds: Array<Maybe<Scalars['String']>>;
  followerIds: Array<Maybe<Scalars['String']>>;
  friendIds: Array<Maybe<Scalars['String']>>;
  friendRqIds: Array<Maybe<Scalars['String']>>;
  badges: Array<Maybe<Scalars['String']>>;
  linkedProfiles: Array<Maybe<Scalars['String']>>;
};

export type U_Social = {
  __typename?: 'U_Social';
  postIds: Array<Maybe<Scalars['String']>>;
  blogIds: Array<Maybe<Scalars['String']>>;
  groupIds: Array<Maybe<Scalars['String']>>;
  betaIds: U_BetaIds;
  chatIds: Array<Maybe<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  account: U_Account;
  profile: U_Profile;
  status: Scalars['String'];
  social: U_Social;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<Maybe<{ __typename?: 'Post', _id: string, body: string, createdAt: string, username: string }>> };

export type FindMinProfileByTagQueryVariables = Exact<{
  tagInput: Scalars['String'];
}>;


export type FindMinProfileByTagQuery = { __typename?: 'Query', findUserByTag: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } } };

export type LoginMutationVariables = Exact<{
  loginInput: Scalars['String'];
  loginPassword: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type MyAccountMinProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAccountMinProfileQuery = { __typename?: 'Query', myAccount: { __typename?: 'User', status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } } };

export type RandomMinProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomMinProfileQuery = { __typename?: 'Query', randomUser: { __typename?: 'User', status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } } };

export type RegisterMutationVariables = Exact<{
  registerEmail: Scalars['String'];
  registerPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', accessToken: string } };


export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    _id
    body
    createdAt
    username
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const FindMinProfileByTagDocument = gql`
    query findMinProfileByTag($tagInput: String!) {
  findUserByTag(tag: $tagInput) {
    _id
    account {
      username
      tag
      private
    }
    profile {
      bannerUrl
      pictureUrl
      description
      followingIds
      followerIds
      badges
      linkedProfiles
    }
    status
  }
}
    `;

/**
 * __useFindMinProfileByTagQuery__
 *
 * To run a query within a React component, call `useFindMinProfileByTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMinProfileByTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMinProfileByTagQuery({
 *   variables: {
 *      tagInput: // value for 'tagInput'
 *   },
 * });
 */
export function useFindMinProfileByTagQuery(baseOptions: Apollo.QueryHookOptions<FindMinProfileByTagQuery, FindMinProfileByTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMinProfileByTagQuery, FindMinProfileByTagQueryVariables>(FindMinProfileByTagDocument, options);
      }
export function useFindMinProfileByTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMinProfileByTagQuery, FindMinProfileByTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMinProfileByTagQuery, FindMinProfileByTagQueryVariables>(FindMinProfileByTagDocument, options);
        }
export type FindMinProfileByTagQueryHookResult = ReturnType<typeof useFindMinProfileByTagQuery>;
export type FindMinProfileByTagLazyQueryHookResult = ReturnType<typeof useFindMinProfileByTagLazyQuery>;
export type FindMinProfileByTagQueryResult = Apollo.QueryResult<FindMinProfileByTagQuery, FindMinProfileByTagQueryVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: String!, $loginPassword: String!) {
  login(input: $loginInput, password: $loginPassword) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *      loginPassword: // value for 'loginPassword'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MyAccountMinProfileDocument = gql`
    query myAccountMinProfile {
  myAccount {
    account {
      username
      tag
      private
    }
    profile {
      bannerUrl
      pictureUrl
      description
      followingIds
      followerIds
      badges
      linkedProfiles
    }
    status
  }
}
    `;

/**
 * __useMyAccountMinProfileQuery__
 *
 * To run a query within a React component, call `useMyAccountMinProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAccountMinProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAccountMinProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAccountMinProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyAccountMinProfileQuery, MyAccountMinProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAccountMinProfileQuery, MyAccountMinProfileQueryVariables>(MyAccountMinProfileDocument, options);
      }
export function useMyAccountMinProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAccountMinProfileQuery, MyAccountMinProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAccountMinProfileQuery, MyAccountMinProfileQueryVariables>(MyAccountMinProfileDocument, options);
        }
export type MyAccountMinProfileQueryHookResult = ReturnType<typeof useMyAccountMinProfileQuery>;
export type MyAccountMinProfileLazyQueryHookResult = ReturnType<typeof useMyAccountMinProfileLazyQuery>;
export type MyAccountMinProfileQueryResult = Apollo.QueryResult<MyAccountMinProfileQuery, MyAccountMinProfileQueryVariables>;
export const RandomMinProfileDocument = gql`
    query randomMinProfile {
  randomUser {
    account {
      username
      tag
      private
    }
    profile {
      bannerUrl
      pictureUrl
      description
      followingIds
      followerIds
      badges
      linkedProfiles
    }
    status
  }
}
    `;

/**
 * __useRandomMinProfileQuery__
 *
 * To run a query within a React component, call `useRandomMinProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomMinProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomMinProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useRandomMinProfileQuery(baseOptions?: Apollo.QueryHookOptions<RandomMinProfileQuery, RandomMinProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandomMinProfileQuery, RandomMinProfileQueryVariables>(RandomMinProfileDocument, options);
      }
export function useRandomMinProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandomMinProfileQuery, RandomMinProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandomMinProfileQuery, RandomMinProfileQueryVariables>(RandomMinProfileDocument, options);
        }
export type RandomMinProfileQueryHookResult = ReturnType<typeof useRandomMinProfileQuery>;
export type RandomMinProfileLazyQueryHookResult = ReturnType<typeof useRandomMinProfileLazyQuery>;
export type RandomMinProfileQueryResult = Apollo.QueryResult<RandomMinProfileQuery, RandomMinProfileQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($registerEmail: String!, $registerPassword: String!) {
  register(email: $registerEmail, password: $registerPassword) {
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerEmail: // value for 'registerEmail'
 *      registerPassword: // value for 'registerPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;