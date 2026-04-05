import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function SHGLoan() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-green-100 text-green-800 mb-3">
          Women Finance
        </Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          SHG Loan
        </h1>
        <p className="text-muted-foreground mt-2">
          Self Help Group Loans for Women Collectives
        </p>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>About SHG Loan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            SHG (Self Help Group) loans are provided to groups of 10-20 women
            who come together to save money and support each other financially.
            The group guarantee replaces individual collateral.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="font-bold text-xl text-green-800">₹3 Lakh</div>
              <div className="text-xs text-gray-600">Maximum Loan</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="font-bold text-xl text-blue-800">5-7%</div>
              <div className="text-xs text-gray-600">Interest Rate</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="font-bold text-xl text-purple-800">2-3 Years</div>
              <div className="text-xs text-gray-600">Repayment</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Eligibility</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Group of 10-20 women</li>
              <li>Regular savings for at least 3 months</li>
              <li>Unanimous decision by group</li>
              <li>Linked with Anshika Udhyog Group center</li>
            </ul>
          </div>
          <Link to="/loan">
            <Button className="bg-green-700 hover:bg-green-800">
              Apply for SHG Loan
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
