import { useLocale, useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { mailtoLink, mapsLink, telLink } from "@/lib/utils";
import { loc, type Locale, type SiteSettings } from "@/sanity/types";

export function Footer({ settings }: { settings?: SiteSettings }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const locale = useLocale() as Locale;
  const brand = loc(settings?.brand, locale);
  const address = loc(settings?.address, locale);
  const phoneDisplay = settings?.phoneDisplay || "";
  const phoneTel = settings?.phoneTel || "";
  const email = settings?.email || "";
  const social = settings?.social || {};
  const rating = settings?.googleRating;
  const reviewCount = settings?.googleReviewCount;

  return (
    <footer className="bg-charcoal text-cream/85 mt-32">
      <div className="container-page py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-5">
          <Logo variant="light" settings={settings} />
          <p className="text-sm leading-relaxed text-cream/65 max-w-sm">
            {loc(settings?.footerDescription, locale) || loc(settings?.tagline, locale)}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
            <span>
              <strong className="text-cream">{rating}</strong> ·{" "}
              {reviewCount} reviews on Google
            </span>
          </div>
          <div className="flex gap-3">
            <a
              href={social.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-cream/20 hover:bg-cream hover:text-charcoal smooth cursor-pointer"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-cream/20 hover:bg-cream hover:text-charcoal smooth cursor-pointer"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-cream text-xs uppercase tracking-[0.22em] mb-5">
            {t("shop")}
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/collections"
                className="text-cream/70 hover:text-cream smooth cursor-pointer"
              >
                {tNav("collections")}
              </Link>
            </li>
            <li>
              <Link
                href="/wedding"
                className="text-cream/70 hover:text-cream smooth cursor-pointer"
              >
                {tNav("wedding")}
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-cream/70 hover:text-cream smooth cursor-pointer"
              >
                {tNav("services")}
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="text-cream/70 hover:text-cream smooth cursor-pointer"
              >
                {tNav("reviews")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-cream text-xs uppercase tracking-[0.22em] mb-5">
            {tContact("title")}
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={mapsLink(address.replace(/\n/g, ", "))}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 text-cream/70 hover:text-cream smooth cursor-pointer"
              >
                <MapPin className="size-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {address.split("\n").map((line, index) => <span key={index}>{line}{index < address.split("\n").length - 1 && <br />}</span>)}
                </span>
              </a>
            </li>
            <li>
              <a
                href={telLink(phoneTel)}
                className="flex items-center gap-2 text-cream/70 hover:text-cream smooth cursor-pointer"
                data-event="footer-call"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <span>{phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={mailtoLink(email)}
                className="flex items-center gap-2 text-cream/70 hover:text-cream smooth cursor-pointer"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span>{email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-cream/50">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            © {new Date().getFullYear()} {brand}. {t("rights")}
            <span aria-hidden="true">·</span>
            <span>
              Developed by{" "}
              <a
                href="https://zyxen.gr"
                target="_blank"
                rel="noreferrer"
                className="text-cream/70 hover:text-cream smooth"
              >
                zyxen.gr
              </a>
            </span>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-cream smooth">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-cream smooth">
                {t("cookies")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cream smooth">
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-cream smooth">
                {t("sitemap")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
