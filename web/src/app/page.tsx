import Home from "@/components/Home";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Home />
            <Footer />
        </div>
    );
}
