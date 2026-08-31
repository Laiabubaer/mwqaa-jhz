import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaUserLock } from "react-icons/fa6";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  username: z.string().min(1, "Email or Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Submit:", data);
    // Real implementation would send data to API
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col md:items-center">
      <div className="w-full max-w-[480px] px-4 py-5 md:py-10 flex flex-col mx-auto flex-1">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            {/* Stake Logo visually approximated with stylized SVG text */}
            <svg viewBox="0 0 100 32" className="h-8 w-28 text-white" fill="currentColor">
              <text 
                x="0" 
                y="24" 
                fontFamily="system-ui, -apple-system, sans-serif" 
                fontSize="26" 
                fontWeight="800" 
                fontStyle="italic" 
                letterSpacing="-1"
              >
                Stake
              </text>
            </svg>
          </div>
          <button
            type="button"
            className="text-muted hover:text-white transition-colors p-1 -mr-1 rounded"
            data-testid="button-close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="username">
                    Email or Username <span className="text-destructive">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      id="username"
                      {...field}
                      data-testid="input-username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                        {...field}
                        data-testid="input-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                        data-testid="button-toggle-password"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-1">
              <a 
                href="#" 
                className="text-sm font-semibold text-white hover:underline block" 
                data-testid="link-forgot-password"
                onClick={(e) => e.preventDefault()}
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              data-testid="button-sign-in"
            >
              Sign In
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="px-4 text-[13px] font-semibold text-muted tracking-wider">OR</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Alternative Sign-ins */}
        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2.5"
            data-testid="button-passkey"
          >
            <FaUserLock className="w-4 h-4 text-white" />
            Sign In with passkey
          </Button>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2.5"
            data-testid="button-google"
          >
            <FcGoogle className="w-5 h-5" />
            Sign In with Google
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            data-testid="button-another-way"
          >
            Sign In another way
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-[15px] text-muted">
          Don't have an account?{" "}
          <Link 
            href="#" 
            className="font-semibold text-white hover:underline transition-colors" 
            data-testid="link-register"
          >
            Register an Account
          </Link>
        </div>

      </div>
    </div>
  );
}
