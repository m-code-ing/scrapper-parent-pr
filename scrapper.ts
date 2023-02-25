import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function findTextOnPage(url: string, text: string): Promise<boolean> {
  const response = await fetch(url);
  const body = await response.text();

  const $ = cheerio.load(body);
  const found = $('body:contains("' + text + '")').length > 0;

  return found;
}
