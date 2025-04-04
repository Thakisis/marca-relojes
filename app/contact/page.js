"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { sendForm } from "@/server/actions";

const Contact = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			preferredModel: "",
			comments: "",
			privacyAccepted: false,
		},
	});

	const [state, submitForm] = useActionState(async (data) => {
		try {
			const { privacyAccepted, ...waitlistData } = data;
			await sendForm(waitlistData);
			setIsSubmitted(true);
			return { success: true };
		} catch (error) {
			return {
				error: "Hubo un problema al enviar tu información. Inténtalo de nuevo.",
			};
		}
	}, {});

	return (
		<main className="relative z-[99]">
			<section
				id="waitlist"
				className="py-20 bg-[#121212] h-screen"
				ref={ref}
				style={{ scrollMarginTop: "80px" }}
			>
				<div className="container mx-auto px-4">
					<motion.div
						className="max-w-4xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.5 }}
					>
						<div className="bg-[#222222] p-8 md:p-12 rounded-sm border border-[#C9A959]">
							<div className="text-center mb-10">
								<h2 className="text-3xl md:text-4xl font-bold mb-3">
									Únete a la Lista de Espera
								</h2>
								<div className="h-0.5 w-24 bg-[#C9A959] mx-auto mb-6"></div>
								<p className="text-gray-300 max-w-lg mx-auto">
									Sé de los primeros en asegurar tu reloj Asterium.
								</p>
							</div>
							{isSubmitted ? (
								<div className="text-center py-8">
									<h3 className="text-2xl font-bold mb-4">
										Gracias por Unirte
									</h3>
									<p className="text-gray-300 max-w-md mx-auto mb-8">
										Tu lugar en la lista de espera de Asterium ha sido
										asegurado.
									</p>
									<Button onClick={() => setIsSubmitted(false)}>
										Enviar Otra Inscripción
									</Button>
								</div>
							) : (
								<Form {...form}>
									<form
										className="space-y-6 max-w-2xl mx-auto"
										onSubmit={form.handleSubmit(submitForm)}
									>
										{state.error && (
											<p className="text-red-500 text-center">{state.error}</p>
										)}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<FormField
												name="firstName"
												control={form.control}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Nombre</FormLabel>
														<FormControl>
															<Input
																{...field}
																required
																title="Este campo es obligatorio"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												name="lastName"
												control={form.control}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Apellido</FormLabel>
														<FormControl>
															<Input
																{...field}
																required
																title="Este campo es obligatorio"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<FormField
											name="email"
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Correo Electrónico</FormLabel>
													<FormControl>
														<Input
															type="email"
															{...field}
															required
															pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
															title="Introduce un correo electrónico válido"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											name="phone"
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Teléfono (Opcional)</FormLabel>
													<FormControl>
														<Input
															type="tel"
															{...field}
															pattern="\d{10}"
															title="Introduce un número de teléfono válido (10 dígitos)"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											name="privacyAccepted"
											control={form.control}
											render={({ field }) => (
												<FormItem className="flex items-start space-x-2">
													<Checkbox
														required
														checked={field.value}
														onCheckedChange={field.onChange}
														title="Debes aceptar la política de privacidad"
													/>
													<FormLabel>
														Acepto la Política de Privacidad
													</FormLabel>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button type="submit">Unirse a la Lista de Espera</Button>
									</form>
								</Form>
							)}
						</div>
					</motion.div>
				</div>
			</section>
		</main>
	);
};

export default Contact;
