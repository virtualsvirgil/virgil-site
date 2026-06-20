import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <span>VIRGIL · @VirgilWatch</span>
      <span className="disc">
        VIRGIL scores are opinions produced by a published deterministic rubric,
        not financial advice. They measure launch-time configuration, not future
        price. VIRGIL currently holds no token; any token claiming to be VIRGIL
        is not ours.
      </span>
      <Link href="/changelog" style={{ textDecoration: "none" }}>
        Rubric v1.1 · changelog
      </Link>
    </footer>
  );
}
