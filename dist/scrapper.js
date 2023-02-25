var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import cheerio from 'cheerio';
function findTextOnPage(url, searchText) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const body = yield response.text();
            const $ = cheerio.load(body);
            if ($('body').text().includes(searchText)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error(error);
            return false;
        }
    });
}
// Example usage:
const url = "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/sponsor-parents-grandparents/tell-us-you-want-sponsor-parent-grandparent.html";
const targetText = "We aren’t accepting";
findTextOnPage(url, targetText)
    .then(foundText => {
    console.log(`Text found: ${foundText}`);
})
    .catch(error => {
    console.error(error);
});
