
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AgreementDialogProps {
  open: boolean;
  onAgree: () => void;
}

const AgreementDialog: React.FC<AgreementDialogProps> = ({ open, onAgree }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-center">Important Disclaimer</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-white/90">
            <p className="mb-4">
              I understand that this is not actually a public defender that can file my case or act on my behalf.
            </p>
            <p className="mb-4">
              This is a simulation to extract information that may be beneficial for my case and defense.
            </p>
            <p className="mb-4">
              I am using it for research and informational educational purposes only.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction 
            className="bg-cyber-blue hover:bg-cyber-blue/80 text-white font-bold" 
            onClick={onAgree}
          >
            I AGREE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AgreementDialog;
