import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Check, Lock, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "pro";

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "jane.doe@university.edu",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const planInfo: Record<string, { name: string; price: string; features: string[] }> = {
    pro: {
      name: "Pro Plan",
      price: "$9.99/month",
      features: [
        "Unlimited documents",
        "Advanced AI assistant",
        "Unlimited study groups",
        "Priority support",
      ],
    },
    "pro max": {
      name: "Pro Max Plan",
      price: "$19.99/month",
      features: [
        "Everything in Pro",
        "AI tutoring sessions",
        "Custom study plans",
        "24/7 dedicated support",
      ],
    },
  };

  const currentPlan = planInfo[plan] || planInfo.pro;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Welcome to {currentPlan.name}! Your upgrade is complete and all premium
              features are now active.
            </p>
            <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-300">
                A confirmation email has been sent to {formData.email}
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <button
          onClick={() => navigate("/upgrade")}
          className="flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plans
        </button>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Complete Payment
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Details Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Card Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4532 1234 5678 9010"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Billing Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="ZIP"
                        className="px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your payment information is secure and encrypted. We never store your full card details.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
                >
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">✨</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {currentPlan.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly subscription
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {currentPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {currentPlan.price}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Tax</p>
                  <p className="font-semibold text-gray-900 dark:text-white">$0.80</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
                  <p className="font-semibold text-gray-900 dark:text-white">Total</p>
                  <p className="text-2xl font-bold text-primary">
                    {currentPlan.price.split("/")[0]}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✓ 30-day money-back guarantee. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
