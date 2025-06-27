import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      {
        title: "Overview",
        href: "#",
      },
      {
        title: "Features",
        href: "#",
      },
      {
        title: "Solutions",
        href: "#",
      },
      {
        title: "Tutorials",
        href: "#",
      },
      {
        title: "Pricing",
        href: "#",
      },
      {
        title: "Releases",
        href: "#",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        title: "About us",
        href: "#",
      },
      {
        title: "Careers",
        href: "#",
      },
      {
        title: "Press",
        href: "#",
      },
      {
        title: "News",
        href: "#",
      },
      {
        title: "Media kit",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Blog",
        href: "#",
      },
      {
        title: "Newsletter",
        href: "#",
      },
      {
        title: "Events",
        href: "#",
      },
      {
        title: "Help centre",
        href: "#",
      },
      {
        title: "Tutorials",
        href: "#",
      },
      {
        title: "Support",
        href: "#",
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        title: "Twitter",
        href: "#",
      },
      {
        title: "LinkedIn",
        href: "#",
      },
      {
        title: "Facebook",
        href: "#",
      },
      {
        title: "GitHub",
        href: "#",
      },
      {
        title: "AngelList",
        href: "#",
      },
      {
        title: "Dribbble",
        href: "#",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        title: "Terms",
        href: "#",
      },
      {
        title: "Privacy",
        href: "#",
      },
      {
        title: "Cookies",
        href: "#",
      },
      {
        title: "Licenses",
        href: "#",
      },
      {
        title: "Settings",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6 xl:px-0">
          <div className="col-span-full xl:col-span-2">
            {/* Logo */}
            <h1 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              TWBlocks™
            </h1>

            <p className="mt-4 text-background/75">
              Design amazing digital experiences that create more happy in the
              world.
            </p>
          </div>

          {footerSections.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h2 className="font-semibold text-lg">{title}</h2>
              <ul className="mt-6 space-y-4">
                {links.map(({ title: linkTitle, href }) => (
                  <li key={linkTitle}>
                    <Link
                      href={href}
                      className="text-background/75"
                      aria-label={linkTitle}
                    >
                      {linkTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()} {" "}
            <Link href="/" target="_blank" aria-label="Shadcn UI Blocks homepage">
              Shadcn UI Blocks
            </Link>
            . All rights reserved.
          </span>

          <ul className="flex items-center gap-5 text-muted-foreground">
            <li>
              <Link href="#" target="_blank" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link href="#" target="_blank" aria-label="Dribbble">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link href="#" target="_blank" aria-label="Twitch">
                <TwitchIcon className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link href="#" target="_blank" aria-label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
