import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "../context/AppContext";

export default function FranchiseDashboard() {
  const { currentUser, contentMap } = useAppContext();
  const partners = (contentMap.franchise_partners || []) as Array<
    Record<string, string>
  >;
  const myPartner = partners.find((p) => p.email === currentUser?.email);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white px-4 py-3">
        <div className="font-bold">Franchise Partner Dashboard</div>
        <div className="text-xs text-green-300">{currentUser?.name}</div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
            {[
              "overview",
              "profile",
              "letters",
              "requests",
              "documents",
              "business",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize text-xs"
                data-ocid={`franchise.${tab}.tab`}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                ["Territory", myPartner?.territory || "Pending"],
                ["Plan", myPartner?.plan || "N/A"],
                ["Status", myPartner?.status || "Pending"],
                ["Join Date", myPartner?.joinDate || "N/A"],
              ].map(([label, value]) => (
                <Card key={label}>
                  <CardContent className="p-4">
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="font-bold mt-1">{value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {myPartner ? (
                  Object.entries(myPartner).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <span className="text-gray-500 capitalize w-28 shrink-0">
                        {key}:
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))
                ) : (
                  <p
                    className="text-muted-foreground"
                    data-ocid="franchise.profile.empty_state"
                  >
                    Profile not set up yet. Contact admin.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="letters">
            <Card>
              <CardHeader>
                <CardTitle>My Letters</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  data-ocid="franchise.letters.empty_state"
                >
                  No letters issued yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  data-ocid="franchise.requests.empty_state"
                >
                  No service requests.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>My Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-5 text-white w-72 mx-auto">
                  <div className="font-bold text-lg">{currentUser?.name}</div>
                  <Badge className="bg-green-500 mt-1">Franchise Partner</Badge>
                  <div className="mt-3 text-xs opacity-80">
                    Anshika Udhyog Group
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Business analytics and performance data.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
