import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

const MEMBERS = [
  {
    id: "1",
    name: "Sunita Devi",
    role: "Production Worker",
    salaryGrade: "A",
    isActive: true,
    attendance: 24,
  },
  {
    id: "2",
    name: "Meena Sharma",
    role: "Packaging",
    salaryGrade: "B",
    isActive: true,
    attendance: 20,
  },
  {
    id: "3",
    name: "Radha Yadav",
    role: "Quality Check",
    salaryGrade: "A",
    isActive: true,
    attendance: 22,
  },
];

const SALARY_GRADES: Record<string, number> = {
  A: 10000,
  B: 8000,
  C: 6000,
  D: 4000,
};

export default function CenterDashboard() {
  const { currentUser } = useAppContext();
  const [members, _setMembers] = useState(MEMBERS);
  const [attendance, setAttendance] = useState<Record<string, number>>({});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white px-4 py-3">
        <div className="font-bold">Center Dashboard</div>
        <div className="text-xs text-green-300">{currentUser?.name}</div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap w-full gap-1 h-auto mb-6">
            {[
              "overview",
              "members",
              "attendance",
              "production",
              "salary",
              "orders",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize text-xs"
                data-ocid={`center.${tab}.tab`}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ["Total Members", members.length],
                ["Active Today", members.filter((m) => m.isActive).length],
                ["Monthly Production", "2,450 units"],
                ["Monthly Revenue", "₹1.2 Lakh"],
              ].map(([label, value]) => (
                <Card key={label as string}>
                  <CardContent className="p-4">
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="font-bold text-lg mt-1">
                      {String(value)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((m, idx) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                      data-ocid={`center.members.item.${idx + 1}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800">
                        {m.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-gray-500">{m.role}</div>
                      </div>
                      <Badge>Grade {m.salaryGrade}</Badge>
                      <Badge
                        className={
                          m.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100"
                        }
                      >
                        {m.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((m, idx) => (
                    <div key={m.id} className="flex items-center gap-3">
                      <span className="flex-1 text-sm font-medium">
                        {m.name}
                      </span>
                      <input
                        type="number"
                        className="w-20 border rounded px-2 py-1 text-sm"
                        max={31}
                        value={attendance[m.id] ?? m.attendance}
                        onChange={(e) =>
                          setAttendance((p) => ({
                            ...p,
                            [m.id]: +e.target.value,
                          }))
                        }
                        data-ocid={`center.attendance.input.${idx + 1}`}
                      />
                      <span className="text-xs text-gray-500">days</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-4 bg-green-700"
                  onClick={() => toast.success("Attendance saved!")}
                  data-ocid="center.attendance.save_button"
                >
                  Save Attendance
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary">
            <Card>
              <CardHeader>
                <CardTitle>Salary Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Member",
                          "Grade",
                          "Attendance",
                          "Working Days",
                          "Salary",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-3 py-2 text-left text-xs font-semibold"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((m, idx) => {
                        const att = attendance[m.id] ?? m.attendance;
                        const base = SALARY_GRADES[m.salaryGrade] || 6000;
                        const sal = Math.round((att / 26) * base);
                        return (
                          <tr
                            key={m.id}
                            className="border-b"
                            data-ocid={`center.salary.item.${idx + 1}`}
                          >
                            <td className="px-3 py-2">{m.name}</td>
                            <td className="px-3 py-2">{m.salaryGrade}</td>
                            <td className="px-3 py-2">{att}</td>
                            <td className="px-3 py-2">26</td>
                            <td className="px-3 py-2 font-semibold text-green-700">
                              ₹{sal.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production">
            <Card>
              <CardHeader>
                <CardTitle>Production Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Record daily production entries here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  data-ocid="center.orders.empty_state"
                >
                  No pending orders.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
