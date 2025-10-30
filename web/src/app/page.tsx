import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Home from "@/components/Home";

export default async function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Home />
            <Footer />
        </div>
    );
}
