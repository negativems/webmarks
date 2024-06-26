import { load } from 'cheerio';
import { isPro } from '~/utils/User';
import OpenAI from "openai";

const PARAM_NAME = "url";

import dotenv from 'dotenv';
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG,
});

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = serverSupabaseClient(event);

  const hasProPlan = await isPro(user?.id, client);

  if (!hasProPlan) {
    return {
      status: 401,
      error: 'Unauthorized'
    };
  }

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
    h1: $('h1').text().replaceAll('\t', '').replaceAll('\n', ''),
    h2: $('h2').text().replaceAll('\t', '').replaceAll('\n', ''),
    // h3: $('h3').text().replaceAll('\t','').replaceAll('\n',''),
    // p: $('p').text().replaceAll('\t','').replaceAll('\n',''),
    // blockquote: $('blockquote').text().replaceAll('\t','').replaceAll('\n',''),
  };

  const content = `
I will give you a website source and you will give me the keywords of this website.
In case of no data after the double colon, just leave it empty.
If you know what the website is about, generate a few keywords for it.
Do not add spaces, just one word speparated by comma.
Do not add special characters, just letters.
Try to generate keywords that are related to the content of the website.
If you understand the content of the website, you can generate keywords that could be related to the content of the website.
If the keyword is not descriptive enough, do not add it.
Every keyword should have maximum 10 letters and maximum 2 words.
Example of answer: News, Technology, Science
Limit the answer to 5 elements separated by commas:

${JSON.stringify(HTMLResult)}
   `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content }],
    model: 'gpt-3.5-turbo',
  });

  const apiResponse = completion.choices[0].message?.content;

  return apiResponse?.split(',').map((item) => item.trim());

  // const responseAI = await fetch('https://api.openai.com/v1/chat/completions', {
  //    method: 'POST',
  //    headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${dotenv.config().parsed.OPENAI_API_KEY}`
  //    },
  //    body: JSON.stringify({
  //       model: 'gpt-3.5-turbo',
  //       messages: [{ role: 'user', content: content }],
  //    })
  // });

  // return responseAI.json();




  //    const HTMLRaw = `
  // <html>
  //    <head>
  //       <title>${HTMLResult.title}</title>
  //       <meta charset="utf-8">
  //    </head>
  //    <body>
  //       <span>${JSON.stringify(HTMLResult)}</span>
  //    </body>
  // </html>
  //    `;

  //    return HTMLRaw;
});

