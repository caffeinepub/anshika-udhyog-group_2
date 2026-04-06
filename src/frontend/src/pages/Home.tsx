import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Building2, MapPin, Play, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import { useAppContext } from "../context/AppContext";

const DEFAULT_SCHEMES = [
  {
    title: "PM Mudra Yojana",
    desc: "Loan upto \u20b910 Lakh for small businesses",
    icon: "\ud83c\udfe6",
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Startup India",
    desc: "Government support for new entrepreneurs",
    icon: "\ud83d\ude80",
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "PM SVANidhi",
    desc: "Working capital loan for street vendors",
    icon: "\ud83d\udc9c",
    color: "bg-pink-50 border-pink-200",
  },
  {
    title: "NRLM",
    desc: "National Rural Livelihood Mission",
    icon: "\ud83c\udf3f",
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Stand Up India",
    desc: "For SC/ST and women entrepreneurs",
    icon: "\u2b50",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    title: "PMEGP",
    desc: "Prime Minister Employment Generation Programme",
    icon: "\ud83d\udcca",
    color: "bg-orange-50 border-orange-200",
  },
];

const DEFAULT_INITIATIVES = [
  {
    icon: "\ud83e\uddfa",
    title: "Agarbatti Making",
    desc: "Learn traditional incense making",
    image: "",
  },
  {
    icon: "\ud83d\udd6f\ufe0f",
    title: "Candle Making",
    desc: "Decorative & aromatic candles",
    image: "",
  },
  {
    icon: "\ud83e\uddf4",
    title: "Soap Making",
    desc: "Herbal & organic soaps",
    image: "",
  },
  {
    icon: "\ud83e\udd63",
    title: "Pickle Making",
    desc: "Traditional Indian pickles",
    image: "",
  },
  {
    icon: "\u2702\ufe0f",
    title: "Tailoring",
    desc: "Garment stitching & design",
    image: "",
  },
  {
    icon: "\ud83d\udcbb",
    title: "Computer Basics",
    desc: "Digital literacy program",
    image: "",
  },
];

