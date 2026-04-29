import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { mailtoLink, mapsLink, telLink } from "@/lib/utils";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");

  return (
    <footer className="bg-charcoal text-cream/85 mt-32">
      <div className="container-page py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-5">
          <Logo variant="light" />
          <p className="text-sm leading-relaxed text-cream/65 max-w-sm">
            Κοσμηματοπωλείο στην καρδιά της Πετρούπολης από το 1985.
            Χρυσά και λευκόχρυσα κοσμήματα, βέρες, μονόπετρα, επισκευές
            και αγορά χρυσού.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
            <span>
              <strong className="text-cream">{SITE.google.rating}</strong> ·{" "}
              {SITE.google.reviewCount} reviews on Google
            </span>
          </div>
          <div className="flex gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-cream/20 hover:bg-cream hover:text-charcoal smooth cursor-pointer"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={SITE.social.instagram}
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
                href={mapsLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 text-cream/70 hover:text-cream smooth cursor-pointer"
              >
                <MapPin className="size-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Σιρράκου 85-87
                  <br />
                  Πετρούπολη 131 23, Αττική
                </span>
              </a>
            </li>
            <li>
              <a
                href={telLink(SITE.phoneTel)}
                className="flex items-center gap-2 text-cream/70 hover:text-cream smooth cursor-pointer"
                data-event="footer-call"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={mailtoLink(SITE.email)}
                className="flex items-center gap-2 text-cream/70 hover:text-cream smooth cursor-pointer"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span>{SITE.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-cream/50">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            © {new Date().getFullYear()} {SITE.brand}. {t("rights")}
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
