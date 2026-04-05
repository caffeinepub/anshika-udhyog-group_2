import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { generateRefNumber } from "../utils/auth";

const DESIGNS = [
  "Classic Green",
  "Premium Gold",
  "Minimal Modern",
  "Government Style",
  "Blue Corporate",
  "Red Formal",
  "Tri-Color",
  "Dark Green",
  "Purple Gradient",
  "Newspaper Print",
];

const LETTER_TYPES = [
  "Appointment",
  "Experience",
  "NOC",
  "Approval",
  "Rejection",
  "Recommendation",
  "Notice",
  "Promotion",
  "Award",
  "Custom",
];

interface Letter {
  id: string;
  refNumber: string;
  date: string;
  letterType: string;
  issuedTo: string;
  issuedToDesignation: string;
  issuedBy: string;
  content: string;
  status: "draft" | "issued";
}

interface LetterheadSettings {
  orgName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  signatorName: string;
  signatorTitle: string;
  footerNote: string;
  signatureUrl: string;
  sealUrl: string;
  activeDesign: number;
}

export default function AdminOfficialLetters() {
  const { contentMap, saveContent } = useAppContext();
  const [activeTab, setActiveTab] = useState<
    "settings" | "templates" | "letters" | "new"
  >("settings");
  const lhSettings = (contentMap.letterhead_settings || {
    orgName: "Anshika Udhyog Group",
    tagline: "Empowering Women Through Self-Employment",
    address: "India",
    phone: "+91 83496 00835",
    email: "info@anshikaudhyog.org",
    website: "www.anshikaudhyog.org",
    signatorName: "Authorized Signatory",
    signatorTitle: "Director",
    footerNote: "This is an official document of Anshika Udhyog Group",
    signatureUrl: "",
    sealUrl: "",
    activeDesign: 0,
  }) as LetterheadSettings;
  const letters = (contentMap.official_letters || []) as Letter[];
  const [lhForm, setLhForm] = useState<LetterheadSettings>(lhSettings);
  const [newLetter, setNewLetter] = useState<Partial<Letter>>({
    letterType: "Appointment",
    date: new Date().toISOString().split("T")[0],
    refNumber: generateRefNumber("AUG"),
    status: "draft",
  });

  async function saveLhSettings() {
    await saveContent("letterhead_settings", lhForm);
    toast.success("Letterhead settings saved!");
  }

  async function saveLetter() {
    const letter: Letter = {
      id: `letter-${Date.now()}`,
      refNumber: newLetter.refNumber || generateRefNumber("AUG"),
      date: newLetter.date || new Date().toISOString().split("T")[0],
      letterType: newLetter.letterType || "Custom",
      issuedTo: newLetter.issuedTo || "",
      issuedToDesignation: newLetter.issuedToDesignation || "",
      issuedBy: newLetter.issuedBy || lhForm.signatorName,
      content: newLetter.content || "",
      status: "draft",
    };
    await saveContent("official_letters", [...letters, letter]);
    toast.success("Letter saved!");
    setActiveTab("letters");
  }

  function handleUpload(
    key: keyof LetterheadSettings,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setLhForm((p) => ({ ...p, [key]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl">Official Letters</h1>
      <div className="flex gap-2 flex-wrap">
        {(["settings", "templates", "letters", "new"] as const).map((tab) => (
          <Button
            key={tab}
            size="sm"
            variant={activeTab === tab ? "default" : "outline"}
            className={activeTab === tab ? "bg-green-700" : ""}
            onClick={() => setActiveTab(tab)}
            data-ocid={`letters.${tab}.tab`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {activeTab === "settings" && (
        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  "orgName",
                  "tagline",
                  "address",
                  "phone",
                  "email",
                  "website",
                  "signatorName",
                  "signatorTitle",
                  "footerNote",
                ] as const
              ).map((key) => (
                <div
                  key={key}
                  className={
                    ["address", "tagline", "footerNote"].includes(key)
                      ? "col-span-2"
                      : ""
                  }
                >
                  <label className="text-xs font-medium capitalize">
                    {key}
                  </label>
                  <input
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={lhForm[key] as string}
                    onChange={(e) =>
                      setLhForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium">
                  Authority Signature
                </label>
                {lhForm.signatureUrl && (
                  <img
                    src={lhForm.signatureUrl}
                    alt="Sig"
                    className="h-12 mb-1"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload("signatureUrl", e)}
                  data-ocid="letters.upload_button"
                />
              </div>
              <div>
                <label className="text-xs font-medium">Official Seal</label>
                {lhForm.sealUrl && (
                  <img src={lhForm.sealUrl} alt="Seal" className="h-12 mb-1" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload("sealUrl", e)}
                />
              </div>
            </div>
            <Button
              className="bg-green-700"
              onClick={saveLhSettings}
              data-ocid="letters.save_button"
            >
              Save Settings
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "templates" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {DESIGNS.map((design, idx) => (
            <Card
              key={idx}
              className={`cursor-pointer border-2 ${lhForm.activeDesign === idx ? "border-green-600" : "border-gray-200"}`}
              onClick={() => {
                setLhForm((p) => ({ ...p, activeDesign: idx }));
                saveLhSettings();
              }}
            >
              <CardContent className="p-3 text-center">
                <div className="w-full h-16 bg-gradient-to-br from-green-700 to-green-900 rounded mb-2 flex items-center justify-center text-white text-xs">
                  {idx + 1}
                </div>
                <p className="text-xs font-medium">{design}</p>
                {lhForm.activeDesign === idx && (
                  <span className="text-xs text-green-700">✓ Active</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "letters" && (
        <div className="space-y-3">
          {letters.length === 0 ? (
            <p
              className="text-muted-foreground"
              data-ocid="letters.empty_state"
            >
              No letters yet.
            </p>
          ) : (
            letters.map((letter, idx) => (
              <Card key={letter.id} data-ocid={`letters.item.${idx + 1}`}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold">
                      {letter.letterType} Letter
                    </div>
                    <div className="text-xs text-gray-500">
                      Ref: {letter.refNumber} | To: {letter.issuedTo} | Date:{" "}
                      {letter.date}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.print()}
                    className="bg-green-700"
                  >
                    Print
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === "new" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium">Reference Number</label>
                <input
                  className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                  value={newLetter.refNumber || ""}
                  onChange={(e) =>
                    setNewLetter((p) => ({ ...p, refNumber: e.target.value }))
                  }
                  data-ocid="letters.refnumber.input"
                />
              </div>
              <div>
                <label className="text-xs font-medium">Date</label>
                <input
                  type="date"
                  className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                  value={newLetter.date || ""}
                  onChange={(e) =>
                    setNewLetter((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium">Letter Type</label>
                <select
                  className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                  value={newLetter.letterType || ""}
                  onChange={(e) =>
                    setNewLetter((p) => ({ ...p, letterType: e.target.value }))
                  }
                >
                  {LETTER_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium">Issued To</label>
                <input
                  className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                  value={newLetter.issuedTo || ""}
                  onChange={(e) =>
                    setNewLetter((p) => ({ ...p, issuedTo: e.target.value }))
                  }
                  data-ocid="letters.issuedto.input"
                />
              </div>
              <div>
                <label className="text-xs font-medium">Designation</label>
                <input
                  className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                  value={newLetter.issuedToDesignation || ""}
                  onChange={(e) =>
                    setNewLetter((p) => ({
                      ...p,
                      issuedToDesignation: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium">Issued By</label>
                <input
                  className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                  value={newLetter.issuedBy || lhForm.signatorName}
                  onChange={(e) =>
                    setNewLetter((p) => ({ ...p, issuedBy: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">Content</label>
              <textarea
                className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                rows={8}
                value={newLetter.content || ""}
                onChange={(e) =>
                  setNewLetter((p) => ({ ...p, content: e.target.value }))
                }
                placeholder="Type the letter content here..."
                data-ocid="letters.content.textarea"
              />
            </div>
            <Button
              className="bg-green-700"
              onClick={saveLetter}
              data-ocid="letters.submit_button"
            >
              Save Letter
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import type React from "react";
