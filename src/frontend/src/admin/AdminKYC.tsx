import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { KycRecord } from "../backend";
import { useActor } from "../hooks/useActor";

export default function AdminKYC() {
  const { actor } = useActor();
  const [kycs, setKycs] = useState<(KycRecord & { userName?: string })[]>([]);
  const [remark, setRemark] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!actor) return;
    Promise.all([actor.getAllKyc(), actor.getAllUsers()]).then(
      ([kycList, users]) => {
        const userMap = Object.fromEntries(users.map((u) => [u.id, u.name]));
        setKycs(
          kycList.map((k) => ({
            ...k,
            userName: userMap[k.userId] || k.userId,
          })),
        );
      },
    );
  }, [actor]);

  async function handleApprove(userId: string) {
    if (!actor) return;
    await actor.updateKycStatus(userId, "approved", remark[userId] || "");
    toast.success("KYC approved");
    const _updated = await actor.getAllKyc();
    setKycs((prev) =>
      prev.map((k) => (k.userId === userId ? { ...k, status: "approved" } : k)),
    );
  }

  async function handleReject(userId: string) {
    if (!actor) return;
    await actor.updateKycStatus(userId, "rejected", remark[userId] || "");
    toast.success("KYC rejected");
    setKycs((prev) =>
      prev.map((k) => (k.userId === userId ? { ...k, status: "rejected" } : k)),
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl">KYC Management</h1>
      <div className="grid grid-cols-1 gap-4">
        {kycs.length === 0 ? (
          <p className="text-muted-foreground" data-ocid="kyc.empty_state">
            No KYC submissions.
          </p>
        ) : (
          kycs.map((kyc, idx) => (
            <Card key={idx} data-ocid={`kyc.item.${idx + 1}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{kyc.userName}</CardTitle>
                  <Badge
                    className={
                      kyc.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : kyc.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {kyc.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {["aadhaarDoc", "panDoc", "photo", "addressProof"].map(
                    (field) => (
                      <div key={field}>
                        <span className="text-xs text-gray-500 capitalize">
                          {field}:{" "}
                        </span>
                        {kyc[field as keyof KycRecord] ? (
                          <a
                            href={kyc[field as keyof KycRecord] as string}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 text-xs underline"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Not provided
                          </span>
                        )}
                      </div>
                    ),
                  )}
                  <div className="col-span-2">
                    <span className="text-xs text-gray-500">
                      Bank Details:{" "}
                    </span>
                    <span className="text-xs">
                      {kyc.bankDetails || "Not provided"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium">Admin Remark</label>
                  <input
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={remark[kyc.userId] || ""}
                    onChange={(e) =>
                      setRemark((p) => ({ ...p, [kyc.userId]: e.target.value }))
                    }
                    placeholder="Add remark..."
                    data-ocid={`kyc.input.${idx + 1}`}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 gap-1"
                    onClick={() => handleApprove(kyc.userId)}
                    data-ocid={`kyc.confirm_button.${idx + 1}`}
                  >
                    <CheckCircle size={12} /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="gap-1"
                    onClick={() => handleReject(kyc.userId)}
                    data-ocid={`kyc.cancel_button.${idx + 1}`}
                  >
                    <XCircle size={12} /> Reject
                  </Button>
                </div>
                {kyc.remark && (
                  <p className="text-xs text-gray-600">
                    Previous remark: {kyc.remark}
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
