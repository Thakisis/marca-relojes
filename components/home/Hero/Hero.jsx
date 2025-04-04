import LogoAsterium from "@/components/logo-asterium";
import Slider from "./Slider";
import { CarouselItem } from "@/components/ui/carousel";
export function HeroIndex({ page }) {
	return (
		<header className="grid grid-cols-12  h-screen justify-between  outline-white/50 outline-[1px] -outline-offset-[3.5rem] overCanvas px-[3.5rem]">
			<div className="col-span-4 h-full grid place-items-center   ">
				<h1 className="flex flex-col justify-center items-center gap-5 text-white text-5xl  font-[200] wittgenstein ">
					<LogoAsterium
						className="w-40 h-40 -translate-y-[2px] hidden"
						aria-hidden="true"
					/>
					<div
						className="w-40 h-40 goldbg"
						style={{
							maskImage: "url(/LogoNav.svg)",
							maskSize: "contain",
							maskRepeat: "no-repeat",
							maskPosition: "center",
						}}
					></div>
					Asterium
				</h1>
			</div>
			<div className="col-start-9 col-span-4  grid place-items-center text-white   h-full">
				<Slider>
					<CarouselItem className="flex justify-center items-center text-end">
						<blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400">
							"El Chronos GT redefine la precisión y el lujo en la relojería
							moderna."
							<span className="block text-right text-sm text-white mt-2">
								- Revista Relojes & Estilo
							</span>
						</blockquote>
					</CarouselItem>

					<CarouselItem className="flex justify-center items-center text-end">
						<blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400">
							"Un cronógrafo tope de gama que combina tecnología de vanguardia
							con diseño clásico."
							<span className="block text-right text-sm text-white mt-2">
								- Tiempo & Elegancia
							</span>
						</blockquote>
					</CarouselItem>

					<CarouselItem className="flex justify-center items-center text-end">
						<blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400">
							"Chronos GT es una obra maestra que rivaliza con los mejores
							relojes suizos."
							<span className="block text-right text-sm text-white mt-2">
								- La Hora Perfecta
							</span>
						</blockquote>
					</CarouselItem>

					<CarouselItem className="flex justify-center items-center text-end">
						<blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400">
							"La combinación de precisión y elegancia en el Chronos GT es
							simplemente insuperable."
							<span className="block text-right text-sm text-white mt-2">
								- WatchWorld Magazine
							</span>
						</blockquote>
					</CarouselItem>

					<CarouselItem className="flex justify-center items-center text-end">
						<blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400">
							"El Chronos GT marca un antes y un después en la relojería de alta
							gama."
							<span className="block text-right text-sm text-white mt-2">
								- Lujo & Precisión
							</span>
						</blockquote>
					</CarouselItem>
				</Slider>
			</div>
		</header>
	);
}
