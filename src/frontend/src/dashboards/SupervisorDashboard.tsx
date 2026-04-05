import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

export default function SupervisorDashboard() {
  const { currentUser } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white px-4 py-3">
        <div className="font-bold">Supervisor Dashboard</div>
        <div className="text-xs text-green-300">{currentUser?.name}</div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
            {[
              "overview",
              "attendance",
              "machines",
              "reports",
              "targets",
              "complaints",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize text-xs"
                data-ocid={`supervisor.${tab}.tab`}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                ["Centers Under Supervision", "3"],
                ["Total Workers", "45"],
                ["Today's Attendance", "38/45"],
                ["Machines Active", "12/15"],
                ["Monthly Target", "5000 units"],
                ["Achieved", "3,850 units"],
              ].map(([label, value]) => (
                <Card key={label}>
                  <CardContent className="p-4">
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="font-bold text-lg mt-1">{value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Check</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Mark and verify attendance for centers under your supervision.
                </p>
                <Button
                  className="mt-3 bg-green-700"
                  onClick={() => toast.success("Attendance recorded!")}
                  data-ocid="supervisor.attendance.save_button"
                >
                  Record Today's Attendance
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="machines">
            <Card>
              <CardHeader>
                <CardTitle>Machine Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    ["Agarbatti Machine 1", "Active"],
                    ["Candle Mold Press", "Active"],
                    ["Soap Mixer", "Maintenance"],
                  ].map(([machine, status], idx) => (
                    <div
                      key={machine}
                      className="flex justify-between items-center p-3 border rounded"
                      data-ocid={`supervisor.machines.item.${idx + 1}`}
                    >
                      <span className="font-medium">{machine}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Daily Report</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm"
                  rows={6}
                  placeholder="Write daily report..."
                  data-ocid="supervisor.report.textarea"
                />
                <Button
                  className="mt-3 bg-green-700"
                  onClick={() => toast.success("Report submitted!")}
                  data-ocid="supervisor.report.submit_button"
                >
                  Submit Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targets">
            <Card>
              <CardHeader>
                <CardTitle>Targets & Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    ["Monthly Target", "5000 units", 77],
                    ["Quality Target", "98%", 95],
                    ["Attendance Target", "90%", 84],
                  ].map(([label, val, pct]) => (
                    <div key={label as string}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{label}</span>
                        <span>{val}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints">
            <Card>
              <CardHeader>
                <CardTitle>Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  data-ocid="supervisor.complaints.empty_state"
                >
                  No open complaints.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
