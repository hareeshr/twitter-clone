import Image from "next/image"
import { UserCircleIcon } from '@heroicons/react/24/outline'


type ProfileImageProps = {
    src?: string | null,
    className?: string,
}

function ProfileImage({src, className = ""} : ProfileImageProps) {
  return (
    <div className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}>
        {src == null 
          ? <UserCircleIcon className="w-full h-full" /> 
          : <Image src={src} alt="Profile Image" quality={100} fill />}
    </div>
  )
}

export default ProfileImage