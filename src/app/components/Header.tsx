import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RESUME_DATA } from "@/data/resume-data";
import React from "react";

interface LocationLinkProps {
  location: typeof RESUME_DATA.location;
  locationLink: typeof RESUME_DATA.locationLink;
}

function LocationLink({ location, locationLink }: LocationLinkProps) {
  return (
    <p className="max-w-md items-center text-pretty font-mono text-xs text-foreground">
      <a
        className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
        href={locationLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Location: ${location}`}
      >
        <GlobeIcon className="size-3" aria-hidden="true" />
        {location}
      </a>
    </p>
  );
}

interface SocialButtonProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

function SocialButton({ href, icon: Icon, label }: SocialButtonProps) {
  return (
    <Button className="size-8" variant="outline" size="icon" asChild>
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

interface ContactButtonsProps {
  contact: typeof RESUME_DATA.contact;
  personalWebsiteUrl?: string;
}

function ContactButtons({ contact, personalWebsiteUrl }: ContactButtonsProps) {
  return (
    <div
      className="flex gap-x-1 pt-1 font-mono text-sm text-foreground/80 print:hidden"
      role="list"
      aria-label="Contact links"
    >
      {personalWebsiteUrl && (
        <SocialButton
          href={personalWebsiteUrl}
          icon={GlobeIcon}
          label="Personal website"
        />
      )}
      {contact.email && (
        <SocialButton
          href={`mailto:${contact.email}`}
          icon={MailIcon}
          label="Email"
        />
      )}
      {contact.tel && (
        <SocialButton
          href={`tel:${contact.tel}`}
          icon={PhoneIcon}
          label="Phone"
        />
      )}
      {contact.social.map((social) => (
        <SocialButton
          key={social.name}
          href={social.url}
          icon={social.icon}
          label={social.name}
        />
      ))}
    </div>
  );
}

interface PrintContactProps {
  contact: typeof RESUME_DATA.contact;
  personalWebsiteUrl?: string;
}

function PrintContact({ contact, personalWebsiteUrl }: PrintContactProps) {
  // 收集所有要展示的信息
  const baseItems: React.ReactNode[] = [];
  const socialItems: React.ReactNode[] = [];

  if (personalWebsiteUrl) {
    baseItems.push(
      <a
        className="underline hover:text-foreground/70"
        href={personalWebsiteUrl}
        key="website"
      >
        {new URL(personalWebsiteUrl).hostname}
      </a>
    );
  }
  if (contact.email) {
    baseItems.push(
      <a
        className="underline hover:text-foreground/70"
        href={`mailto:${contact.email}`}
        key="email"
      >
        {contact.email}
      </a>
    );
  }
  if (contact.tel) {
    baseItems.push(
      <a
        className="underline hover:text-foreground/70"
        href={`tel:${contact.tel}`}
        key="tel"
      >
        {contact.tel}
      </a>
    );
  }
  if (contact.social?.length) {
    contact.social.forEach((social) => {
      socialItems.push(
        <a
          className="underline hover:text-foreground/70"
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          key={social.name}
        >
          <span className="print:hidden">{social.name}</span>
          <span className="hidden print:inline whitespace-nowrap">{social.name}: {social.url}</span>
        </a>
      );
    });
  }

  return (
    <div
      className="hidden gap-x-2 font-mono text-sm text-foreground/80 print:block print:text-[12px]"
      aria-label="Print contact information"
    >
      {/* 基本信息一行 */}
      {baseItems.map((item, idx) => (
        <React.Fragment key={idx}>
          {item}
          {idx < baseItems.length - 1 && <span aria-hidden="true"> / </span>}
        </React.Fragment>
      ))}
      {/* 分隔符（仅当有 baseItems 和 socialItems 时，且仅屏幕显示） */}
      {baseItems.length > 0 && socialItems.length > 0 && <span aria-hidden="true" className="print:hidden"> / </span>}
      {/* 社交信息，屏幕时 inline，打印时每项单独一行 */}
      {socialItems.length > 0 && (
        <div className="inline print:block print:w-full">
          {socialItems.map((item, idx) => (
            <span key={idx} className="inline print:block">
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}


/**
 * Header component displaying personal information and contact details
 */
export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex-1 space-y-1.5">
        <h1 className="text-2xl font-bold" id="resume-name">
          {RESUME_DATA.name}
        </h1>
        <p
          className="max-w-md text-pretty font-mono text-sm text-foreground/80 print:text-[12px]"
          aria-labelledby="resume-name"
        >
          {RESUME_DATA.about}
        </p>

        <LocationLink
          location={RESUME_DATA.location}
          locationLink={RESUME_DATA.locationLink}
        />

        <ContactButtons
          contact={RESUME_DATA.contact}
          personalWebsiteUrl={RESUME_DATA.personalWebsiteUrl}
        />

        <PrintContact
          contact={RESUME_DATA.contact}
          personalWebsiteUrl={RESUME_DATA.personalWebsiteUrl}
        />
      </div>

      <Avatar className="size-28" aria-hidden="true">
        <AvatarImage
          alt={`${RESUME_DATA.name}'s profile picture`}
          src={RESUME_DATA.avatarUrl.src}
        />
        <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
      </Avatar>
    </header>
  );
}
