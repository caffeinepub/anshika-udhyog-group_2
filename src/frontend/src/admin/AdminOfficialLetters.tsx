import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useState } from "react";
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

function getLetterTemplate(
  type: string,
  name: string,
  designation: string,
  date: string,
): string {
  const orgName = "Anshika Udhyog Group";
  switch (type) {
    case "Appointment":
      return `Dear ${name || "[Name]"},

We are pleased to inform you that you have been appointed as ${designation || "[Designation]"} at ${orgName}, effective from ${date || "[Date]"}.

You are expected to report to your respective department head on the date of joining. Please bring all original documents for verification.

Your role will involve responsibilities as outlined in your offer letter. We expect you to maintain the highest standards of professionalism and dedication.

We look forward to a long and fruitful association with you.

Congratulations and welcome to the ${orgName} family!`;

    case "Experience":
      return `To Whom It May Concern,

This is to certify that ${name || "[Name]"} was employed with ${orgName} in the capacity of ${designation || "[Designation]"}.

During their tenure, they demonstrated exceptional skills, dedication, and professionalism. They have consistently delivered high-quality work and been a valuable member of our team.

We wish them the very best in their future endeavors.

This certificate is issued in good faith upon their request.`;

    case "NOC":
      return `No Objection Certificate

This is to certify that ${name || "[Name]"}, ${designation || "[Designation]"} at ${orgName}, has no objection from our organization to pursue higher studies / another opportunity / passport application / any other personal requirement.

${orgName} has no objection to ${name || "the applicant"} availing any facility, service, or opportunity as required.

This No Objection Certificate is issued upon the request of the applicant and for the purpose stated above.`;

    case "Approval":
      return `Dear ${name || "[Name]"},

We are pleased to inform you that your application / request has been reviewed and approved by the competent authority.

Your application reference has been processed and all necessary approvals have been granted. You may proceed as per the terms and conditions agreed upon.

Please contact our office for any further clarifications or assistance.

Congratulations on the successful approval of your application.`;

    case "Rejection":
      return `Dear ${name || "[Name]"},

Thank you for your application and the interest shown in ${orgName}.

After careful consideration and due deliberation by our selection committee, we regret to inform you that we are unable to proceed with your application at this time.

This decision was made keeping in mind the current requirements and the available positions. We encourage you to apply again in the future.

We appreciate your time and effort, and wish you the best in your future endeavors.`;

    case "Recommendation":
      return `To Whom It May Concern,

It is with great pleasure and without any reservation that I recommend ${name || "[Name]"}, ${designation || "[Designation]"} at ${orgName}.

During their association with us, they have demonstrated excellent communication skills, strong work ethic, and commitment to excellence. They have been an asset to our organization.

I strongly recommend them for any position or opportunity that requires dedication, skill, and integrity. They will be a valuable addition to any team.

Feel free to contact us for any further information.`;

    case "Notice":
      return `NOTICE

Date: ${date || "[Date]"}

To: ${name || "All Concerned"}

Please be informed that the following matter requires your immediate attention:

[State the notice content here]

You are hereby directed to comply with the above notice within the stipulated time. Non-compliance may result in appropriate action.

For any queries, please contact the administration office.

This is an official notice and must be treated with urgency.`;

    case "Promotion":
      return `Dear ${name || "[Name]"},

Congratulations! It is with great pleasure that we inform you of your promotion to the position of ${designation || "[New Designation]"} at ${orgName}, effective ${date || "[Date]"}.

This promotion is in recognition of your outstanding performance, dedication, and significant contributions to the organization over the past period.

Your new responsibilities and revised compensation details will be shared separately. We have full confidence in your ability to excel in this new role.

Once again, congratulations on this well-deserved achievement. We look forward to your continued success.`;

    case "Award":
      return `AWARD CERTIFICATE

This is to certify that

${name || "[Name]"}
${designation || "[Designation]"}

has been awarded the title of

[Award Title]

in recognition of their outstanding contribution, dedication, and exemplary service to ${orgName}.

This award is presented with pride and appreciation for their remarkable achievements.

Presented on: ${date || "[Date]"}`;

    default:
      return "";
  }
}

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
    "settings" | "templates" | "letters" | "new" | "preview"
  >("settings");
  const sigUploadRef = useRef<HTMLInputElement>(null);
  const sealUploadRef = useRef<HTMLInputElement>(null);

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
    content: getLetterTemplate(
      "Appointment",
      "",
      "",
      new Date().toISOString().split("T")[0],
    ),
  });
  const [previewLetter, setPreviewLetter] = useState<Partial<Letter> | null>(
    null,
  );

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
    setPreviewLetter(letter);
    setActiveTab("preview");
  }

  function handleLetterTypeChange(type: string) {
    const template = getLetterTemplate(
      type,
      newLetter.issuedTo || "",
      newLetter.issuedToDesignation || "",
      newLetter.date || "",
    );
    setNewLetter((p) => ({ ...p, letterType: type, content: template }));
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

  function printLetter() {
    window.print();
  }

  const letterToPreview = previewLetter || newLetter;

  return (
    <>
      {/* Print CSS */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #letter-print-area, #letter-print-area * { visibility: visible !important; }
          #letter-print-area {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            margin: 0 !important;
          }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <div className="space-y-4">
        <h1 className="font-bold text-xl">Official Letters</h1>
        <div className="flex gap-2 flex-wrap">
          {(
            ["settings", "templates", "letters", "new", "preview"] as const
          ).map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant={activeTab === tab ? "default" : "outline"}
              className={activeTab === tab ? "bg-green-700" : ""}
              onClick={() => setActiveTab(tab)}
              data-ocid={`letters.${tab}.tab`}
            >
              {tab === "preview"
                ? "A4 Preview"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {/* Settings Tab */}
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
                    <label
                      className="text-xs font-medium capitalize"
                      htmlFor="lbl_1"
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      id="lbl_1"
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
                  <p className="text-xs font-medium">Authority Signature</p>
                  {lhForm.signatureUrl && (
                    <img
                      src={lhForm.signatureUrl}
                      alt="Sig"
                      className="h-12 mb-1"
                    />
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sigUploadRef.current?.click()}
                    data-ocid="letters.signature.upload_button"
                  >
                    Upload Signature
                  </Button>
                  <input
                    ref={sigUploadRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload("signatureUrl", e)}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium">Official Seal</p>
                  {lhForm.sealUrl && (
                    <img
                      src={lhForm.sealUrl}
                      alt="Seal"
                      className="h-12 mb-1"
                    />
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sealUploadRef.current?.click()}
                    data-ocid="letters.seal.upload_button"
                  >
                    Upload Seal
                  </Button>
                  <input
                    ref={sealUploadRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
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

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {DESIGNS.map((design, idx) => (
              <Card
                key={design}
                className={`cursor-pointer border-2 ${
                  lhForm.activeDesign === idx
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
                onClick={() => {
                  setLhForm((p) => ({ ...p, activeDesign: idx }));
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

        {/* Letters List Tab */}
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
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setPreviewLetter(letter);
                          setActiveTab("preview");
                        }}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setPreviewLetter(letter);
                          setActiveTab("preview");
                          setTimeout(() => window.print(), 300);
                        }}
                        className="bg-green-700"
                      >
                        Print / PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* New Letter Tab */}
        {activeTab === "new" && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium" htmlFor="lbl_2">
                    Reference Number
                  </label>
                  <input
                    id="lbl_2"
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={newLetter.refNumber || ""}
                    onChange={(e) =>
                      setNewLetter((p) => ({ ...p, refNumber: e.target.value }))
                    }
                    data-ocid="letters.refnumber.input"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium" htmlFor="lbl_3">
                    Date
                  </label>
                  <input
                    id="lbl_3"
                    type="date"
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={newLetter.date || ""}
                    onChange={(e) =>
                      setNewLetter((p) => ({ ...p, date: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-medium" htmlFor="lbl_4">
                    Letter Type
                  </label>
                  <select
                    id="lbl_4"
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={newLetter.letterType || ""}
                    onChange={(e) => handleLetterTypeChange(e.target.value)}
                    data-ocid="letters.type.select"
                  >
                    {LETTER_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium" htmlFor="lbl_5">
                    Issued To
                  </label>
                  <input
                    id="lbl_5"
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={newLetter.issuedTo || ""}
                    onChange={(e) =>
                      setNewLetter((p) => ({ ...p, issuedTo: e.target.value }))
                    }
                    data-ocid="letters.issuedto.input"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium" htmlFor="lbl_6">
                    Designation
                  </label>
                  <input
                    id="lbl_6"
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
                  <label className="text-xs font-medium" htmlFor="lbl_7">
                    Issued By
                  </label>
                  <input
                    id="lbl_7"
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={newLetter.issuedBy || lhForm.signatorName}
                    onChange={(e) =>
                      setNewLetter((p) => ({ ...p, issuedBy: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium">Content</p>
                  <button
                    type="button"
                    className="text-xs text-green-700 hover:underline"
                    onClick={() => {
                      const template = getLetterTemplate(
                        newLetter.letterType || "Custom",
                        newLetter.issuedTo || "",
                        newLetter.issuedToDesignation || "",
                        newLetter.date || "",
                      );
                      setNewLetter((p) => ({ ...p, content: template }));
                    }}
                  >
                    Auto-fill template
                  </button>
                </div>
                <textarea
                  className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                  rows={10}
                  value={newLetter.content || ""}
                  onChange={(e) =>
                    setNewLetter((p) => ({ ...p, content: e.target.value }))
                  }
                  placeholder="Type the letter content here..."
                  data-ocid="letters.content.textarea"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-green-700"
                  onClick={saveLetter}
                  data-ocid="letters.submit_button"
                >
                  Save Letter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("preview")}
                >
                  Preview A4
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* A4 Preview Tab */}
        {activeTab === "preview" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                className="bg-green-700"
                onClick={printLetter}
                data-ocid="letters.download.button"
              >
                📄 Download PDF / Print
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("new")}>
                ← Back to Edit
              </Button>
            </div>

            {/* A4 Container with scroll */}
            <div
              className="overflow-auto bg-gray-200 p-6 rounded-lg"
              style={{ maxHeight: "80vh" }}
            >
              <div
                id="letter-print-area"
                style={{
                  width: "794px",
                  minHeight: "1123px",
                  padding: "60px 70px",
                  background: "white",
                  fontFamily: "'Times New Roman', serif",
                  margin: "0 auto",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                  position: "relative",
                }}
              >
                {/* Letterhead Top */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 8,
                  }}
                >
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: 22,
                        color: "#15803d",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {lhForm.orgName}
                    </div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
                      {lhForm.tagline}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: 10,
                      color: "#666",
                      minWidth: 180,
                    }}
                  >
                    <div>{lhForm.address}</div>
                    <div>Ph: {lhForm.phone}</div>
                    <div>Email: {lhForm.email}</div>
                    <div>Web: {lhForm.website}</div>
                  </div>
                </div>

                {/* Green divider */}
                <div
                  style={{
                    height: 3,
                    background: "linear-gradient(to right, #15803d, #86efac)",
                    marginBottom: 4,
                  }}
                />
                <div
                  style={{
                    height: 1.5,
                    background: "#fbbf24",
                    marginBottom: 16,
                  }}
                />

                {/* Ref + Date */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    Ref:{" "}
                    <strong>
                      {letterToPreview.refNumber || generateRefNumber("AUG")}
                    </strong>
                  </div>
                  <div>
                    Date:{" "}
                    <strong>
                      {letterToPreview.date ||
                        new Date().toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                    </strong>
                  </div>
                </div>

                {/* To section */}
                <div style={{ marginBottom: 16, fontSize: 12 }}>
                  <div>
                    <strong>To,</strong>
                  </div>
                  <div>{letterToPreview.issuedTo || "[Recipient Name]"}</div>
                  {letterToPreview.issuedToDesignation && (
                    <div>{letterToPreview.issuedToDesignation}</div>
                  )}
                </div>

                {/* Subject */}
                <div style={{ marginBottom: 20, fontSize: 12 }}>
                  <strong>Subject:</strong>{" "}
                  <strong style={{ textDecoration: "underline" }}>
                    {letterToPreview.letterType} Letter
                    {letterToPreview.issuedTo
                      ? ` - ${letterToPreview.issuedTo}`
                      : ""}
                  </strong>
                </div>

                {/* Body */}
                <div
                  style={{
                    fontSize: 12,
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                    textAlign: "justify",
                    marginBottom: 40,
                    minHeight: 300,
                  }}
                >
                  {letterToPreview.content ||
                    "[Letter content will appear here]"}
                </div>

                {/* Signature block */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ fontSize: 12 }}>
                    <div>Yours faithfully,</div>
                    <div
                      style={{
                        height: 50,
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      {lhForm.signatureUrl ? (
                        <img
                          src={lhForm.signatureUrl}
                          alt="Signature"
                          style={{ height: 40 }}
                        />
                      ) : (
                        <div
                          style={{ width: 120, borderBottom: "1px solid #333" }}
                        />
                      )}
                    </div>
                    <div
                      style={{ fontWeight: "bold", fontSize: 12, marginTop: 4 }}
                    >
                      {letterToPreview.issuedBy || lhForm.signatorName}
                    </div>
                    <div style={{ fontSize: 11, color: "#666" }}>
                      {lhForm.signatorTitle}
                    </div>
                    <div style={{ fontSize: 11, color: "#666" }}>
                      {lhForm.orgName}
                    </div>
                  </div>

                  {lhForm.sealUrl && (
                    <img
                      src={lhForm.sealUrl}
                      alt="Seal"
                      style={{ width: 80, height: 80, objectFit: "contain" }}
                    />
                  )}
                </div>

                {/* Footer */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 30,
                    left: 70,
                    right: 70,
                    borderTop: "1.5px solid #15803d",
                    paddingTop: 8,
                    fontSize: 10,
                    color: "#666",
                    textAlign: "center",
                  }}
                >
                  {lhForm.footerNote}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import type React from "react";
