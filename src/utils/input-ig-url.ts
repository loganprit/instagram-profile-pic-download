import robot from "robotjs";
import { logger } from "./logger.js";
import { config } from "../config.js";

/**
 * Inputs the Instagram profile URL to the input field.
 * 
 * @param {string} url - The Instagram profile URL to be input.
 * @throws {Error} If input fails
 */
async function inputUrl(url: string): Promise<void> {
    try {
        // Validate URL
        if (!url.includes("instagram.com")) {
            throw new Error("Invalid Instagram URL provided");
        }

        // Wait for page to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tab to the input field (44 tabs for save-free, 63 tabs for inflact, 23 for simpliers)
        if (config.downloaderUrl === "https://save-free.com/profile-downloader") {
            for (let i = 0; i < 44; i++) {
                robot.keyTap("tab");
                logger.debug(`Tab press ${i + 1}/44`);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        } else if (config.downloaderUrl === "https://inflact.com/downloader/instagram/avatar/") {
            for (let i = 0; i < 63; i++) {
                robot.keyTap("tab");
                logger.debug(`Tab press ${i + 1}/63`);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        } else {
            for (let i = 0; i < 23; i++) {
                robot.keyTap("tab");
                logger.debug(`Tab press ${i + 1}/23`);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }

        // Input the URL
        robot.typeString(url);
        logger.debug(`Typed URL: ${url}`);
        await new Promise(resolve => setTimeout(resolve, 200));

        // simpliers requires two more tabs before submitting
        if (config.downloaderUrl === "https://simpliers.com/en/tools/profile-picture") {
            for (let i = 0; i < 2; i++) {
                robot.keyTap("tab");
                logger.debug(`Tab press ${i + 1}/2`);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }

        // Press enter
        robot.keyTap("enter");
        logger.debug("Submitted form");

        // Wait for submission
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        logger.error(`Failed to input URL: ${errorMessage}`);
        throw new Error(`Failed to input URL: ${errorMessage}`);
    }
}

export default inputUrl;