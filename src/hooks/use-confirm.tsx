import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void} | null>(null);

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({resolve})
  })

  const handleClose = () => {
    setPromise(null)
  }

  const handleCancle = () => {
    promise?.resolve(false);
    handleClose()
  }

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose()
  }

  const ConfirmDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button
            onClick={handleCancle}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmDialog, confirm]
}
