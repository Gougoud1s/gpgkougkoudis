import { contentPageMetadata, renderContentPage } from "@/components/pages/contentRoute";
import type { Locale } from "@/i18n/routing";

type Params = Promise<{ locale: Locale; page: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, page } = await params;
  return contentPageMetadata(page, locale);
}

export default async function DynamicContentPage({ params }: { params: Params }) {
  const { locale, page } = await params;
  return renderContentPage(page, locale);
}
