"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QuizLeaveDialog = ({
  open,
  onOpenChange,
  leaveHref,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leaveHref: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave quiz?</DialogTitle>
          <DialogDescription>
            Your current answers on this screen will not be submitted unless you finish and submit the quiz.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Stay here
          </Button>
          <Button asChild variant="destructive">
            <Link href={leaveHref}>Leave quiz</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizLeaveDialog;