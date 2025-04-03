"use client";
import { Children } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Slider({ children }) {
	return (
		<Carousel
			opts={{
				align: "center",
				loop: true,
				autoplay: true,
			}}
			plugins={[
				Autoplay({
					delay: 5000,
				}),
			]}
			orientation="vertical"
			className="w-full max-w-md"
		>
			<CarouselContent className="w-full h-[15rem]">{children}</CarouselContent>
		</Carousel>
	);
}
