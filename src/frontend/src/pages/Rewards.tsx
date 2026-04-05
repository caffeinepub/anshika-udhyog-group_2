import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_REWARDS = {
  awards: [
    {
      id: "1",
      title: "Best Woman Entrepreneur Award 2025",
      category: "Entrepreneurship",
      desc: "Recognized by State Government for outstanding contribution to women empowerment",
      icon: "🏆",
    },
    {
      id: "2",
      title: "NGO Excellence Award 2024",
      category: "Social Impact",
      desc: "National award for best practices in rural women development",
      icon: "🧑‍💼",
    },
  ],
  winners: [
    {
      name: "Radha Devi",
      award: "Best Producer 2025",
      location: "Lucknow",
      photo: "",
    },
    {
      name: "Kamla Singh",
      award: "Top Trainer 2025",
      location: "Bhopal",
      photo: "",
    },
    {
      name: "Savita Sharma",
      award: "Best Entrepreneur 2024",
      location: "Patna",
      photo: "",
    },
  ],
};

export default function Rewards() {
  const { contentMap } = useAppContext();
  const rewardsData = (contentMap.rewards ||
    DEFAULT_REWARDS) as typeof DEFAULT_REWARDS;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-yellow-100 text-yellow-800 mb-3">
          Recognition
        </Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Awards & Rewards
        </h1>
        <p className="text-muted-foreground mt-2">
          Celebrating excellence in our community
        </p>
      </div>

      <h2 className="font-bold text-xl text-green-900 mb-4">Our Awards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {(rewardsData.awards || []).map((award, idx) => (
          <Card key={idx} className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{award.icon}</span>
                <div>
                  <CardTitle className="text-base">{award.title}</CardTitle>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {award.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{award.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="font-bold text-xl text-green-900 mb-4">Award Winners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(rewardsData.winners || []).map((winner, idx) => (
          <Card key={idx} className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center mx-auto mb-3">
                <Trophy size={24} className="text-green-800" />
              </div>
              <h3 className="font-bold">{winner.name}</h3>
              <Badge className="bg-green-100 text-green-800 mt-1">
                {winner.award}
              </Badge>
              <p className="text-sm text-gray-500 mt-2">{winner.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
