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
findTextOnPage('https://www.example.com', 'Hello World!')
  .then(foundText => {
    console.log(`Text found: ${foundText}`);
  })
  .catch(error => {
    console.error(error);
  });
