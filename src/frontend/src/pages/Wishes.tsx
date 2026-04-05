import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_WISHES = [
  {
    id: "1",
    name: "Hon. Collector, Lucknow",
    designation: "District Collector",
    organization: "Government of UP",
    message:
      "Anshika Udhyog Group's work in women empowerment is truly inspiring. Their training programs have transformed thousands of lives.",
    photo: "",
    date: "2026-01-15",
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    designation: "NGO Sector Leader",
    organization: "Women Welfare Society",
    message:
      "The dedication and commitment of Anshika Udhyog Group to uplifting rural women is commendable. Keep up the excellent work!",
    photo: "",
    date: "2026-02-10",
  },
];

export default function Wishes() {
  const { contentMap } = useAppContext();
  const wishes = (contentMap.wishes || DEFAULT_WISHES) as typeof DEFAULT_WISHES;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-pink-100 text-pink-800 mb-3">Messages</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Wishes & Messages
        </h1>
        <p className="text-muted-foreground mt-2">
          Words of appreciation from our supporters and partners
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishes.map((wish, idx) => (
          <Card
            key={idx}
            className="bg-gradient-to-br from-green-50 to-white border-green-100"
          >
            <CardContent className="p-6">
              <Quote className="text-green-300 mb-3" size={32} />
              <p className="text-gray-700 italic mb-4">
                &quot;{wish.message}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-lg">
                  {wish.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-green-900">{wish.name}</div>
                  <div className="text-sm text-gray-500">
                    {wish.designation}
                  </div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {wish.organization}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {wishes.length === 0 && (
          <p
            className="text-center text-muted-foreground py-20 col-span-2"
            data-ocid="wishes.empty_state"
          >
            No wishes available.
          </p>
        )}
      </div>
    </main>
  );
}
