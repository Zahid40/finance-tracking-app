import { CircleArrowRight, Files, Settings } from "lucide-react";
import { AppLogo } from "../../../../const";
import Image from "next/image";

const About1 = () => {
  return (
    <section className="py-32">
      <div className="container flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-6xl font-medium lg:text-7xl">
            Empowering you to take control of your finances
          </h1>
          <p className="max-w-xl text-lg">
            Fintraz simplifies expense tracking, budget management, and
            financial insights to help you make informed decisions and reach
            your financial goals.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative size-full max-h-96 min-h-32 rounded-2xl object-cover">
            <Image
              src={AppLogo}
              alt="placeholder"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
            <p className="text-sm text-muted-foreground">OUR MISSION</p>
            <p className="text-lg font-medium">
              We believe that managing finances should be effortless and
              accessible to everyone. With Fintraz, tracking and planning your
              expenses is just a few taps away.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-medium md:text-5xl">
              Making finance management easier than ever
            </h2>
            <p className="text-muted-foreground">
              We’re committed to helping thousands of individuals take control
              of their finances. Here’s how Fintraz is transforming personal
              finance management.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Files className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Transparency in Tracking
              </h3>
              <p className="text-muted-foreground">
                Fintraz provides a clear view of your expenses, allowing you to
                see exactly where your money goes and make informed spending
                decisions.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <CircleArrowRight className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Goal-Oriented Saving
              </h3>
              <p className="text-muted-foreground">
                We focus on helping you reach your financial goals by offering
                tools to budget effectively, set savings targets, and track
                progress.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Settings className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Empowering Financial Independence
              </h3>
              <p className="text-muted-foreground">
                Fintraz is designed to empower you to make confident financial
                decisions, putting the control of your finances back in your
                hands.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-10 text-sm font-medium text-muted-foreground">
              JOIN OUR MISSION
            </p>
            <h2 className="mb-2.5 text-3xl font-medium md:text-5xl">
              Changing the way you manage money
            </h2>
          </div>
          <div className="space-y-6">
            <div className="relative size-full max-h-36 w-full rounded-xl object-cover">
              <Image
                src={AppLogo}
                alt="placeholder"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            <p className="text-muted-foreground mb-10">
              Join us on our mission to make finance tracking easy and
              accessible for everyone. If you’re passionate about transforming
              financial well-being, Fintraz is the right place for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About1;
