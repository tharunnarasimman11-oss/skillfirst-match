import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, CheckCircle2, Shield, Award } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const policies = [
  { id: "anti-discrimination", label: "Anti-discrimination policy in place?" },
  { id: "gender-neutral", label: "Gender-neutral workplace policy?" },
  { id: "equal-pay", label: "Equal pay policy?" },
];

const EmployerBadge = () => {
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  const yesCount = Object.values(checks).filter(Boolean).length;
  const qualified = yesCount >= 2;

  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold">Employer Inclusion Badge</h1>
            <p className="text-sm text-muted-foreground mt-1">Complete the checklist to earn your inclusive employer badge</p>
          </div>

          <div className="bg-card rounded-2xl shadow-brand-md border border-border/50 p-8">
            <h2 className="font-display text-lg font-semibold mb-6">Inclusion Checklist</h2>

            <div className="space-y-4">
              {policies.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border/30">
                  <span className="text-sm font-medium pr-4">{p.label}</span>
                  <Switch
                    checked={checks[p.id] || false}
                    onCheckedChange={v => setChecks({ ...checks, [p.id]: v })}
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              {yesCount} of 3 policies confirmed
            </div>

            <AnimatePresence>
              {qualified && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-6 p-6 rounded-xl gradient-success text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">
                    Verified Inclusive Employer 🌈
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Your company meets the inclusion criteria for SkillShield
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerBadge;
