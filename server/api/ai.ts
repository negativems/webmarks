import { load } from 'cheerio';
import { Configuration, OpenAIApi } from 'openai';

const PARAM_NAME = "url";

export default defineEventHandler(async (event) => {
   const { searchParams } = new URL(event.node.req.url || '', 'http://localhost');
   const url = searchParams.get(PARAM_NAME);

   if (!url) {
      return new Response('No URL provided', { status: 400 });
   }

   // validate url with regex, same as new URL(url) does
   const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
   if (!urlRegex.test(url)) {
      return {
         status: 400,
         body: 'Invalid URL provided'
      };
   }

   const response = await fetch(url);
   const html = await response.text();
   const $ = load(html);

   const HTMLResult = {
      title: $('title').text(),
      h1: $('h1').text(),
      h2: $('h2').text(),
   };

   const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
   });
   const openai = new OpenAIApi(configuration);

   const content = `
I will give raw text from a website and you will give me the keywords of this website.
In case of no data after the double colon, just leave it empty.
Example: News, Technology, Science, etc.
Limit the response to 5 elements.
Make it all in same line separated with comma:
${JSON.stringify(HTMLResult)}
   `;

   const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }]
   });

   return completion.data.choices[0].message?.content.split(',').map((item) => item.trim());

//    const HTMLRaw = `
// <html>
//    <head>
//       <title>${HTMLResult.title}</title>
//       <meta charset="utf-8">
//    </head>
//    <body>
//       <h1>${HTMLResult.h1}</h1>
//       <h2>${HTMLResult.h2}</h2>
//    </body>
// </html>
//    `;

//    return HTMLRaw;
});

