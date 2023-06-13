import Button from "./Button";
import { useSession } from "next-auth/react";

type FollowButtonProps = {
  userId: string;
  isFollowing: boolean;
  isLoading: boolean;
  onClick: () => void;
}

function FollowButton({ userId, isFollowing, isLoading, onClick }: FollowButtonProps) {
  const session = useSession();

  // If the user is not authenticated or if the user id matches the current user id,
  // don't render the FollowButton component
  if (session.status !== "authenticated" || session.data.user.id === userId) {
    return null;
  }

  // Render the Button component with appropriate props
  return (
    <Button disabled={isLoading} onClick={onClick} small gray={isFollowing}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default FollowButton;
