
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is Public Defender GPT?",
    answer: "Public Defender GPT is your digital public defender - an AI-powered legal assistant designed to help you build your case and fight for your freedom. It provides comprehensive legal research, document drafting, case analysis, and strategic advice to strengthen your defense."
  },
  {
    question: "Is this a replacement for a human attorney?",
    answer: "No. Public Defender GPT works alongside human attorneys, not as a replacement. It helps legal professionals and individuals work more efficiently by automating research and document preparation, allowing attorneys to focus on client interaction and courtroom representation in the fight for your freedom."
  },
  {
    question: "How accurate is the legal information provided?",
    answer: "Public Defender GPT accesses up-to-date legal databases and information, but all information should be verified by a licensed attorney. The tool provides hypothetical legal advice and solutions that should be reviewed by qualified legal professionals before implementation in your defense."
  },
  {
    question: "Is my case information kept confidential?",
    answer: "Public Defender GPT adheres to strict privacy and confidentiality standards. All interactions are treated with the same level of confidentiality as attorney-client communications. However, users should follow their jurisdiction's guidelines regarding client confidentiality when using any digital tool."
  },
  {
    question: "Can Public Defender GPT analyze case evidence?",
    answer: "Yes, the system can analyze various forms of evidence including documents, images, and audio recordings to extract relevant information. It uses advanced data analysis techniques to identify patterns and key points that may help build a stronger case for your defense."
  },
  {
    question: "How does the Trial Strategy Simulator work?",
    answer: "The Trial Strategy Simulator uses AI to model potential trial outcomes based on case details, evidence, precedents, and various defense approaches. It helps you visualize different strategic paths and their potential consequences, allowing for more informed decision-making in your fight for freedom."
  }
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-cyber-dark relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-glow">Frequently Asked Questions</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Everything you need to know about how Public Defender GPT can help build your case and fight for your freedom.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-white/10">
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-xl font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-cyber-blue" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white/70" />
                )}
              </button>
              <div
                className={`mt-2 text-white/70 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pb-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyber-black to-transparent"></div>
    </section>
  );
};

export default FaqSection;
