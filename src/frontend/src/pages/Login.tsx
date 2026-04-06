import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { getRoleRedirect } from "../utils/auth";

export default function Login() {
  const { login, settings } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success && result.role) {
      toast.success("Login successful!");
      navigate(getRoleRedirect(result.role));
    } else {
      toast.error(result.error || "Login failed");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src={
              settings.logoUrl ||
              "/assets/generated/anshika-logo.dim_200x200.png"
            }
            alt="Logo"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 shadow-md"
          />
          <h1 className="font-display font-bold text-2xl text-green-900">
            {settings.orgName}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to your account
          </p>
        </div>
        <Card className="shadow-card-hover">
          <CardContent className="p-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="login.modal"
            >
              <div>
                <label className="text-sm font-medium" htmlFor="login_f1">
                  Email Address
                </label>
                <input
                  id="login_f1"
                  type="email"
                  className="w-full mt-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  data-ocid="login.email.input"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Password</p>
                <div className="relative mt-1">
                  <input
                    type={showPass ? "text" : "password"}
                    className="w-full border rounded px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-green-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    data-ocid="login.password.input"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800"
                data-ocid="login.submit_button"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-500">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-green-700 font-medium hover:underline"
                data-ocid="login.signup.link"
              >
                Sign Up
              </Link>
            </div>
            <div className="mt-2 text-center">
              <Link
                to="/role-login"
                className="text-xs text-gray-400 hover:text-green-600"
              >
                Role-based Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

import type React from "react";
