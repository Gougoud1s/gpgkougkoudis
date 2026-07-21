import Link from "next/link";
import { getUiText } from "@/sanity/fetch";
import { loc } from "@/sanity/types";

export const dynamic = "force-dynamic";

export default async function GlobalNotFound() {
  const records = await getUiText();
  const text = (key: string) => loc(records.find((record) => record.key === `dynamic.${key}`)?.value, "el");
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "3rem", margin: 0 }}>404</h1>
        <p>{text("notFoundText")}</p>
        <p>
          <Link href="/el" style={{ color: "#CA8A04" }}>
            {text("backHome")}
          </Link>
        </p>
      </div>
    </section>
  );
}
