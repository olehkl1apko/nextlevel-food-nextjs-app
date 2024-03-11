import "./globals.css";

export const metadata = {
  title: "Nextlevel Food app",
  description: "Nextlevel Food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
