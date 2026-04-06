import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Star } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_EMPLOYMENT = {
  jobs: [
    {
      id: "1",
      title: "Production Supervisor",
      location: "Lucknow, UP",
      type: "Full Time",
      salary: "₹18,000-25,000/month",
      requirements: "Graduate, 2 years experience",
      isActive: true,
    },
    {
      id: "2",
      title: "Training Coordinator",
      location: "Bhopal, MP",
      type: "Full Time",
      salary: "₹20,000-30,000/month",
      requirements: "Graduate, Teaching experience",
      isActive: true,
    },
    {
      id: "3",
      title: "Field Officer",
      location: "Multiple Locations",
      type: "Full Time",
      salary: "₹15,000-22,000/month",
      requirements: "12th pass, Bike required",
      isActive: true,
    },
  ],
  stories: [
    {
      name: "Meena Devi",
      location: "Lucknow",
      story:
        "After completing agarbatti training, I started my own unit with 5 employees and earn ₹40,000/month.",
      income: "₹40,000/month",
    },
    {
      name: "Sunita Sharma",
      location: "Bhopal",
      story:
        "The soap making training transformed my life. I now supply to 20+ shops in my district.",
      income: "₹35,000/month",
    },
  ],
};

export default function Employment() {
  const { contentMap } = useAppContext();
  const empData = (contentMap.employment ||
    DEFAULT_EMPLOYMENT) as typeof DEFAULT_EMPLOYMENT;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-green-100 text-green-800 mb-3">
          Opportunities
        </Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Employment
        </h1>
        <p className="text-muted-foreground mt-2">
          Job opportunities and success stories from our community
        </p>
      </div>

      <h2 className="font-bold text-xl text-green-900 mb-4">
        Current Openings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {(empData.jobs || [])
          .filter((j) => j.isActive)
          .map((job, idx) => (
            <Card
              key={
                (job as any).id ||
                (job as any).title ||
                (job as any).label ||
                (job as any).name ||
                String(idx)
              }
              className="hover:shadow-card-hover transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{job.title}</CardTitle>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-gray-600 flex items-center gap-1">
                  <Briefcase size={12} /> {job.location}
                </p>
                <p className="font-semibold text-green-700">{job.salary}</p>
                <p className="text-gray-500">{job.requirements}</p>
                <button
                  type="button"
                  className="text-green-700 text-xs underline"
                >
                  Apply via Contact Form
                </button>
              </CardContent>
            </Card>
          ))}
      </div>

      <h2 className="font-bold text-xl text-green-900 mb-4">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(empData.stories || []).map((story, idx) => (
          <Card
            key={
              (story as any).id ||
              (story as any).title ||
              (story as any).label ||
              (story as any).name ||
              String(idx)
            }
            className="bg-green-50 border-green-200"
          >
            <CardContent className="p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={
                      (_ as any).id ||
                      (_ as any).title ||
                      (_ as any).label ||
                      (_ as any).name ||
                      String(i)
                    }
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">&quot;{story.story}&quot;</p>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">{story.name}</div>
                  <div className="text-sm text-gray-500">{story.location}</div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {story.income}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
