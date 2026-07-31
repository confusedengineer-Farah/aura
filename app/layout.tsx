import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Aura",
  description: "Peer-to-peer youth mental health platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid #7c3aed",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}