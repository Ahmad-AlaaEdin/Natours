import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import {
  User,
  Mail,
  Lock,
  Save,
  X,
  Edit2,
  MapPin,
  Calendar,
  Star,
  Ticket,
  Clock,
  DollarSign,
} from "lucide-react";
import { getMyBookings } from "@/services/bookingService";
import type { Booking } from "@/types/booking";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setBookingsLoading(true);
        const data = await getMyBookings();
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setBookingsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating profile:", { name, email });
    setIsEditingProfile(false);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Updating password");
    setIsEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = async () => {
    await logout();
  };

  const userStats = {
    toursBooked: bookings.length,
    reviewsWritten: 8,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-slate-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 top-8">
              <div className="relative flex justify-center mb-6">
                <ProfileImageUpload
                  currentImageUrl={user?.photo}
                  userName={user?.name || "User"}
                  onUploadSuccess={(newImageUrl) => {
                    console.log("Avatar updated:", newImageUrl);
                  }}
                />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                  {user?.name}
                </h2>
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
                onClick={handleLogout}
                variant="outline"
                className="w-full mt-6 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                Logout
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Profile Information
                  </h3>
                </div>
                {!isEditingProfile && (
                  <Button
                    onClick={() => setIsEditingProfile(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setName(user?.name || "");
                        setEmail(user?.email || "");
                      }}
                      variant="outline"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 text-sm font-medium text-slate-500">
                      Full Name
                    </div>
                    <div className="col-span-2 text-sm text-slate-800">
                      {user?.name}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                    <div className="col-span-1 text-sm font-medium text-slate-500">
                      Email
                    </div>
                    <div className="col-span-2 text-sm text-slate-800">
                      {user?.email}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                    <div className="col-span-1 text-sm font-medium text-slate-500">
                      Account Status
                    </div>
                    <div className="col-span-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Lock className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Password & Security
                  </h3>
                </div>
                {!isEditingPassword && (
                  <Button
                    onClick={() => setIsEditingPassword(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Change Password
                  </Button>
                )}
              </div>

              {isEditingPassword ? (
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="pl-10"
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pl-10"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsEditingPassword(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                      variant="outline"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    Your password was last changed on{" "}
                    <span className="font-medium text-slate-800">
                      December 15, 2025
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* My Bookings Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Ticket className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">
                  My Bookings
                </h3>
                <span className="ml-auto text-sm text-slate-500">
                  {bookings.length}{" "}
                  {bookings.length === 1 ? "booking" : "bookings"}
                </span>
              </div>

              {bookingsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading your bookings...</p>
                  </div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ticket className="h-10 w-10 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">
                    No bookings yet
                  </h4>
                  <p className="text-slate-600 mb-6">
                    Start exploring our amazing tours and book your next
                    adventure!
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    Explore Tours
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex gap-4">
                        {/* Tour Image */}
                        <div className="shrink-0">
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-linear-to-br from-emerald-100 to-teal-100">
                            {booking.tour.imageCover ? (
                              <img
                                src={booking.tour.imageCover}
                                alt={booking.tour.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <MapPin className="h-8 w-8 text-emerald-600" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-slate-800 mb-2 truncate">
                            {booking.tour.name}
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              <span>
                                Booked on{" "}
                                {new Date(booking.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>

                            {booking.tour.duration && (
                              <div className="flex items-center gap-2 text-slate-600">
                                <Clock className="h-4 w-4 text-slate-400" />
                                <span>{booking.tour.duration} days</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                              <DollarSign className="h-4 w-4" />
                              <span>${booking.price}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  booking.paid
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {booking.paid ? "✓ Paid" : "Pending Payment"}
                              </span>
                            </div>
                          </div>

                          {booking.tour.startLocation?.address && (
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                              <MapPin className="h-4 w-4" />
                              <span className="truncate">
                                {booking.tour.startLocation.address}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* View Tour Button */}
                        <div className="shrink-0 flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              (window.location.href = `/tour/${booking.tour._id}`)
                            }
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          >
                            View Tour
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
