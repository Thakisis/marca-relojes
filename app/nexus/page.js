import { HeroIndex } from "@/components/home/Hero";
import { Section } from "@/components/section";

export default function Home() {
	return (
		<main className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black">
			<HeroIndex page="Nexus" />
			<div>
				<Section></Section>
				<Section></Section>
				<Section></Section>
			</div>
		</main>
	);
}
