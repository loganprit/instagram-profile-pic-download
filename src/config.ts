import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set images directory relative to src folder
const imagesDir = path.join(__dirname, "images");

// Pick downloader URL at random
const downloaderUrls = [
    "https://save-free.com/profile-downloader",
    "https://inflact.com/downloader/instagram/avatar/"
];
const downloaderUrl = downloaderUrls[Math.floor(Math.random() * downloaderUrls.length)];

// Pick browser path at random
const browserPaths = [
    "/Applications/Firefox.app",
    "/Applications/Safari.app",
    "/Applications/Brave Browser.app"
];
const browserPath = browserPaths[Math.floor(Math.random() * browserPaths.length)];

export const config = {
    imagesDir,
    downloaderUrl,
    imagePath: path.join(imagesDir, "profile.jpg"),
    browserPath,
    logLevel: process.env.NODE_ENV === "production" ? "info" : "debug"
};