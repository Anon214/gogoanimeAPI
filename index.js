// scrapes entire gogoanime website

const puppeteer = require('puppeteer');

/**
 * Scrapes All Anime from GogoAnime's animelist
 * @returns data[x][y], where x can be 0 (name) or 1 (link) and y is the location of the data
 */
const scrapeAllAnime = async () => {
    // opens browser and page and goes to gogoanime
    const browser = await puppeteer.launch({
        headless:true
    });
    const page = await browser.newPage();

    let data = [];
    let tempData = [];
    let pageNum = 1; // starts at 1 not 0
    
    // while () {
    //     await page.goto(`https://gogoanime.llc/anime-list.html?page=${pageNum}`);
    //     i++;
    // }

    await page.goto(`https://gogoanime.llc/anime-list.html?page=${pageNum}`);
    const anime = await page.evaluate(() => {
        const val = Array.from(document.querySelectorAll(".listing li a")).map(e => e.textContent);
        return val;
    });

    console.log(anime[0]);

    await browser.close();

    return data;
}

scrapeAllAnime();