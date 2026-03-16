"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const QuizTimeUpDialog = ({
  open,
  onOpenChange,
  isSubmitting,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onConfirm: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Time is up</DialogTitle>
          <DialogDescription>
            Your quiz time has ended. Submit now to save your answers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className=" h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizTimeUpDialog;
