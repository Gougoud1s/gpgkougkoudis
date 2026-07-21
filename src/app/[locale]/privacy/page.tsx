import { contentPageMetadata, renderContentPage } from "@/components/pages/contentRoute";
import type { Locale } from "@/i18n/routing";
type Params = Promise<{ locale: Locale }>;
export async function generateMetadata({ params }: { params: Params }) { return contentPageMetadata("privacy", (await params).locale); }
export default async function Page({ params }: { params: Params }) { return renderContentPage("privacy", (await params).locale); }
