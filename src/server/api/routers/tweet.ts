import type { Prisma } from "@prisma/client";
import type { inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import type {
  createTRPCContext,
} from "~/server/api/trpc";

// Create a TRPC router for the tweet related procedures
export const tweetRouter = createTRPCRouter({

  // Procedure to get infinite tweets for a user profile feed (public access)
  infiniteProfileFeed: publicProcedure.input(
    z.object({
      userId: z.string(),
      limit: z.number().optional(),
      cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
    })
  ).query(async ({
    input: { limit = 10, userId, cursor }, ctx }) => {
    return await getInfiniteTweets({
      limit, ctx, cursor,
      whereClause: { userId }
    });
  }),

  // Procedure to get infinite tweets for the general feed (public access)
  infiniteFeed: publicProcedure.input(
    z.object({
      onlyFollowing: z.boolean().optional(),
      limit: z.number().optional(),
      cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
    })
  ).query(async ({
    input: { limit = 10, onlyFollowing = false, cursor }, ctx }) => {
    const currentUserId = ctx.session?.user.id;
    return await getInfiniteTweets({
      limit, ctx, cursor,
      whereClause: currentUserId == null || !onlyFollowing ? undefined : {
        user: {
          followers: { some: { id: currentUserId } }
        }
      }
    });
  }),

  // Procedure to create a new tweet (requires authentication)
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: { content, userId: ctx.session.user.id }
      });

      // Trigger revalidation of the corresponding user profile page for updated data
      void ctx.revalidateSSG?.(`/profiles/${ctx.session.user.id}`);

      return tweet;
    }),

  // Procedure to toggle like status for a tweet (requires authentication)
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { tweetId: id, userId: ctx.session.user.id };

      const existingTweet = await ctx.prisma.like.findUnique({
        where: { userId_tweetId: data }
      });

      if (existingTweet == null) {
        // If like does not exist, create a new like
        await ctx.prisma.like.create({ data });
        return { addedLike: true };
      } else {
        // If like exists, delete the like
        await ctx.prisma.like.delete({
          where: { userId_tweetId: data }
        });
        return { addedLike: false };
      }
    })

});


// Function to retrieve infinite tweets based on the provided parameters
async function getInfiniteTweets({
  whereClause,
  ctx, limit, cursor
}: {
  whereClause?: Prisma.TweetWhereInput,
  limit: number,
  cursor: {
    id: string,
    createdAt: Date
  } | undefined,
  ctx: inferAsyncReturnType<typeof createTRPCContext>
}) {
  const currentUserId = ctx.session?.user.id;

  // Query tweets with specific fields and related data
  const tweets = await ctx.prisma.tweet.findMany({
    take: limit + 1,
    cursor: cursor ? { createdAt_id: cursor } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    where: whereClause,
    select: {
      id: true,
      content: true,
      createdAt: true,
      _count: {
        select: { likes: true }
      },
      likes: currentUserId == null ? false : { where: { userId: currentUserId } },
      user: {
        select: { name: true, id: true, image: true }
      }
    }
  });

  let nextCursor: typeof cursor | undefined;
  if (tweets.length > limit) {
    const nextItem = tweets.pop();
    if (nextItem != null) {
      nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
    }
  }

  // Map the retrieved tweets and return the result with next cursor
  return {
    tweets: tweets.map(tweet => {
      return {
        id: tweet.id,
        content: tweet.content,
        createdAt: tweet.createdAt,
        likeCount: tweet._count.likes,
        user: tweet.user,
        likedByMe: tweet.likes?.length > 0
      };
    }),
    nextCursor
  };
}
