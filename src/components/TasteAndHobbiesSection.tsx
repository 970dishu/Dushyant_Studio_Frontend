import { motion } from "framer-motion";
import {
  Pencil,
  Camera,
  Clapperboard,
  Film,
  Sparkles,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import SplitText from "./SplitText";
import { hobbies, tasteCategories, type TasteCategory } from "@/data/tasteAndHobbies";

const hobbyIcons: Record<string, React.ReactNode> = {
  Drawing: <Pencil className="w-5 h-5" />,
  Photography: <Camera className="w-5 h-5" />,
  "Behind the Scenes": <Clapperboard className="w-5 h-5" />,
};

const tasteIcons: Record<TasteCategory["icon"], React.ReactNode> = {
  film: <Film className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
};

const HobbyTile = ({
  title,
  category,
  image,
  span,
  index,
}: {
  title: string;
  category: string;
  image?: string;
  span?: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
    className={`group relative overflow-hidden rounded-xl md:rounded-2xl bg-secondary border border-border/30 ${span ?? ""}`}
  >
    {image ? (
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary to-muted text-muted-foreground/60">
        {hobbyIcons[category]}
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
      <p className="text-foreground text-sm font-medium">{title}</p>
      <p className="text-muted-foreground text-xs uppercase tracking-wider">{category}</p>
    </div>
  </motion.div>
);

const TasteCard = ({
  title,
  subtitle,
  image,
  link,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
}) => {
  const content = (
    <div className="group flex-shrink-0 w-48 md:w-56">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary border border-border/30 mb-2">
        {image ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted text-muted-foreground/50">
            <Sparkles className="w-6 h-6" />
          </div>
        )}
        {link && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <LinkIcon className="w-3 h-3 text-foreground" />
          </div>
        )}
      </div>
      <p className="text-foreground text-sm font-medium leading-tight">{title}</p>
      {subtitle && <p className="text-muted-foreground text-xs mt-0.5">{subtitle}</p>}
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

const TasteMarqueeRow = ({
  items,
  reverse = false,
}: {
  items: (typeof tasteCategories)[number]["items"];
  reverse?: boolean;
}) => {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div
        className={`flex gap-4 md:gap-5 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, i) => (
          <TasteCard key={`${item.title}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
};

const TasteAndHobbiesSection = () => {
  return (
    <section id="taste-hobbies" className="section-padding relative overflow-hidden">
      <div className="container-wide">
        <SplitText
          as="h2"
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 uppercase tracking-tight"
          stagger={0.06}
        >
          My Taste & Hobbies
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12 md:mb-16 max-w-xl"
        >
          Beyond the timeline and edit bay — a look at what inspires me: sketching,
          shooting, and everything I love watching and following.
        </motion.p>

        {/* Hobbies bento grid */}
        <div className="mb-16 md:mb-24">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground uppercase tracking-tight mb-6 md:mb-8">
            Hobbies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[160px] gap-3 md:gap-4">
            {hobbies.map((hobby, index) => (
              <HobbyTile key={hobby.title} index={index} {...hobby} />
            ))}
          </div>
        </div>

        {/* My Taste */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground uppercase tracking-tight mb-8 md:mb-10">
            My Taste
          </h3>
          <div className="flex flex-col gap-10 md:gap-12">
            {tasteCategories.map((category, index) => (
              <div key={category.name}>
                <div className="flex items-center gap-2 text-primary mb-4 md:mb-5 px-6 md:px-0">
                  {tasteIcons[category.icon]}
                  <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
                    {category.name}
                  </span>
                </div>
                <TasteMarqueeRow items={category.items} reverse={index % 2 === 1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TasteAndHobbiesSection;
