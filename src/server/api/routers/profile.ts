import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// Create a TRPC router for the profile related procedures
export const profileRouter = createTRPCRouter({
  
  // Procedure to get a profile by ID (public access)
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const currentUserId = ctx.session?.user.id;

      // Query the user profile with specific fields and related counts
      const profile = await ctx.prisma.user.findUnique({
        where: { id },
        select: {
          name: true,
          image: true,
          _count: {
            select: {
              followers: true,
              follows: true,
              tweets: true,
            },
          },
          followers:
            currentUserId == null
              ? undefined
              : { where: { id: currentUserId } },
        },
      });

      // If profile is not found, return null
      if (profile == null) return null;

      // Return the profile data with relevant counts and follow status
      return {
        name: profile.name,
        image: profile.image,
        followersCount: profile._count.followers,
        followsCount: profile._count.follows,
        tweetsCount: profile._count.tweets,
        isFollowing: profile.followers.length > 0,
      };
    }),

  // Procedure to toggle follow status (requires authentication)
  toggleFollow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input: { userId }, ctx }) => {
      const currentUserId = ctx.session.user.id;

      // Check if the current user is already following the target user
      const existingFollow = await ctx.prisma.user.findFirst({
        where: { id: userId, followers: { some: { id: currentUserId } } },
      });

      let addedFollow;

      if (existingFollow == null) {
        // If not following, connect the current user as a follower
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { followers: { connect: { id: currentUserId } } },
        });
        addedFollow = true;
      } else {
        // If already following, disconnect the current user as a follower
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { followers: { disconnect: { id: currentUserId } } },
        });
        addedFollow = false;
      }

      // Revalidate the corresponding profile pages for updated data
      void ctx.revalidateSSG?.(`/profiles/${userId}`);
      void ctx.revalidateSSG?.(`/profiles/${currentUserId}`);

      // Return the result indicating whether follow was added or removed
      return { addedFollow };
    }),
});
