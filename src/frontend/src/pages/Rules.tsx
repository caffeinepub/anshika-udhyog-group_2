import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Rules() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-orange-100 text-orange-800 mb-3">Guidelines</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Rules & Regulations
        </h1>
        <p className="text-muted-foreground mt-2">
          Guidelines for members, franchise partners, and all stakeholders.
        </p>
      </div>
      <Card>
        <CardContent className="p-6 space-y-6 text-gray-700">
          {[
            {
              title: "Member Conduct",
              rules: [
                "Maintain respect and dignity towards all members and staff",
                "Attend meetings and training sessions as scheduled",
                "Submit accurate information for KYC and applications",
                "Report any misconduct or irregularities to management",
                "Abide by the organization's code of conduct",
              ],
            },
            {
              title: "Training Rules",
              rules: [
                "Minimum 80% attendance required for certification",
                "No mobile phone use during training sessions",
                "Respect training materials and equipment",
                "Follow safety guidelines in production areas",
                "Complete all assignments and assessments",
              ],
            },
            {
              title: "Franchise Partner Rules",
              rules: [
                "Strictly follow brand guidelines and quality standards",
                "Maintain minimum production and sales targets",
                "Submit monthly reports on or before the 5th of each month",
                "Not to engage with competitor brands without prior approval",
                "Maintain proper records of production, sales, and staff",
              ],
            },
            {
              title: "Financial Discipline",
              rules: [
                "Loan repayments must be made on due dates",
                "No misuse of loan funds for personal purposes",
                "Maintain transparency in financial transactions",
                "Provide regular financial updates as required",
                "Report any financial difficulties immediately to management",
              ],
            },
          ].map((section, idx) => (
            <div
              key={
                (section as any).id ||
                (section as any).title ||
                (section as any).name ||
                String(idx)
              }
            >
              <h2 className="font-bold text-lg text-green-900 mb-3">
                {idx + 1}. {section.title}
              </h2>
              <ul className="space-y-2">
                {section.rules.map((rule, i) => (
                  <li
                    key={(rule as any).id || String(i)}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-green-600 font-bold mt-0.5">•</span>{" "}
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
