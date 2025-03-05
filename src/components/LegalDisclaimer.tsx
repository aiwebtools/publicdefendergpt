
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const LegalDisclaimer: React.FC = () => {
  return (
    <section className="py-10 bg-cyber-black">
      <div className="container mx-auto px-4">
        <div className="glass-panel p-6 border-l-4 border-l-yellow-500">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-500 h-6 w-6 mr-4 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal Disclaimer</h3>
              <div className="text-white/70 text-sm space-y-2">
                <p>
                  Public Defender GPT is designed to provide general legal information and assistance, not specific legal advice. It is an AI tool intended to assist legal professionals and should not be considered a substitute for professional legal representation.
                </p>
                <p>
                  The information provided by Public Defender GPT is for educational and informational purposes only. It does not create an attorney-client relationship between users and AI Web Tools LLC or any affiliated entities.
                </p>
                <p>
                  Legal concepts, procedures, and laws vary by jurisdiction and change over time. Public Defender GPT attempts to provide current and accurate information, but all information should be verified by qualified legal professionals before being relied upon in legal matters.
                </p>
                <p>
                  Users of Public Defender GPT assume all responsibility for the use of the information it provides. AI Web Tools LLC and its affiliates disclaim all liability for any actions taken based on the information provided by this tool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDisclaimer;
