import WatchDescription from "../watch-description";
const Sovereign = () => {
	return (
		<section id="collections" className="py-20 bg-[#121212]">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
						Conoce Sovereign  la elegancia hecha reloj
					</h2>
					<div className="h-0.5 w-24 bg-[#C9A959] mx-auto mb-6"></div>
					<p className="font-sans text-gray-300 max-w-2xl mx-auto">
						Tendras una amplia gama para escoger tu reloj perfecto para esos momentos mas exigentes
					</p>
				</div>
			</div>
			<WatchDescription watch="sovereign" />
		</section>
	);
};

export default Sovereign;
