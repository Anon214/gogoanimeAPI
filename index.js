// scrapes entire gogoanime website

const puppeteer = require('puppeteer');

/**
 * Scrapes all Anime from GogoAnime's animelist
 * @returns data[x][y], where x can be 0 (name) or 1 (link) and y is the location of the data
 */
const scrapeAllAnime = async () => {

    // opens browser and page and goes to gogoanime
    const browser = await puppeteer.launch({
        headless:true
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 800,
        height: 600,
        deviceScaleFactor: 1,
    });

    let scrappedData = [];
    let pageNum = 1; // starts at 1 not 0
    let length = 1;
    
    while (length != 0) {
        await page.goto(`https://gogoanime.llc/anime-list.html?page=${pageNum}`);

        const animes = await page.evaluate(() => {
            let parser = new DOMParser;
            const anime = Array.from(document.querySelectorAll(".listing li"));
            const data = anime.map(val => {
                let type = parser.parseFromString(val.getAttribute('title'), "text/html").querySelectorAll('.type');
                return {
                    name: val.querySelector('a').textContent,
                    link: val.querySelector('a').getAttribute('href'),
                    summary: parser.parseFromString(val.getAttribute('title'), "text/html").querySelector('.sumer').textContent.trim(),
                    image: parser.parseFromString(val.getAttribute('title'), "text/html").querySelector('img').getAttribute('src'),
                    genre: type[0].textContent.trim(),
                    year: type[1].textContent.trim(),
                    status: type[2].textContent.trim()
                }
            });
            return data;
        });
        length = animes.length;
        if (length != 0) {
            pageNum++;
            console.log(animes[0].name);
            scrappedData.push(animes);
        }
    }
    
}

scrapeAllAnime();