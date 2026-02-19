import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Award, Users, BarChart3, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const Landing = () => {
  const features = [
    { icon: EyeOff, title: "Anonymous Profiles", desc: "No names, photos, or gender fields. Just skills and experience." },
    { icon: Award, title: "Skill Verification", desc: "Quick assessments generate verified skill badges with scores." },
    { icon: Users, title: "Fair Recruitment", desc: "Recruiters evaluate candidates purely on merit and skill." },
    { icon: BarChart3, title: "Bias Analytics", desc: "See how anonymous mode increases fair shortlisting by 40%." },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.07]" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="container mx-auto px-4 pt-20 pb-12 text-center relative z-10">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            SDG 5 – Gender Equality
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
            Reducing Hiring Bias Through{" "}
            <span className="text-gradient">Anonymous Skill-First</span>{" "}
            Matching
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            SkillShield creates a level playing field for transgender and gender-diverse candidates in urban India by focusing on what truly matters — skills.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground border-0 shadow-brand-md hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-0.5 text-base px-8">
              <Link to="/candidate/login">
                I'm a Candidate <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-accent text-base px-8">
              <Link to="/recruiter/login">
                I'm a Recruiter
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 gradient-surface">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp()} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How SkillShield Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A fair, transparent process that puts skills first and identity last.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-brand-sm hover-lift border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-card rounded-2xl p-10 shadow-brand-md border border-border/50"
          >
            <div className="w-16 h-16 rounded-2xl gradient-badge flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">The Impact</h2>
            <p className="text-muted-foreground mb-6">
              In India, transgender individuals face up to 96% unemployment. SkillShield addresses this by removing identity-based barriers in the earliest stage of hiring.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gradient">40%</div>
                <div className="text-sm text-muted-foreground mt-1">More fair shortlisting</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">0</div>
                <div className="text-sm text-muted-foreground mt-1">Identity fields exposed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Skill-based evaluation</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-primary" />
            <span>Built with purpose for SDG 5 – Gender Equality</span>
          </div>
          <p>SkillShield © 2025 — Hackathon Prototype</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
