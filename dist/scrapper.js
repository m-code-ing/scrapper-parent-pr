import fetch from "node-fetch";
import cheerio from "cheerio";

export const handler = async (event, context) => {
  const findTextOnPage = async (url, targetText) => {
    try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const elementContainingText = $(`*:contains('${targetText}'):last`);
    const textContent = elementContainingText.text().trim();
    return textContent;  
    } catch (error) {
      console.log({error})
    }
    
  };

  const url =
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/sponsor-parents-grandparents/tell-us-you-want-sponsor-parent-grandparent.html";

  const targetText = "We aren’t accepting";

  const answer = await findTextOnPage(url, targetText);

  console.log({ answer });
};
