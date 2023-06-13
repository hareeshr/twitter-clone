import { api } from "~/utils/api";
import InfiniteTweetList from "./InfiniteTweetList";

function FollowingTweets() {
  // Fetch the infinite feed of tweets from the API
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
    {
      // Define the function to get the next page cursor
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}

export default FollowingTweets;
