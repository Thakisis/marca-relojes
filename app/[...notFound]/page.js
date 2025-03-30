import { redirect } from "next/navigation";
export default function NotFound() {
	redirect("/404", 404);
	return (
		<div>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>
		</div>
	);
}
