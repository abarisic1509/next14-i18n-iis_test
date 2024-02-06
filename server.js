const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const middlewareModule = require('./middleware');
const { NextResponse } = require('next/server');
const { middleware } = middlewareModule;
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const acceptLanguage =  require("accept-language");

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const fallbackLng = "en";
const languages = [fallbackLng, "hr"];
acceptLanguage.languages(languages);


function getLocale(request) {
	const acceptLanguageHeader = request.headers.get("Accept-Language");
  
	if (!acceptLanguageHeader) {
	  return fallbackLng;
	}
  
	// Split the Accept-Language header into an array of language tags
	const acceptedLangs = acceptLanguageHeader
	  .split(",")
	  .map((language) => language.trim().split(";")[0]);

  
	// Find the best match between the supported locales and the client's preferred languages
	const locale = acceptedLangs.find((lang) => languages.includes(lang)) || fallbackLng;
  
	return locale;
  }

  const config = {
    // matcher: '/:lng*'
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
  };
  app.prepare().then(() => {
    createServer(async (req, res) => {

        // Emergent bug in Next.js: doesn't deal wll with brackets in 
        // URL when iisnode or other reverse proxy is in the middle.
        // See https://github.com/vercel/next.js/issues/54325
        let reqUrl = req.url
            .replace(/\[/g, '%5B')
            .replace(/\]/g, '%5D');
            console.log(`>>> ` + reqUrl);

        try { 
          if (req.nextUrl.startsWith("/_next") || req.nextUrl.startsWith("/assets/")) {
            return NextResponse.next();
          } else {
            const { pathname, origin } = req.nextUrl
            const pathnameHasLocale = languages.some(
              (locale) => req.nextUrl.startsWith(`/${locale}/`) || req.nextUrl === `/${locale}`
            )
      
            if (!pathnameHasLocale) {
              // get locale
              const locale = getLocale(req)
        
              //check if user is on root and redirect to default locale
              if (pathname === '/') {
                const redirectPath = `${origin}/${locale}`;
                return NextResponse.redirect(redirectPath);
              } else {
                if (config.matcher.some((pattern) => new RegExp(pattern).test(pathname))) {
                  return;
                }			
                console.log("redirect: ", `${origin}/${locale}${pathname}`);
                return NextResponse.redirect(`${origin}/${locale}${pathname}`);
              }
            
            }
          }
        } catch (err) {
            console.error('Error occurred handling', reqUrl, err);
            if (err.code === 'ENOENT') {
              // Handle 404 errors
              return app.render(req, res, '/404', {
                statusCode: 404,
                title: 'Page Not Found',
              });
            } else {
              // Handle other errors (500)
              return app.render(req, res, '/500', {
                statusCode: 500,
                title: 'Internal Server Error',
              });
            }
        }
    })
    .listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
  });
