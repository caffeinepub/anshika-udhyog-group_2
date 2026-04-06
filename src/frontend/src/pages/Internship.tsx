import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { generateId } from "../utils/auth";

const DEFAULT_INTERNSHIP = {
  vacancies: [
    {
      id: "1",
      title: "Training Coordinator Intern",
      department: "Training",
      location: "Lucknow, UP",
      stipend: "₹8,000/month",
      duration: "3 Months",
      seats: 5,
      lastDate: "2026-04-30",
      description:
        "Assist in coordinating skill development training programs and maintaining attendance records.",
      requirements: [
        "Graduate student",
        "Good communication",
        "MS Office skills",
      ],
      imageUrl: "/assets/generated/hero-training.dim_1200x500.jpg",
      isActive: true,
    },
    {
      id: "2",
      title: "Community Outreach Intern",
      department: "Field Operations",
      location: "Multiple Locations",
      stipend: "₹7,000/month",
      duration: "6 Months",
      seats: 10,
      lastDate: "2026-04-30",
      description:
        "Connect with rural communities to promote our programs and help with beneficiary enrollment.",
      requirements: [
        "12th pass",
        "Own vehicle preferred",
        "Local language skills",
      ],
      imageUrl: "/assets/generated/hero-women-empowerment.dim_1200x500.jpg",
      isActive: true,
    },
  ],
};

export default function Internship() {
  const { contentMap } = useAppContext();
  const { actor } = useActor();
  const internshipData = (contentMap.internship_vacancies ||
    DEFAULT_INTERNSHIP) as typeof DEFAULT_INTERNSHIP;
  const [selectedVacancy, setSelectedVacancy] = useState<
    (typeof internshipData.vacancies)[0] | null
  >(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    aadhaar: "",
    pan: "",
    education: "",
    address: "",
  });

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || !selectedVacancy) return;
    setLoading(true);
    try {
      await actor.submitApplication({
        id: generateId(),
        applicationType: "internship",
        applicantName: form.name,
        applicantEmail: form.email,
        applicantPhone: form.phone,
        data: JSON.stringify({
          ...form,
          vacancyId: selectedVacancy.id,
          vacancyTitle: selectedVacancy.title,
        }),
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

  const vacancies = internshipData.vacancies || DEFAULT_INTERNSHIP.vacancies;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-orange-100 text-orange-800 mb-3">Join Us</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Internship Opportunities
        </h1>
        <p className="text-muted-foreground mt-2">
          Learn, grow, and make a difference with Anshika Udhyog Group
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {vacancies
          .filter((v) => v.isActive)
          .map((vacancy, idx) => (
            <Card
              key={
                (vacancy as any).id ||
                (vacancy as any).title ||
                (vacancy as any).name ||
                String(idx)
              }
              className="overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              {vacancy.imageUrl && (
                <img
                  src={vacancy.imageUrl}
                  alt={vacancy.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{vacancy.title}</CardTitle>
                  <Badge variant="outline">{vacancy.department}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{vacancy.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <span>Location: {vacancy.location}</span>
                  <span>
                    Stipend:{" "}
                    <strong className="text-green-700">
                      {vacancy.stipend}
                    </strong>
                  </span>
                  <span>Duration: {vacancy.duration}</span>
                  <span>Seats: {vacancy.seats}</span>
                  <span className="col-span-2">
                    Last Date: {vacancy.lastDate}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(vacancy.requirements || []).map((r, i) => (
                    <Badge
                      key={(r as any).id || String(i)}
                      variant="outline"
                      className="text-xs"
                    >
                      {r}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full bg-green-700 hover:bg-green-800"
                  onClick={() => setSelectedVacancy(vacancy)}
                  data-ocid={`internship.${idx + 1}.button`}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Apply Modal */}
      {selectedVacancy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {submitted ? (
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-xl text-green-800 mb-2">
                  Application Submitted!
                </h3>
                <p className="text-sm text-gray-600">
                  We will contact you for the next steps. Thank you for your
                  interest!
                </p>
                <Button
                  className="mt-4 bg-green-700 hover:bg-green-800"
                  onClick={() => {
                    setSelectedVacancy(null);
                    setSubmitted(false);
                  }}
                >
                  Close
                </Button>
              </CardContent>
            ) : (
              <>
                <CardHeader>
                  <CardTitle>Apply: {selectedVacancy.title}</CardTitle>
                  <button
                    type="button"
                    onClick={() => setSelectedVacancy(null)}
                    className="absolute top-4 right-4 text-gray-400"
                  >
                    ✕
                  </button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleApply} className="space-y-3">
                    {(
                      [
                        "name",
                        "phone",
                        "email",
                        "dob",
                        "aadhaar",
                        "pan",
                        "education",
                        "address",
                      ] as const
                    ).map((key) => (
                      <div key={key}>
                        <p className="text-xs font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </p>
                        {key === "address" ? (
                          <textarea
                            className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                            rows={2}
                            value={form[key]}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, [key]: e.target.value }))
                            }
                            required
                            data-ocid={`internship.${key}.textarea`}
                          />
                        ) : (
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
                            required={["name", "phone", "email"].includes(key)}
                            data-ocid={`internship.${key}.input`}
                          />
                        )}
                      </div>
                    ))}
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-green-700 hover:bg-green-800"
                        data-ocid="internship.submit_button"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedVacancy(null)}
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
