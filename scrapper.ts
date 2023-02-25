import cheerio from "cheerio";
import fetch from "node-fetch";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: 'AKIA42ORE75XEKK2LXDY',
  secretAccessKey: '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',
  region: 'us-west-2'
});


const SES = new AWS.SES();

const sendEmail = async (recipient: string, subject: string, body: string, source: string) => {
  const params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: source,
  };
  await SES.sendEmail(params).promise();
};

export const findTextOnPage = async (
  url: string,
  targetText: string,
  recipient: string,
  source: string
): Promise<string> => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const elementContainingText = $(`*:contains('${targetText}'):last`);
    const textContent = elementContainingText.text().trim();

    console.log({ textContent})

    if (textContent) {
      // Send an email using AWS SES
      const body = `IRCC: We are NOT accepting parents PR application.  Visit to confirm: ${url}.`;
      await sendEmail(recipient, "IRCC: We are not accepting parents PR application. ", body, source);
      return `Target text found on ${url}.`;
    } else {
      const body = `CONGRATULATIONS: WE ARE NOW ACCEPTING parents PR application.  Visit to confirm: ${url}.`;
      await sendEmail(recipient, "URGENT IRCC: WE ARE NOW ACCEPTINGaccepting parents PR application. ", body, source);
      return `Target text not found on ${url}.`;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Example usage:
const url =
  "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/sponsor-parents-grandparents/tell-us-you-want-sponsor-parent-grandparent.html";

const targetText = "We aren’t accepting";
const recipient = "hellomayankashok@gmail.com";
const source = "hellomayankashok@gmail.com";

const answer = await findTextOnPage(url, targetText, recipient, source);

console.log({ answer });