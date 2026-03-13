import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { getProjectBySlug, getOtherProjects } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug || "");
  const otherProjects = getOtherProjects(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-foreground mb-4">Project Not Found</h1>
          <Link to="/#work" className="text-primary hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link 
              to="/#work" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Project Header */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div {...fadeInUp}>
              <span className="text-primary text-sm uppercase tracking-wider mb-4 block">
                {project.category}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">
                {project.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.overview}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">Client</span>
                  <p className="text-foreground font-medium mt-1">{project.client}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">Year</span>
                  <p className="text-foreground font-medium mt-1">{project.year}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">Role</span>
                  <p className="text-foreground font-medium mt-1">{project.role}</p>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground text-sm uppercase tracking-wider">Tools</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Image/Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-secondary"
          >
            {project.heroVideo ? (
              <video 
                src={project.heroVideo} 
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-6">
                The Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-6">
                The Solution
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-8">
              Challenges Faced
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-secondary rounded-xl"
                >
                  <span className="text-primary font-heading text-2xl font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-foreground">{challenge}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-8">
              Results & Impact
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-background rounded-xl border border-border text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">{result}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-8">
                Project Gallery
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="aspect-video rounded-xl overflow-hidden bg-secondary"
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* More Projects Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground">
                More Projects
              </h2>
              <Link 
                to="/#work"
                className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
              >
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {otherProjects.slice(0, 3).map((otherProject) => (
                <div
                  key={otherProject.id}
                  onClick={() => navigate(`/project/${otherProject.slug}`)}
                  className="group block bg-background rounded-2xl overflow-hidden border border-border cursor-pointer hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="aspect-video overflow-hidden bg-muted relative">
                    <img
                      src={otherProject.image}
                      alt={otherProject.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-primary uppercase tracking-wider">
                      {otherProject.category}
                    </span>
                    <h3 className="font-heading text-xl font-medium text-foreground mt-2 group-hover:text-primary transition-colors">
                      {otherProject.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
