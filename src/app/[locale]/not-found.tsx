import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("dynamic");
  return (
    <section className="min-h-[70vh] flex items-center">
      <Container size="narrow" className="text-center py-24">
        <p className="eyebrow justify-center inline-flex">404</p>
        <h1 className="display-serif mt-6">{t("notFoundTitle")}</h1>
        <p className="mt-5 text-stone leading-relaxed">
          {t("notFoundText")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" size="md">{t("backHome")}</Button>
          </Link>
          <Link href="/collections">
            <Button variant="outline" size="md">{t("viewCollections")}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
