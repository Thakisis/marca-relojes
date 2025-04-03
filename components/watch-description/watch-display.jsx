import { useState } from "react";
import { motion } from "framer-motion";

const WatchDisplay = ({ name, mainImage: initImage, angles }) => {
	const [mainImage, setMainImage] = useState(initImage);
	const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);

	const handleThumbnailClick = (image, index) => {
		setMainImage(image);
		setSelectedThumbIndex(index);
	};

	return (
		<>
			<div className="relative p-6">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-[#4A2545] opacity-20 blur-xl rounded-full"></div>
				<motion.img
					key={mainImage}
					src={mainImage}
					alt={`${name} Watch`}
					className="relative z-10 mx-auto max-w-full max-h-[400px] object-contain"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				/>
			</div>

			<div className="grid grid-cols-3 gap-2 px-6 mt-4">
				{angles.map((angle, index) => (
					<div
						key={index}
						className={`cursor-pointer rounded-sm overflow-hidden border transition-colors ${
							selectedThumbIndex === index
								? "border-[#C9A959]"
								: "border-[#2D2D2D] hover:border-[#C9A959]"
						}`}
						onClick={() => handleThumbnailClick(angle, index)}
					>
						<img
							src={angle}
							alt={`${name} angle view ${index + 1}`}
							className="w-full h-24 object-cover"
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default WatchDisplay;
