import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import type { KycRecord } from "../backend";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";

const STAFF = [
  {
    id: "1",
    name: "Rekha Devi",
    role: "Training Coordinator",
    salary: 22000,
    joiningDate: "2024-06-01",
    isActive: true,
  },
  {
    id: "2",
    name: "Suresh Kumar",
    role: "Field Officer",
    salary: 18000,
    joiningDate: "2024-03-15",
    isActive: true,
  },
  {
    id: "3",
    name: "Anjali Singh",
    role: "Center Manager",
    salary: 28000,
    joiningDate: "2023-12-01",
    isActive: true,
  },
];

export default function HRDashboard() {
  const { currentUser } = useAppContext();
  const { actor } = useActor();
  const [kycs, setKycs] = useState<KycRecord[]>([]);
  const [payroll, setPayroll] = useState(
    STAFF.map((s) => ({ ...s, paid: false })),
  );

  useEffect(() => {
    if (!actor) return;
    actor.getAllKyc().then(setKycs);
  }, [actor]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white px-4 py-3">
        <div className="font-bold">HR Dashboard</div>
        <div className="text-xs text-green-300">{currentUser?.name}</div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
            {[
              "overview",
              "staff",
              "payroll",
              "attendance",
              "leave",
              "kyc",
              "training",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize text-xs"
                data-ocid={`hr.${tab}.tab`}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ["Total Staff", STAFF.length],
                ["Active Staff", STAFF.filter((s) => s.isActive).length],
                [
                  "KYC Pending",
                  kycs.filter((k) => k.status === "pending").length,
                ],
                ["Open Leaves", 2],
              ].map(([label, value]) => (
                <Card key={label as string}>
                  <CardContent className="p-4">
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="font-bold text-lg mt-1">{value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle>Staff Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {STAFF.map((s, idx) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 p-3 border rounded"
                      data-ocid={`hr.staff.item.${idx + 1}`}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-gray-500">
                          {s.role} | Joined: {s.joiningDate}
                        </div>
                      </div>
                      <span className="font-semibold text-green-700">
                        ₹{s.salary.toLocaleString()}
                      </span>
                      <Badge
                        className={
                          s.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100"
                        }
                      >
                        {s.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <Card>
              <CardHeader>
                <CardTitle>Payroll System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Name", "Role", "Salary", "Status", "Action"].map(
                          (h) => (
                            <th
                              key={h}
                              className="px-3 py-2 text-left text-xs font-semibold"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {payroll.map((s, idx) => (
                        <tr
                          key={s.id}
                          className="border-b"
                          data-ocid={`hr.payroll.item.${idx + 1}`}
                        >
                          <td className="px-3 py-2">{s.name}</td>
                          <td className="px-3 py-2 text-xs text-gray-500">
                            {s.role}
                          </td>
                          <td className="px-3 py-2 font-semibold text-green-700">
                            ₹{s.salary.toLocaleString()}
                          </td>
                          <td className="px-3 py-2">
                            <Badge
                              className={
                                s.paid
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {s.paid ? "Paid" : "Pending"}
                            </Badge>
                          </td>
                          <td className="px-3 py-2">
                            {!s.paid && (
                              <Button
                                size="sm"
                                className="bg-green-700 h-7 text-xs"
                                onClick={() => {
                                  setPayroll((prev) =>
                                    prev.map((p) =>
                                      p.id === s.id ? { ...p, paid: true } : p,
                                    ),
                                  );
                                  toast.success(`Salary paid to ${s.name}`);
                                }}
                                data-ocid={`hr.payroll.confirm_button.${idx + 1}`}
                              >
                                Pay
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc">
            <Card>
              <CardHeader>
                <CardTitle>KYC Verification</CardTitle>
              </CardHeader>
              <CardContent>
                {kycs.length === 0 ? (
                  <p
                    className="text-muted-foreground"
                    data-ocid="hr.kyc.empty_state"
                  >
                    No KYC submissions.
                  </p>
                ) : (
                  kycs.map((k, idx) => (
                    <div
                      key={k.userId}
                      className="flex justify-between items-center p-3 border rounded mb-2"
                      data-ocid={`hr.kyc.item.${idx + 1}`}
                    >
                      <div className="text-sm font-medium">{k.userId}</div>
                      <Badge
                        className={
                          k.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {k.status}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  HR Attendance records shown here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leave">
            <Card>
              <CardHeader>
                <CardTitle>Leave Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  data-ocid="hr.leave.empty_state"
                >
                  No pending leave requests.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Track staff training and development programs.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
