import "./globals.css";
import CanvasContainer from "@/components/canvas";
import SmoothScrolling from "@/components/ui/SmoothScroll";
import { wittgenstein, outfit } from "./fonts";
import Footer from "@/components/footer";
import { Preloader } from "@/components/preloader";
import Navbar from "@/components/nav-bar/nav-bar";
export const metadata = {
	title: "Asterium ",
	description: "Descubre nuestra coleccion de relojes de lujo",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${wittgenstein.variable} ${outfit.variable} antialiased dark font-[var(--font-outfit)]`}
			>
				<Preloader />
				<Navbar />
				<SmoothScrolling>
					<CanvasContainer />
					{children}
				</SmoothScrolling>
				<Footer />
			</body>
		</html>
	);
}
