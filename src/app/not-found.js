import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">404</p>
      <h1 className="mt-4 text-[44px] leading-[1.02] font-bold tracking-[-0.045em] text-ink sm:text-[64px]">
        This page doesn&apos;t exist.
        <br />
        <span className="text-muted">Let&apos;s get you back.</span>
      </h1>
      <Button href="/" arrow className="mt-10">
        Back to home
      </Button>
    </Container>
  );
}
