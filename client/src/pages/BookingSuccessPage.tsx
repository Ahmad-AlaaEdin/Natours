import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Home, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get("session_id");

    if (session) {
      setSessionId(session);
    }
  }, [searchParams]);

  return (
    <div className="container-page min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #428177 0%, #054239 100%)",
            }}
          >
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3" style={{ color: "#3d3a3b" }}>
          Booking Successful!
        </h1>
        <p className="text-lg mb-8" style={{ color: "#3d3a3b", opacity: 0.7 }}>
          Your tour has been successfully booked.
        </p>

        {sessionId && (
          <div
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border"
            style={{ borderColor: "#b9a779" }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#3d3a3b" }}
            >
              Payment Confirmed
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span style={{ color: "#3d3a3b", opacity: 0.7 }}>
                  Transaction ID:
                </span>
                <span
                  className="font-mono text-sm"
                  style={{ color: "#3d3a3b" }}
                >
                  {sessionId.substring(0, 20)}...
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 pt-3">
                <CheckCircle2
                  className="h-5 w-5"
                  style={{ color: "#428177" }}
                />
                <span className="font-semibold" style={{ color: "#428177" }}>
                  Payment Verified
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button
            className="w-full text-white"
            style={{
              background: "linear-gradient(135deg, #428177 0%, #054239 100%)",
            }}
            size="lg"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            className="w-full"
            style={{ borderColor: "#b9a779", color: "#3d3a3b" }}
            size="lg"
            onClick={() => navigate("/profile")}
          >
            <FileText className="mr-2 h-5 w-5" />
            View My Bookings
          </Button>
        </div>

        <p className="text-sm mt-6" style={{ color: "#3d3a3b", opacity: 0.6 }}>
          Need help? Contact our{" "}
          <a
            href="#"
            className="underline"
            style={{ color: "#428177" }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            support team
          </a>
        </p>
      </div>
    </div>
  );
}
