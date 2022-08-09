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
  Upload: any;
};

export type BoolRes = {
  __typename?: 'BoolRes';
  success: Scalars['Boolean'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  follow?: Maybe<BoolRes>;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: LoginResponse;
  singleUpload: UploadResult;
  unfollow?: Maybe<BoolRes>;
  updateProfile: User;
};


export type MutationFollowArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
  type: Scalars['String'];
};


export type MutationUnfollowArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
};

export type PAccount = {
  __typename?: 'PAccount';
  tag: Scalars['String'];
  username: Scalars['String'];
};

export type PProfile = {
  __typename?: 'PProfile';
  bannerUrl: Scalars['String'];
  description: Scalars['String'];
  pictureUrl: Scalars['String'];
};

export type PUser = {
  __typename?: 'PUser';
  _id: Scalars['ID'];
  account: PAccount;
  profile: PProfile;
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
  allUsers: Array<Maybe<User>>;
  findUserByTag: User;
  findUsersById: Array<Maybe<User>>;
  getPosts: Array<Maybe<Post>>;
  myAccount?: Maybe<User>;
  randomUser: User;
  randomUsers: Array<Maybe<User>>;
};


export type QueryFindUserByTagArgs = {
  tag: Scalars['String'];
};


export type QueryFindUsersByIdArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryRandomUsersArgs = {
  count: Scalars['Int'];
};

export type U_Account = {
  __typename?: 'U_Account';
  blockedIds: Array<Maybe<Scalars['String']>>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  lastOnline: Scalars['String'];
  password: Scalars['String'];
  private: Scalars['Boolean'];
  pro: Scalars['Boolean'];
  short: Scalars['String'];
  tag: Scalars['String'];
  tokenVersion: Scalars['Int'];
  username: Scalars['String'];
};

export type U_BetaIds = {
  __typename?: 'U_BetaIds';
  hostedIds: Array<Maybe<Scalars['String']>>;
  joinedIds: Array<Maybe<Scalars['String']>>;
};

export type U_Profile = {
  __typename?: 'U_Profile';
  badges: Array<Maybe<Scalars['String']>>;
  bannerUrl: Scalars['String'];
  description: Scalars['String'];
  followerIds: Array<Maybe<Scalars['String']>>;
  followingIds: Array<Maybe<Scalars['String']>>;
  friendIds: Array<Maybe<Scalars['String']>>;
  friendRqIds: Array<Maybe<Scalars['String']>>;
  linkedProfiles: Array<Maybe<Scalars['String']>>;
  pictureUrl: Scalars['String'];
};

export type U_Social = {
  __typename?: 'U_Social';
  betaIds: U_BetaIds;
  blogIds: Array<Maybe<Scalars['String']>>;
  chatIds: Array<Maybe<Scalars['String']>>;
  groupIds: Array<Maybe<Scalars['String']>>;
  postIds: Array<Maybe<Scalars['String']>>;
};


export type UploadResult = {
  __typename?: 'UploadResult';
  file: File;
  user: User;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  account: U_Account;
  profile: U_Profile;
  social: U_Social;
  status: Scalars['String'];
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<Maybe<{ __typename?: 'Post', _id: string, body: string, createdAt: string, username: string }>> };

export type AllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTagsQuery = { __typename?: 'Query', allUsers: Array<Maybe<{ __typename?: 'User', account: { __typename?: 'U_Account', tag: string } }>> };

export type FindCardUsersByIdsQueryVariables = Exact<{
  idList: Array<Scalars['String']> | Scalars['String'];
}>;


export type FindCardUsersByIdsQuery = { __typename?: 'Query', findUsersById: Array<Maybe<{ __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string }, profile: { __typename?: 'U_Profile', pictureUrl: string, badges: Array<Maybe<string>> } }>> };

export type FindMinProfileByTagQueryVariables = Exact<{
  tagInput: Scalars['String'];
}>;


export type FindMinProfileByTagQuery = { __typename?: 'Query', findUserByTag: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> }, social: { __typename?: 'U_Social', postIds: Array<Maybe<string>>, blogIds: Array<Maybe<string>> } } };

export type FollowMutationVariables = Exact<{
  targetId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow?: Maybe<{ __typename?: 'BoolRes', success: boolean }> };

