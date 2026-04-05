import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  FileCheck,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Application, User } from "../backend";
import { useActor } from "../hooks/useActor";

export default function AdminDashboard() {
  const { actor } = useActor();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    kycPending: 0,
    applications: 0,
    reviews: 0,
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentApps, setRecentApps] = useState<Application[]>([]);

  useEffect(() => {
    if (!actor) return;
    Promise.all([
      actor.getAllUsers(),
      actor.getAllKyc(),
      actor.getAllApplications(),
      actor.getAllReviews(),
    ]).then(([users, kycs, apps, reviews]) => {
      setStats({
        total: users.length,
        pending: users.filter((u) => u.status === "pending").length,
        approved: users.filter((u) => u.status === "approved").length,
        kycPending: kycs.filter((k) => k.status === "pending").length,
        applications: apps.length,
        reviews: reviews.filter((r) => !r.isApproved).length,
      });
      setRecentUsers(users.slice(-5).reverse());
      setRecentApps(apps.slice(-5).reverse());
    });
  }, [actor]);

  const statCards = [
    {
      label: "Total Members",
      value: stats.total,
      icon: Users,
      color: "bg-blue-50 text-blue-700",
      border: "border-blue-200",
    },
    {
      label: "Pending Approval",
      value: stats.pending,
      icon: UserCheck,
      color: "bg-yellow-50 text-yellow-700",
      border: "border-yellow-200",
    },
    {
      label: "Approved Members",
      value: stats.approved,
      icon: TrendingUp,
      color: "bg-green-50 text-green-700",
      border: "border-green-200",
    },
    {
      label: "KYC Pending",
      value: stats.kycPending,
      icon: FileCheck,
      color: "bg-red-50 text-red-700",
      border: "border-red-200",
    },
    {
      label: "Total Applications",
      value: stats.applications,
      icon: ShoppingBag,
      color: "bg-purple-50 text-purple-700",
      border: "border-purple-200",
    },
    {
      label: "Pending Reviews",
      value: stats.reviews,
      icon: Award,
      color: "bg-orange-50 text-orange-700",
      border: "border-orange-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground text-sm">
          Anshika Udhyog Group - Admin Control Panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, idx) => (
          <Card key={idx} className={`border ${stat.border}`}>
            <CardContent className="p-4">
              <div className={`inline-flex p-2 rounded-lg mb-2 ${stat.color}`}>
                <stat.icon size={16} />
              </div>
              <div className="font-bold text-2xl">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            {recentUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users yet.</p>
            ) : (
              <div className="space-y-3">
                {recentUsers.map((user, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
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
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {recentApps.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No applications yet.
              </p>
            ) : (
              <div className="space-y-3">
                {recentApps.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="flex-1">
                      <div className="font-medium">{app.applicantName}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {app.applicationType}
                      </div>
                    </div>
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
