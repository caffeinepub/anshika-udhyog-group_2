import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ROLES = [
  {
    role: "admin",
    label: "Admin",
    icon: "🛡️",
    color: "bg-red-50 border-red-200 hover:border-red-400",
    path: "/login",
    desc: "Full system control",
  },
  {
    role: "user",
    label: "Member",
    icon: "👤",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    path: "/login",
    desc: "Personal dashboard",
  },
  {
    role: "center",
    label: "Center",
    icon: "🏢",
    color: "bg-green-50 border-green-200 hover:border-green-400",
    path: "/login",
    desc: "Center management",
  },
  {
    role: "hr",
    label: "HR",
    icon: "👨‍💼",
    color: "bg-purple-50 border-purple-200 hover:border-purple-400",
    path: "/login",
    desc: "HR & Payroll",
  },
  {
    role: "supervisor",
    label: "Supervisor",
    icon: "📋",
    color: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
    path: "/login",
    desc: "Field supervision",
  },
  {
    role: "transport",
    label: "Transport",
    icon: "🚚",
    color: "bg-orange-50 border-orange-200 hover:border-orange-400",
    path: "/login",
    desc: "Vehicle management",
  },
  {
    role: "franchise",
    label: "Franchise Partner",
    icon: "🤝",
    color: "bg-teal-50 border-teal-200 hover:border-teal-400",
    path: "/franchise-partner/login",
    desc: "Franchise CRM",
  },
];

export default function RoleLogin() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display font-bold text-3xl text-green-900">
          Select Your Role
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose your role to access the appropriate portal
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ROLES.map((role) => (
          <Link key={role.role} to={role.path} state={{ roleHint: role.role }}>
            <Card
              className={`border-2 cursor-pointer transition-all hover:shadow-card-hover ${role.color}`}
              data-ocid={`rolelogin.${role.role}.card`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{role.icon}</div>
                <div className="font-bold text-gray-900">{role.label}</div>
                <div className="text-xs text-gray-500 mt-1">{role.desc}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
