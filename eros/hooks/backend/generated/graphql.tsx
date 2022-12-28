import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export type CUser = {
  __typename?: 'CUser';
  pictureUrl: Scalars['String'];
  tag: Scalars['String'];
  username: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  user: CUser;
};

export type ExtraData = {
  field1?: InputMaybe<Scalars['String']>;
  field2?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  field3?: InputMaybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type KeyFields = {
  __typename?: 'KeyFields';
  body: Scalars['String'];
  text2?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  follow?: Maybe<BoolRes>;
  like?: Maybe<BoolRes>;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: LoginResponse;
  singleUpload: UploadResult;
  unfollow?: Maybe<BoolRes>;
  unlike?: Maybe<BoolRes>;
  updateProfile: User;
};


export type MutationFollowArgs = {
  id: Scalars['String'];
};


export type MutationLikeArgs = {
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
  edata?: InputMaybe<ExtraData>;
  file: Scalars['Upload'];
  type: Scalars['String'];
};


export type MutationUnfollowArgs = {
  id: Scalars['String'];
};


export type MutationUnlikeArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
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
  body?: Maybe<Scalars['String']>;
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['String'];
  imageUrls: Array<Scalars['String']>;
  likes: Array<Maybe<Scalars['String']>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  user_id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<Maybe<User>>;
  findUserByTag: User;
  findUsersById: Array<Maybe<User>>;
  getPosts: Array<Maybe<Post>>;
  getPostsByTag: Array<Maybe<Post>>;
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


export type QueryGetPostsArgs = {
  number: Scalars['Int'];
};


export type QueryGetPostsByTagArgs = {
  number: Scalars['Int'];
  tag: Scalars['String'];
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
  doc?: Maybe<KeyFields>;
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

export type AllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTagsQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', account: { __typename?: 'U_Account', tag: string } } | null> };

export type FindCardUsersByIdsQueryVariables = Exact<{
  idList: Array<Scalars['String']> | Scalars['String'];
}>;


export type FindCardUsersByIdsQuery = { __typename?: 'Query', findUsersById: Array<{ __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string }, profile: { __typename?: 'U_Profile', pictureUrl: string, badges: Array<string | null> } } | null> };

export type FindMinProfileByTagQueryVariables = Exact<{
  tagInput: Scalars['String'];
}>;


export type FindMinProfileByTagQuery = { __typename?: 'Query', findUserByTag: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<string | null>, followerIds: Array<string | null>, badges: Array<string | null>, linkedProfiles: Array<string | null> }, social: { __typename?: 'U_Social', postIds: Array<string | null>, blogIds: Array<string | null> } } };

export type FollowMutationVariables = Exact<{
  targetId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow?: { __typename?: 'BoolRes', success: boolean } | null };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', like?: { __typename?: 'BoolRes', success: boolean } | null };

export type LoginMutationVariables = Exact<{
  loginInput: Scalars['String'];
  loginPassword: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, email: string, private: boolean, pro: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<string | null>, followerIds: Array<string | null>, badges: Array<string | null>, linkedProfiles: Array<string | null> }, social: { __typename?: 'U_Social', postIds: Array<string | null>, blogIds: Array<string | null> } } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MyAccountMinProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAccountMinProfileQuery = { __typename?: 'Query', myAccount?: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<string | null>, followerIds: Array<string | null>, badges: Array<string | null>, linkedProfiles: Array<string | null> }, social: { __typename?: 'U_Social', postIds: Array<string | null>, blogIds: Array<string | null> } } | null };

export type MyFollowingQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFollowingQuery = { __typename?: 'Query', myAccount?: { __typename?: 'User', _id: string, profile: { __typename?: 'U_Profile', followerIds: Array<string | null>, followingIds: Array<string | null> } } | null };

export type MyNameAndPfpQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNameAndPfpQuery = { __typename?: 'Query', myAccount?: { __typename?: 'User', _id: string, account: { __typename?: 'U_Account', username: string, tag: string }, profile: { __typename?: 'U_Profile', pictureUrl: string } } | null };

export type MyPfpAndStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPfpAndStatusQuery = { __typename?: 'Query', myAccount?: { __typename?: 'User', _id: string, status: string, profile: { __typename?: 'U_Profile', pictureUrl: string } } | null };

export type PostsByTagQueryVariables = Exact<{
  tag: Scalars['String'];
  number: Scalars['Int'];
}>;


export type PostsByTagQuery = { __typename?: 'Query', getPostsByTag: Array<{ __typename?: 'Post', _id: string, imageUrls: Array<string>, body?: string | null, tags?: Array<string | null> | null, createdAt: string, user_id: string, likes: Array<string | null>, comments: Array<{ __typename?: 'Comment', body: string, imageUrl?: string | null, user: { __typename?: 'CUser', username: string, tag: string, pictureUrl: string } } | null> } | null> };

