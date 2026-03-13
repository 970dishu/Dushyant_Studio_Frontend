import { Sparkles, Paintbrush, MousePointer2, PenTool } from "lucide-react";
import adobeLogo from "/assets/adobe-logo.png";

const tools = [
  "After Effects",
  "Illustrator", 
  "Premiere Pro",
  "Photoshop",
  "Lightroom",
  "Adobe Animate",
  "Character Animator",
  "Blender",
  "AutoCAD",
  "Fusion 360",
  "Tinkercad",
  "Framer",
  "Figma",
  "DaVinci Resolve",
];

// Icon components for variety
const icons = [
  // Adobe Logo
  () => (
    <img src={adobeLogo} alt="Adobe" className="w-7 h-7 md:w-8 md:h-8 object-contain invert opacity-60" />
  ),
  // Brush
  () => <Paintbrush className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />,
  // Cursor
  () => <MousePointer2 className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />,
  // Pen Tool
  () => <PenTool className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />,
  // Sparkle
  () => <Sparkles className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />,
];

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
  // Create items with icon after each tool
  const createMarqueeItems = () => {
    const items: JSX.Element[] = [];
    
    tools.forEach((tool, index) => {
      // Add tool name
      items.push(
        <span
          key={`tool-${index}`}
          className="flex-shrink-0 px-4 md:px-6 text-xl md:text-3xl font-medium text-muted-foreground/60 hover:text-primary transition-colors duration-300 cursor-default whitespace-nowrap"
        >
          {tool}
        </span>
      );
      
      // Add icon after each tool
      const IconComponent = icons[index % icons.length];
      items.push(
        <span
          key={`icon-${index}`}
          className="flex-shrink-0 px-3 md:px-4 flex items-center justify-center text-muted-foreground/30"
        >
          <IconComponent />
        </span>
      );
    });
    
    return items;
  };

  const marqueeItems = createMarqueeItems();
  // Double for seamless loop
  const duplicatedItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="flex overflow-hidden">
      <div 
        className={`flex items-center ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {duplicatedItems}
      </div>
    </div>
  );
};

const ToolsMarquee = () => {
  return (
    <section className="py-12 md:py-20 overflow-hidden border-y border-border/30">
      {/* Marquee Container */}
      <div className="relative space-y-4 md:space-y-6">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Row 1 - scrolls left */}
        <MarqueeRow />
        
        {/* Row 2 - scrolls right */}
        <MarqueeRow reverse />
      </div>
    </section>
  );
};

export default ToolsMarquee;
