
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
      <AlertDialogContent className="max-w-md bg-cyber-dark border border-cyber-blue/30 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent pb-1">
            Important Disclaimer
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4 mt-2">
            <p className="text-white text-base leading-relaxed">
              I understand that this is <span className="text-cyber-blue font-medium">not actually a public defender</span> that can file my case or act on my behalf.
            </p>
            <p className="text-white text-base leading-relaxed">
              This is a simulation to extract information that may be <span className="text-cyber-cyan font-medium">beneficial for my case and defense</span>.
            </p>
            <p className="text-white text-base leading-relaxed">
              I am using it for <span className="text-cyber-green font-medium">research and informational educational purposes only</span>.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center mt-4">
          <AlertDialogAction 
            className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90 text-white font-bold px-8 py-2 rounded-md transition-all shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_20px_rgba(14,165,233,0.7)]" 
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
