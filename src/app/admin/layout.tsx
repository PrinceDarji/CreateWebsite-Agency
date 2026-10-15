import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CREATE CMS | Studio Portal",
  description: "Internal content management system for CREATE Creative Production Studio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell min-h-screen bg-[#050505] text-white flex flex-col isolate font-sans">
      {children}
    </div>
  );
}
