
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Public Defender GPT has revolutionized how I prepare for cases. The depth of legal research it provides in minutes would have taken me days to compile. A game-changer for public defenders with heavy caseloads.",
    author: "Michael K.",
    title: "Public Defender, Chicago"
  },
  {
    quote: "The document drafting capability alone has saved me countless hours. The motions it helps me create are thorough and well-researched, allowing me to focus more energy on direct client representation.",
    author: "Sarah J.",
    title: "Legal Aid Attorney, New York"
  },
  {
    quote: "I was skeptical at first, but after using Public Defender GPT to analyze case evidence, I found details I had missed. Its ability to process and connect information across documents is remarkable.",
    author: "David L.",
    title: "Public Defender's Office, Los Angeles"
  },
  {
    quote: "The trial strategy simulator helped me prepare for difficult cross-examinations and anticipate prosecution arguments. This tool provides access to a level of preparation usually reserved for well-funded private practices.",
    author: "Jennifer R.",
    title: "Criminal Defense Attorney"
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-cyber-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-glow">What Legal Professionals Say</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Public Defender GPT is helping legal professionals nationwide deliver better representation to their clients.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 relative">
            <Quote className="absolute text-cyber-blue opacity-20 top-8 left-8 h-20 w-20" />
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl mb-8 italic text-white/90">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-cyber-blue/30 rounded-full flex items-center justify-center text-cyber-blue font-bold text-xl">
                  {testimonials[currentIndex].author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{testimonials[currentIndex].author}</p>
                  <p className="text-white/60 text-sm">{testimonials[currentIndex].title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-cyber-blue'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
