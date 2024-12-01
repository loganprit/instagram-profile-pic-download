import { logger } from "./logger.js";
import robot from "robotjs";
import { config } from "../config.js";
import path from "path";
import fs from "fs";

/**
 * Downloads the image from the webpage and saves it as "profile.jpg" in the src/images folder.
 * @throws {Error} If download fails
 */
async function downloadImage(): Promise<void> {
    try {
        // Ensure images directory exists
        if (!fs.existsSync(config.imagesDir)) {
            fs.mkdirSync(config.imagesDir, { recursive: true });
            logger.debug(`Created images directory: ${config.imagesDir}`);
        }

        // Clear any existing files in the images directory
        const existingFiles = fs.readdirSync(config.imagesDir);
        for (const file of existingFiles) {
            fs.unlinkSync(path.join(config.imagesDir, file));
        }
        logger.debug("Cleared existing files from images directory");

        // Wait for download button to be available
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tab to the download button (3 tabs from the input field in save-free, 4 in new version)
        if (config.downloaderUrl === "https://save-free.com/profile-downloader") {
            for (let i = 0; i < 3; i++) {
                robot.keyTap("tab");
                logger.debug(`Tab press ${i + 1}/3`);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        } else {
            for (let i = 0; i < 4; i++) {
                robot.keyTap("tab");
                logger.debug(`Tab press ${i + 1}/4`);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }

        // Press enter to download the image
        robot.keyTap("enter");
        logger.debug("Initiated image download");

        // Wait for download to complete
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Find image in the image directory from config
        const files = fs.readdirSync(config.imagesDir);
        if (files.length === 0) {
            throw new Error("No downloaded file found in images directory");
        }

        const imagePath = path.join(config.imagesDir, files[0]);
        logger.debug(`Found downloaded image: ${imagePath}`);

        // Rename image to profile.jpg
        const newPath = path.join(config.imagesDir, "profile.jpg");
        fs.renameSync(imagePath, newPath);
        logger.debug(`Renamed image to: ${newPath}`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        logger.error(`Process failed: ${errorMessage}`);
        throw new Error(`Process failed: ${errorMessage}`);
    }
}

export default downloadImage;