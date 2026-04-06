import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

export default function TransportDashboard() {
  const { currentUser, contentMap } = useAppContext();
  const vehicles = (contentMap.transport_data || []) as Array<{
    vehicleNumber: string;
    type: string;
    status: string;
    driverName: string;
    route: string;
  }>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white px-4 py-3">
        <div className="font-bold">Transport Dashboard</div>
        <div className="text-xs text-green-300">{currentUser?.name}</div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
            {["overview", "vehicles", "drivers", "trips", "shipping"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="capitalize text-xs"
                  data-ocid={`transport.${tab}.tab`}
                >
                  {tab}
                </TabsTrigger>
              ),
            )}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ["Total Vehicles", vehicles.length || 0],
                ["Active Trips", 2],
                ["Deliveries Today", 5],
                ["Monthly Revenue", "₹45,000"],
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

          <TabsContent value="vehicles">
            <Card>
              <CardHeader>
                <CardTitle>Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                {vehicles.length === 0 ? (
                  <p
                    className="text-muted-foreground"
                    data-ocid="transport.vehicles.empty_state"
                  >
                    No vehicles. Contact admin to add.
                  </p>
                ) : (
                  vehicles.map((v, idx) => (
                    <div
                      key={
                        (v as any).id ||
                        (v as any).title ||
                        (v as any).name ||
                        String(idx)
                      }
                      className="flex justify-between items-center p-3 border rounded mb-2"
                      data-ocid={`transport.vehicles.item.${idx + 1}`}
                    >
                      <div>
                        <div className="font-medium">{v.vehicleNumber}</div>
                        <div className="text-xs text-gray-500">
                          {v.type} &bull; {v.route}
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${v.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                      >
                        {v.status}
                      </span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trips">
            <Card>
              <CardHeader>
                <CardTitle>Trips & Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  data-ocid="transport.trips.empty_state"
                >
                  No active trips.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <CardTitle>Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                {vehicles.map(
                  (v, idx) =>
                    v.driverName && (
                      <div
                        key={String(idx)}
                        className="flex justify-between p-3 border rounded mb-2"
                        data-ocid={`transport.drivers.item.${idx + 1}`}
                      >
                        <span>{v.driverName}</span>
                        <span className="text-xs text-gray-500">
                          {v.vehicleNumber}
                        </span>
                      </div>
                    ),
                )}
                {!vehicles.some((v) => v.driverName) && (
                  <p
                    className="text-muted-foreground"
                    data-ocid="transport.drivers.empty_state"
                  >
                    No drivers registered.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  data-ocid="transport.shipping.empty_state"
                >
                  No pending shipments.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
