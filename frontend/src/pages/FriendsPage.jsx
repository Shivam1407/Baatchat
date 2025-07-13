import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
    const { data: friends = [], isLoading } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-6xl space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Friends</h1>
                        <p className="opacity-70 mt-2">
                            Connect and chat with your language exchange partners
                        </p>
                    </div>
                    <div className="badge badge-primary badge-lg">
                        {friends.length} {friends.length === 1 ? "Friend" : "Friends"}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                ) : friends.length === 0 ? (
                    <NoFriendsFound />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {friends.map((friend) => (
                            <FriendCard key={friend._id} friend={friend} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsPage; 