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
  onConfirm,
  isLeaving = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLeaving?: boolean;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave quiz?</DialogTitle>
          <DialogDescription>
            Your current answers on this screen will not be submitted unless you
            finish and submit the quiz.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Stay here
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLeaving}
            className="cursor-pointer"
          >
            {isLeaving ? "Leaving..." : "Leave quiz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizLeaveDialog;
