import { api } from "~/utils/api";
import InfiniteTweetList from "./InfiniteTweetList";

function RecentTweets() {
  // Fetch recent tweets using the useInfiniteQuery hook from the api.tweet.infiniteFeed module
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
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

export default RecentTweets;
