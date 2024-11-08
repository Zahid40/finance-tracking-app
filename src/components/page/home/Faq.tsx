import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Badge } from "@/components/ui/badge"
  
  export default function FaqHome() {
    const faqs = [
      {
        question: "What is Fintraz?",
        answer: "Fintraz is a finance tracking app designed to help you monitor your daily expenses, manage budgets, and gain control over your financial health."
      },
      {
        question: "Why is tracking my expenses important?",
        answer: "Tracking expenses allows you to see where your money is going, helping you manage your budget, avoid overspending, and save for future goals."
      },
      {
        question: "How does Fintraz protect my privacy?",
        answer: "Fintraz values your privacy and doesn’t store your data permanently. Transactions are kept for 30 days before being automatically deleted."
      },
      {
        question: "Can I add custom categories to track specific expenses?",
        answer: "Yes! Fintraz allows you to create custom categories so you can track specific expenses, like loans or spending in different areas, such as groceries or entertainment."
      },
      {
        question: "Does Fintraz support different currencies?",
        answer: "Currently, Fintraz supports a single currency per account. Future updates may include multi-currency support based on user feedback."
      },
      {
        question: "How can Fintraz help me save money?",
        answer: "By providing insights into your spending habits, Fintraz helps you identify areas where you can cut back, set savings goals, and monitor your progress."
      },
      {
        question: "Is my data safe on Fintraz?",
        answer: "Absolutely. Fintraz uses secure methods to process and store your data temporarily. After 30 days, data is automatically removed to maintain privacy."
      },
      {
        question: "Can I track my loans or debts on Fintraz?",
        answer: "Yes, Fintraz has a feature for tracking loans and debts with specific individuals or institutions, making it easy to keep track of what you owe or are owed."
      },
      {
        question: "How does Fintraz display my financial data?",
        answer: "Fintraz provides clear charts and summaries on each category page, giving you quick insights into your spending patterns and remaining budgets."
      },
      {
        question: "What sets Fintraz apart from other finance apps?",
        answer: "Fintraz combines simplicity with powerful features tailored for effective finance tracking, offering a unique balance between ease of use and insightful analytics."
      }
    ]
  
    return (
      <section className="w-full px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="text-center space-y-2">
            <Badge variant="secondary" className="rounded-full">
              FAQ
            </Badge>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Common Questions & Answers
            </h2>
            <p className="text-muted-foreground">
              Find out all the essential details about how Fintraz can support your financial goals.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex gap-4 items-start">
                    <span className="text-sm text-muted-foreground">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }
  