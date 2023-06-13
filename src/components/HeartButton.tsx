import { useSession } from "next-auth/react";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/outline'
import IconHoverEffect from './IconHoverEffect'

type HeartButtonProps = {
    likedByMe: boolean;
    likeCount: number;
    isLoading: boolean;
    onClick: () => void;
}

function HeartButton({ likedByMe, likeCount, isLoading, onClick }: HeartButtonProps) {
    const session = useSession()
    const LikeIcon = likedByMe ? HeartIconSolid : HeartIconFilled;

    if(session.status !== "authenticated") {
        return <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
            <LikeIcon className="h-5 w-5 text-gray-500"/>
            <span>{likeCount}</span>
        </div>
    }
  return (
    <button
        disabled={isLoading}
        onClick={onClick}
        className={`group items-center gap-1 self-start flex transition-colors durationi-200 
    ${
        likedByMe
        ? "text-red-500"
        : "text-gray-500 hover:text-red-500 focus-visibile:text-red-500"
    }`}>
        <IconHoverEffect red>
            <LikeIcon className={`h-5 w-5 transition-colors duration-200 ${
                likedByMe
                ? "text-red-500"
                : "text-gray-500 group-hover:text-red-500 group-focus-visible:text-red-500"
            }`}/>
        </IconHoverEffect>
        <span>{likeCount}</span>
    </button>
  )
}

export default HeartButton