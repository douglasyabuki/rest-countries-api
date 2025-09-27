import { GameLanguageProvider } from "@/contexts/GameLanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameLanguageProvider>{children}</GameLanguageProvider>;
}
