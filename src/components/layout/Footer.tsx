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
    <footer className="mt-32 border-t border-gold/20 bg-[#f7f0e4] text-stone">
      <div className="container-page py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-5">
          <Logo variant="light" settings={settings} />
          <p className="text-sm leading-relaxed text-stone max-w-sm">
            {loc(settings?.footerDescription, locale) || loc(settings?.tagline, locale)}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
            <span>
              <strong className="text-charcoal">{rating}</strong> ·{" "}
              {reviewCount} reviews on Google
            </span>
          </div>
          <div className="flex gap-3">
            <a
              href={social.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full border border-gold/30 hover:bg-gold hover:text-white smooth cursor-pointer"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full border border-gold/30 hover:bg-gold hover:text-white smooth cursor-pointer"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-gold-dark text-xs uppercase tracking-[0.22em] mb-5">
            {t("shop")}
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/collections"
                className="text-stone hover:text-gold-dark smooth cursor-pointer"
              >
                {tNav("collections")}
              </Link>
            </li>
            <li>
              <Link
                href="/wedding"
                className="text-stone hover:text-gold-dark smooth cursor-pointer"
              >
                {tNav("wedding")}
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-stone hover:text-gold-dark smooth cursor-pointer"
              >
                {tNav("services")}
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="text-stone hover:text-gold-dark smooth cursor-pointer"
              >
                {tNav("reviews")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-gold-dark text-xs uppercase tracking-[0.22em] mb-5">
            {tContact("title")}
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={mapsLink(address.replace(/\n/g, ", "))}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 text-stone hover:text-gold-dark smooth cursor-pointer"
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
                className="flex items-center gap-2 text-stone hover:text-gold-dark smooth cursor-pointer"
                data-event="footer-call"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <span>{phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={mailtoLink(email)}
                className="flex items-center gap-2 text-stone hover:text-gold-dark smooth cursor-pointer"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span>{email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="container-page py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-stone-2">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            © {new Date().getFullYear()} {brand}. {t("rights")}
            <span aria-hidden="true">·</span>
            <span>
              Developed by{" "}
              <a
                href="https://zyxen.gr"
                target="_blank"
                rel="noreferrer"
                className="text-stone hover:text-gold-dark smooth"
              >
                zyxen.gr
              </a>
            </span>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-gold-dark smooth">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-gold-dark smooth">
                {t("cookies")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold-dark smooth">
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-gold-dark smooth">
                {t("sitemap")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
