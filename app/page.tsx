import { BrandLogo } from "@/components/BrandLogo";
import { Game } from "@/components/game/Game";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--background)]">
      <BrandLogo />
      <Game />
    </main>
  );
}