export type LoginMutationVariables = Exact<{
  loginInput: Scalars['String'];
  loginPassword: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, email: string, private: boolean, pro: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MyAccountMinProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAccountMinProfileQuery = { __typename?: 'Query', myAccount?: Maybe<{ __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } }> };

export type MyNameAndPfpQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNameAndPfpQuery = { __typename?: 'Query', myAccount?: Maybe<{ __typename?: 'User', _id: string, account: { __typename?: 'U_Account', username: string, tag: string }, profile: { __typename?: 'U_Profile', pictureUrl: string } }> };

export type RandomMinProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomMinProfileQuery = { __typename?: 'Query', randomUser: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } } };

export type RegisterMutationVariables = Exact<{
  registerEmail: Scalars['String'];
  registerPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, email: string, private: boolean, pro: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } } } };

export type SampleUsersQueryVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type SampleUsersQuery = { __typename?: 'Query', randomUsers: Array<Maybe<{ __typename?: 'User', status: string, account: { __typename?: 'U_Account', username: string, tag: string }, profile: { __typename?: 'U_Profile', pictureUrl: string } }>> };

export type UnfollowMutationVariables = Exact<{
  targetId: Scalars['String'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow?: Maybe<{ __typename?: 'BoolRes', success: boolean }> };

export type UpdateProfileMutationVariables = Exact<{
  newname?: Maybe<Scalars['String']>;
  newtag?: Maybe<Scalars['String']>;
  newdes?: Maybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } } };

export type UploadSingleMutationVariables = Exact<{
  file: Scalars['Upload'];
  type: Scalars['String'];
}>;


export type UploadSingleMutation = { __typename?: 'Mutation', singleUpload: { __typename?: 'UploadResult', user: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<Maybe<string>>, followerIds: Array<Maybe<string>>, badges: Array<Maybe<string>>, linkedProfiles: Array<Maybe<string>> } }, file: { __typename?: 'File', filename: string } } };


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
export const AllTagsDocument = gql`
    query AllTags {
  allUsers {
    account {
      tag
    }
  }
}
    `;

/**
 * __useAllTagsQuery__
 *
 * To run a query within a React component, call `useAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTagsQuery(baseOptions?: Apollo.QueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, options);
      }
export function useAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, options);
        }
export type AllTagsQueryHookResult = ReturnType<typeof useAllTagsQuery>;
export type AllTagsLazyQueryHookResult = ReturnType<typeof useAllTagsLazyQuery>;
export type AllTagsQueryResult = Apollo.QueryResult<AllTagsQuery, AllTagsQueryVariables>;
export const FindCardUsersByIdsDocument = gql`
    query findCardUsersByIds($idList: [String!]!) {
  findUsersById(ids: $idList) {
    _id
    account {
      username
      tag
    }
    profile {
      pictureUrl
      badges
    }
    status
  }
}
    `;

/**
 * __useFindCardUsersByIdsQuery__
 *
 * To run a query within a React component, call `useFindCardUsersByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCardUsersByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCardUsersByIdsQuery({
 *   variables: {
 *      idList: // value for 'idList'
 *   },
 * });
 */
export function useFindCardUsersByIdsQuery(baseOptions: Apollo.QueryHookOptions<FindCardUsersByIdsQuery, FindCardUsersByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCardUsersByIdsQuery, FindCardUsersByIdsQueryVariables>(FindCardUsersByIdsDocument, options);
      }
export function useFindCardUsersByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCardUsersByIdsQuery, FindCardUsersByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCardUsersByIdsQuery, FindCardUsersByIdsQueryVariables>(FindCardUsersByIdsDocument, options);
        }
