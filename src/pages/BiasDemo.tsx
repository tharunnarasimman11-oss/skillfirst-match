import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Shield, CheckCircle2, Briefcase, TrendingUp, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useApp, mockIdentities } from "@/context/AppContext";

const BiasDemo = () => {
  const [identityMode, setIdentityMode] = useState(false);
  const { candidates } = useApp();
  const displayCandidates = candidates.slice(0, 6);

  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl font-bold mb-2">Bias Comparison Demo</h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              Toggle between anonymous and identity modes to see how bias affects hiring decisions.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-card rounded-xl border border-border/50 shadow-brand-sm max-w-md mx-auto">
            <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${!identityMode ? "text-primary" : "text-muted-foreground"}`}>
              <EyeOff className="w-4 h-4" /> Anonymous
            </div>
            <Switch checked={identityMode} onCheckedChange={setIdentityMode} />
            <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${identityMode ? "text-primary" : "text-muted-foreground"}`}>
              <Eye className="w-4 h-4" /> Identity
            </div>
          </div>

          {/* Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={identityMode ? "identity" : "anon"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-center p-4 rounded-xl mb-8 text-sm font-medium ${
                identityMode
                  ? "bg-destructive/10 text-destructive border border-destructive/20"
                  : "bg-accent text-accent-foreground border border-primary/10"
              }`}
            >
              {identityMode ? (
                <span className="flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Identity-based bias can reduce fair shortlisting by up to 40%
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Shortlisting increased by 40% in anonymous mode
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayCandidates.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border/50 p-5 shadow-brand-sm hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AnimatePresence mode="wait">
                    {identityMode ? (
                      <motion.div
                        key="identity"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl"
                      >
                        {mockIdentities[i]?.photo}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="anon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-10 h-10 rounded-xl gradient-card border border-border/50 flex items-center justify-center"
                      >
                        <Shield className="w-5 h-5 text-primary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div>
                    <h3 className="font-display font-semibold text-sm">
                      {identityMode ? mockIdentities[i]?.name : c.id}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Briefcase className="w-3 h-3" /> {c.experience} yrs
                    </div>
                  </div>
                  {c.verified && (
                    <div className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full gradient-badge text-primary-foreground text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> {c.skillScore}%
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {c.skills.map(s => (
                    <span key={s} className="skill-tag text-xs py-0.5">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BiasDemo;
