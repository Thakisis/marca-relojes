"use server";
import { writeFile, appendFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const filePath = join(process.cwd(), "waitlist.csv");

export async function sendForm(data) {
	try {
		const headers = [
			"firstName",
			"lastName",
			"email",
			"phone",
			"preferredModel",
			"comments",
		];
		const values = headers.map((header) => data[header] ?? "").join(",");
		const newRow = `\n${values}`;

		if (!existsSync(filePath)) {
			const headerRow = headers.join(",");
			await writeFile(filePath, `${headerRow}${newRow}`);
		} else {
			await appendFile(filePath, newRow);
		}

		return { success: true, message: "Datos guardados correctamente" };
	} catch (error) {
		console.error("Error writing to CSV:", error);
		return { success: false, error: "Error al guardar los datos" };
	}
}
