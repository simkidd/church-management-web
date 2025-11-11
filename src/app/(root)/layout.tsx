import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
