import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";

const RecruiterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRecruiterLoggedIn } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecruiterLoggedIn(true);
    navigate("/recruiter/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-surface pt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-card rounded-2xl shadow-brand-md border border-border/50 p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold">Recruiter Portal</h1>
            <p className="text-sm text-muted-foreground mt-1">Access anonymous candidate profiles</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="r-email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="r-email" type="email" placeholder="recruiter@company.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div>
              <Label htmlFor="r-pass">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="r-pass" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 shadow-brand-sm hover:shadow-brand-md transition-all">
              Sign In
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">Demo mode — any credentials will work</p>
        </div>
      </motion.div>
    </div>
  );
};

export default RecruiterLogin;
