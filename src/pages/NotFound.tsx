import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Calculator,
  Gamepad2,
  ArrowRight,
  Send,
} from "lucide-react";

const questions = [
  {
    q: "What is 12 × 8?",
    options: ["96", "88", "108"],
    answer: "96",
  },
  {
    q: "Which device stores data permanently?",
    options: ["RAM", "SSD", "Cache"],
    answer: "SSD",
  },
];

const NotFound = () => {
  const location = useLocation();

  const [step, setStep] = useState<"menu" | "quiz" | "survey">("menu");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const [lead, setLead] = useState({
    name: "",
    email: "",
    interest: "",
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleAnswer = (option: string) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("survey");
    }
  };

  const submitLead = () => {
    if (!lead.name || !lead.email) return;

    // 🔥 You can later send this to Supabase / CRM / Google Sheet
    console.log("Lead Captured:", lead, "Score:", score);

    setStep("menu");
    setCurrentQ(0);
    setScore(0);
    setLead({ name: "", email: "", interest: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-zinc-900 rounded-3xl p-8 shadow-2xl text-center"
      >
        {/* HEADER */}
        <h1 className="text-6xl font-extrabold mb-2">404</h1>
        <p className="text-gray-400 mb-6">
          The page <span className="text-blue-400">{location.pathname}</span>{" "}
          doesn’t exist — but let’s have some fun 😄
        </p>

        {/* MENU */}
        {step === "menu" && (
          <div className="space-y-4">
            <button
              onClick={() => setStep("quiz")}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition"
            >
              <Brain /> Play Knowledge & Math Game
            </button>

            <button
              onClick={() => alert("Mario game coming soon 🎮")}
              className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl transition"
            >
              <Gamepad2 /> Play Mini Game (Coming Soon)
            </button>

            <Link
              to="/"
              className="block text-sm text-gray-400 hover:text-white mt-6"
            >
              ← Go back to Home
            </Link>
          </div>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Calculator /> Challenge
            </h2>

            <p className="mb-6 text-lg">{questions[currentQ].q}</p>

            <div className="space-y-3">
              {questions[currentQ].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SURVEY */}
        {step === "survey" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Nice! 🎉</h2>
            <p className="text-gray-400 mb-4">
              Your score: <span className="text-green-400">{score}</span>
            </p>

            <p className="mb-4 text-sm">
              Want exclusive offers & IT tips? Drop your details 👇
            </p>

            <div className="space-y-3">
              <input
                placeholder="Your Name"
                value={lead.name}
                onChange={(e) =>
                  setLead({ ...lead, name: e.target.value })
                }
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              />

              <input
                placeholder="Email Address"
                value={lead.email}
                onChange={(e) =>
                  setLead({ ...lead, email: e.target.value })
                }
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              />

              <input
                placeholder="What are you interested in?"
                value={lead.interest}
                onChange={(e) =>
                  setLead({ ...lead, interest: e.target.value })
                }
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              />

              <button
                onClick={submitLead}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-2 rounded-lg transition"
              >
                <Send /> Submit
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NotFound;
