import { useEffect, useState, useRef } from "react";
import kanishkImg from "/assets/kanishk-khurana.png";
import amanImg from "/assets/aman-verma.png";
import agyaatImg from "/assets/agyaat-aadarsh.png";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = "", duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const testimonials = [
  {
    quote: "Dushyant's motion design elevated our brand to a whole new level. His attention to detail and creative vision is unmatched.",
    name: "Kanishk Khurana",
    role: "DevRel Web3, Across Protocol",
    avatar: kanishkImg,
  },
  {
    quote: "Working with Dushyant was seamless. He understood our vision instantly and delivered animations that exceeded our expectations.",
    name: "Aman Verma",
    role: "Marketing Lead",
    avatar: amanImg,
  },
  {
    quote: "The creative direction and storytelling Dushyant brought to our project transformed our campaign completely.",
    name: "Agyaat Aadarsh",
    role: "Content Creator",
    avatar: agyaatImg,
  },
];

const stats = [
  { value: 100, suffix: "%", label: "Client Satisfaction", description: "Every project delivered with excellence" },
  { value: 50, suffix: "+", label: "Projects Delivered", description: "Across motion design, editing & direction" },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm text-primary uppercase tracking-wider mb-4">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Kind Words
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Here's what clients have shared about working with me. Their trust motivates me to keep pushing creative boundaries.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16 items-stretch">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-secondary rounded-2xl p-5 md:p-8 card-hover border border-border flex flex-col h-full"
            >
              <p className="text-foreground text-base md:text-lg mb-8 leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-secondary rounded-2xl p-6 md:p-12 border border-border"
            >
              <p className="text-muted-foreground text-sm mb-4">{stat.description}</p>
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-primary">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
