import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "How do I become a member of Anshika Udhyog Group?",
    a: "You can become a member by filling the Signup form on our website. After submission, your application will be reviewed by our admin team and approved within 2-3 working days.",
  },
  {
    q: "Is KYC mandatory for members?",
    a: "Yes, KYC (Aadhaar, PAN, and photo) is required for accessing loans, training enrollment, and other financial services. You can submit KYC documents from your user dashboard.",
  },
  {
    q: "What is the franchise fee?",
    a: "The franchise fee starts at ₹50,000 depending on the category and plan you choose. Please visit our Franchise page for detailed information.",
  },
  {
    q: "How can I enroll in training programs?",
    a: "Training enrollment is done through your User Dashboard after login and KYC approval. You can browse available programs and apply online.",
  },
  {
    q: "What loan amounts are available?",
    a: "We offer Mudra Loans up to ₹10 Lakh, SHG Loans up to ₹3 Lakh, and Udhyog Loans up to ₹50 Lakh depending on your eligibility and business requirements.",
  },
  {
    q: "How long does loan approval take?",
    a: "Loan applications are typically processed within 7-15 working days after document verification and KYC approval.",
  },
  {
    q: "Can I apply for internship?",
    a: "Yes, internship opportunities are available for students and graduates. Visit our Internship page to see current openings and apply online.",
  },
  {
    q: "How do I contact support?",
    a: "You can reach us via our Contact page, WhatsApp at +91 83496 00835, or email at info@anshikaudhyog.org",
  },
  {
    q: "What documents are needed for franchise application?",
    a: "You need Aadhaar Card, PAN Card, recent passport-size photo, bank account details, and address proof to complete the franchise application.",
  },
  {
    q: "Are training certificates recognized?",
    a: "Yes, all training certificates are government-recognized under the National Skill Development Corporation (NSDC) framework.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-green-100 text-green-800 mb-3">Help Center</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions
        </p>
      </div>
      <div className="space-y-3">
        {FAQS.map((faq, idx) => (
          <Card
            key={
              (faq as any).id ||
              (faq as any).title ||
              (faq as any).label ||
              (faq as any).name ||
              String(idx)
            }
            className="overflow-hidden"
          >
            <button
              type="button"
              className="w-full text-left p-5 flex items-center justify-between hover:bg-green-50"
              onClick={() => setOpen(open === idx ? null : idx)}
              data-ocid={`faq.item.${idx + 1}`}
            >
              <span className="font-medium text-gray-900">{faq.q}</span>
              {open === idx ? (
                <ChevronUp size={18} className="text-green-600 shrink-0" />
              ) : (
                <ChevronDown size={18} className="text-gray-400 shrink-0" />
              )}
            </button>
            {open === idx && (
              <div className="px-5 pb-5 text-sm text-gray-700 border-t bg-green-50">
                <p className="pt-3">{faq.a}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </main>
  );
}
