"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";



interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiLimitReached?: boolean;
}

export const ProModal = ({
  isOpen,
  onClose,
}: ProModalProps) => {


 const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="select-none w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Log In or Sign Up to Continue
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Detect Fake News with AI-Powered Precision
        </p>
        <div className="space-y-4 mt-4">
          <Button className="w-full" onClick={() => router.push("/sign-in")}>Sign In</Button>
          <Button className="w-full" variant="outline" onClick={() => router.push("/sign-up")}>Sign Up</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};