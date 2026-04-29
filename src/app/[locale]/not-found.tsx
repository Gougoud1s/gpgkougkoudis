import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <Container size="narrow" className="text-center py-24">
        <p className="eyebrow justify-center inline-flex">404</p>
        <h1 className="display-serif mt-6">Δεν βρέθηκε η σελίδα</h1>
        <p className="mt-5 text-stone leading-relaxed">
          Η σελίδα που ψάχνετε δεν υπάρχει ή έχει μεταφερθεί.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" size="md">Επιστροφή στην αρχική</Button>
          </Link>
          <Link href="/collections">
            <Button variant="outline" size="md">Δείτε τις συλλογές</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
