How it works
Fetch the page(s) using got
If an AMP version of the page exists, use that instead (disable with --no-amp flag)
Enhance the DOM using jsdom
Pass the DOM through mozilla/readability to strip unnecessary elements
Apply the HTML template and the print stylesheet to the resulting HTML
Use puppeteer to generate a PDF from the page


Puppeteer API Tip-Of-Tree
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions 
above is a case you can refer,some code 'percollate.configure();' in percollate-api/src/percollate/percollate.service.ts  is very important.

percollate  API
https://github.com/danburzo/percollate  
this is the main component to result in a success convert to PDF format

page.pdf(options)
options <Object> Options object which might have the following properties:
path <string> The file path to save the PDF to. If path is a relative path, then it is resolved relative to current working directory. If no path is provided, the PDF won't be saved to the disk.
scale <number> Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2.
displayHeaderFooter <boolean> Display header and footer. Defaults to false.
headerTemplate <string> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
date formatted print date
title document title
url document location
pageNumber current page number
totalPages total pages in the document
footerTemplate <string> HTML template for the print footer. Should use the same format as the headerTemplate.
printBackground <boolean> Print background graphics. Defaults to false.
landscape <boolean> Paper orientation. Defaults to false.
pageRanges <string> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
format <string> Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.
width <string> Paper width, accepts values labeled with units.
height <string> Paper height, accepts values labeled with units.
margin <Object> Paper margins, defaults to none.
top <string> Top margin, accepts values labeled with units.
right <string> Right margin, accepts values labeled with units.
bottom <string> Bottom margin, accepts values labeled with units.
left <string> Left margin, accepts values labeled with units.
preferCSSPageSize <boolean> Give any CSS @page size declared in the page priority over what is declared in width and height or format options. Defaults to false, which will scale the content to fit the paper size.
returns: <Promise<Buffer>> Promise which resolves with PDF buffer.
NOTE Generating a pdf is currently only supported in Chrome headless.

page.pdf() generates a pdf of the page with print css media. To generate a pdf with screen media, call page.emulateMedia('screen') before calling page.pdf():

NOTE By default, page.pdf() generates a pdf with modified colors for printing. Use the -webkit-print-color-adjust property to force rendering of exact colors.

// Generates a PDF with 'screen' media type.
await page.emulateMedia('screen');
await page.pdf({path: 'page.pdf'});
The width, height, and margin options accept values labeled with units. Unlabeled values are treated as pixels.

A few examples:

page.pdf({width: 100}) - prints with width set to 100 pixels
page.pdf({width: '100px'}) - prints with width set to 100 pixels
page.pdf({width: '10cm'}) - prints with width set to 10 centimeters.
All possible units are:

px - pixel
in - inch
cm - centimeter
mm - millimeter
The format options are:

Letter: 8.5in x 11in
Legal: 8.5in x 14in
Tabloid: 11in x 17in
Ledger: 17in x 11in
A0: 33.1in x 46.8in
A1: 23.4in x 33.1in
A2: 16.5in x 23.4in
A3: 11.7in x 16.5in
A4: 8.27in x 11.7in
A5: 5.83in x 8.27in
A6: 4.13in x 5.83in
NOTE headerTemplate and footerTemplate markup have the following limitations:

Script tags inside templates are not evaluated.
Page styles are not visible inside templates.



percollate.pdf(titles,{
        sandbox:false,
        output:'my.pdf',
        scale:1,
        printBackground:true,
        preferCSSPageSize:true,
        format:'A4'
    });

