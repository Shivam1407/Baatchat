import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";
import { MessageCircleIcon } from "lucide-react"; // or MessageSquareIcon

const Sidebar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside className="w-16 lg:w-64 bg-base-200 border-r border-base-300 flex flex-col h-screen sticky top-0">
            <div className="p-5 border-b border-base-300 flex justify-center lg:justify-start">
                <Link to="/" className="flex items-center gap-2.5">
                    <MessageCircleIcon className="size-7 lg:size-9 text-primary" />
                    <span className="hidden lg:inline text-2xl lg:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                        VibeChat
                    </span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <Link
                    to="/"
                    className={`btn btn-ghost justify-center lg:justify-start w-full gap-0 lg:gap-3 px-0 lg:px-3 normal-case ${currentPath === "/" ? "btn-active" : ""
                        }`}
                >
                    <HomeIcon className="size-5 text-base-content opacity-70" />
                    <span className="hidden lg:inline">Home</span>
                </Link>

                <Link
                    to="/friends"
                    className={`btn btn-ghost justify-center lg:justify-start w-full gap-0 lg:gap-3 px-0 lg:px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""
                        }`}
                >
                    <UsersIcon className="size-5 text-base-content opacity-70" />
                    <span className="hidden lg:inline">Friends</span>
                </Link>

                <Link
                    to="/notifications"
                    className={`btn btn-ghost justify-center lg:justify-start w-full gap-0 lg:gap-3 px-0 lg:px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""
                        }`}
                >
                    <BellIcon className="size-5 text-base-content opacity-70" />
                    <span className="hidden lg:inline">Notifications</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-base-300 mt-auto">
                <div className="flex flex-col items-center lg:flex-row lg:items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={authUser?.profilePic} alt="User Avatar" />
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <p className="font-semibold text-sm">{authUser?.fullName}</p>
                        <p className="text-xs text-success flex items-center gap-1">
                            <span className="size-2 rounded-full bg-success inline-block" />
                            Online
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
