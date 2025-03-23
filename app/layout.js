import "./globals.css";
import CanvasContainer from "@/components/canvas";
import SmoothScrolling from "@/components/ui/SmoothScroll";
import { geistSans, geistMono, fraunces } from "./fonts";
import { Preloader } from "@/components/preloader";
export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased dark`}
			>
				<Preloader />
				<SmoothScrolling>
					<CanvasContainer />
					{children}
				</SmoothScrolling>
			</body>
		</html>
	);
}
