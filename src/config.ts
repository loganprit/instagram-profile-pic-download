import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set images directory relative to src folder
const imagesDir = path.join(__dirname, "images");

// Pick downloader URL at random
// Inflact and simpliers currently not working "https://inflact.com/downloader/instagram/avatar/" "https://simpliers.com/en/tools/profile-picture"
const downloaderUrls = [
    "https://save-free.com/profile-downloader",
];
const downloaderUrl = downloaderUrls[Math.floor(Math.random() * downloaderUrls.length)];

// Pick browser path at random
const browserPaths = [
    "/Applications/Firefox.app",
    "/Applications/Brave Browser.app",
    "/Applications/Google Chrome.app",
    "/Applications/Microsoft Edge.app"
];
const browserPath = browserPaths[Math.floor(Math.random() * browserPaths.length)];

export const config = {
    imagesDir,
    downloaderUrl,
    imagePath: path.join(imagesDir, "profile.jpg"),
    browserPath,
    logLevel: process.env.NODE_ENV === "production" ? "info" : "debug"
};