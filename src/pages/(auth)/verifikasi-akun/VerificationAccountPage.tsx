import { useDocumentTitle } from "@/hooks/use-document-title";
import { useLocation, useNavigate } from "react-router";
import { easeOut, motion } from "motion/react";
import { toast } from "sonner";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useEffect, useState, useCallback } from "react";
import { useSendVerification, useVerifyAccount } from "./useVerification";
import { Loader2 } from "lucide-react";

const RESEND_COOLDOWN_SECONDS = 180; // 3 minutes cooldown for resend (matches Redis TTL)

const VerificationAccountPage = () => {
  useDocumentTitle("Verifikasi Akun");

  const [timer, setTimer] = useState(RESEND_COOLDOWN_SECONDS);
  const [isActive, setIsActive] = useState(true);
  const [motionKey, setMotionKey] = useState(0);
  const [otpValue, setOtpValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const userId = query.get("code") || "";
  const verificationMethod = query.get("method") || "";

  const { mutateAsync: sendVerification, isPending: isSending } = useSendVerification();
  const { mutateAsync: verifyAccount, isPending: isVerifying } = useVerifyAccount();

  // Redirect if no userId
  useEffect(() => {
    if (!userId) {
      toast.error("Link verifikasi tidak valid");
      navigate("/register", { replace: true });
    }
  }, [userId, navigate]);

  // Timer countdown
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otpValue.length === 6) {
      handleVerify();
    }
  }, [otpValue]);

  const handleVerify = useCallback(async () => {
    if (otpValue.length !== 6 || isVerifying) return;

    try {
      await verifyAccount({
        user_id: userId,
        code: otpValue,
      });

      toast.success("Akun berhasil diverifikasi!", {
        duration: 3000,
      });

      // Redirect to login after successful verification
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Kode verifikasi salah";
      
      toast.error(message, {
        duration: 3000,
      });
      
      // Clear OTP on error
      setOtpValue("");
    }
  }, [otpValue, userId, verifyAccount, navigate, isVerifying]);

  const handleResend = async () => {
    if (isSending) return;

    try {
      await sendVerification({ user_id: userId });
      
      toast.success("Kode verifikasi telah dikirim ulang", {
        duration: 3000,
      });

      // Reset timer
      setTimer(RESEND_COOLDOWN_SECONDS);
      setIsActive(true);
      setMotionKey((prev) => prev + 1);
      setOtpValue("");
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Gagal mengirim ulang kode";
      
      toast.error(message, {
        duration: 3000,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getMethodLabel = () => {
    if (verificationMethod.includes("@")) {
      // Mask email: bu**@example.com
      const [local, domain] = verificationMethod.split("@");
      const masked = local.slice(0, 2) + "***";
      return `${masked}@${domain}`;
    }
    // Mask phone: 0812****7890
    if (verificationMethod.length >= 10) {
      return verificationMethod.slice(0, 4) + "****" + verificationMethod.slice(-4);
    }
    return verificationMethod;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        <h1 className="font-bold text-4xl mb-5 text-center">Verifikasi Akun</h1>
        <p className="text-center text-muted-foreground">
          Kode verifikasi telah kami kirim ke:
        </p>
        <p className="text-center font-medium mt-1">
          {getMethodLabel()}
        </p>

        <div className="w-full flex justify-center mt-8">
          <InputOTP 
            maxLength={6} 
            value={otpValue}
            onChange={setOtpValue}
            disabled={isVerifying}
          >
            <InputOTPGroup className="flex gap-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={clsx(
                    "flex-1 w-11 h-11 aspect-square text-xl rounded-md border text-center transition-colors",
                    "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
                    isVerifying && "opacity-50 cursor-not-allowed"
                  )}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Verify Button */}
        <Button
          className="mt-6 w-full"
          onClick={handleVerify}
          disabled={otpValue.length !== 6 || isVerifying}
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Memverifikasi...
            </>
          ) : (
            "Verifikasi"
          )}
        </Button>

        {/* Timer / Resend */}
        <motion.div
          className="mt-8 text-center"
          key={motionKey}
          initial={{ y: 15, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: easeOut,
            },
          }}
        >
          {timer > 0 ? (
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Kirim ulang kode dalam
              </p>
              <h3 className="text-4xl font-mono font-bold">
                {formatTime(timer)}
              </h3>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Tidak menerima kode?
              </p>
              <Button 
                variant="outline" 
                onClick={handleResend}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Ulang Kode"
                )}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Help text */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Kode verifikasi berlaku selama 3 menit.
          <br />
          Periksa folder spam jika tidak menemukan email.
        </p>
      </div>
    </div>
  );
};

export default VerificationAccountPage;
