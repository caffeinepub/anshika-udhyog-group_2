import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function UdhyogLoan() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-purple-100 text-purple-800 mb-3">
          Business Finance
        </Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Udhyog Loan
        </h1>
        <p className="text-muted-foreground mt-2">
          Business Expansion Loans for Established Enterprises
        </p>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>About Udhyog Loan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Udhyog Loan is designed for established micro and small enterprises
            that want to expand their operations, purchase new equipment, or
            scale up production.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="font-bold text-xl text-purple-800">₹50 Lakh</div>
              <div className="text-xs text-gray-600">Maximum Loan</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="font-bold text-xl text-blue-800">8-14%</div>
              <div className="text-xs text-gray-600">Interest Rate</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="font-bold text-xl text-green-800">5-7 Years</div>
              <div className="text-xs text-gray-600">Repayment</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Eligibility</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Business operating for at least 1 year</li>
              <li>Valid business registration</li>
              <li>Clean repayment track record</li>
              <li>Minimum annual turnover ₹1 Lakh</li>
            </ul>
          </div>
          <Link to="/loan">
            <Button className="bg-green-700 hover:bg-green-800">
              Apply for Udhyog Loan
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