export type RandomMinProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomMinProfileQuery = { __typename?: 'Query', randomUser: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<string | null>, followerIds: Array<string | null>, badges: Array<string | null>, linkedProfiles: Array<string | null> }, social: { __typename?: 'U_Social', postIds: Array<string | null>, blogIds: Array<string | null> } } };

export type NewPostsQueryVariables = Exact<{
  number: Scalars['Int'];
}>;


export type NewPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', _id: string, imageUrls: Array<string>, body?: string | null, tags?: Array<string | null> | null, createdAt: string, user_id: string, likes: Array<string | null>, comments: Array<{ __typename?: 'Comment', body: string, imageUrl?: string | null, user: { __typename?: 'CUser', username: string, tag: string, pictureUrl: string } } | null> } | null> };

export type RegisterMutationVariables = Exact<{
  registerEmail: Scalars['String'];
  registerPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, email: string, private: boolean, pro: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<string | null>, followerIds: Array<string | null>, badges: Array<string | null>, linkedProfiles: Array<string | null> }, social: { __typename?: 'U_Social', postIds: Array<string | null>, blogIds: Array<string | null> } } } };

export type SampleUsersQueryVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type SampleUsersQuery = { __typename?: 'Query', randomUsers: Array<{ __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string }, profile: { __typename?: 'U_Profile', pictureUrl: string, badges: Array<string | null> } } | null> };

export type UnfollowMutationVariables = Exact<{
  targetId: Scalars['String'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow?: { __typename?: 'BoolRes', success: boolean } | null };

export type UnlikePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlike?: { __typename?: 'BoolRes', success: boolean } | null };

export type UpdateProfileMutationVariables = Exact<{
  newname?: InputMaybe<Scalars['String']>;
  newtag?: InputMaybe<Scalars['String']>;
  newdes?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<string | null>, followerIds: Array<string | null>, badges: Array<string | null>, linkedProfiles: Array<string | null> }, social: { __typename?: 'U_Social', postIds: Array<string | null>, blogIds: Array<string | null> } } };

export type UploadSingleMutationVariables = Exact<{
  file: Scalars['Upload'];
  type: Scalars['String'];
  edata?: InputMaybe<ExtraData>;
}>;


export type UploadSingleMutation = { __typename?: 'Mutation', singleUpload: { __typename?: 'UploadResult', user: { __typename?: 'User', _id: string, status: string, account: { __typename?: 'U_Account', username: string, tag: string, private: boolean }, profile: { __typename?: 'U_Profile', bannerUrl: string, pictureUrl: string, description: string, followingIds: Array<string | null>, followerIds: Array<string | null>, badges: Array<string | null>, linkedProfiles: Array<string | null> }, social: { __typename?: 'U_Social', postIds: Array<string | null>, blogIds: Array<string | null> } }, file: { __typename?: 'File', filename: string }, doc?: { __typename?: 'KeyFields', body: string, text2?: string | null } | null } };


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
export const LikePostDocument = gql`
    mutation likePost($postId: String!) {
  like(id: $postId) {
    success
  }
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
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
      social {
        postIds
        blogIds
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
    social {
      postIds
      blogIds
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
export const MyFollowingDocument = gql`
    query myFollowing {
  myAccount {
    _id
    profile {
      followerIds
      followingIds
    }
  }
}
    `;

/**
 * __useMyFollowingQuery__
 *
 * To run a query within a React component, call `useMyFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFollowingQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFollowingQuery(baseOptions?: Apollo.QueryHookOptions<MyFollowingQuery, MyFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFollowingQuery, MyFollowingQueryVariables>(MyFollowingDocument, options);
      }
export function useMyFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFollowingQuery, MyFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFollowingQuery, MyFollowingQueryVariables>(MyFollowingDocument, options);
        }
export type MyFollowingQueryHookResult = ReturnType<typeof useMyFollowingQuery>;
export type MyFollowingLazyQueryHookResult = ReturnType<typeof useMyFollowingLazyQuery>;
export type MyFollowingQueryResult = Apollo.QueryResult<MyFollowingQuery, MyFollowingQueryVariables>;
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
export const MyPfpAndStatusDocument = gql`
    query myPfpAndStatus {
  myAccount {
    _id
    profile {
      pictureUrl
    }
    status
  }
}
    `;

