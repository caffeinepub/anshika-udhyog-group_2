import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Application } from "../backend";
import { useActor } from "../hooks/useActor";

export default function AdminApplications() {
  const { actor } = useActor();
  const [apps, setApps] = useState<Application[]>([]);
  const [filter, setFilter] = useState("all");
  const [remark, setRemark] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!actor) return;
    actor.getAllApplications().then(setApps);
  }, [actor]);

  async function updateStatus(id: string, status: string) {
    if (!actor) return;
    await actor.updateApplicationStatus(id, status, remark[id] || "");
    toast.success(`Application ${status}`);
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  const types = [
    "all",
    "loan",
    "franchise",
    "internship",
    "b2b",
    "contact",
    "complaint",
  ];
  const filtered = apps.filter(
    (a) => filter === "all" || a.applicationType.startsWith(filter),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">All Applications</h1>
        <Badge>{apps.length} Total</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={filter === t ? "default" : "outline"}
            className={filter === t ? "bg-green-700" : ""}
            onClick={() => setFilter(t)}
            data-ocid={`applications.${t}.tab`}
          >
            {t}
          </Button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p
            className="text-muted-foreground"
            data-ocid="applications.empty_state"
          >
            No applications.
          </p>
        ) : (
          filtered.map((app, idx) => (
            <Card key={app.id} data-ocid={`applications.item.${idx + 1}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-base">
                      {app.applicantName}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {app.applicantPhone} &bull; {app.applicantEmail}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className="capitalize">
                      {app.applicationType}
                    </Badge>
                    <Badge
                      className={
                        app.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : app.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setExpanded(expanded === app.id ? null : app.id)
                  }
                  className="text-xs"
                >
                  {expanded === app.id ? "Hide" : "Show"} Details
                </Button>
                {expanded === app.id && (
                  <div className="bg-gray-50 rounded p-3 text-xs">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(JSON.parse(app.data || "{}"), null, 2)}
                    </pre>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    className="border rounded px-2 py-1 text-sm flex-1"
                    placeholder="Admin remark..."
                    value={remark[app.id] || ""}
                    onChange={(e) =>
                      setRemark((p) => ({ ...p, [app.id]: e.target.value }))
                    }
                    data-ocid={`applications.input.${idx + 1}`}
                  />
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => updateStatus(app.id, "approved")}
                    data-ocid={`applications.confirm_button.${idx + 1}`}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateStatus(app.id, "rejected")}
                    data-ocid={`applications.cancel_button.${idx + 1}`}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(app.id, "forwarded")}
                    data-ocid={`applications.secondary_button.${idx + 1}`}
                  >
                    Forward
                  </Button>
                </div>
                {app.adminRemark && (
                  <p className="text-xs text-gray-600">
                    Remark: {app.adminRemark}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
