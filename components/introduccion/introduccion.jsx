"use client";
import { motion } from "framer-motion";
import { slideUp } from "@/lib/animations";
import { useInView } from "react-intersection-observer";

const features = [
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-12 w-12 mx-auto"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
				/>
			</svg>
		),
		title: "Ingeniería de Precisión",
		description:
			"Movimientos fabricados en Suiza con precisión y fiabilidad incomparables, ensamblados por maestros relojeros.",
	},
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-12 w-12 mx-auto"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
				/>
			</svg>
		),
		title: "Materiales Exclusivos",
		description:
			"Aleaciones premium, cristal de zafiro y acabados exclusivos que garantizan durabilidad y una estética distintiva.",
	},
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-12 w-12 mx-auto"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
				/>
			</svg>
		),
		title: "Producción Limitada",
		description:
			"Cada modelo se produce en ediciones numeradas, garantizando exclusividad y valor duradero para los coleccionistas.",
	},
];

const Introduccion = () => {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="py-16 bg-[#1A1A1A]" ref={ref}>
			<div className="container mx-auto px-4 text-center">
				<motion.div
					className="max-w-3xl mx-auto mb-16"
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					variants={slideUp}
				>
					<h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
						Creados para la Excelencia
					</h2>
					<div className="h-0.5 w-24 bg-[#C9A959] mx-auto mb-6"></div>
					<p className="font-sans text-gray-300 text-lg leading-relaxed">
						Cada reloj Asterium representa la cumbre del arte relojero,
						combinando técnicas tradicionales con materiales innovadores.
						Nuestros diseños exclusivos están creados para conocedores que
						aprecian la artesanía excepcional y el estilo distintivo.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="bg-[#222222] p-8 rounded-sm border-b-2 border-[#C9A959] hover:translate-y-[-5px] transition-transform duration-300"
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ delay: 0.1 * index, duration: 0.5 }}
						>
							<div className="text-[#C9A959] mb-4">{feature.icon}</div>
							<h3 className="font-serif text-xl font-semibold mb-3">
								{feature.title}
							</h3>
							<p className="font-sans text-gray-400">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Introduccion;
