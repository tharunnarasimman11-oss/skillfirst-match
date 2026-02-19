import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const questions = [
  {
    q: "Which data structure uses LIFO (Last In, First Out)?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    answer: 1,
  },
  {
    q: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    answer: 1,
  },
  {
    q: "Which HTTP method is used to update a resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: 2,
  },
  {
    q: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: 2,
  },
  {
    q: "Which of the following is NOT a JavaScript framework?",
    options: ["Angular", "React", "Laravel", "Vue"],
    answer: 2,
  },
];

const CandidateAssessment = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const { candidateProfile, setCandidateProfile } = useApp();
  const navigate = useNavigate();

  const selectAnswer = (idx: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correct = answers.filter((a, i) => a === questions[i].answer).length;
    const score = Math.round((correct / questions.length) * 100);
    setSubmitted(true);

    if (candidateProfile) {
      setCandidateProfile({ ...candidateProfile, skillScore: score, verified: true });
    }
  };

  const score = submitted
    ? Math.round((answers.filter((a, i) => a === questions[i].answer).length / questions.length) * 100)
    : 0;

  if (submitted) {
    return (
      <div className="min-h-screen gradient-surface pt-24 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl shadow-brand-lg border border-border/50 p-10 max-w-md mx-4 text-center"
        >
          <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Award className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Skill Verified!</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-badge text-primary-foreground text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Skill Verified Badge – Score: {score}%
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Your anonymous profile is now verified. Recruiters can see your skills and score without any identity information.
          </p>
          <Button
            onClick={() => navigate("/candidate/dashboard")}
            className="gradient-primary text-primary-foreground border-0 shadow-brand-sm"
          >
            View My Profile <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-brand-md border border-border/50 p-8"
        >
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold">Skill Assessment</h1>
            <p className="text-sm text-muted-foreground mt-1">Answer 5 questions to earn your verified badge</p>
          </div>

          {/* Progress */}
          <div className="flex gap-1.5 mb-8">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i === current ? "gradient-primary" : answers[i] !== null ? "bg-primary/30" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-muted-foreground mb-2">Question {current + 1} of {questions.length}</p>
              <h2 className="text-lg font-semibold mb-6">{questions[current].q}</h2>

              <div className="space-y-3">
                {questions[current].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectAnswer(idx)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all duration-200 ${
                      answers[current] === idx
                        ? "border-primary bg-accent text-accent-foreground shadow-brand-sm"
                        : "border-border hover:border-primary/30 hover:bg-accent/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}
            >
              Previous
            </Button>

            {current < questions.length - 1 ? (
              <Button
                onClick={() => setCurrent(current + 1)}
                disabled={answers[current] === null}
                className="gradient-primary text-primary-foreground border-0"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={answers.some(a => a === null)}
                className="gradient-primary text-primary-foreground border-0"
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateAssessment;
