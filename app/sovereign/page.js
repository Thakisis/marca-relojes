import { HeroIndex } from "@/components/home/Hero";
import { Section } from "@/components/section";
import Introduccion from "@/components/introduccion";
import Sovereign from "@/components/sovereign";

export const metadata = {
	title: "Sovereign - Asterium ",
	description: "Descubre nuestra coleccion de relojes de lujo",
};
export default function Home() {

	return (
		<main className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black">
			<HeroIndex page="sovereing" />
			<div>
				<Introduccion />
				<Sovereign />
				<Section></Section>
			</div>
		</main>
	);
}
