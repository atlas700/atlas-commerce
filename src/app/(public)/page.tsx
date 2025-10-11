import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Heart,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Truck,
  Zap
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <main>
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                <Badge className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New Collection 2025
                </Badge>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
                  Discover Your
                  <span className="block bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100 bg-clip-text text-transparent">
                    Perfect Style
                  </span>
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                  Explore curated collections of premium fashion and lifestyle
                  products. Elevate your wardrobe with timeless pieces designed
                  for the modern individual.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 group"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View Collections
                  </Button>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                      50K+
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Happy Customers
                    </div>
                  </div>
                  <div className="h-12 w-px bg-neutral-200 dark:bg-neutral-700" />
                  <div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                      10K+
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Premium Products
                    </div>
                  </div>
                  <div className="h-12 w-px bg-neutral-200 dark:bg-neutral-700" />
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                      4.9
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative animate-in fade-in slide-in-from-right duration-700">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl dark:shadow-neutral-900/50 transition-all duration-300 hover:-translate-y-2 bg-neutral-100 dark:bg-neutral-800">
                    <div className="aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 relative">
                      <img
                        src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Fashion"
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                        New
                      </Badge>
                    </div>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl dark:shadow-neutral-900/50 transition-all duration-300 hover:-translate-y-2 mt-8 bg-neutral-100 dark:bg-neutral-800">
                    <div className="aspect-[3/4] bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 relative">
                      <img
                        src="https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Fashion"
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-4 left-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900">
                        Trending
                      </Badge>
                    </div>
                  </Card>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-xl dark:shadow-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                      <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Flash Sale
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        Up to 60% Off
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border-0 shadow-sm hover:shadow-md dark:shadow-neutral-900/50 transition-shadow bg-white dark:bg-neutral-800/50">
                <div className="bg-neutral-100 dark:bg-neutral-700/50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-7 w-7 text-neutral-900 dark:text-neutral-100" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  Free Shipping
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  On orders over $100. Fast and reliable delivery to your
                  doorstep.
                </p>
              </Card>
              <Card className="p-8 border-0 shadow-sm hover:shadow-md dark:shadow-neutral-900/50 transition-shadow bg-white dark:bg-neutral-800/50">
                <div className="bg-neutral-100 dark:bg-neutral-700/50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-neutral-900 dark:text-neutral-100" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  Secure Payment
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  100% secure transactions. Your data is always protected.
                </p>
              </Card>
              <Card className="p-8 border-0 shadow-sm hover:shadow-md dark:shadow-neutral-900/50 transition-shadow bg-white dark:bg-neutral-800/50">
                <div className="bg-neutral-100 dark:bg-neutral-700/50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-neutral-900 dark:text-neutral-100" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  Easy Returns
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  30-day return policy. Shop with confidence and peace of mind.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <Badge className="mb-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-0">
                  Featured
                </Badge>
                <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                  Trending Products
                </h2>
              </div>
              <Button variant="ghost" className="hidden sm:flex">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=600",
                  name: "Premium Leather Jacket",
                  price: 299,
                  rating: 4.8,
                },
                {
                  img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
                  name: "Classic White Sneakers",
                  price: 129,
                  rating: 4.9,
                },
                {
                  img: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600",
                  name: "Designer Sunglasses",
                  price: 199,
                  rating: 4.7,
                },
                {
                  img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
                  name: "Smart Watch Elite",
                  price: 399,
                  rating: 4.9,
                },
              ].map((product, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-0 shadow-sm hover:shadow-xl dark:shadow-neutral-900/50 transition-all duration-300 bg-white dark:bg-neutral-800/50"
                >
                  <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-700/50 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge className="absolute bottom-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                      Best Seller
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {product.rating}
                      </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        (128)
                      </span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        ${product.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-950 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-white/10 text-white hover:bg-white/20 border-0">
                  Limited Offer
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Get 25% Off Your First Order
                </h2>
                <p className="text-lg text-neutral-300">
                  Subscribe to our newsletter and receive exclusive deals, early
                  access to new collections, and style inspiration.
                </p>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-neutral-400"
                  />
                  <Button className="bg-white text-neutral-900 hover:bg-neutral-100">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-neutral-400">
                  Join 50,000+ subscribers. Unsubscribe anytime.
                </p>
              </div>
              <div className="relative hidden lg:block">
                <div className="aspect-square bg-white/5 rounded-3xl p-8">
                  <img
                    src="https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Newsletter"
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