/**
 * __useMyPfpAndStatusQuery__
 *
 * To run a query within a React component, call `useMyPfpAndStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPfpAndStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPfpAndStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPfpAndStatusQuery(baseOptions?: Apollo.QueryHookOptions<MyPfpAndStatusQuery, MyPfpAndStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPfpAndStatusQuery, MyPfpAndStatusQueryVariables>(MyPfpAndStatusDocument, options);
      }
export function useMyPfpAndStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPfpAndStatusQuery, MyPfpAndStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPfpAndStatusQuery, MyPfpAndStatusQueryVariables>(MyPfpAndStatusDocument, options);
        }
export type MyPfpAndStatusQueryHookResult = ReturnType<typeof useMyPfpAndStatusQuery>;
export type MyPfpAndStatusLazyQueryHookResult = ReturnType<typeof useMyPfpAndStatusLazyQuery>;
export type MyPfpAndStatusQueryResult = Apollo.QueryResult<MyPfpAndStatusQuery, MyPfpAndStatusQueryVariables>;
export const PostsByTagDocument = gql`
    query postsByTag($tag: String!, $number: Int!) {
  getPostsByTag(tag: $tag, number: $number) {
    _id
    imageUrls
    body
    tags
    createdAt
    user_id
    comments {
      body
      imageUrl
      user {
        username
        tag
        pictureUrl
      }
    }
    likes
  }
}
    `;

/**
 * __usePostsByTagQuery__
 *
 * To run a query within a React component, call `usePostsByTagQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByTagQuery({
 *   variables: {
 *      tag: // value for 'tag'
 *      number: // value for 'number'
 *   },
 * });
 */
export function usePostsByTagQuery(baseOptions: Apollo.QueryHookOptions<PostsByTagQuery, PostsByTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByTagQuery, PostsByTagQueryVariables>(PostsByTagDocument, options);
      }
export function usePostsByTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByTagQuery, PostsByTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByTagQuery, PostsByTagQueryVariables>(PostsByTagDocument, options);
        }
export type PostsByTagQueryHookResult = ReturnType<typeof usePostsByTagQuery>;
export type PostsByTagLazyQueryHookResult = ReturnType<typeof usePostsByTagLazyQuery>;
export type PostsByTagQueryResult = Apollo.QueryResult<PostsByTagQuery, PostsByTagQueryVariables>;
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
    social {
      postIds
      blogIds
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
export const NewPostsDocument = gql`
    query newPosts($number: Int!) {
  getPosts(number: $number) {
    _id
    imageUrls
    body
    tags
    createdAt
    user_id
    comments {
      body
      imageUrl
      user {
        username
        tag
        pictureUrl
      }
    }
    likes
  }
}
    `;

/**
 * __useNewPostsQuery__
 *
 * To run a query within a React component, call `useNewPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewPostsQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useNewPostsQuery(baseOptions: Apollo.QueryHookOptions<NewPostsQuery, NewPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewPostsQuery, NewPostsQueryVariables>(NewPostsDocument, options);
      }
export function useNewPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewPostsQuery, NewPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewPostsQuery, NewPostsQueryVariables>(NewPostsDocument, options);
        }
export type NewPostsQueryHookResult = ReturnType<typeof useNewPostsQuery>;
export type NewPostsLazyQueryHookResult = ReturnType<typeof useNewPostsLazyQuery>;
export type NewPostsQueryResult = Apollo.QueryResult<NewPostsQuery, NewPostsQueryVariables>;
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
      social {
        postIds
        blogIds
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
export const UnlikePostDocument = gql`
    mutation unlikePost($postId: String!) {
  unlike(id: $postId) {
    success
  }
}
    `;
export type UnlikePostMutationFn = Apollo.MutationFunction<UnlikePostMutation, UnlikePostMutationVariables>;

/**
 * __useUnlikePostMutation__
 *
 * To run a mutation, you first call `useUnlikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikePostMutation, { data, loading, error }] = useUnlikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnlikePostMutation(baseOptions?: Apollo.MutationHookOptions<UnlikePostMutation, UnlikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, options);
      }
export type UnlikePostMutationHookResult = ReturnType<typeof useUnlikePostMutation>;
export type UnlikePostMutationResult = Apollo.MutationResult<UnlikePostMutation>;
export type UnlikePostMutationOptions = Apollo.BaseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>;
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
    social {
      postIds
      blogIds
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
    mutation uploadSingle($file: Upload!, $type: String!, $edata: ExtraData) {
  singleUpload(file: $file, type: $type, edata: $edata) {
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
      social {
        postIds
        blogIds
      }
      status
    }
    file {
      filename
    }
    doc {
      body
      text2
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
 *      edata: // value for 'edata'
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