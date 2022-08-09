import { GraphQLResolveInfo } from "graphql";
//import { StitchingInfo } from "@graphql-tools/delegate";

import Context from "src/context";

//slightly different version of gql-middleware resolver type. This sets the ctx to our custom Context.ts
// export declare type NewIMiddlewareResolver<TSource = any, TContext = Context, TArgs = any> = (
// 	resolve: (source?: TSource, args?: TArgs, context?: TContext, info?: GraphQLResolveInfo & { stitchingInfo?: StitchingInfo }) => any,
// 	parent: TSource,
// 	args: TArgs,
// 	context: TContext,
// 	info: GraphQLResolveInfo
// ) => Promise<any>;

export declare type MyGraphQLFieldResolver<TSource, TContext = Context, TArgs = any, TResult = unknown> = (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult;

//custom middleware type from the gql-tools/resolver-comp, uses the custom gqlFieldResolver above
//I also make the parameters not any, the last two at least
export declare type MyResolversComposition<Resolver extends MyGraphQLFieldResolver<any, any, any> = MyGraphQLFieldResolver<any>> = (next: Resolver) => Resolver;