export default function Home() {
  const { contentMap } = useAppContext();
  const sliderData = (contentMap.slider || []) as Array<{
    id: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    isActive: boolean;
  }>;
  const youtubeData = (contentMap.youtube || []) as Array<{
    id: string;
    url: string;
    title: string;
    isActive: boolean;
  }>;
  const reviewsData = (contentMap.reviews_cache || []) as Array<{
    id: string;
    reviewerName: string;
    rating: number;
    comment: string;
  }>;
  const homeCards = (contentMap.home_cards || DEFAULT_INITIATIVES) as Array<{
    icon: string;
    title: string;
    desc: string;
    image?: string;
  }>;
  const schemesData = (contentMap.schemes || DEFAULT_SCHEMES) as Array<{
    title: string;
    desc: string;
    icon: string;
    color: string;
  }>;

  // CMS stats
  const statsData = (contentMap.stats || {
    members: "5000+",
    centers: "50+",
    programs: "20+",
    states: "15+",
  }) as Record<string, string>;

  // Hero image from admin
  const heroImage = (contentMap.hero_image || "") as string;

  function getYoutubeId(url: string) {
    const match = url.match(/(?:v=|youtu\.be\/)([^&?\s]+)/);
    return match ? match[1] : "";
  }

  const activeYoutube = youtubeData.filter((v) => v.isActive);

  return (
    <main>
      {/* Slider — inject custom hero image if set */}
      {heroImage && sliderData.length === 0 ? (
        <div
          className="relative w-full h-64 sm:h-96 overflow-hidden"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">
                {(contentMap.hero_text as string) ||
                  "Empowering Women Through Self-Employment"}
              </h1>
              <p className="text-sm sm:text-base text-white/80">
                Anshika Udhyog Group
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ImageSlider slides={sliderData.length > 0 ? sliderData : undefined} />
      )}

      {/* Stats Strip */}
      <div className="bg-green-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-bold text-2xl">
              {statsData.members || "5000+"}
            </div>
            <div className="text-xs text-green-200">Members</div>
          </div>
          <div>
            <div className="font-bold text-2xl">
              {statsData.centers || "50+"}
            </div>
            <div className="text-xs text-green-200">Centers</div>
          </div>
          <div>
            <div className="font-bold text-2xl">
              {statsData.programs || "20+"}
            </div>
            <div className="text-xs text-green-200">Programs</div>
          </div>
          <div>
            <div className="font-bold text-2xl">
              {statsData.states || "15+"}
            </div>
            <div className="text-xs text-green-200">States</div>
          </div>
        </div>
      </div>

      {/* Core Initiatives */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge className="bg-green-100 text-green-800 mb-2">
            Our Programs
          </Badge>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-green-900">
            Core Initiatives
          </h2>
          <p className="text-muted-foreground mt-2">
            Skill development programs for rural women empowerment
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {homeCards.map((card, idx) => (
            <Card
              key={card.title || String(idx)}
              className="text-center hover:shadow-card-hover transition-shadow cursor-pointer border-green-100"
            >
              <CardContent className="p-4">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-16 object-cover rounded mb-2"
                  />
                ) : (
                  <div className="text-3xl mb-2">{card.icon}</div>
                )}
                <div className="font-semibold text-sm text-green-800">
                  {card.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {card.desc}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Government Schemes */}
      <section className="bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="bg-green-100 text-green-800 mb-2">
              Government Support
            </Badge>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-green-900">
              Available Schemes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemesData.slice(0, 6).map((scheme, idx) => (
              <div
                key={scheme.title || String(idx)}
                className={`rounded-xl border p-5 ${scheme.color || "bg-white border-gray-200"}`}
              >
                <div className="text-2xl mb-2">{scheme.icon}</div>
                <h3 className="font-semibold text-gray-900">{scheme.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{scheme.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/schemes">
              <Button className="bg-green-700 hover:bg-green-800">
                View All Schemes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Videos */}
      {activeYoutube.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Badge className="bg-red-100 text-red-800 mb-2">Videos</Badge>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-green-900">
              Watch & Learn
            </h2>
          </div>
          {activeYoutube.length === 1 ? (
            <div className="max-w-2xl mx-auto aspect-video">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src={`https://www.youtube.com/embed/${getYoutubeId(activeYoutube[0].url)}`}
                title={activeYoutube[0].title}
                allowFullScreen
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeYoutube.map((video, idx) => (
                <div key={video.id || String(idx)} className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-xl shadow"
                    src={`https://www.youtube.com/embed/${getYoutubeId(video.url)}`}
                    title={video.title}
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Reviews */}
      {reviewsData.length > 0 && (
        <section className="bg-green-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <Badge className="bg-yellow-100 text-yellow-800 mb-2">
                Testimonials
              </Badge>
              <h2 className="font-display font-bold text-2xl text-green-900">
                What People Say
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewsData.slice(0, 6).map((review, idx) => (
                <Card key={review.id || String(idx)}>
                  <CardContent className="p-5">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((starNum) => (
                        <Star
                          key={starNum}
                          size={14}
                          className={
                            starNum <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">
                      &quot;{review.comment}&quot;
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-xs">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <span className="font-semibold text-sm">
                        {review.reviewerName}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Franchise CTA */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
            Start Your Franchise Today
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join Anshika Udhyog Group and build your own business with our
            complete support system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/franchise">
              <Button
                size="lg"
                className="bg-white text-green-800 hover:bg-green-50 font-bold"
                data-ocid="home.primary_button"
              >
                Apply for Franchise
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Write a Review */}
      <ReviewForm />
    </main>
  );
}

function ReviewForm() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    await actor.submitReview({
      id: `rev-${Date.now()}`,
      reviewerName: name,
      rating: BigInt(rating),
      comment,
      isApproved: false,
      createdAt: BigInt(Date.now()),
    });
    setSubmitted(true);
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-6">
        <h2 className="font-display font-bold text-2xl text-green-900">
          Share Your Experience
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Your feedback helps us improve our services
        </p>
      </div>
      {submitted ? (
        <div className="text-center p-8 bg-green-50 rounded-xl">
          <div className="text-4xl mb-3">\u2705</div>
          <p className="font-semibold text-green-800">
            Thank you! Your review has been submitted for approval.
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium" htmlFor="lbl_1">
                  Your Name
                </label>
                <input
                  id="lbl_1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your name"
                  data-ocid="review.input"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Rating</p>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button type="button" key={r} onClick={() => setRating(r)}>
                      <Star
                        size={24}
                        className={
                          r <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="lbl_2">
                  Comment
                </label>
                <textarea
                  id="lbl_2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={3}
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Share your experience..."
                  data-ocid="review.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800"
                data-ocid="review.submit_button"
              >
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

import type React from "react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
