import Link from 'next/link';
import { TweetProps } from './../types/TweetType';
import ProfileImage from './ProfileImage';
import HeartButton from './HeartButton';
import { api } from "~/utils/api";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'short' });

function TweetCard({ id, user, content, createdAt, likeCount, likedByMe}: TweetProps) {
    const trpcUtils = api.useContext();
    const toggleLike = api.tweet.toggleLike.useMutation({
        onSuccess: (data) => {
            const updateData: Parameters<typeof trpcUtils.tweet.infiniteFeed.setInfiniteData>[1] = (oldData) => {
                if (oldData == null) return
                
                let countModifier = data.addedLike ? 1 : -1;

                return {
                    ...oldData,
                    pages: oldData.pages.map(page => {
                        return {
                            ...page,
                            tweets: page.tweets.map(tweet => {
                                if (tweet.id === id) {
                                    return {
                                        ...tweet,
                                        likeCount: tweet.likeCount + countModifier,
                                        likedByMe: data.addedLike
                                    }
                                }
                                return tweet
                            })
                        }
                    })
                }
                
            }

            trpcUtils.tweet.infiniteFeed.setInfiniteData({}, updateData);
            trpcUtils.tweet.infiniteFeed.setInfiniteData({ onlyFollowing: true}, updateData);
            trpcUtils.tweet.infiniteProfileFeed.setInfiniteData({userId: user.id }, updateData);
        }
    })

    function handleToggleLike() {
        toggleLike.mutate({ id })
    }
  
    return (
    <li className="flex gap-4 border-b px-4 py-4">
        <Link href={`/profiles/${user.id}`}>
            <ProfileImage src={user.image} />
        </Link>
        <div className="flex flex-grow flex-col">
            <div className="flex gap-1">
                <Link href={`/profiles/${user.id}`} 
                    className="font-bold outline-none hover:underline focus-visible:underline">
                    {user.name}
                </Link>
                <span className="text-gray-500">-</span>
                <span className="text-gray-500">{dateTimeFormatter.format(createdAt)}</span>
            </div>
            <p className="whitespace-pre-wrap">{content}</p>
            <HeartButton onClick={handleToggleLike} isLoading={toggleLike.isLoading} likedByMe={likedByMe} likeCount={likeCount}/>
        </div>
    </li>
  )
}

export default TweetCard