import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideRight, slideUp } from "@/lib/animations";
import { products } from "@/lib/products";
import ProductDisplay from "../product/ProductDisplay";
import ProductFeatures from "../product/ProductFeatures";
import { Link } from "wouter";

const CollectionsSection = () => {
	return (
		<section id="collections" className="py-20 bg-[#121212]">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
						Nuestro reloj mas emblematico
					</h2>
					<div className="h-0.5 w-24 bg-[#C9A959] mx-auto mb-6"></div>
					<p className="font-sans text-gray-300 max-w-2xl mx-auto">
						Elige tu modelo de reloj Chrono GT, diseñado para una equilibrio
						perfecto entre innovación y diseño atemporal.
					</p>
				</div>

				{products.map((product, index) => {
					const [ref, inView] = useInView({
						triggerOnce: true,
						threshold: 0.1,
					});

					const isOdd = index % 2 !== 0;

					return (
						<div
							id={`product-${product.id}`}
							key={product.id}
							className={`scroll-section ${
								index < products.length - 1 ? "mx-24" : ""
							}`}
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
									<ProductDisplay product={product} />
								</motion.div>

								<motion.div
									className={`md:w-1/2 ${isOdd ? "md:pr-12" : "md:pl-12"}`}
									initial="hidden"
									animate={inView ? "visible" : "hidden"}
									variants={slideUp}
								>
									<h3 className="font-serif text-3xl font-bold mb-3">
										{product.name}
									</h3>
									<div className="h-0.5 w-16 bg-[#C9A959] mb-6"></div>
									<p className="font-serif text-xl italic text-[#D4B96A] mb-6">
										"{product.tagline}"
									</p>
									<p className="font-sans text-gray-300 mb-8 leading-relaxed">
										{product.description}
									</p>

									<ProductFeatures product={product} />

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
				})}
			</div>
		</section>
	);
};

export default CollectionsSection;
