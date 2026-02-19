import { motion } from "framer-motion";
import { Shield, CheckCircle2, Briefcase, Star, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const RecruiterDashboard = () => {
  const { candidates, shortlisted, toggleShortlist } = useApp();

  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold">Recruiter Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Review anonymous candidates by skill</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium">
              <Users className="w-4 h-4" />
              Shortlisted: {shortlisted.length}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {candidates.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-card rounded-xl border p-6 transition-all duration-300 hover-lift ${
                  shortlisted.includes(c.id) ? "border-primary shadow-brand-md" : "border-border/50 shadow-brand-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-card border border-border/50 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">{c.id}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Briefcase className="w-3 h-3" />
                        {c.experience} yrs exp
                      </div>
                    </div>
                  </div>

                  {c.verified && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full gradient-badge text-primary-foreground text-xs font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      {c.skillScore}%
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {c.skills.map(s => (
                    <span key={s} className="skill-tag text-xs">{s}</span>
                  ))}
                </div>

                <Button
                  variant={shortlisted.includes(c.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleShortlist(c.id)}
                  className={shortlisted.includes(c.id) ? "gradient-primary text-primary-foreground border-0 w-full" : "w-full"}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {shortlisted.includes(c.id) ? "Shortlisted ✓" : "Shortlist"}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
