import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { generateId } from "../utils/auth";

export default function Complaint() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    subject: "",
    description: "",
    memberId: "",
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
        applicationType: "complaint",
        applicantName: form.name,
        applicantEmail: form.email,
        applicantPhone: form.phone,
        data: JSON.stringify(form),
        status: "pending",
        adminRemark: "",
        createdAt: BigInt(Date.now()),
      });
      setSubmitted(true);
      toast.success("Complaint submitted successfully!");
    } catch {
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-red-100 text-red-800 mb-3">Grievance</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          File a Complaint
        </h1>
        <p className="text-muted-foreground mt-2">
          We take every complaint seriously and ensure timely resolution.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Complaint Form</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-semibold text-green-800">
                Complaint filed successfully!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Your complaint ID:{" "}
                {`AUG-COMP-${Date.now().toString().slice(-6)}`}
              </p>
              <p className="text-sm text-gray-600">
                We will respond within 3-5 working days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Your Name *</label>
                  <input
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    data-ocid="complaint.name.input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Member ID</label>
                  <input
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={form.memberId}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, memberId: e.target.value }))
                    }
                    placeholder="Optional"
                    data-ocid="complaint.memberid.input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Phone *</label>
                  <input
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    data-ocid="complaint.phone.input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    data-ocid="complaint.email.input"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Category *</label>
                <select
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  required
                  data-ocid="complaint.category.select"
                >
                  <option value="">Select Category</option>
                  <option>Training Issue</option>
                  <option>Loan Issue</option>
                  <option>Staff Misconduct</option>
                  <option>Product Quality</option>
                  <option>Franchise Issue</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Subject *</label>
                <input
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  required
                  data-ocid="complaint.subject.input"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <textarea
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  required
                  placeholder="Please describe your complaint in detail..."
                  data-ocid="complaint.description.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800"
                data-ocid="complaint.submit_button"
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

import type React from "react";