export type FindCardUsersByIdsQueryHookResult = ReturnType<typeof useFindCardUsersByIdsQuery>;
export type FindCardUsersByIdsLazyQueryHookResult = ReturnType<typeof useFindCardUsersByIdsLazyQuery>;
export type FindCardUsersByIdsQueryResult = Apollo.QueryResult<FindCardUsersByIdsQuery, FindCardUsersByIdsQueryVariables>;
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
    social {
      postIds
      blogIds
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
export const FollowDocument = gql`
    mutation follow($targetId: String!) {
  follow(id: $targetId) {
    success
  }
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: String!, $loginPassword: String!) {
  login(input: $loginInput, password: $loginPassword) {
    accessToken
    user {
      _id
      account {
        username
        tag
        email
        private
        pro
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MyAccountMinProfileDocument = gql`
    query myAccountMinProfile {
  myAccount {
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
export const MyNameAndPfpDocument = gql`
    query myNameAndPfp {
  myAccount {
    _id
    account {
      username
      tag
    }
    profile {
      pictureUrl
    }
  }
}
    `;

/**
 * __useMyNameAndPfpQuery__
 *
 * To run a query within a React component, call `useMyNameAndPfpQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNameAndPfpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNameAndPfpQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNameAndPfpQuery(baseOptions?: Apollo.QueryHookOptions<MyNameAndPfpQuery, MyNameAndPfpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNameAndPfpQuery, MyNameAndPfpQueryVariables>(MyNameAndPfpDocument, options);
      }
export function useMyNameAndPfpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNameAndPfpQuery, MyNameAndPfpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNameAndPfpQuery, MyNameAndPfpQueryVariables>(MyNameAndPfpDocument, options);
        }
export type MyNameAndPfpQueryHookResult = ReturnType<typeof useMyNameAndPfpQuery>;
export type MyNameAndPfpLazyQueryHookResult = ReturnType<typeof useMyNameAndPfpLazyQuery>;
export type MyNameAndPfpQueryResult = Apollo.QueryResult<MyNameAndPfpQuery, MyNameAndPfpQueryVariables>;
export const RandomMinProfileDocument = gql`
    query randomMinProfile {
  randomUser {
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
    user {
      _id
      account {
        username
        tag
        email
        private
        pro
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
export const SampleUsersDocument = gql`
    query sampleUsers($amount: Int!) {
  randomUsers(count: $amount) {
    account {
      username
      tag
    }
    profile {
      pictureUrl
    }
    status
  }
}
    `;

/**
 * __useSampleUsersQuery__
 *
 * To run a query within a React component, call `useSampleUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSampleUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSampleUsersQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useSampleUsersQuery(baseOptions: Apollo.QueryHookOptions<SampleUsersQuery, SampleUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SampleUsersQuery, SampleUsersQueryVariables>(SampleUsersDocument, options);
      }
export function useSampleUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SampleUsersQuery, SampleUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SampleUsersQuery, SampleUsersQueryVariables>(SampleUsersDocument, options);
        }
export type SampleUsersQueryHookResult = ReturnType<typeof useSampleUsersQuery>;
export type SampleUsersLazyQueryHookResult = ReturnType<typeof useSampleUsersLazyQuery>;
export type SampleUsersQueryResult = Apollo.QueryResult<SampleUsersQuery, SampleUsersQueryVariables>;
export const UnfollowDocument = gql`
    mutation unfollow($targetId: String!) {
  unfollow(id: $targetId) {
    success
  }
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($newname: String, $newtag: String, $newdes: String) {
  updateProfile(name: $newname, tag: $newtag, description: $newdes) {
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
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      newname: // value for 'newname'
 *      newtag: // value for 'newtag'
 *      newdes: // value for 'newdes'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UploadSingleDocument = gql`
    mutation uploadSingle($file: Upload!, $type: String!) {
  singleUpload(file: $file, type: $type) {
    user {
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
    file {
      filename
    }
  }
}
    `;
export type UploadSingleMutationFn = Apollo.MutationFunction<UploadSingleMutation, UploadSingleMutationVariables>;

/**
 * __useUploadSingleMutation__
 *
 * To run a mutation, you first call `useUploadSingleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadSingleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadSingleMutation, { data, loading, error }] = useUploadSingleMutation({
 *   variables: {
 *      file: // value for 'file'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUploadSingleMutation(baseOptions?: Apollo.MutationHookOptions<UploadSingleMutation, UploadSingleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadSingleMutation, UploadSingleMutationVariables>(UploadSingleDocument, options);
      }
export type UploadSingleMutationHookResult = ReturnType<typeof useUploadSingleMutation>;
export type UploadSingleMutationResult = Apollo.MutationResult<UploadSingleMutation>;
export type UploadSingleMutationOptions = Apollo.BaseMutationOptions<UploadSingleMutation, UploadSingleMutationVariables>;