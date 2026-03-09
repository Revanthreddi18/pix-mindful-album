import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Account created! Check your email to verify.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270_95%_15%/0.95)] via-[hsl(290_80%_20%/0.92)] to-[hsl(320_85%_25%/0.95)]" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[15%] w-72 h-72 bg-primary/15 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-[15%] w-80 h-80 bg-accent/12 rounded-full blur-[120px] animate-float-slow" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold font-display text-gradient mb-2">SmartPix</h1>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Welcome back! Sign in to continue" : "Create your account to get started"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
              className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
            />
            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-base font-semibold gap-2 transition-all hover:scale-[1.02] hover:shadow-glow"
              style={{ background: "var(--gradient-primary)" }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Sign Up"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              disabled={loading}
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="font-semibold text-primary">{isLogin ? "Sign up" : "Sign in"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
