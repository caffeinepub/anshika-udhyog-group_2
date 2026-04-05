import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { generateId } from "../utils/auth";

export default function Contact() {
  const { actor } = useActor();
  const { settings } = useAppContext();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitApplication({
        id: generateId(),
        applicationType: "contact",
        applicantName: form.name,
        applicantEmail: form.email,
        applicantPhone: form.phone,
        data: JSON.stringify(form),
        status: "pending",
        adminRemark: "",
        createdAt: BigInt(Date.now()),
      });
      setSubmitted(true);
      toast.success("Message sent!");
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-green-100 text-green-800 mb-3">Get in Touch</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Contact Us
        </h1>
        <p className="text-muted-foreground mt-2">
          We are here to help. Reach out to us anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-bold text-xl text-green-900 mb-4">
            Contact Information
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="text-green-600 mt-1 shrink-0" size={20} />
              <div>
                <div className="font-semibold">Address</div>
                <p className="text-gray-600 text-sm">{settings.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-green-600" size={20} />
              <div>
                <div className="font-semibold">Phone</div>
                <a
                  href={`tel:${settings.phone}`}
                  className="text-green-700 hover:underline"
                >
                  {settings.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-green-600" size={20} />
              <div>
                <div className="font-semibold">Email</div>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-green-700 hover:underline"
                >
                  {settings.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-green-600" size={20} />
              <div>
                <div className="font-semibold">Hours</div>
                <p className="text-gray-600 text-sm">
                  Monday - Saturday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">WhatsApp Us</h3>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Hi ANSHIKA UDHYOG GROUP")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-semibold text-green-800">
                  Message sent successfully!
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {(["name", "phone", "email", "subject"] as const).map((key) => (
                  <div key={key}>
                    <label className="text-sm font-medium capitalize">
                      {key}
                    </label>
                    <input
                      type={key === "email" ? "email" : "text"}
                      className="w-full mt-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                      value={form[key]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [key]: e.target.value }))
                      }
                      required
                      data-ocid={`contact.${key}.input`}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="w-full mt-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    data-ocid="contact.message.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-700 hover:bg-green-800"
                  data-ocid="contact.submit_button"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

import type React from "react";
