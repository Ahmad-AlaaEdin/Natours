import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileImageUpload from "@/components/ProfileImageUpload";

interface ProfileSidebarProps {
  user: {
    name?: string;
    email?: string;
    photo?: string;
    role?: string;
  } | null;
  userStats: {
    toursBooked: number;
    reviewsWritten: number;
  };
  onLogout: () => void;
  onImageUpload: (newImageUrl: string) => void;
}

export default function ProfileSidebar({
  user,
  userStats,
  onLogout,
  onImageUpload,
}: ProfileSidebarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 top-8">
      <div className="relative flex justify-center mb-6">
        <ProfileImageUpload
          currentImageUrl={user?.photo}
          userName={user?.name || "User"}
          onUploadSuccess={onImageUpload}
        />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">{user?.name}</h2>
        <p className="text-slate-500 text-sm mb-2">{user?.email}</p>
        <span className="inline-block px-4 py-1.5 bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wide">
          {user?.role}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <MapPin className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {userStats.toursBooked}
          </div>
          <div className="text-xs text-slate-600">Tours Booked</div>
        </div>
        <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <Star className="h-5 w-5 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {userStats.reviewsWritten}
          </div>
          <div className="text-xs text-slate-600">Reviews</div>
        </div>
      </div>

      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full mt-6 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
      >
        Logout
      </Button>
    </div>
  );
}
