import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            <main className="layout__main">
                <div className="container">{children}</div>
            </main>
            <Footer />
        </div>
    );
}