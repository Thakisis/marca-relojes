import { HeroIndex } from "@/components/home/Hero";
import { Section } from "@/components/section";
import Nexus from "@/components/nexus";
export const metadata = {
	title: "Nexus Asterium ",
	description: "Descubre nuestra coleccion de relojes de lujo",
};
export default function Home() {
	return (
		<main className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black">
			<HeroIndex page="Nexus" />
			<div>
				<Nexus />
				<Section></Section>

			</div>
		</main>
	);
}
