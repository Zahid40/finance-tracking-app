import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  AppDeveloper, AppGithubUsername } from "../../../../const";
import Link from "next/link";

const AuthorsWord = () => {
  return (
    <section className="py-8 ">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <p className="mb-4 max-w-4xl px-8 font-normal lg:text-lg">
          “ We&apos;re not saving your data because, well... databases are
            expensive! So, we do the next best thing: we give your data a cozy
            30-day vacation, then wave goodbye as it rides off into the digital
            sunset! 🌅💸 ”
          </p>
          <Link href={AppDeveloper.website} className="flex items-center gap-2 md:gap-4">
            <Avatar className="size-12 md:size-16" >
              <AvatarImage
                src={`https://github.com/${AppGithubUsername}.png`}
              />
              <AvatarFallback>Z</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium md:text-base">{AppDeveloper.name}</p>
              <p className="text-sm text-muted-foreground md:text-base">{AppDeveloper.role}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthorsWord;
