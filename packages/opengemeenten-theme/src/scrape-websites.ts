import { mkdir, readFile, writeFile } from 'node:fs/promises';
import pLimit from 'p-limit';

export interface ScrapedWebsite {
  css: string;
  url: string;
}

const isStringArray = (arg: any) => Array.isArray(arg) && arg.every((item) => typeof item === 'string');

const init = async () => {
  const domains = JSON.parse(await readFile('config/websites.json', 'utf-8'));

  if (!isStringArray(domains)) {
    throw new TypeError('websites.json must contain an array with domains');
  }

  const limit = pLimit(5);

  const scrapedCss = await Promise.all(
    domains.map(async (url) => {
      console.log(`Scrape domain: ${url}`);
      const html = await limit(() => {
        console.log(url);
        return fetch(url).then((response) => response.text());
      });

      const cssFiles = Array.from(html.matchAll(/href="([^"]+)" rel="stylesheet"\s*/g)).map(([, url]) => url);
      return {
        url,
        css: (
          await Promise.all(
            cssFiles.map(async (cssUrl) => {
              const fullUrl = `${url}${cssUrl}`;
              return limit(() => {
                console.log(fullUrl);
                return fetch(fullUrl).then((r) => r.text());
              });
            }),
          )
        ).join(''),
      };
    }),
  );

  await mkdir('./tmp/', { recursive: true });
  writeFile('./tmp/scraped.json', JSON.stringify(scrapedCss, null, 2));
};

init();
