import fetch from 'node-fetch';
import cheerio from 'cheerio';

async function findTextOnPage(url: string, searchText: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    if ($('body').text().includes(searchText)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Example usage:

const url = "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/sponsor-parents-grandparents/tell-us-you-want-sponsor-parent-grandparent.html"

const targetText = "We aren’t accepting"
findTextOnPage(url, targetText)
  .then(foundText => {
    console.log(`Text found: ${foundText}`);
  })
  .catch(error => {
    console.error(error);
  });
