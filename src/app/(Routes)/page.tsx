import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { DollarSign, PieChart, Target, TrendingUp, Smartphone, BarChart, Zap, Users, Lock } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold mb-6">Take Control of Your Finances – Track Every Penny with Ease</h1>
          <p className="text-xl text-gray-600 mb-8">Manually add and track your expenses to get a clear overview of your spending habits.</p>
          <Button size="lg" className="bg-primary-500 hover:bg-primary-400 text-white">
            Get Started for Free
          </Button>
        </section>

        {/* Privacy Assurance Message */}
        <section className="bg-primary-100 dark:bg-primary-950 rounded-lg p-8 mb-20">
          <div className="flex items-center justify-center space-x-4">
            <Lock className="w-12 h-12 text-primary-600" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Your Data, Your Control</h2>
              <p className="text-gray-700 dark:text-white">
                We&apos;re not saving your data because, well... databases are expensive! So, we do the next best thing: we give your data a cozy 30-day vacation, then wave goodbye as it rides off into the digital sunset! 🌅💸
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              { title: "Add Transactions", icon: <DollarSign className="w-12 h-12 text-primary-600" />, description: "Manually add your income and expenses" },
              { title: "Track Spending", icon: <PieChart className="w-12 h-12 text-primary-600" />, description: "Get real-time overview of your financial health" },
              { title: "Set Goals", icon: <Target className="w-12 h-12 text-primary-600" />, description: "Manage savings goals and budget effectively" },
              { title: "Visualize Growth", icon: <TrendingUp className="w-12 h-12 text-primary-600" />, description: "See spending trends with monthly reports" },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="p-20 bg-secondary rounded-sm">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              { title: "Easy Expense Tracking", icon: <Smartphone className="w-8 h-8 text-primary-600" />, description: "Quickly add and categorize your expenses" },
              { title: "Customizable Categories", icon: <PieChart className="w-8 h-8 text-primary-600" />, description: "Create categories that fit your lifestyle" },
              { title: "Detailed Spending Reports", icon: <BarChart className="w-8 h-8 text-primary-600" />, description: "Visualize your spending patterns" },
              { title: "Privacy by Design", icon: <Lock className="w-8 h-8 text-primary-600" />, description: "Your data, deleted after 30 days" },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Data Privacy Emphasis */}
        <section className="py-20">
          <div className="bg-primary-200 dark:bg-primary-900 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Privacy is Our Priority</h2>
            <p className="text-xl text-center mb-8">
              We believe in absolute transparency and control over your financial data. That&apos;s why we&apos;ve designed our app with privacy at its core.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>No Permanent Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your sensitive financial data is never stored permanently on our servers. We keep your data only for as long as you need it, and not a second longer.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>30-Day Auto-Delete</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>After 30 days, your data takes a permanent vacation. This ensures that your financial history remains private and under your control.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Examples of Use Cases */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">How You Can Use FinZ</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Track Daily Expenses", icon: <DollarSign className="w-12 h-12 text-primary-600" />, description: "Keep tabs on your daily spending to identify areas for savings." },
              { title: "Save for a Vacation", icon: <Zap className="w-12 h-12 text-primary-600" />, description: "Set a savings goal and track your progress towards your dream getaway." },
              { title: "Manage Shared Expenses", icon: <Users className="w-12 h-12 text-primary-600" />, description: "Easily split and track shared costs with roommates or partners." },
            ].map((useCase, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-center mb-4">{useCase.icon}</div>
                  <CardTitle>{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* User Testimonials */}
        <section id="testimonials" className="py-20 ">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", quote: "FinZ helped me save for my first home without compromising my privacy. The 30-day data policy gives me peace of mind.", avatar: "/placeholder.svg?height=60&width=60" },
              { name: "Sarah Lee", quote: "I love how I can track my spending without worrying about my data being stored forever. It's the perfect balance of functionality and privacy.", avatar: "/placeholder.svg?height=60&width=60" },
              { name: "Mike Brown", quote: "As someone who values financial privacy, FinZ is a game-changer. I can budget effectively without feeling like my data is being mined.", avatar: "/placeholder.svg?height=60&width=60" },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Try It Yourself Section */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Experience FinZ Now</h2>
          
          <div className="text-center mt-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Sign Up and Start Tracking
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 ">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>How secure is my financial data?</AccordionTrigger>
              <AccordionContent>
                Your privacy is our top priority. We don&apos;t store your data permanently - all information is automatically deleted after 30 days. We use industry-standard encryption to protect your data during its brief stay with us.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is FinZ free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, FinZ is completely free to use. We believe everyone should have access to tools that help them manage their finances effectively.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I export my data before it&apos;s deleted?</AccordionTrigger>
              <AccordionContent>
                You can export your data at any time during the 30-day period. We provide easy-to-use export options so you can keep your records if needed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
  );
}
