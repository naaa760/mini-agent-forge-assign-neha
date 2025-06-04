import "./globals.css";

export const metadata = {
  title: "🤖 Agent Runner",
  description: "Craft prompts, select tools, and watch AI work its magic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
