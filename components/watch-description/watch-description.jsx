"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideRight, slideUp } from "@/lib/animations";
import WatchDisplay from "./watch-display";
import WatchFeatures from "./watch-features";

import Link from "next/link";
import * as coleccion from "@/lib/productos";

const WatchDescription = ({ watch, isOdd }) => {
	const watchselected = coleccion[watch];
	const { name, tagline, description } = watchselected;

	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<div
			className={`scroll-section mb-24 mx-auto container`}
			ref={ref}
			style={{ scrollMarginTop: "80px" }}
		>
			<div
				className={`flex flex-col ${
					isOdd ? "md:flex-row-reverse" : "md:flex-row"
				} items-center`}
			>
				<motion.div
					className="md:w-1/2 mb-8 md:mb-0"
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					variants={slideRight}
				>
					<WatchDisplay {...watchselected} />
				</motion.div>

				<motion.div
					className={`md:w-1/2 ${isOdd ? "md:pr-12" : "md:pl-12"}`}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					variants={slideUp}
				>
					<h3 className="font-serif text-3xl font-bold mb-3">{name}</h3>
					<div className="h-0.5 w-16 bg-[#C9A959] mb-6"></div>
					<p className="font-serif text-xl italic text-[#D4B96A] mb-6">
						"{tagline}"
					</p>
					<p className="font-sans text-gray-300 mb-8 leading-relaxed">
						{description}
					</p>

					<WatchFeatures {...watchselected} />

					<Link
						href="#waitlist"
						className="inline-block bg-[#C9A959] hover:bg-[#D4B96A] text-[#121212] font-sans font-medium py-3 px-8 rounded-sm transition-colors"
					>
						Unirse a la Lista de Espera
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

export default WatchDescription;
