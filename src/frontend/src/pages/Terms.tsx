import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-gray-100 text-gray-800 mb-3">Legal</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground mt-2">
          Please read these terms carefully before using our services.
        </p>
      </div>
      <Card>
        <CardContent className="p-6 prose max-w-none text-gray-700 space-y-4">
          <h2 className="font-bold text-lg text-green-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using the services of Anshika Udhyog Group, you
            agree to be bound by these Terms and Conditions. If you do not agree
            with any part of these terms, please do not use our services.
          </p>

          <h2 className="font-bold text-lg text-green-900">2. Membership</h2>
          <p>
            Membership in Anshika Udhyog Group is subject to admin approval.
            Members must provide accurate information and keep their profiles
            updated. Membership can be revoked for misconduct.
          </p>

          <h2 className="font-bold text-lg text-green-900">
            3. KYC Requirements
          </h2>
          <p>
            All members are required to complete KYC verification (Aadhaar, PAN,
            photo) to access financial services. False KYC information will
            result in immediate termination of membership.
          </p>

          <h2 className="font-bold text-lg text-green-900">
            4. Training Programs
          </h2>
          <p>
            Training programs are subject to availability and eligibility
            criteria. Certificates are issued only upon successful completion
            and attendance requirements.
          </p>

          <h2 className="font-bold text-lg text-green-900">
            5. Franchise Terms
          </h2>
          <p>
            Franchise agreements are legally binding contracts. Franchise fees
            are non-refundable except as specified in the franchise agreement.
            Franchise partners must adhere to brand guidelines.
          </p>

          <h2 className="font-bold text-lg text-green-900">
            6. Financial Services
          </h2>
          <p>
            Loan approvals are at the discretion of our financial team. Loan
            repayment schedules must be adhered to. Default may result in legal
            action.
          </p>

          <h2 className="font-bold text-lg text-green-900">
            7. Privacy Policy
          </h2>
          <p>
            We collect and process personal data as described in our Privacy
            Policy. We do not sell personal data to third parties. Data is used
            solely for service provision and improvement.
          </p>

          <h2 className="font-bold text-lg text-green-900">8. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be
            resolved under the jurisdiction of courts in the registered state of
            Anshika Udhyog Group.
          </p>

          <p className="text-xs text-gray-500">Last updated: April 2026</p>
        </CardContent>
      </Card>
    </main>
  );
}
