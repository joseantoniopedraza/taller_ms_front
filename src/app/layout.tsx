import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Formulario de Clientes",
  description: "Aplicación para registrar clientes con sus intereses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
