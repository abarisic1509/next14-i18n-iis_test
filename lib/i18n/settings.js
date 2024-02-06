export const fallbackLng = "en";
export const languages = [fallbackLng, "hr"];
export const defaultNS = "homepage";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
	return {
		// debug: true,
		supportedLngs: languages,
		fallbackLng,
		lng,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
	};
}