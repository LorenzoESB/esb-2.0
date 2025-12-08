import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RankingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="bg-background px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </div>
            <Footer />
        </div>
    );
}