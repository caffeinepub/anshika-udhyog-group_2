import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { generateId, hashPassword } from "../utils/auth";

export default function Signup() {
  const { actor } = useActor();
  const { settings } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    aadhaar: "",
    pan: "",
    fatherName: "",
    dob: "",
    gender: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    nomineeName: "",
    nomineeRelation: "",
  });

  function set(key: keyof typeof form, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!actor) {
      toast.error("System not ready. Please try again.");
      return;
    }
    setLoading(true);
    try {
      // Check if email already exists
      const existing = await actor.getUserByEmail(form.email);
      if (existing) {
        toast.error("Email already registered. Please login.");
        setLoading(false);
        return;
      }
      await actor.createUser({
        id: generateId(),
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        passwordHash: hashPassword(form.password),
        role: form.role,
        status: "pending",
        aadhaar: form.aadhaar,
        pan: form.pan.toUpperCase(),
        fatherName: form.fatherName,
        dob: form.dob,
        gender: form.gender,
        address: form.address,
        district: form.district,
        state: form.state,
        pincode: form.pincode,
        nomineeName: form.nomineeName,
        nomineeRelation: form.nomineeRelation,
        designation: "",
        isVerified: false,
        createdAt: BigInt(Date.now()),
      });
      toast.success("Registration successful! Awaiting admin approval.");
      navigate("/login");
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full mt-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent";

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6">
          <img
            src={
              settings.logoUrl ||
              "/assets/generated/anshika-logo.dim_200x200.png"
            }
            alt="Logo"
            className="w-16 h-16 rounded-full mx-auto mb-3 shadow"
          />
          <h1 className="font-display font-bold text-2xl text-green-900">
            {settings.orgName}
          </h1>
          <p className="text-sm text-muted-foreground">Create your account</p>
        </div>

        {/* Step indicators */}
        <div className="flex gap-2 mb-6">
          {["Basic Info", "Personal Details", "KYC Details"].map(
            (label, idx) => (
              <div
                key={label}
                className={`flex-1 text-center py-1.5 rounded text-xs font-medium ${step === idx + 1 ? "bg-green-700 text-white" : step > idx + 1 ? "bg-green-200 text-green-800" : "bg-gray-100 text-gray-500"}`}
              >
                {label}
              </div>
            ),
          )}
        </div>

        <Card className="shadow-card-hover">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} data-ocid="signup.modal">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="preexist_signup_1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="preexist_signup_1"
                      className={inputCls}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      required
                      data-ocid="signup.name.input"
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="preexist_signup_2"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="preexist_signup_2"
                      type="tel"
                      className={inputCls}
                      value={form.mobile}
                      onChange={(e) => set("mobile", e.target.value)}
                      required
                      maxLength={10}
                      data-ocid="signup.mobile.input"
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="preexist_signup_3"
                    >
                      Email Address *
                    </label>
                    <input
                      id="preexist_signup_3"
                      type="email"
                      className={inputCls}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      required
                      data-ocid="signup.email.input"
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="preexist_signup_4"
                    >
                      Password *
                    </label>
                    <input
                      id="preexist_signup_4"
                      type="password"
                      className={inputCls}
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      required
                      minLength={6}
                      data-ocid="signup.password.input"
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="preexist_signup_5"
                    >
                      Confirm Password *
                    </label>
                    <input
                      id="preexist_signup_5"
                      type="password"
                      className={inputCls}
                      value={form.confirmPassword}
                      onChange={(e) => set("confirmPassword", e.target.value)}
                      required
                      data-ocid="signup.confirmpassword.input"
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="preexist_signup_6"
                    >
                      Role *
                    </label>
                    <select
                      id="preexist_signup_6"
                      className={inputCls}
                      value={form.role}
                      onChange={(e) => set("role", e.target.value)}
                      data-ocid="signup.role.select"
                    >
                      <option value="user">Member / User</option>
                      <option value="center">Center Manager</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="transport">Transport</option>
                      <option value="hr">HR</option>
                    </select>
                  </div>
                  <Button
                    type="button"
                    className="w-full bg-green-700 hover:bg-green-800"
                    onClick={() => {
                      if (
                        !form.name ||
                        !form.email ||
                        !form.password ||
                        !form.mobile
                      ) {
                        toast.error("Please fill all required fields");
                        return;
                      }
                      setStep(2);
                    }}
                  >
                    Next: Personal Details
                  </Button>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_7"
                      >
                        Father's Name
                      </label>
                      <input
                        id="preexist_signup_7"
                        className={inputCls}
                        value={form.fatherName}
                        onChange={(e) => set("fatherName", e.target.value)}
                        data-ocid="signup.fathername.input"
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_8"
                      >
                        Date of Birth
                      </label>
                      <input
                        id="preexist_signup_8"
                        type="date"
                        className={inputCls}
                        value={form.dob}
                        onChange={(e) => set("dob", e.target.value)}
                        data-ocid="signup.dob.input"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="preexist_signup_9"
                    >
                      Gender
                    </label>
                    <select
                      id="preexist_signup_9"
                      className={inputCls}
                      value={form.gender}
                      onChange={(e) => set("gender", e.target.value)}
                      data-ocid="signup.gender.select"
                    >
                      <option value="">Select Gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="preexist_signup_10"
                    >
                      Address
                    </label>
                    <textarea
                      id="preexist_signup_10"
                      className={inputCls}
                      rows={2}
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      data-ocid="signup.address.textarea"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_11"
                      >
                        District
                      </label>
                      <input
                        id="preexist_signup_11"
                        className={inputCls}
                        value={form.district}
                        onChange={(e) => set("district", e.target.value)}
                        data-ocid="signup.district.input"
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_12"
                      >
                        State
                      </label>
                      <input
                        id="preexist_signup_12"
                        className={inputCls}
                        value={form.state}
                        onChange={(e) => set("state", e.target.value)}
                        data-ocid="signup.state.input"
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_13"
                      >
                        Pincode
                      </label>
                      <input
                        id="preexist_signup_13"
                        className={inputCls}
                        value={form.pincode}
                        onChange={(e) => set("pincode", e.target.value)}
                        maxLength={6}
                        data-ocid="signup.pincode.input"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 bg-green-700 hover:bg-green-800"
                      onClick={() => setStep(3)}
                    >
                      Next: KYC Details
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: KYC Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_14"
                      >
                        Aadhaar Number
                      </label>
                      <input
                        id="preexist_signup_14"
                        className={inputCls}
                        maxLength={12}
                        value={form.aadhaar}
                        onChange={(e) =>
                          set("aadhaar", e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="12-digit Aadhaar"
                        data-ocid="signup.aadhaar.input"
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_15"
                      >
                        PAN Number
                      </label>
                      <input
                        id="preexist_signup_15"
                        className={inputCls}
                        maxLength={10}
                        value={form.pan}
                        onChange={(e) =>
                          set("pan", e.target.value.toUpperCase())
                        }
                        placeholder="ABCDE1234F"
                        data-ocid="signup.pan.input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_16"
                      >
                        Nominee Name
                      </label>
                      <input
                        id="preexist_signup_16"
                        className={inputCls}
                        value={form.nomineeName}
                        onChange={(e) => set("nomineeName", e.target.value)}
                        data-ocid="signup.nomineename.input"
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="preexist_signup_17"
                      >
                        Nominee Relation
                      </label>
                      <input
                        id="preexist_signup_17"
                        className={inputCls}
                        value={form.nomineeRelation}
                        onChange={(e) => set("nomineeRelation", e.target.value)}
                        placeholder="Spouse, Child, etc."
                        data-ocid="signup.nomineerelation.input"
                      />
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-800">
                    <strong>Note:</strong> Your account will be in{" "}
                    <em>Pending</em> status until reviewed and approved by our
                    admin team. You will be notified once approved.
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-green-700 hover:bg-green-800"
                      data-ocid="signup.submit_button"
                    >
                      {loading ? "Registering..." : "Complete Registration"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-medium hover:underline"
            data-ocid="signup.login.link"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}

import type React from "react";
