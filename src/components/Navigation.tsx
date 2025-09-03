import Link from "next/link";

export default async function Navigation() {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="text-xl font-bold">
                        Your Site Name
                    </Link>

                    <ul className="flex gap-6">
                        <li>
                            <Link href="/" className="hover:text-blue-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:text-blue-600">
                                Blog
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}
