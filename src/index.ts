import { getUrlsFromFile } from './url-reader';
import { download360pVideo } from './downloader';

(async () => {
    const basePath = "/home/validus/coding/git_repositories/youtube-downloader";
    const urls = await getUrlsFromFile(basePath);
    for (const url of urls) {
        console.log("Downloading: " + url);
        await download360pVideo(url, basePath);
    }

})();