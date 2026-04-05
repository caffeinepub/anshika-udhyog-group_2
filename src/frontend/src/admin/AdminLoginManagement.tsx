import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { User } from "../backend";
import { useActor } from "../hooks/useActor";
import { hashPassword } from "../utils/auth";

export default function AdminLoginManagement() {
  const { actor } = useActor();
  const [users, setUsers] = useState<User[]>([]);
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});
  const [newCode, setNewCode] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!actor) return;
    actor.getAllUsers().then(setUsers);
  }, [actor]);

  async function toggleActive(user: User) {
    if (!actor) return;
    const newStatus = user.status === "approved" ? "pending" : "approved";
    await actor.updateUser(user.id, { ...user, status: newStatus });
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
    );
    toast.success("Login status updated!");
  }

  async function updateAccessCode(user: User) {
    if (!actor || !newCode[user.id]) return;
    await actor.updateUser(user.id, {
      ...user,
      passwordHash: hashPassword(newCode[user.id]),
    });
    toast.success("Access code updated!");
    setNewCode((p) => ({ ...p, [user.id]: "" }));
  }

  function generateCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl">Login Management</h1>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Member</th>
                  <th className="px-4 py-3 text-left">Login ID (Email)</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Access Code</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-muted-foreground"
                      data-ocid="login.empty_state"
                    >
                      No users.
                    </td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50"
                      data-ocid={`login.item.${idx + 1}`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">{user.name}</div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs">{user.email}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            user.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono">
                            {showCode[user.id]
                              ? user.passwordHash?.slice(0, 8)
                              : "••••••••"}
                          </span>
                          <button
                            onClick={() =>
                              setShowCode((p) => ({
                                ...p,
                                [user.id]: !p[user.id],
                              }))
                            }
                            className="text-gray-400"
                          >
                            {showCode[user.id] ? (
                              <EyeOff size={12} />
                            ) : (
                              <Eye size={12} />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(user.passwordHash);
                              toast.success("Copied!");
                            }}
                            className="text-gray-400"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                        <div className="flex gap-1 mt-1">
                          <input
                            className="border rounded px-1 py-0.5 text-xs w-24"
                            placeholder="New code"
                            value={newCode[user.id] || ""}
                            onChange={(e) =>
                              setNewCode((p) => ({
                                ...p,
                                [user.id]: e.target.value,
                              }))
                            }
                            data-ocid={`login.input.${idx + 1}`}
                          />
                          <button
                            onClick={() =>
                              setNewCode((p) => ({
                                ...p,
                                [user.id]: generateCode(),
                              }))
                            }
                            className="text-xs text-green-700 hover:underline"
                            title="Generate"
                          >
                            <RefreshCw size={10} />
                          </button>
                          <Button
                            size="sm"
                            className="h-5 text-xs bg-green-700 px-1"
                            onClick={() => updateAccessCode(user)}
                          >
                            Set
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => toggleActive(user)}
                          data-ocid={`login.toggle.${idx + 1}`}
                        >
                          {user.status === "approved"
                            ? "Deactivate"
                            : "Activate"}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
