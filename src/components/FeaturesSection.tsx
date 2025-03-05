
import React from 'react';
import { 
  Search, 
  FileText, 
  MessageSquare, 
  FileSearch, 
  GitBranch, 
  Users, 
  BookOpen, 
  Briefcase 
} from 'lucide-react';

const features = [
  {
    icon: <Search className="h-10 w-10 text-cyber-blue" />,
    title: "Case Law & Legal Research",
    description: "Deep legal database search using natural language processing to identify relevant case law, statutes, and legal precedents to strengthen your defense."
  },
  {
    icon: <FileText className="h-10 w-10 text-cyber-cyan" />,
    title: "Document & Motion Drafting",
    description: "Automated generation of legal documents including briefs, motions, and appeals that advocate powerfully for your freedom and rights."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-cyber-purple" />,
    title: "Client Communication",
    description: "Secure communication portal with language translation capabilities to ensure you understand every aspect of your defense strategy."
  },
  {
    icon: <FileSearch className="h-10 w-10 text-cyber-pink" />,
    title: "Evidence Analysis",
    description: "Advanced analysis of documents, images, and audio recordings to extract and highlight key information that could help win your case."
  },
  {
    icon: <GitBranch className="h-10 w-10 text-cyber-green" />,
    title: "Trial Strategy Simulator",
    description: "AI-powered simulation of various trial strategies with outcome predictions to help you achieve the best possible legal outcome."
  },
  {
    icon: <Users className="h-10 w-10 text-cyber-yellow" />,
    title: "Jury Selection Advisor",
    description: "Strategic analysis to identify potential jury biases and behaviors, increasing your chances of a fair trial and favorable verdict."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-cyber-blue" />,
    title: "Legal Training Resources",
    description: "Up-to-date legal education ensuring you understand your rights and the legal processes affecting your case and freedom."
  },
  {
    icon: <Briefcase className="h-10 w-10 text-cyber-cyan" />,
    title: "Case Management",
    description: "Comprehensive organizational tools to track all aspects of your case, ensuring nothing is overlooked in the fight for your freedom."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-cyber-dark relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-glow">Revolutionary Legal Assistance Tools</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Public Defender GPT works as your dedicated digital public defender, harnessing cutting-edge AI to build your case and fight tirelessly for your freedom across every stage of legal proceedings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group cyber-card p-6 transition-all duration-300 relative overflow-hidden card-glow"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 50}ms`
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="card-icon-float mb-4">{feature.icon}</div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-glow transition-all duration-300">{feature.title}</h3>
              
              <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">{feature.description}</p>
              
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-cyber-blue/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyber-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyber-black to-transparent"></div>
    </section>
  );
};

export default FeaturesSection;
