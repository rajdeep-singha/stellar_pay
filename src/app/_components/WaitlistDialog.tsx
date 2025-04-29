"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Waitlist from "@/components/Waitlist";

interface ContactDialogProps {
  trigger: React.ReactNode;
}

export default function WaitlistDialog({ trigger }: ContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="overflow-y-auto [&>button]:hidden">
        <Waitlist />
      </DialogContent>
    </Dialog>
  );
}
