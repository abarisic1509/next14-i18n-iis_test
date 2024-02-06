const { NextResponse } = require("next/server");
const acceptLanguage =  require("accept-language");

//taken from lib/i18n/settings.mjs to avoid errors
const fallbackLng = "en";
const languages = [fallbackLng, "hr"];


acceptLanguage.languages(languages);

const config = {
	// matcher: '/:lng*'
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

function getLocale(request) {
	const acceptLanguageHeader = request.headers.get("Accept-Language");
  
	if (!acceptLanguageHeader) {
	  return undefined;
	}
  
	// Split the Accept-Language header into an array of language tags
	const acceptedLangs = acceptLanguageHeader
	  .split(",")
	  .map((language) => language.trim().split(";")[0]);

  
	// Find the best match between the supported locales and the client's preferred languages
	const locale = acceptedLangs.find((lang) => languages.includes(lang)) || fallbackLng;
  
	return locale;
  }

function middleware(req) {
	// Check if there is any supported locale in the pathname
	const { pathname, origin } = req.nextUrl
	const pathnameHasLocale = languages.some(
	  (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	  )
	  
	  if (!pathname.startsWith("/_next") || !pathname.startsWith("/assets/") || !pathnameHasLocale) {
		  // get locale
		  const locale = getLocale(req)

		  //check if user is on root and redirect to default locale
		  if (!pathnameHasLocale && pathname === '/') {
			const redirectPath = `${origin}/${locale}`;
			return NextResponse.redirect(redirectPath);
		  }
		  if (!pathnameHasLocale) {
			if (config.matcher.some((pattern) => new RegExp(pattern).test(pathname))) {
				return;
			  }			
			console.log("redirect: ", `${origin}/${locale}${pathname}`);
			return NextResponse.redirect(`${origin}/${locale}${pathname}`);
		  }
		 
	  } else return
}

module.exports = { config, middleware };