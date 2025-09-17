import type { Metadata } from "next";
import LocalFont from "next/font/local";
import { Lexend } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/Navbar";
import { getLangDir } from "@/utils";
import { Locale } from "@/lib/i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import StoreProvider from "@/lib/states/StoreProvider";
import Footer from "@/components/Footer";

const dana = LocalFont({
  src: [
    {
      path: "../../../../public/fonts/Ravi/Ravi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Ravi/Ravi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Ravi/Ravi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Ravi/Ravi-Bold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--dana",
});
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--lexend",
});
console.log(lexend, dana)

export const metadata: Metadata = {
  title: "jantech",
  description: "jantech website",
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;
  const dir = getLangDir(lang);
  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={dir}
    >
      <body
        className={`mx-auto ${dir === "rtl" ? "font-dana" : "font-lexend"}`}
      >
        <StoreProvider dictionary={dictionary}>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
