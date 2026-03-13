import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { 
  Briefcase, 
  Calendar,
  ArrowRight,
  Award,
  Eye,
  Users,
  Trophy
} from "lucide-react";

// Experience Timeline Data
const experiences = [
  {
    id: 1,
    role: "Motion Graphics Designer",
    company: "WEB3, Across Protocol US",
    location: "Remote",
    period: "July 2025 - Present",
    description: "Crafted dynamic videos and motion graphics for Across Protocol, enhancing brand communication and community engagement in the Web3 space on X.",
    current: true,
  },
  {
    id: 2,
    role: "Editor Director",
    company: "Agyaatfilms",
    location: "Chandigarh",
    period: "May 2025 - Present",
    description: "Shaped the visual language of Agyaatfilms through direction and editing and post-production execution.",
    current: true,
  },
  {
    id: 3,
    role: "Media Head",
    company: "Rangrezz, Chitkara University",
    location: "Punjab",
    period: "October 2025 - December 2025",
    description: "Led the Media Team for Rangrezz, the college's largest national theatre fest, overseeing and creating promotional content that boosted reach and visibility Nationwide.",
    current: false,
  },
  {
    id: 4,
    role: "Core Member",
    company: "Devlearn Community",
    location: "Global",
    period: "December 2023 - December 2025",
    description: "Actively contributed to community growth, technical initiatives, and learning-driven events while collaborating with WEB3 companies worldwide.",
    current: false,
  },
];

// Tech Stack Data
const techStack = [
  { name: "After Effects", icon: "Ae", color: "#9999FF" },
  { name: "Premiere Pro", icon: "Pr", color: "#9999FF" },
  { name: "Photoshop", icon: "Ps", color: "#31A8FF" },
  { name: "Illustrator", icon: "Ai", color: "#FF9A00" },
  { name: "Lightroom", icon: "Lr", color: "#31A8FF" },
  { name: "Figma", icon: "Fi", color: "#F24E1E" },
  { name: "Blender", icon: "Bl", color: "#E87D0D" },
  { name: "DaVinci Resolve", icon: "Da", color: "#FF4444" },
];

// Workflow Steps Data
const workflowSteps = [
  {
    number: "01",
    title: "Research & Strategy",
    description: "In this phase, I dive deep into understanding your business, target audience, and project goals. Through research and strategic planning, I create a clear roadmap to guide the entire design process.",
  },
  {
    number: "02",
    title: "Concept & Ideation",
    description: "Here, I brainstorm and develop creative concepts that align with your vision. Initial sketches and ideas are refined into tangible wireframes, setting the direction for design and functionality.",
  },
  {
    number: "03",
    title: "Feedback",
    description: "Collaboration is key. I review the design with you, gather feedback, and refine the work to align with your expectations and goals. This ensures the design reflects your vision.",
  },
  {
    number: "04",
    title: "Delivery",
    description: "Once everything is finalized, the project is launched and delivered to you. I also provide guidance or support for ongoing maintenance to ensure long-term success.",
  },
];

// Achievements Data
const achievements = [
  {
    icon: Eye,
    stat: "1M+",
    title: "Views Generated",
    description: "Crossed 1M+ views on social pages of Rangrezz, NSS and AIU in less than a month using strategic social media marketing.",
  },
  {
    icon: Users,
    stat: "Amazon",
    title: "Brand Collaboration",
    description: "Worked with Amazon - Audible on social profile with AgyaatAadarsh as Editor Director for a brand collab reaching massive audience.",
  },
  {
    icon: Trophy,
    stat: "Winner",
    title: "Sandbox 3.0 Hackathon",
    description: "Won at Sandbox 3.0 hackathon for problem solving using design thinking, pitching a product design for healthcare sector.",
  },
  {
    icon: Award,
    stat: "IFP",
    title: "Indian Film Project",
    description: "Participated in the Indian Film Project, gaining real set experience and exposure to professional film production.",
  },
];

// Timeline Item Component
const TimelineItem = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border">
        {/* Dot */}
        <div className={`absolute -left-[5px] top-1 w-[11px] h-[11px] rounded-full border-2 ${
          experience.current 
            ? "bg-primary border-primary" 
            : "bg-background border-muted-foreground"
        }`} />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Period Badge */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{experience.period}</span>
          {experience.current && (
            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-[10px] uppercase font-medium">
              Current
            </span>
          )}
        </div>

        {/* Role & Company */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">
            {experience.role}
          </h3>
          <p className="text-primary text-sm md:text-base">
            {experience.company} • {experience.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
};

// Tech Stack Item Component
const TechStackItem = ({ item, index }: { item: typeof techStack[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center gap-3 p-4 md:p-6 bg-secondary/50 rounded-2xl border border-border/30 hover:border-primary/50 transition-colors group"
    >
      <div 
        className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center font-heading text-lg md:text-xl font-bold transition-transform"
        style={{ backgroundColor: `${item.color}20`, color: item.color }}
      >
        {item.icon}
      </div>
      <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors text-center">
        {item.name}
      </span>
    </motion.div>
  );
};

// Workflow Card Component
const WorkflowCard = ({ step, index }: { step: typeof workflowSteps[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Arrow connector (hidden on last item and mobile) */}
      {index < workflowSteps.length - 1 && (
        <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
          <ArrowRight className="w-5 h-5 text-primary/50" />
        </div>
      )}

      <div className="h-full p-6 md:p-8 bg-secondary/30 rounded-2xl border border-border/30 hover:border-primary/30 transition-all group-hover:bg-secondary/50">
        {/* Step Number */}
        <span className="font-heading text-5xl md:text-6xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
          {step.number}
        </span>

        {/* Title */}
        <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground mt-4 mb-3">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

// Achievement Card Component
const AchievementCard = ({ achievement, index }: { achievement: typeof achievements[0]; index: number }) => {
  const Icon = achievement.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 md:p-8 bg-secondary/30 rounded-2xl border border-border/30 hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <span className="font-heading text-2xl md:text-3xl font-bold text-primary">
            {achievement.stat}
          </span>
          <h3 className="font-heading text-lg md:text-xl font-medium text-foreground mt-1">
            {achievement.title}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2">
            {achievement.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const MyStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="text-sm text-primary uppercase tracking-wider mb-4">
                My Story
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] uppercase">
                The Journey So Far
              </h1>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
                A creative professional passionate about motion design, film editing, and bringing visual stories to life. Here's a look at my experience, toolkit, and how I work.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <p className="text-sm text-primary uppercase tracking-wider">
                  Experience
                </p>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">
                What I Did So Far
              </h2>
            </motion.div>

            <div className="max-w-3xl">
              {experiences.map((experience, index) => (
                <TimelineItem key={experience.id} experience={experience} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="section-padding bg-secondary/20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <p className="text-sm text-primary uppercase tracking-wider mb-4">
                My Tech Stack
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">
                Tools & Software
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {techStack.map((item, index) => (
                <TechStackItem key={item.name} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">
                How I Work
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {workflowSteps.map((step, index) => (
                <WorkflowCard key={step.number} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="section-padding bg-secondary/20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">
                Key Achievements
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} achievement={achievement} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default MyStory;
