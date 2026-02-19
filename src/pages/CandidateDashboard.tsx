import { motion } from "framer-motion";
import { Shield, CheckCircle2, Briefcase, Link as LinkIcon, Award, Star } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CandidateDashboard = () => {
  const { candidateProfile, candidateLoggedIn } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!candidateLoggedIn || !candidateProfile) navigate("/candidate/login");
  }, [candidateLoggedIn, candidateProfile, navigate]);

  if (!candidateProfile) return null;

  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-brand-md border border-border/50 p-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">{candidateProfile.id}</h1>
              <p className="text-sm text-muted-foreground">Anonymous Profile</p>
            </div>
            {candidateProfile.verified && (
              <div className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-badge text-primary-foreground text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Score: {candidateProfile.skillScore}%
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidateProfile.skills.map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Briefcase className="w-4 h-4" /> Experience
                </div>
                <div className="text-lg font-semibold">{candidateProfile.experience} years</div>
              </div>
              <div className="bg-accent/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Award className="w-4 h-4" /> Certifications
                </div>
                <div className="text-lg font-semibold">{candidateProfile.certifications || "None"}</div>
              </div>
            </div>

            {candidateProfile.portfolio && (
              <div className="flex items-center gap-2 text-sm">
                <LinkIcon className="w-4 h-4 text-muted-foreground" />
                <a href={candidateProfile.portfolio} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  {candidateProfile.portfolio}
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
