import { HeroIndex } from "@/components/home/Hero";
import { Section } from "@/components/section";
import { Geist, Geist_Mono, Fraunces } from "./fonts";
export default function Home() {
	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black">
			<HeroIndex />
			<div>
				<Section></Section>
				<Section></Section>
				<Section></Section>
			</div>
		</div>
	);
}
