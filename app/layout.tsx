import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/layout/header";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import { cn } from "@/lib/utils";
import "./globals.css";

const robotoMono = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SWAP",
  description: "Swap app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(robotoMono.className, "flex flex-col min-h-full")}>
        <ApolloWrapper>
          <Header />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
