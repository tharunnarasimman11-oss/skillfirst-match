import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CandidateProfile {
  id: string;
  skills: string[];
  experience: number;
  portfolio: string;
  certifications: string;
  skillScore: number | null;
  verified: boolean;
}

export interface ShortlistedCandidate {
  id: string;
}

interface AppState {
  candidateLoggedIn: boolean;
  recruiterLoggedIn: boolean;
  candidateProfile: CandidateProfile | null;
  candidates: CandidateProfile[];
  shortlisted: string[];
  setCandidateLoggedIn: (v: boolean) => void;
  setRecruiterLoggedIn: (v: boolean) => void;
  setCandidateProfile: (p: CandidateProfile | null) => void;
  toggleShortlist: (id: string) => void;
}

const mockCandidates: CandidateProfile[] = [
  { id: "C-1023", skills: ["React", "TypeScript", "Node.js"], experience: 3, portfolio: "https://portfolio.dev", certifications: "AWS Certified", skillScore: 88, verified: true },
  { id: "C-1047", skills: ["Python", "Machine Learning", "SQL"], experience: 5, portfolio: "https://ml-portfolio.dev", certifications: "Google ML Certificate", skillScore: 92, verified: true },
  { id: "C-1058", skills: ["UI/UX Design", "Figma", "CSS"], experience: 2, portfolio: "https://design.dev", certifications: "Google UX Certificate", skillScore: 76, verified: true },
  { id: "C-1062", skills: ["Java", "Spring Boot", "Microservices"], experience: 7, portfolio: "https://java-dev.io", certifications: "Oracle Java SE", skillScore: 95, verified: true },
  { id: "C-1071", skills: ["DevOps", "Docker", "Kubernetes"], experience: 4, portfolio: "https://devops.dev", certifications: "CKA Certified", skillScore: 84, verified: true },
  { id: "C-1089", skills: ["React Native", "Flutter", "Firebase"], experience: 3, portfolio: "https://mobile.dev", certifications: "Meta Mobile Dev", skillScore: 79, verified: true },
];

const mockIdentities = [
  { name: "Aisha Sharma", photo: "👩‍💻" },
  { name: "Ravi Patel", photo: "👨‍💻" },
  { name: "Priya Nair", photo: "👩‍🎨" },
  { name: "Arjun Mehta", photo: "👨‍🔬" },
  { name: "Sneha Gupta", photo: "👩‍🔧" },
  { name: "Kiran Das", photo: "🧑‍💻" },
];

export { mockIdentities };

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [candidateLoggedIn, setCandidateLoggedIn] = useState(false);
  const [recruiterLoggedIn, setRecruiterLoggedIn] = useState(false);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  const candidates = candidateProfile
    ? [candidateProfile, ...mockCandidates.filter(c => c.id !== candidateProfile.id)]
    : mockCandidates;

  const toggleShortlist = (id: string) => {
    setShortlisted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <AppContext.Provider value={{
      candidateLoggedIn, recruiterLoggedIn, candidateProfile,
      candidates, shortlisted,
      setCandidateLoggedIn, setRecruiterLoggedIn, setCandidateProfile, toggleShortlist,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
