import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { Link } from "@nextui-org/link";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="p-8 flex flex-col justify-between h-full">
            <main className="flex">{children}</main>

            <footer className="w-full flex items-center justify-center py-3 my-8">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://github.com/TheHarald"
                title="TheHarald"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">TheHarald</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
