import { HeroIndex } from "@/components/home/Hero";
import { Section } from "@/components/section";
import { Geist, Geist_Mono, Fraunces } from "./fonts";
export default function Home() {
	return (
		<main className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black">
			<HeroIndex page="home" />
			<div>
				<Section></Section>
				<Section></Section>
				<Section></Section>
			</div>
		</main>
	);
}
