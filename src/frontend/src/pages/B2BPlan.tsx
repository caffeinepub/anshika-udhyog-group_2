import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { generateId } from "../utils/auth";

const DEFAULT_B2B = {
  hero: {
    title: "B2B Partnership Program",
    subtitle: "Grow Together — Partner with Anshika Udhyog Group",
    cta: "Enquire Now",
    phone: "+91 83496 00835",
    email: "b2b@anshikaudhyog.org",
  },
  plans: [
    {
      name: "Basic Partner",
      price: "Free",
      badge: "Starter",
      features: [
        "Product supply access",
        "Marketing material",
        "Basic support",
      ],
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Growth Partner",
      price: "₹25,000/year",
      badge: "Popular",
      features: [
        "Exclusive territory",
        "Training support",
        "Co-branding",
        "Priority supply",
      ],
      color: "bg-green-50 border-green-200",
      popular: true,
    },
    {
      name: "Enterprise Partner",
      price: "Custom",
      badge: "Premium",
      features: [
        "Custom agreement",
        "Dedicated manager",
        "Complete support system",
        "Revenue sharing",
      ],
      color: "bg-purple-50 border-purple-200",
    },
  ],
  benefits: [
    {
      icon: "💰",
      title: "Revenue Sharing",
      desc: "Earn through product sales and referrals",
    },
    {
      icon: "🎓",
      title: "Training Support",
      desc: "Free training for your team",
    },
    {
      icon: "📦",
      title: "Product Supply",
      desc: "Quality products at wholesale rates",
    },
    {
      icon: "🌟",
      title: "Brand Value",
      desc: "Associate with an established NGO brand",
    },
    {
      icon: "📊",
      title: "Marketing Support",
      desc: "Digital and print marketing assistance",
    },
    {
      icon: "🤝",
      title: "Long-term Relationship",
      desc: "Sustainable partnership model",
    },
  ],
};

export default function B2BPlan() {
  const { contentMap } = useAppContext();
  const { actor } = useActor();
  const b2bData = (contentMap.b2b_page || DEFAULT_B2B) as typeof DEFAULT_B2B;
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    businessType: "",
    plan: "",
    message: "",
  });

  const bd = b2bData;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitApplication({
        id: generateId(),
        applicationType: "b2b",
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
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-800 to-green-700 rounded-2xl text-white p-8 mb-10 text-center">
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-3">
          {bd.hero?.title}
        </h1>
        <p className="text-white/90 text-lg mb-6">{bd.hero?.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="bg-white text-green-800 hover:bg-green-50 font-bold"
            onClick={() => setShowForm(true)}
            data-ocid="b2b.primary_button"
          >
            {bd.hero?.cta || "Enquire Now"}
          </Button>
          <a href={`tel:${bd.hero?.phone}`}>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {bd.hero?.phone}
            </Button>
          </a>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {(bd.benefits || DEFAULT_B2B.benefits).map((b, idx) => (
          <div
            key={idx}
            className="text-center p-4 bg-white rounded-xl shadow-sm border"
          >
            <div className="text-3xl mb-2">{b.icon}</div>
            <div className="font-semibold text-sm text-gray-800">{b.title}</div>
            <div className="text-xs text-gray-500 mt-1">{b.desc}</div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {(bd.plans || DEFAULT_B2B.plans).map((plan, idx) => (
          <Card key={idx} className={`relative border-2 ${plan.color}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-green-600">{plan.badge}</Badge>
              </div>
            )}
            <CardHeader className="text-center pb-2">
              <CardTitle>{plan.name}</CardTitle>
              <div className="text-2xl font-bold text-green-800">
                {plan.price}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {(plan.features || []).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-green-700 hover:bg-green-800"
                onClick={() => {
                  setForm((p) => ({ ...p, plan: plan.name }));
                  setShowForm(true);
                }}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enquiry Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            {submitted ? (
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-xl text-green-800">
                  Enquiry Submitted!
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Our B2B team will contact you within 24 hours.
                </p>
                <Button
                  className="mt-4 bg-green-700 hover:bg-green-800"
                  onClick={() => {
                    setShowForm(false);
                    setSubmitted(false);
                  }}
                >
                  Close
                </Button>
              </CardContent>
            ) : (
              <>
                <CardHeader>
                  <CardTitle>B2B Enquiry Form</CardTitle>
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-4 right-4 text-gray-400"
                  >
                    ✕
                  </button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {(
                      [
                        "name",
                        "phone",
                        "email",
                        "businessType",
                        "message",
                      ] as const
                    ).map((key) => (
                      <div key={key}>
                        <label className="text-xs font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        {key === "message" ? (
                          <textarea
                            className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                            rows={3}
                            value={form[key]}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, [key]: e.target.value }))
                            }
                            data-ocid="b2b.message.textarea"
                          />
                        ) : (
                          <input
                            type={key === "email" ? "email" : "text"}
                            className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                            value={form[key]}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, [key]: e.target.value }))
                            }
                            required={["name", "phone", "email"].includes(key)}
                            data-ocid={`b2b.${key}.input`}
                          />
                        )}
                      </div>
                    ))}
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-green-700 hover:bg-green-800"
                        data-ocid="b2b.submit_button"
                      >
                        {loading ? "Submitting..." : "Send Enquiry"}
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
