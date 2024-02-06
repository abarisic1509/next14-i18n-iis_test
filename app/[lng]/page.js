import { useTranslation } from "@/lib/i18n/index";

export default async function Home({ params: { lng } }) {
	const { t } = await useTranslation(lng, "homepage");
	return (
		<main className="flex-1 bg-primary-500">
			<h1 className=" text-5xl font-poppins text-white font-bold">
				{t("test")}
			</h1>
		</main>
	);
}
