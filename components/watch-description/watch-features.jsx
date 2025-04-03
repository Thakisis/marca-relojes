const WatchFeatures = ({ technicalFeatures, designElements }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
			<div>
				<h4 className="font-sans font-semibold text-[#C9A959] mb-2">
					Características Técnicas
				</h4>
				<ul className="font-sans text-gray-300 space-y-2">
					{technicalFeatures.map((feature, index) => (
						<li key={index} className="flex items-start">
							<span className="text-[#C9A959] mr-2">•</span>
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</div>
			<div>
				<h4 className="font-sans font-semibold text-[#C9A959] mb-2">
					Elementos de Diseño
				</h4>
				<ul className="font-sans text-gray-300 space-y-2">
					{designElements.map((element, index) => (
						<li key={index} className="flex items-start">
							<span className="text-[#C9A959] mr-2">•</span>
							<span>{element}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default WatchFeatures;
