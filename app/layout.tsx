import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Nextlevel Food app",
  description: "Nextlevel Food",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
