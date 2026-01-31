import { useDocumentTitle } from "@/hooks/use-document-title";
import { useLocation } from "react-router";
import { easeInOut, easeOut, motion } from "motion/react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useEffect, useState } from "react";

const VerificationAccountPage = () => {
  useDocumentTitle("Verifikasi Akun");

  const second = 3;

  const [timer, setTimer] = useState(second);
  const [isActive, setIsActive] = useState(true);
  const [motionKey, setMotionKey] = useState(0); // for framer motion

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const queryUserId = query.get("code");
  const queryUserMethod = query.get("method");

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setIsActive(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleResend = () => {
    setTimer(second);
    setIsActive(true); // restart interval
    setMotionKey((prev) => prev + 1) // Untuk replay frame motion
    // TODO: panggil API kirim ulang OTP di sini
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-8 flex flex-col items-center">
          <h1 className="font-bold text-4xl mb-5 text-center">Verifikasi</h1>
          <p className="text-center text-muted-foreground">
            Kode verifikasi telah kami kirim ke: {queryUserMethod}
          </p>

          <div className="w-full flex justify-center mt-8">
            <InputOTP className="mx-auto w-full max-w-md" maxLength={6}>
              <InputOTPGroup className="flex gap-3">
                <InputOTPSlot
                  index={0}
                  className={clsx(
                    "flex-1 w-11 h-11 aspect-square text-xl rounded-md border text-center border-gray-300",
                  )}
                />
                <InputOTPSlot
                  index={1}
                  className="flex-1 w-11 h-11 aspect-square text-xl rounded-md border border-gray-300 text-center"
                />
                <InputOTPSlot
                  index={2}
                  className="flex-1 w-11 h-11 aspect-square text-xl rounded-md border border-gray-300 text-center"
                />
                <InputOTPSlot
                  index={3}
                  className="flex-1 w-11 h-11 aspect-square text-xl rounded-md border border-gray-300 text-center"
                />
                <InputOTPSlot
                  index={4}
                  className="flex-1 w-11 h-11 aspect-square text-xl rounded-md border border-gray-300 text-center"
                />
                <InputOTPSlot
                  index={5}
                  className="flex-1 w-11 h-11 aspect-square text-xl rounded-md border border-gray-300 text-center"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {/* Timer */}
          <motion.div
            className="mt-10 text-center"
            key={motionKey}
            initial={{ y: 15 }}
            animate={{
              y: 0,
              transition: {
                duration: 0.5,
                ease: easeOut,
              },
            }}
          >
            {timer != 0 ? (
              <h3 className="text-5xl">
                00:{timer.toString().padStart(2, "0")}
              </h3>
            ) : (
              <Button size={"default"} className="mt-3" onClick={handleResend}>
                Kirim Ulang
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default VerificationAccountPage;
