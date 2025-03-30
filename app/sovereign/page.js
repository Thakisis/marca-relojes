import { HeroIndex } from "@/components/home/Hero";
import { Section } from "@/components/section";

export default function Home() {
	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black">
			<HeroIndex page="sovereing" />
			<div>
				<Section></Section>
				<Section></Section>
				<Section></Section>
			</div>
		</div>
	);
}
