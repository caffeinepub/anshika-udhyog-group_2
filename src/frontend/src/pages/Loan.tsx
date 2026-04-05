import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { generateId } from "../utils/auth";

const LOAN_TYPES = [
  {
    id: "mudra",
    title: "Mudra Loan",
    amount: "Upto ₹10 Lakh",
    interest: "7-12% p.a.",
    tenure: "3-5 Years",
    icon: "🏦",
    color: "border-blue-200 bg-blue-50",
    desc: "Collateral-free loan for micro and small businesses under PM Mudra Yojana. Available in 3 categories: Shishu, Kishore, Tarun.",
  },
  {
    id: "shg",
    title: "SHG Loan",
    amount: "Upto ₹3 Lakh",
    interest: "5-7% p.a.",
    tenure: "2-3 Years",
    icon: "👩‍👩‍👧",
    color: "border-green-200 bg-green-50",
    desc: "Self Help Group loans for women collectives. Group guarantee based lending with lower interest rates.",
  },
  {
    id: "udhyog",
    title: "Udhyog Loan",
    amount: "Upto ₹50 Lakh",
    interest: "8-14% p.a.",
    tenure: "5-7 Years",
    icon: "🏭",
    color: "border-purple-200 bg-purple-50",
    desc: "Business expansion loan for established enterprises looking to scale up operations and equipment.",
  },
];

export default function Loan() {
  const { contentMap } = useAppContext();
  const loanContent = (contentMap.loans || LOAN_TYPES) as typeof LOAN_TYPES;
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-green-100 text-green-800 mb-3">
          Financial Support
        </Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Loan Programs
        </h1>
        <p className="text-muted-foreground mt-2">
          Access affordable credit for your business dreams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {loanContent.map((loan, idx) => (
          <Card
            key={idx}
            className={`hover:shadow-card-hover transition-shadow border-2 ${loan.color}`}
          >
            <CardHeader>
              <div className="text-3xl mb-2">{loan.icon}</div>
              <CardTitle className="text-green-900">{loan.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">{loan.desc}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-semibold text-green-800">
                    {loan.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Interest:</span>
                  <span className="font-semibold">{loan.interest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tenure:</span>
                  <span className="font-semibold">{loan.tenure}</span>
                </div>
              </div>
              <Button
                className="w-full bg-green-700 hover:bg-green-800"
                onClick={() => {
                  setSelectedType(loan.id);
                  setShowForm(true);
                }}
                data-ocid={`loan.${idx + 1}.button`}
              >
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <LoanApplyForm type={selectedType} onClose={() => setShowForm(false)} />
      )}
    </main>
  );
}

function LoanApplyForm({
  type,
  onClose,
}: { type: string; onClose: () => void }) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    amount: "",
    purpose: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitApplication({
        id: generateId(),
        applicationType: `loan_${type}`,
        applicantName: form.name,
        applicantEmail: form.email,
        applicantPhone: form.phone,
        data: JSON.stringify(form),
        status: "pending",
        adminRemark: "",
        createdAt: BigInt(Date.now()),
      });
      setSubmitted(true);
      toast.success("Loan application submitted!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-bold text-xl text-green-800 mb-2">
              Application Submitted!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Your loan application has been received. Our team will contact you
              within 2-3 working days.
            </p>
            <Button
              onClick={onClose}
              className="bg-green-700 hover:bg-green-800"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Loan Application Form</CardTitle>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries({
              name: "Full Name",
              phone: "Mobile Number",
              email: "Email Address",
              amount: "Loan Amount Required",
              purpose: "Purpose of Loan",
              address: "Address",
            }).map(([key, label]) => (
              <div key={key}>
                <label className="text-sm font-medium">{label}</label>
                {key === "purpose" || key === "address" ? (
                  <textarea
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    rows={2}
                    value={form[key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                    required
                    data-ocid={`loan.${key}`}
                  />
                ) : (
                  <input
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={form[key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                    required
                    data-ocid={`loan.${key}.input`}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-700 hover:bg-green-800"
                data-ocid="loan.submit_button"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import type React from "react";
