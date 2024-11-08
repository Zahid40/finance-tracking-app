import { PersonStanding, Timer, Zap, ZoomIn } from "lucide-react";

const Features = () => {
    return (
      <section className="py-8">
        <div className="container">
          <p className="mb-4 text-xs text-muted-foreground">Why Choose Fintraz?</p>
          <h2 className="text-3xl font-medium lg:text-4xl">
            A Smarter Way to Manage Your Finances
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-2">
            <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                <Timer className="size-5 md:size-6" />
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  Fast Tracking
                  <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Track your expenses instantly with a user-friendly interface designed to save you time.
                </p>
              </div>
            </div>
            <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                <Zap className="size-5 md:size-6" />
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  Innovative Features
                  <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Enjoy advanced tools for budgeting and custom expense tracking tailored to your needs.
                </p>
              </div>
            </div>
            <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                <ZoomIn className="size-5 md:size-6" />
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  High Quality Insights
                  <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Gain meaningful insights with easy-to-read charts and summaries of your spending patterns.
                </p>
              </div>
            </div>
            <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                <PersonStanding className="size-5 md:size-6" />
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  User-Friendly Accessibility
                  <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Designed for everyone, with intuitive navigation and tools accessible to all users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default Features;
  