import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { generateId } from "../utils/auth";

const DEFAULT_FRANCHISE = {
  hero: {
    title: "Start Your Franchise",
    subtitle: "Anshika Udhyog Centre — Build Your Business Empire",
  },
  programs: [
    "Agarbatti Unit",
    "Candle Making Unit",
    "Soap Making Unit",
    "Pickle Unit",
    "Papad Unit",
  ],
  plans: [
    {
      name: "Starter",
      investment: "₹1.5 Lakh",
      area: "100 sq ft",
      machines: "2-3",
      support: "Basic",
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Standard",
      investment: "₹4 Lakh",
      area: "250 sq ft",
      machines: "5-7",
      support: "Full",
      color: "bg-green-50 border-green-200",
      popular: true,
    },
    {
      name: "Premium",
      investment: "₹10 Lakh",
      area: "500 sq ft",
      machines: "10+",
      support: "Premium+",
      color: "bg-purple-50 border-purple-200",
    },
  ],
  charges: {
    franchiseFee: "₹50,000",
    royalty: "5% of monthly revenue",
    security: "₹25,000 (refundable)",
  },
};

export default function Franchise() {
  const { contentMap } = useAppContext();
  const { actor } = useActor();
  const franchiseData = (contentMap.franchise_page ||
    DEFAULT_FRANCHISE) as typeof DEFAULT_FRANCHISE;
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    fatherName: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    aadhaar: "",
    pan: "",
    bankAccount: "",
    ifsc: "",
    category: "",
    plan: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitApplication({
        id: generateId(),
        applicationType: "franchise",
        applicantName: form.name,
        applicantEmail: form.email,
        applicantPhone: form.phone,
        data: JSON.stringify(form),
        status: "pending",
        adminRemark: "",
        createdAt: BigInt(Date.now()),
      });
      setSubmitted(true);
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fd = franchiseData;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl text-white p-8 mb-10 text-center">
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-3">
          {fd.hero?.title || DEFAULT_FRANCHISE.hero.title}
        </h1>
        <p className="text-green-100 text-lg mb-6">
          {fd.hero?.subtitle || DEFAULT_FRANCHISE.hero.subtitle}
        </p>
        <Button
          className="bg-white text-green-800 hover:bg-green-50 font-bold"
          onClick={() => setShowForm(true)}
          data-ocid="franchise.primary_button"
        >
          Apply for Franchise
        </Button>
      </div>

      {/* Plans */}
      <div className="text-center mb-6">
        <h2 className="font-display font-bold text-2xl text-green-900">
          Franchise Plans
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {(fd.plans || DEFAULT_FRANCHISE.plans).map((plan, idx) => (
          <Card
            key={idx}
            className={`relative border-2 ${plan.color || "bg-white border-gray-200"}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-green-600">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-center">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-center text-green-800">
                {plan.investment}
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Area Required</span>
                <span className="font-semibold">{plan.area}</span>
              </div>
              <div className="flex justify-between">
                <span>Machines</span>
                <span className="font-semibold">{plan.machines}</span>
              </div>
              <div className="flex justify-between">
                <span>Support Level</span>
                <span className="font-semibold">{plan.support}</span>
              </div>
              <Button
                className="w-full bg-green-700 hover:bg-green-800 mt-3"
                onClick={() => {
                  setForm((p) => ({ ...p, plan: plan.name }));
                  setShowForm(true);
                }}
              >
                Choose {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charges */}
      <Card className="mb-10 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">
            💰 Franchise Charges
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-semibold">Franchise Fee:</span>{" "}
            {fd.charges?.franchiseFee || DEFAULT_FRANCHISE.charges.franchiseFee}
          </div>
          <div>
            <span className="font-semibold">Royalty:</span>{" "}
            {fd.charges?.royalty || DEFAULT_FRANCHISE.charges.royalty}
          </div>
          <div>
            <span className="font-semibold">Security Deposit:</span>{" "}
            {fd.charges?.security || DEFAULT_FRANCHISE.charges.security}
          </div>
        </CardContent>
      </Card>

      {/* Apply Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {submitted ? (
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-xl text-green-800 mb-2">
                  Application Submitted!
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Your franchise application has been received.
                </p>
                <p className="text-xs text-gray-500 mb-4 bg-yellow-50 p-3 rounded">
                  Please pay the Franchise Fee (
                  {fd.charges?.franchiseFee ||
                    DEFAULT_FRANCHISE.charges.franchiseFee}
                  ) after which Admin will process your application. Expected
                  processing time: 7-30 working days.
                </p>
                <Button
                  onClick={() => {
                    setShowForm(false);
                    setSubmitted(false);
                  }}
                  className="bg-green-700 hover:bg-green-800"
                >
                  Close
                </Button>
              </CardContent>
            ) : (
              <>
                <CardHeader>
                  <CardTitle>Franchise Application Form</CardTitle>
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          ["name", "Full Name"],
                          ["phone", "Mobile"],
                          ["email", "Email"],
                          ["fatherName", "Father's Name"],
                          ["dob", "Date of Birth"],
                          ["aadhaar", "Aadhaar Number"],
                          ["pan", "PAN Number"],
                          ["district", "District"],
                          ["state", "State"],
                          ["pincode", "Pincode"],
                        ] as [keyof typeof form, string][]
                      ).map(([key, label]) => (
                        <div
                          key={key}
                          className={
                            key === "name" || key === "email"
                              ? "col-span-2"
                              : ""
                          }
                        >
                          <label className="text-xs font-medium">{label}</label>
                          <input
                            type={
                              key === "dob"
                                ? "date"
                                : key === "email"
                                  ? "email"
                                  : "text"
                            }
                            className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                            value={form[key]}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, [key]: e.target.value }))
                            }
                            required={[
                              "name",
                              "phone",
                              "email",
                              "aadhaar",
                            ].includes(key)}
                            data-ocid={`franchise.${key}.input`}
                          />
                        </div>
                      ))}
                      <div className="col-span-2">
                        <label className="text-xs font-medium">Address</label>
                        <textarea
                          className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                          rows={2}
                          value={form.address}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, address: e.target.value }))
                          }
                          required
                          data-ocid="franchise.address.textarea"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium">
                          Franchise Category
                        </label>
                        <select
                          className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                          value={form.category}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, category: e.target.value }))
                          }
                          required
                          data-ocid="franchise.category.select"
                        >
                          <option value="">Select Category</option>
                          {(fd.programs || DEFAULT_FRANCHISE.programs).map(
                            (prog, i) => (
                              <option key={i} value={prog}>
                                {prog}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium">
                          Preferred Plan
                        </label>
                        <select
                          className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                          value={form.plan}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, plan: e.target.value }))
                          }
                          data-ocid="franchise.plan.select"
                        >
                          <option value="">Select Plan</option>
                          {(fd.plans || DEFAULT_FRANCHISE.plans).map((p, i) => (
                            <option key={i} value={p.name}>
                              {p.name} - {p.investment}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-800">
                      <strong>
                        Franchise Fee:{" "}
                        {fd.charges?.franchiseFee ||
                          DEFAULT_FRANCHISE.charges.franchiseFee}
                      </strong>{" "}
                      — Payable after application approval via bank transfer or
                      UPI.
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-green-700 hover:bg-green-800"
                        data-ocid="franchise.submit_button"
                      >
                        {loading ? "Submitting..." : "Submit Application"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      )}
    </main>
  );
}

import type React from "react";
