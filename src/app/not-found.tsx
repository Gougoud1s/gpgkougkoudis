import Link from "next/link";

export default function GlobalNotFound() {
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
        <p>Page not found.</p>
        <p>
          <Link href="/el" style={{ color: "#CA8A04" }}>
            Επιστροφή στην αρχική
          </Link>
        </p>
      </div>
    </section>
  );
}
