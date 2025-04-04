import { HeroIndex } from "@/components/home/Hero";
import ChronosGT from "@/components/chronos-gt";
import Introduccion from "@/components/introduccion";
import Testimonial from "@/components/testimonial";
export const metadata = {
	title: "Chrono GT - Asterium ",
	description: "Descubre nuestra coleccion de relojes de lujo",
};
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
