import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Plus, Briefcase, Link as LinkIcon, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";

const AVAILABLE_SKILLS = [
  "React", "TypeScript", "JavaScript", "Python", "Java", "Node.js",
  "SQL", "Machine Learning", "UI/UX Design", "Figma", "CSS",
  "DevOps", "Docker", "Kubernetes", "Flutter", "React Native",
  "Go", "Rust", "AWS", "Firebase", "MongoDB", "GraphQL",
];

const CandidateProfile = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [certifications, setCertifications] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const { setCandidateProfile } = useApp();
  const navigate = useNavigate();

  const filteredSkills = AVAILABLE_SKILLS.filter(
    s => s.toLowerCase().includes(skillInput.toLowerCase()) && !skills.includes(s)
  );

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) setSkills([...skills, skill]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => setSkills(skills.filter(s => s !== skill));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `C-${1000 + Math.floor(Math.random() * 9000)}`;
    setCandidateProfile({
      id,
      skills,
      experience: parseInt(experience) || 0,
      portfolio,
      certifications,
      skillScore: null,
      verified: false,
    });
    navigate("/candidate/assessment");
  };

  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-brand-md border border-border/50 p-8"
        >
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold">Create Anonymous Profile</h1>
            <p className="text-sm text-muted-foreground mt-1">
              No name, gender, or photo required. Let your skills speak.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skills */}
            <div>
              <Label>Skills *</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {skills.map(s => (
                  <span key={s} className="skill-tag gap-1.5">
                    {s}
                    <button type="button" onClick={() => removeSkill(s)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search and add skills..."
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  className="pl-10"
                />
              </div>
              {skillInput && filteredSkills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {filteredSkills.slice(0, 8).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addSkill(s)}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Experience */}
            <div>
              <Label htmlFor="exp">Years of Experience *</Label>
              <div className="relative mt-1.5">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="exp"
                  type="number"
                  min="0"
                  max="50"
                  placeholder="e.g. 3"
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <Label htmlFor="portfolio">Portfolio Link</Label>
              <div className="relative mt-1.5">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={portfolio}
                  onChange={e => setPortfolio(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Certifications */}
            <div>
              <Label htmlFor="certs">Certifications</Label>
              <div className="relative mt-1.5">
                <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="certs"
                  placeholder="e.g. AWS Certified, Google UX"
                  value={certifications}
                  onChange={e => setCertifications(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={skills.length === 0}
              className="w-full gradient-primary text-primary-foreground border-0 shadow-brand-sm hover:shadow-brand-md transition-all"
            >
              Continue to Skill Assessment
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateProfile;
