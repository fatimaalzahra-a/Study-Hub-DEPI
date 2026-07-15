import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Check, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Upgrade() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "Up to 5 documents",
        "Basic AI assistant",
        "Limited study groups",
        "5 study sessions/month",
        "Basic notifications",
      ],
      cta: "Current Plan",
      popular: false,
      disabled: true,
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? "$9.99" : "$99.99",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "For serious learners",
      features: [
        "Unlimited documents",
        "Advanced AI assistant",
        "Unlimited study groups",
        "Unlimited study sessions",
        "Advanced analytics",
        "Priority support",
        "Dark mode",
        "PDF annotations",
        "Study music library",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      disabled: false,
    },
    {
      name: "Pro Max",
      price: billingCycle === "monthly" ? "$19.99" : "$199.99",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "For power users",
      features: [
        "Everything in Pro",
        "AI tutoring sessions",
        "Custom study plans",
        "Advanced collaboration",
        "API access",
        "24/7 dedicated support",
        "Custom integrations",
        "White-label options",
      ],
      cta: "Upgrade to Pro Max",
      popular: false,
      disabled: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Unlock powerful features to supercharge your learning
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                billingCycle === "monthly"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-lg font-medium transition relative ${
                billingCycle === "yearly"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-8 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border transition ${
                plan.popular
                  ? "border-primary bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 relative md:scale-105"
                  : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {plan.period}
                  </span>
                </div>

                {/* CTA Button */}
                <Button
                  disabled={plan.disabled}
                  onClick={() =>
                    !plan.disabled && navigate(`/payment?plan=${plan.name.toLowerCase()}`)
                  }
                  className={`w-full mb-8 ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600"
                  } ${plan.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {plan.cta}
                  {!plan.disabled && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes! You can cancel your subscription at any time. No hidden fees or long-term contracts.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! Start with our Free plan and upgrade anytime. Try Pro features risk-free for 7 days.",
              },
              {
                q: "Do you offer student discounts?",
                a: "Absolutely! Students get 30% off all plans. Verify your student status at checkout.",
              },
            ].map((faq, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need help choosing a plan?
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="dark:border-slate-600"
          >
            Talk to Support
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
