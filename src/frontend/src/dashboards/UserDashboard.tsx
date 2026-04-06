import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { generateId } from "../utils/auth";

export default function UserDashboard() {
  const { currentUser } = useAppContext();
  const { actor } = useActor();
  const [kycForm, setKycForm] = useState({
    aadhaarDoc: "",
    panDoc: "",
    photo: "",
    addressProof: "",
    bankDetails: "",
  });
  const [kycSubmitted, setKycSubmitted] = useState(false);
  const [loanForm, setLoanForm] = useState({
    loanType: "mudra",
    amount: "",
    purpose: "",
  });
  const [cart, setCart] = useState<
    Array<{ id: string; name: string; price: string }>
  >([]);
  const { contentMap } = useAppContext();
  const products = (contentMap.products || []) as Array<{
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    category: string;
    isActive: boolean;
  }>;

  const memberNo = `AUG${currentUser?.userId?.slice(-6).toUpperCase()}`;

  function handleFileToBase64(
    key: keyof typeof kycForm,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setKycForm((p) => ({ ...p, [key]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  async function submitKYC() {
    if (!actor || !currentUser) return;
    await actor.saveKyc({
      userId: currentUser.userId,
      ...kycForm,
      status: "pending",
      remark: "",
      updatedAt: BigInt(Date.now()),
    });
    setKycSubmitted(true);
    toast.success("KYC submitted! Awaiting approval.");
  }

  async function applyLoan() {
    if (!actor || !currentUser) return;
    await actor.submitApplication({
      id: generateId(),
      applicationType: `loan_${loanForm.loanType}`,
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
      applicantPhone: "",
      data: JSON.stringify(loanForm),
      status: "pending",
      adminRemark: "",
      createdAt: BigInt(Date.now()),
    });
    toast.success("Loan application submitted!");
  }

  const TABS = [
    { id: "overview", label: "Dashboard" },
    { id: "profile", label: "Profile" },
    { id: "kyc", label: "KYC" },
    { id: "idcard", label: "ID Card" },
    { id: "loan", label: "Loan" },
    { id: "shopping", label: "Shopping" },
    { id: "utilities", label: "Utilities" },
    { id: "wallet", label: "Wallet" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-green-800 text-white px-4 py-3 flex items-center gap-3">
        <img
          src="/assets/generated/anshika-logo.dim_200x200.png"
          alt="Logo"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="font-bold text-sm">Welcome, {currentUser?.name}</div>
          <div className="text-xs text-green-300">Member ID: {memberNo}</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <div className="overflow-x-auto">
            <TabsList className="flex w-max gap-1 mb-6">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="text-xs"
                  data-ocid={`user.${tab.id}.tab`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                ["Member Status", "Pending", "yellow"],
                ["KYC Status", "Not Submitted", "gray"],
                ["Wallet Balance", "₹0.00", "green"],
                ["Loan Status", "None", "blue"],
              ].map(([label, value, _color]) => (
                <Card key={label}>
                  <CardContent className="p-4">
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="font-bold mt-1">{value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent className="p-6">
                <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    ["Submit KYC", "kyc"],
                    ["Apply Loan", "loan"],
                    ["ID Card", "idcard"],
                    ["Shopping", "shopping"],
                  ].map(([label, _tab]) => (
                    <div
                      key={label}
                      className="bg-green-50 border border-green-200 rounded-lg p-4 text-center cursor-pointer hover:bg-green-100"
                    >
                      <div className="text-sm font-medium text-green-800">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["Name", currentUser?.name],
                    ["Email", currentUser?.email],
                    ["Member ID", memberNo],
                    ["Role", currentUser?.role],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span className="text-xs text-gray-500">{label}:</span>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc">
            <Card>
              <CardHeader>
                <CardTitle>KYC Submission</CardTitle>
              </CardHeader>
              <CardContent>
                {kycSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="font-semibold text-green-800">
                      KYC submitted! Awaiting admin verification.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(
                      ["aadhaarDoc", "panDoc", "photo", "addressProof"] as const
                    ).map((key) => (
                      <div key={key}>
                        <p className="text-sm font-medium capitalize">
                          {key.replace(/Doc|Proof/, " Document")}
                        </p>
                        {kycForm[key] && (
                          <img
                            src={kycForm[key]}
                            alt={key}
                            className="w-20 h-20 object-cover rounded mb-1"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => handleFileToBase64(key, e)}
                          className="block mt-1"
                          data-ocid={`kyc.${key}.upload_button`}
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="userdashboard_f1"
                      >
                        Bank Details
                      </label>
                      <textarea
                        id="userdashboard_f1"
                        className="w-full mt-1 border rounded px-3 py-2 text-sm"
                        rows={2}
                        value={kycForm.bankDetails}
                        onChange={(e) =>
                          setKycForm((p) => ({
                            ...p,
                            bankDetails: e.target.value,
                          }))
                        }
                        placeholder="Bank Name, Account No, IFSC"
                        data-ocid="kyc.bankdetails.textarea"
                      />
                    </div>
                    <Button
                      className="bg-green-700 hover:bg-green-800"
                      onClick={submitKYC}
                      data-ocid="kyc.submit_button"
                    >
                      Submit KYC
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="idcard">
            <Card>
              <CardHeader>
                <CardTitle>ID Card & Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-6 text-white w-80 mx-auto mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src="/assets/generated/anshika-logo.dim_200x200.png"
                      alt="Logo"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-bold text-sm">
                        Anshika Udhyog Group
                      </div>
                      <div className="text-xs opacity-70">Member ID Card</div>
                    </div>
                  </div>
                  <div className="font-bold text-xl">{currentUser?.name}</div>
                  <div className="text-sm opacity-80 capitalize">
                    {currentUser?.role}
                  </div>
                  <div className="mt-3 text-xs space-y-1">
                    <div>Member ID: {memberNo}</div>
                    <div>Valid: 2026</div>
                  </div>
                </div>
                <Button
                  className="mx-auto block bg-green-700"
                  onClick={() => window.print()}
                  data-ocid="idcard.print.button"
                >
                  Print ID Card
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loan">
            <Card>
              <CardHeader>
                <CardTitle>Apply for Loan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label
                    className="text-sm font-medium"
                    htmlFor="userdashboard_f2"
                  >
                    Loan Type
                  </label>
                  <select
                    id="userdashboard_f2"
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={loanForm.loanType}
                    onChange={(e) =>
                      setLoanForm((p) => ({ ...p, loanType: e.target.value }))
                    }
                    data-ocid="user.loan.select"
                  >
                    <option value="mudra">Mudra Loan (upto ₹10 Lakh)</option>
                    <option value="shg">SHG Loan (upto ₹3 Lakh)</option>
                    <option value="udhyog">Udhyog Loan (upto ₹50 Lakh)</option>
                  </select>
                </div>
                <div>
                  <label
                    className="text-sm font-medium"
                    htmlFor="userdashboard_f3"
                  >
                    Amount Required
                  </label>
                  <input
                    id="userdashboard_f3"
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={loanForm.amount}
                    onChange={(e) =>
                      setLoanForm((p) => ({ ...p, amount: e.target.value }))
                    }
                    placeholder="e.g. ₹50,000"
                    data-ocid="user.loan.amount.input"
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium"
                    htmlFor="userdashboard_f4"
                  >
                    Purpose
                  </label>
                  <textarea
                    id="userdashboard_f4"
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    rows={3}
                    value={loanForm.purpose}
                    onChange={(e) =>
                      setLoanForm((p) => ({ ...p, purpose: e.target.value }))
                    }
                    placeholder="Purpose of loan..."
                    data-ocid="user.loan.purpose.textarea"
                  />
                </div>
                <Button
                  className="bg-green-700 hover:bg-green-800"
                  onClick={applyLoan}
                  data-ocid="user.loan.submit_button"
                >
                  Submit Application
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shopping">
            <Card>
              <CardHeader>
                <CardTitle>Product Shopping</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {products
                    .filter((p) => p.isActive)
                    .map((product, idx) => (
                      <div
                        key={
                          (product as any).id ||
                          (product as any).title ||
                          (product as any).name ||
                          String(idx)
                        }
                        className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                      >
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                        )}
                        <div className="font-semibold text-sm">
                          {product.name}
                        </div>
                        <div className="text-green-700 font-bold">
                          {product.price}
                        </div>
                        <Button
                          size="sm"
                          className="w-full mt-2 bg-green-700 hover:bg-green-800 text-xs"
                          onClick={() => {
                            setCart((c) => [...c, product]);
                            toast.success("Added to cart!");
                          }}
                          data-ocid={`shopping.item.${idx + 1}`}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  {products.filter((p) => p.isActive).length === 0 && (
                    <p
                      className="col-span-3 text-muted-foreground"
                      data-ocid="shopping.empty_state"
                    >
                      No products available.
                    </p>
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-bold mb-3">
                      Cart ({cart.length} items)
                    </h3>
                    {cart.map((item, i) => (
                      <div
                        key={
                          (item as any).id ||
                          (item as any).title ||
                          (item as any).name ||
                          String(i)
                        }
                        className="flex justify-between text-sm py-1"
                      >
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                    <Button
                      className="w-full mt-3 bg-green-700"
                      onClick={() => {
                        toast.success("Order placed!");
                        setCart([]);
                      }}
                      data-ocid="shopping.submit_button"
                    >
                      Place Order
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilities">
            <UtilitiesPanel />
          </TabsContent>

          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <CardTitle>My Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl p-6 mb-6">
                  <div className="text-sm opacity-80">Available Balance</div>
                  <div className="font-bold text-3xl">₹0.00</div>
                  <div className="text-xs mt-1 opacity-70">{memberNo}</div>
                </div>
                <p
                  className="text-sm text-muted-foreground"
                  data-ocid="wallet.empty_state"
                >
                  No transactions yet. Contact admin to add funds.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function UtilitiesPanel() {
  const [selected, setSelected] = useState<{
    name: string;
    icon: string;
  } | null>(null);
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");

  const services = [
    { name: "Mobile Recharge", icon: "📱" },
    { name: "Electricity", icon: "⚡" },
    { name: "Water Bill", icon: "💧" },
    { name: "Gas Bill", icon: "🔥" },
    { name: "DTH/Net", icon: "📡" },
    { name: "Transport", icon: "🚌" },
  ];

  if (step === "success")
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-5xl mb-3">✅</div>
          <h3 className="font-bold text-xl text-green-800 mb-2">
            Payment Successful!
          </h3>
          <p className="text-sm text-gray-600">
            Transaction ID: AUG{Date.now().toString().slice(-8)}
          </p>
          <Button
            className="mt-4 bg-green-700"
            onClick={() => {
              setStep("form");
              setSelected(null);
              setAmount("");
            }}
          >
            New Transaction
          </Button>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Utilities & Bill Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {services.map((s) => (
            <button
              type="button"
              key={s.name}
              onClick={() => {
                setSelected(s);
                setStep("form");
              }}
              className={`text-center p-3 rounded-xl cursor-pointer border-2 transition-all bg-transparent ${
                selected?.name === s.name
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              data-ocid={`utilities.${s.name.toLowerCase().replace(/\s/g, "_")}.button`}
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="text-xs font-medium mt-1">{s.name}</div>
            </button>
          ))}
        </div>

        {selected && step === "form" && (
          <div className="space-y-3 max-w-sm">
            <h3 className="font-semibold">
              {selected.icon} {selected.name}
            </h3>
            <div>
              <label className="text-sm font-medium" htmlFor="userdashboard_f5">
                Account / Number
              </label>
              <input
                id="userdashboard_f5"
                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="Enter account/mobile number"
                data-ocid="utilities.account.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Amount</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {["99", "199", "299", "499", "999"].map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`px-3 py-1 rounded border text-sm ${amount === a ? "bg-green-700 text-white border-green-700" : "hover:border-green-500"}`}
                  >
                    ₹{a}
                  </button>
                ))}
              </div>
              <input
                className="w-full mt-2 border rounded px-3 py-2 text-sm"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Or enter custom amount"
                data-ocid="utilities.amount.input"
              />
            </div>
            <Button
              className="bg-green-700"
              onClick={() => setStep("confirm")}
              data-ocid="utilities.proceed.button"
            >
              Proceed
            </Button>
          </div>
        )}

        {selected && step === "confirm" && (
          <div className="space-y-4 max-w-sm">
            <h3 className="font-semibold">Confirm Payment</h3>
            <div className="bg-gray-50 rounded p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Service:</span>
                <span className="font-semibold">{selected.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Account:</span>
                <span className="font-semibold">{account}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold text-green-700">₹{amount}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-green-700 flex-1"
                onClick={() => setStep("success")}
                data-ocid="utilities.confirm.button"
              >
                Confirm Pay
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep("form")}
                data-ocid="utilities.cancel_button"
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import type React from "react";
