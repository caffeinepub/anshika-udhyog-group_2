import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle, Edit, Eye, Search, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { User } from "../backend";
import { useActor } from "../hooks/useActor";
import { generateRefNumber, hashPassword } from "../utils/auth";

export default function AdminUsers() {
  const { actor } = useActor();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  async function loadUsers() {
    if (!actor) return;
    const all = await actor.getAllUsers();
    setUsers(all);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, [actor]);

  async function handleApprove(user: User) {
    if (!actor) return;
    await actor.updateUser(user.id, { ...user, status: "approved" });
    toast.success(`${user.name} approved`);
    loadUsers();
  }

  async function handleReject(user: User) {
    if (!actor) return;
    await actor.updateUser(user.id, { ...user, status: "rejected" });
    toast.success(`${user.name} rejected`);
    loadUsers();
  }

  async function handleVerify(user: User) {
    if (!actor) return;
    await actor.updateUser(user.id, { ...user, isVerified: !user.isVerified });
    toast.success("Verification updated");
    loadUsers();
  }

  async function handleDelete(userId: string) {
    if (!actor || !confirm("Delete this user?")) return;
    await actor.deleteUser(userId);
    toast.success("User deleted");
    loadUsers();
  }

  async function handleSaveEdit() {
    if (!actor || !editUser) return;
    await actor.updateUser(editUser.id, { ...editUser, ...editForm });
    toast.success("User updated");
    setEditUser(null);
    loadUsers();
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile.includes(search),
  );

  const signupLink = `${window.location.origin}/signup`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-gray-900">User Management</h1>
        <Badge>{users.length} Total Users</Badge>
      </div>

      {/* Signup Link */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-sm font-semibold text-green-800">
                Signup Link
              </div>
              <div className="text-xs text-gray-600 break-all">
                {signupLink}
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(signupLink);
                toast.success("Copied!");
              }}
              className="bg-green-700"
            >
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
            placeholder="Search by name, email or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="users.search_input"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Member
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    KYC
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-muted-foreground"
                      data-ocid="users.loading_state"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-muted-foreground"
                      data-ocid="users.empty_state"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, idx) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50"
                      data-ocid={`users.item.${idx + 1}`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.mobile}
                        </div>
                        {user.isVerified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Verified
                          </Badge>
                        )}
                        {user.aadhaar && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs ml-1">
                            KYC
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            user.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : user.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            user.aadhaar
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {user.aadhaar ? "Submitted" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditUser(user);
                              setEditForm(user);
                            }}
                            title="Edit"
                            data-ocid={`users.edit_button.${idx + 1}`}
                          >
                            <Edit size={12} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setViewUser(user)}
                            title="View Profile"
                            data-ocid={`users.item.${idx + 1}`}
                          >
                            <Eye size={12} />
                          </Button>
                          {user.status === "pending" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 h-7"
                              onClick={() => handleApprove(user)}
                              data-ocid={`users.confirm_button.${idx + 1}`}
                            >
                              <CheckCircle size={12} />
                            </Button>
                          )}
                          {user.status === "pending" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-7"
                              onClick={() => handleReject(user)}
                              data-ocid={`users.cancel_button.${idx + 1}`}
                            >
                              <XCircle size={12} />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerify(user)}
                            title="Toggle Verify"
                            className="h-7"
                          >
                            {user.isVerified ? "Unverify" : "Verify"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                            title="Delete"
                            className="h-7"
                            data-ocid={`users.delete_button.${idx + 1}`}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)}>
        <DialogContent
          className="max-w-xl max-h-[80vh] overflow-y-auto"
          data-ocid="users.dialog"
        >
          <DialogHeader>
            <DialogTitle>Edit User: {editUser?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {(
              [
                ["name", "Full Name"],
                ["mobile", "Mobile"],
                ["email", "Email"],
                ["role", "Role"],
                ["status", "Status"],
                ["designation", "Designation"],
                ["fatherName", "Father's Name"],
                ["dob", "Date of Birth"],
                ["gender", "Gender"],
                ["address", "Address"],
                ["district", "District"],
                ["state", "State"],
                ["pincode", "Pincode"],
                ["aadhaar", "Aadhaar"],
                ["pan", "PAN"],
                ["nomineeName", "Nominee Name"],
                ["nomineeRelation", "Nominee Relation"],
              ] as [keyof User, string][]
            ).map(([key, label]) => (
              <div key={key} className={key === "address" ? "col-span-2" : ""}>
                <label className="text-xs font-medium text-gray-500">
                  {label}
                </label>
                {key === "role" ? (
                  <select
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={(editForm[key] as string) || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                    data-ocid="users.role.select"
                  >
                    {[
                      "user",
                      "center",
                      "supervisor",
                      "transport",
                      "hr",
                      "franchise",
                    ].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                ) : key === "status" ? (
                  <select
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={(editForm[key] as string) || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                    data-ocid="users.status.select"
                  >
                    {["pending", "approved", "rejected"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                ) : key === "address" ? (
                  <textarea
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    rows={2}
                    value={(editForm[key] as string) || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                  />
                ) : (
                  <input
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={(editForm[key] as string) || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            className="w-full bg-green-700 hover:bg-green-800 mt-3"
            onClick={handleSaveEdit}
            data-ocid="users.save_button"
          >
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>

      {/* View Profile Dialog */}
      {viewUser && (
        <Dialog open={true} onOpenChange={() => setViewUser(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Member Profile</DialogTitle>
            </DialogHeader>
            <UserProfile user={viewUser} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function UserProfile({ user }: { user: User }) {
  const memberId = `AUG${user.createdAt.toString().slice(-8)}`;
  const [design, setDesign] = useState(0);
  const designs = [
    {
      name: "Green Classic",
      bg: "bg-gradient-to-br from-green-700 to-green-900",
      accent: "bg-green-500",
    },
    {
      name: "Royal Blue",
      bg: "bg-gradient-to-br from-blue-700 to-blue-900",
      accent: "bg-blue-500",
    },
    {
      name: "Deep Purple",
      bg: "bg-gradient-to-br from-purple-700 to-purple-900",
      accent: "bg-purple-500",
    },
    {
      name: "Maroon Gold",
      bg: "bg-gradient-to-br from-red-800 to-red-950",
      accent: "bg-red-600",
    },
  ];
  const d = designs[design];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        {(
          [
            "name",
            "email",
            "mobile",
            "role",
            "status",
            "aadhaar",
            "pan",
            "address",
            "district",
            "state",
          ] as (keyof User)[]
        ).map((key) => (
          <div key={key}>
            <span className="text-xs text-gray-500 capitalize">{key}: </span>
            <span className="font-medium">{String(user[key] || "-")}</span>
          </div>
        ))}
      </div>

      {/* ID Card */}
      <div>
        <h3 className="font-semibold mb-2">ID Card</h3>
        <div className="flex gap-2 mb-3">
          {designs.map((d, i) => (
            <button
              key={i}
              onClick={() => setDesign(i)}
              className={`px-2 py-1 text-xs rounded border ${design === i ? "border-green-600 font-bold" : "border-gray-300"}`}
            >
              {d.name}
            </button>
          ))}
        </div>
        <div
          className={`${d.bg} rounded-xl p-5 text-white w-80 mx-auto`}
          id="id-card-print"
        >
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/assets/generated/anshika-logo.dim_200x200.png"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-bold text-sm">Anshika Udhyog Group</div>
              <div className="text-xs opacity-80">Member ID Card</div>
            </div>
          </div>
          <div className={`${d.accent} h-0.5 mb-3`} />
          <div className="font-bold text-xl">{user.name}</div>
          <div className="text-sm opacity-90 capitalize">{user.role}</div>
          <div className="text-xs opacity-70 mt-1">
            {user.designation || "Member"}
          </div>
          <div className="mt-3 text-xs space-y-1">
            <div>Member ID: {memberId}</div>
            <div>Mobile: {user.mobile}</div>
          </div>
          <div className={`${d.accent} h-0.5 mt-3`} />
          <div className="text-xs opacity-60 mt-1 text-center">
            Anshika Udhyog Group &bull; Valid 2026
          </div>
        </div>
        <Button
          className="mt-3 bg-green-700 hover:bg-green-800 mx-auto block"
          onClick={() => window.print()}
        >
          Print ID Card
        </Button>
      </div>
    </div>
  );
}
