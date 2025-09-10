import Footer from "@/components/Footer";
import Home from "@/components/Home";

export default async function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <Home />
            <Footer />
        </div>
    );
}
