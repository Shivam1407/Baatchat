import { useState } from "react";
import { completeOnboarding } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LANGUAGES } from "../constants";
import { CameraIcon, LoaderIcon, MapPinIcon, ShuffleIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";

const UserDetailsModal = ({ open, onClose, user }) => {
    const queryClient = useQueryClient();
    const [formState, setFormState] = useState({
        fullName: user?.fullName || "",
        bio: user?.bio || "",
        nativeLanguage: user?.nativeLanguage || "",
        learningLanguage: user?.learningLanguage || "",
        location: user?.location || "",
        profilePic: user?.profilePic || "",
    });

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            onClose();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Update failed");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formState);
    };

    const handleRandomAvatar = () => {
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
        setFormState({ ...formState, profilePic: randomAvatar });
        toast.success("Avatar changed successfully");
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-base-100 rounded-xl shadow-lg w-full max-w-lg p-6 relative">
                <button className="absolute top-3 right-3 btn btn-sm btn-circle" onClick={onClose}>
                    <XIcon className="size-5" />
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">Your Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="size-24 rounded-full bg-base-300 overflow-hidden">
                            {formState.profilePic ? (
                                <img src={formState.profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <CameraIcon className="size-10 text-base-content opacity-40" />
                                </div>
                            )}
                        </div>
                        <button type="button" onClick={handleRandomAvatar} className="btn btn-accent btn-xs">
                            <ShuffleIcon className="size-4 mr-1" /> Random Avatar
                        </button>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Full Name</span></label>
                        <input type="text" className="input input-bordered w-full" value={formState.fullName} onChange={e => setFormState({ ...formState, fullName: e.target.value })} />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Bio</span></label>
                        <textarea className="textarea textarea-bordered w-full" value={formState.bio} onChange={e => setFormState({ ...formState, bio: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Native Language</span></label>
                            <select className="select select-bordered w-full" value={formState.nativeLanguage} onChange={e => setFormState({ ...formState, nativeLanguage: e.target.value })}>
                                <option value="">Select native language</option>
                                {LANGUAGES.map(lang => <option key={lang} value={lang.toLowerCase()}>{lang}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Learning Language</span></label>
                            <select className="select select-bordered w-full" value={formState.learningLanguage} onChange={e => setFormState({ ...formState, learningLanguage: e.target.value })}>
                                <option value="">Select learning language</option>
                                {LANGUAGES.map(lang => <option key={lang} value={lang.toLowerCase()}>{lang}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Location</span></label>
                        <div className="relative">
                            <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                            <input type="text" className="input input-bordered w-full pl-10" value={formState.location} onChange={e => setFormState({ ...formState, location: e.target.value })} placeholder="City, Country" />
                        </div>
                    </div>
                    <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
                        {isPending ? (<><LoaderIcon className="animate-spin size-5 mr-2" />Saving...</>) : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserDetailsModal; 