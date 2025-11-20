import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Banknote, Package } from "lucide-react";

interface CheckoutFormData {
  fullName: string;
  phone: string;
  address: string;
  paymentMethod: "cash" | "card";
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
}

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 49.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    // Validate phone
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits)";
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Your order has been confirmed. Total: $${total.toFixed(2)}`,
      className: "bg-[#006A67] text-white",
    });

    clearCart();
    setIsSubmitting(false);
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          Home / Cart / <span className="text-foreground">Checkout</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Customer Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-foreground">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-foreground">
                        Delivery Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="123 Main St, Apt 4B, New York, NY 10001"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={4}
                        className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Payment Method
                  </h2>

                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value: "cash" | "card") =>
                      setFormData((prev) => ({ ...prev, paymentMethod: value }))
                    }
                  >
                    <div className="space-y-3">
                      <div
                        className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.paymentMethod === "cash"
                            ? "border-[#006A67] bg-[#006A67]/5"
                            : "border-border"
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, paymentMethod: "cash" }))
                        }
                      >
                        <RadioGroupItem value="cash" id="cash" />
                        <Label
                          htmlFor="cash"
                          className="flex-1 flex items-center cursor-pointer"
                        >
                          <Banknote className="h-5 w-5 mr-3 text-[#006A67]" />
                          <div>
                            <p className="font-medium text-foreground">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              Pay when you receive your order
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.paymentMethod === "card"
                            ? "border-[#006A67] bg-[#006A67]/5"
                            : "border-border"
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, paymentMethod: "card" }))
                        }
                      >
                        <RadioGroupItem value="card" id="card" />
                        <Label
                          htmlFor="card"
                          className="flex-1 flex items-center cursor-pointer"
                        >
                          <CreditCard className="h-5 w-5 mr-3 text-[#006A67]" />
                          <div>
                            <p className="font-medium text-foreground">Credit / Debit Card</p>
                            <p className="text-sm text-muted-foreground">
                              Pay securely with your card
                            </p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Summary
                  </h2>

                  {/* Products List */}
                  <div className="space-y-4 mb-6 border-b border-border pb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-[#006A67]">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#006A67] text-white hover:bg-[#005552]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
