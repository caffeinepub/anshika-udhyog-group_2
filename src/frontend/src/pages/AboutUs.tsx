import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, Target } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_LEADERSHIP = [
  {
    name: "Smt. Anshika Devi",
    designation: "Founder & President",
    message:
      "Our mission is to empower every rural woman to become financially independent through skill development and self-employment.",
    photo: "/assets/generated/anshika-logo.dim_200x200.png",
  },
  {
    name: "Shri Rajesh Kumar",
    designation: "Secretary General",
    message:
      "We believe in creating sustainable livelihoods for women across India through our comprehensive training and support programs.",
    photo: "/assets/generated/anshika-logo.dim_200x200.png",
  },
];

export default function AboutUs() {
  const { contentMap } = useAppContext();
  const leadership = (contentMap.leadership || DEFAULT_LEADERSHIP) as Array<{
    name: string;
    designation: string;
    message: string;
    photo: string;
  }>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <Badge className="bg-green-100 text-green-800 mb-3">About Us</Badge>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-green-900 mb-4">
          Anshika Udhyog Group
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Anshika Udhyog Group is a premier NGO dedicated to empowering rural
          women through skill development, self-employment training, and
          entrepreneurship support. Founded with the vision of making every
          woman financially independent, we operate across 15+ states in India.
        </p>
      </div>

      {/* Mission Vision Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <Target className="mx-auto mb-3 text-green-700" size={32} />
            <h3 className="font-bold text-green-900 text-lg mb-2">
              Our Mission
            </h3>
            <p className="text-sm text-gray-700">
              To provide quality skill training and entrepreneurship
              opportunities to rural women, enabling them to establish
              sustainable livelihoods.
            </p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <Eye className="mx-auto mb-3 text-blue-700" size={32} />
            <h3 className="font-bold text-blue-900 text-lg mb-2">Our Vision</h3>
            <p className="text-sm text-gray-700">
              A nation where every woman is financially independent, skilled,
              and empowered to contribute to her family and community.
            </p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6 text-center">
            <Heart className="mx-auto mb-3 text-yellow-700" size={32} />
            <h3 className="font-bold text-yellow-900 text-lg mb-2">
              Our Values
            </h3>
            <p className="text-sm text-gray-700">
              Integrity, Empowerment, Community Service, Transparency,
              Innovation, and Sustainable Development.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* History */}
      <div className="mb-12">
        <h2 className="font-display font-bold text-2xl text-green-900 mb-6">
          Our Story
        </h2>
        <div className="prose max-w-none text-gray-700 space-y-4">
          <p>
            Anshika Udhyog Group was established with a single powerful vision:
            to create a world where rural women can achieve financial
            independence through skill development and self-employment. Our
            founders recognized the immense potential within India's rural
            communities and set out to unlock it.
          </p>
          <p>
            Starting with just a handful of training centers in central India,
            the organization has grown to serve thousands of women across 15+
            states. Our comprehensive approach combines vocational training,
            microfinance support, market linkages, and ongoing mentorship.
          </p>
          <p>
            Today, Anshika Udhyog Group is recognized as a leading NGO in women
            empowerment, with government partnerships, corporate tie-ups, and a
            growing network of self-help groups and franchise partners.
          </p>
        </div>
      </div>

      {/* Leadership */}
      <div>
        <h2 className="font-display font-bold text-2xl text-green-900 mb-6">
          Our Leadership
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadership.map((leader, idx) => (
            <Card
              key={idx}
              className="hover:shadow-card-hover transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <img
                  src={
                    leader.photo ||
                    "/assets/generated/anshika-logo.dim_200x200.png"
                  }
                  alt={leader.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-green-200"
                />
                <h3 className="font-bold text-gray-900">{leader.name}</h3>
                <Badge className="bg-green-100 text-green-800 mt-1 mb-3">
                  {leader.designation}
                </Badge>
                <p className="text-sm text-gray-600 italic">
                  &quot;{leader.message}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
