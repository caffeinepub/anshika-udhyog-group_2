import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_TEAM = [
  {
    id: "1",
    name: "Smt. Anshika Devi",
    designation: "Founder & President",
    department: "Leadership",
    bio: "Visionary leader with 15+ years in rural development",
    photo: "",
    email: "",
    isActive: true,
  },
  {
    id: "2",
    name: "Shri Rajesh Kumar",
    designation: "Secretary General",
    department: "Operations",
    bio: "Expert in NGO management and government liaison",
    photo: "",
    email: "",
    isActive: true,
  },
  {
    id: "3",
    name: "Ms. Priya Sharma",
    designation: "Training Head",
    department: "Training",
    bio: "Specialist in vocational skills and curriculum development",
    photo: "",
    email: "",
    isActive: true,
  },
  {
    id: "4",
    name: "Mr. Arun Singh",
    designation: "Finance Manager",
    department: "Finance",
    bio: "CA with expertise in NGO accounting and compliance",
    photo: "",
    email: "",
    isActive: true,
  },
  {
    id: "5",
    name: "Ms. Kavita Yadav",
    designation: "Outreach Coordinator",
    department: "Field Operations",
    bio: "Ground-level worker connecting with rural communities",
    photo: "",
    email: "",
    isActive: true,
  },
  {
    id: "6",
    name: "Mr. Suresh Mishra",
    designation: "IT Manager",
    department: "Technology",
    bio: "Managing digital systems and online platforms",
    photo: "",
    email: "",
    isActive: true,
  },
];

export default function OurTeam() {
  const { contentMap } = useAppContext();
  const team = (contentMap.team || DEFAULT_TEAM) as typeof DEFAULT_TEAM;
  const active = team.filter((m) => m.isActive);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-green-100 text-green-800 mb-3">Our People</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Our Team
        </h1>
        <p className="text-muted-foreground mt-2">
          Dedicated professionals working towards women empowerment
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {active.map((member, idx) => (
          <Card
            key={
              (member as any).id ||
              (member as any).title ||
              (member as any).name ||
              String(idx)
            }
            className="hover:shadow-card-hover transition-shadow text-center"
          >
            <CardContent className="p-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-700 overflow-hidden">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  member.name.charAt(0)
                )}
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <Badge className="bg-green-100 text-green-800 mt-1">
                {member.designation}
              </Badge>
              <Badge variant="outline" className="mt-1 ml-1 text-xs">
                {member.department}
              </Badge>
              <p className="text-sm text-gray-600 mt-3">{member.bio}</p>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1 text-green-700 text-sm mt-2 hover:underline"
                >
                  <Mail size={12} /> {member.email}
                </a>
              )}
            </CardContent>
          </Card>
        ))}
        {active.length === 0 && (
          <p
            className="text-center text-muted-foreground py-20 col-span-3"
            data-ocid="team.empty_state"
          >
            Team information coming soon.
          </p>
        )}
      </div>
    </main>
  );
}
