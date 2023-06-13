import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { HomeIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import IconHoverEffect from './IconHoverEffect'


function SideNav() {

    const session = useSession();
    const user = session.data?.user;

  return (
    <nav className="sticky top-0 px-2 py-4">
        <ul className="flex flex-col itme-start gap-2 whitespace-nowrap">
            <li>
                <Link href="/">
                    <IconHoverEffect>
                        <span className="flex items-center gap-4">
                            <HomeIcon className="h-6 w-6"/>
                            <span className="hidden text-lg md:inline">
                                Home
                            </span>
                        </span>
                    </IconHoverEffect>
                </Link>
            </li>
            {user != null && (
                <li>
                    <Link href={`/profiles/${user.id}`}>
                        <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <UserCircleIcon className="h-6 w-6"/>
                                <span className="hidden text-lg md:inline">
                                    Profile
                                </span>
                            </span>
                        </IconHoverEffect>
                    </Link>
                </li>
            )}
            {user == null ? (
                <li>
                    <button onClick={() => void signIn()}>
                        <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <ArrowRightOnRectangleIcon className="h-6 w-6"/>
                                <span className="hidden text-lg md:inline">
                                    Log in
                                </span>
                            </span>
                        </IconHoverEffect>
                    </button>
                </li>
            ) : (
                <li>
                    <button onClick={() => void signOut()}>
                        <IconHoverEffect>
                            <span className="flex items-center gap-4 text-red-700">
                                <ArrowLeftOnRectangleIcon className="h-6 w-6"/>
                                <span className="hidden text-lg md:inline">
                                    Log Out
                                </span>
                            </span>
                        </IconHoverEffect>
                    </button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default SideNav