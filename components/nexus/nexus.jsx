import WatchDescription from "../watch-description";
const Nexus = () => {
	return (
		<section id="collections" className="py-20 bg-[#121212]">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
						El mas joven y desenfadado reloj de Asterium
					</h2>
					<div className="h-0.5 w-24 bg-[#C9A959] mx-auto mb-6"></div>
					<p className="font-sans text-gray-300 max-w-2xl mx-auto">
						Con la ultima tecnologias y una gran experiencia de usuario, Asterium ha sido el reloj de lujo de los mas jovenes de la industria.
					</p>
				</div>
			</div>
			<WatchDescription watch="nexus" isOdd={true} />
		</section>
	);
};

export default Nexus;
