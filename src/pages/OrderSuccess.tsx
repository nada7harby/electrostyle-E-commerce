import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Package } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Add confetti or celebration animation here
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-[#006A67]/20 shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#006A67]/20 rounded-full animate-ping"></div>
                  <div className="relative bg-[#006A67] rounded-full p-6">
                    <CheckCircle className="h-16 w-16 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Order Placed Successfully!
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been confirmed and will be delivered soon.
              </p>

              {/* Order Details Card */}
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                  <Package className="h-5 w-5" />
                  <span className="text-sm font-medium">Order Number</span>
                </div>
                <p className="text-2xl font-bold text-[#006A67] tracking-wider">
                  #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>

              {/* Information */}
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  📧 A confirmation email has been sent to your registered email address with order details and tracking information.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NavLink to="/" className="flex-1 sm:flex-none">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#006A67] text-white hover:bg-[#005552] px-8"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Button>
                </NavLink>
                
                <NavLink to="/products" className="flex-1 sm:flex-none">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto px-8"
                  >
                    Continue Shopping
                  </Button>
                </NavLink>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Need help? Contact our support team at{" "}
                  <a
                    href="mailto:support@electrostyle.com"
                    className="text-[#006A67] hover:underline font-medium"
                  >
                    support@electrostyle.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What's Next Section */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-[#006A67]/10 rounded-full p-3 w-fit mx-auto mb-3">
                  <Package className="h-6 w-6 text-[#006A67]" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Your order is being prepared for shipment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-[#006A67]/10 rounded-full p-3 w-fit mx-auto mb-3">
                  <svg
                    className="h-6 w-6 text-[#006A67]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m-4 0v1a1 1 0 001 1h2m-6 0h.01M19 17a2 2 0 104 0m-4 0a2 2 0 114 0m-4 0v1a1 1 0 001 1h2m-6 0h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Estimated delivery in 3-5 business days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-[#006A67]/10 rounded-full p-3 w-fit mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-[#006A67]" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Track Order</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking updates via email
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
