import { HeroIndex } from "@/components/home/Hero";
import ChronosGT from "@/components/chronos-gt";
import Introduccion from "@/components/introduccion";
import Testimonial from "@/components/testimonial";
export default function Home() {
	return (
		<main className=" bg-black">
			<HeroIndex page="home" />
			<div>
				<Introduccion />
				<ChronosGT />
				<Testimonial />
			</div>
		</main>
	);
}
