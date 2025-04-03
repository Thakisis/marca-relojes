"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { testimonials } from "@/lib/testimoniallist";

const Testimonial = () => {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="py-20 bg-[#1A1A1A]" ref={ref}>
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
						Opiniones de Expertos
					</h2>
					<div className="h-0.5 w-24 bg-[#C9A959] mx-auto mb-6"></div>
					<p className="font-sans text-gray-300 max-w-2xl mx-auto">
						Lee lo que expertos de la industria y coleccionistas dicen sobre
						nuestros relojes.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							className="bg-[#222222] p-8 rounded-sm border-t border-[#C9A959] hover:translate-y-[-5px] transition-transform duration-300"
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ delay: 0.1 * index, duration: 0.5 }}
						>
							<div className="text-[#C9A959] mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-10 w-10"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
								</svg>
							</div>
							<p className="font-sans text-gray-300 italic mb-6">
								"{testimonial.quote}"
							</p>
							<div className="flex items-center">
								<div className="mr-4">
									<div className="bg-[#2D2D2D] h-12 w-12 rounded-full flex items-center justify-center">
										<span className="font-serif text-[#C9A959] text-lg">
											{testimonial.initials}
										</span>
									</div>
								</div>
								<div>
									<h4 className="font-sans font-semibold">
										{testimonial.name}
									</h4>
									<p className="font-sans text-sm text-gray-400">
										{testimonial.title}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonial;
