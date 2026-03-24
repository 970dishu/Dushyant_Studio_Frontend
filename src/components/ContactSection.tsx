import { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import dushyantPortrait from "/assets/dushyant-portrait.png";
import waveHand from "/assets/wave-hand.png";

const serviceOptions = [
  "Motion Design",
  "Film Editing",
  "Creative Direction",
  "Storywriting",
  "Other",
];

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Toggle between "Hi" text and wave hand image
  useEffect(() => {
    const interval = setInterval(() => {
      setShowWave((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.service) {
      toast({
        title: "Service required",
        description: "Please select the service you need.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBase = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
      const endpoint = apiBase ? `${apiBase}/api/contact` : "/api/contact";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const isJson = response.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok || !data?.success) {
        const message =
          data?.error ||
          (response.status >= 500
            ? "Server error. Please try again in a minute."
            : "Failed to send message");
        throw new Error(message);
      }

      // Show success animation
      setShowSuccess(true);

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form after animation
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          service: "",
          message: "",
        });
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left - Portrait with Hi Badge */}
          <div className="relative flex justify-center order-2 lg:order-1 mb-8 lg:mb-0">
            <div className="relative">
              {/* Portrait Image */}
              <div className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={dushyantPortrait}
                  alt="Dushyant Garg"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Hi/Wave Badge - positioned at bottom left, overlapping */}
              <div
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-5 md:-left-5 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg overflow-hidden"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <span
                    className={`absolute text-primary-foreground font-body font-medium text-xl sm:text-xl md:text-2xl xl:text-3xl transition-all duration-500 ${showWave ? "opacity-0 scale-75 rotate-12" : "opacity-100 scale-100 rotate-0"
                      }`}
                  >
                    Hi
                  </span>
                  <img
                    src={waveHand}
                    alt="Wave"
                    className={`absolute w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 xl:w-14 xl:h-14 object-contain transition-all duration-500 ${showWave ? "opacity-100 scale-100 rotate-0 animate-wave" : "opacity-0 scale-75 -rotate-12"
                      }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="order-1 lg:order-2">
            {/* Heading */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-[1.1] uppercase italic text-center lg:text-left">
              Let's Work Together!
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              Let's build something impactful together—whether it's your brand, your website, or your next big idea.
            </p>

            <div className="relative">
              {/* Success Animation Overlay */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-background/95 rounded-2xl backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1
                      }}
                      className="flex flex-col items-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.2
                        }}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          <Check className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground stroke-[3]" />
                        </motion.div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                      >
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground uppercase">
                          Message Sent!
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base mt-2">
                          I'll get back to you soon
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                {/* Name and Email Row */}
                <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-secondary border-0 rounded-full text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Dushyant Garg"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-secondary border-0 rounded-full text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="dushyantdishugarg@gmail.com"
                      required
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="relative">
                  <label htmlFor="service" className="block text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">
                    Service Needed ?
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-secondary border-0 rounded-full text-left text-sm sm:text-base flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    aria-expanded={isDropdownOpen}
                    aria-controls="service-options"
                  >
                    <span className={formData.service ? "text-foreground" : "text-muted-foreground"}>
                      {formData.service || "Select..."}
                    </span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div id="service-options" className="absolute z-10 w-full mt-2 bg-secondary border border-border rounded-2xl shadow-lg overflow-hidden">
                      {serviceOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, service: option });
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-left text-sm sm:text-base text-foreground hover:bg-background hover:text-primary transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3">
                    What Can I Help You...
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-secondary border-0 rounded-2xl text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Hello, I'd like to enquire about..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center lg:justify-start pt-2 md:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || showSuccess}
                    className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-transparent text-primary font-heading text-base sm:text-lg md:text-xl uppercase tracking-wider rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? "Sending..." : "Submit"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
