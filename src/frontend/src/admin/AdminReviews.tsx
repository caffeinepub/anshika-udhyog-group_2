import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Review } from "../backend";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";

export default function AdminReviews() {
  const { actor } = useActor();
  const { saveContent } = useAppContext();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!actor) return;
    actor.getAllReviews().then(setReviews);
  }, [actor]);

  async function handleApprove(id: string) {
    if (!actor) return;
    await actor.approveReview(id);
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, isApproved: true } : r,
    );
    setReviews(updated);
    await saveContent(
      "reviews_cache",
      updated
        .filter((r) => r.isApproved)
        .map((r) => ({
          id: r.id,
          reviewerName: r.reviewerName,
          rating: Number(r.rating),
          comment: r.comment,
        })),
    );
    toast.success("Review approved!");
  }

  async function handleDelete(id: string) {
    if (!actor) return;
    await actor.deleteReview(id);
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    await saveContent(
      "reviews_cache",
      updated
        .filter((r) => r.isApproved)
        .map((r) => ({
          id: r.id,
          reviewerName: r.reviewerName,
          rating: Number(r.rating),
          comment: r.comment,
        })),
    );
    toast.success("Deleted!");
  }

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl">Reviews Management</h1>
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground" data-ocid="reviews.empty_state">
            No reviews yet.
          </p>
        ) : (
          reviews.map((review, idx) => (
            <Card key={review.id} data-ocid={`reviews.item.${idx + 1}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{review.reviewerName}</div>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < Number(review.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {review.comment}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge
                      className={
                        review.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {review.isApproved ? "Approved" : "Pending"}
                    </Badge>
                    {!review.isApproved && (
                      <Button
                        size="sm"
                        className="bg-green-600"
                        onClick={() => handleApprove(review.id)}
                        data-ocid={`reviews.confirm_button.${idx + 1}`}
                      >
                        <CheckCircle size={12} />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(review.id)}
                      data-ocid={`reviews.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
