import { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
