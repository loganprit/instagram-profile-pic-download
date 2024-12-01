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

        // Tab to the input field (44 tabs from the address bar in save-free, 63 in new version)
        if (config.downloaderUrl === "https://save-free.com/profile-downloader") {
            for (let i = 0; i < 44; i++) {
                robot.keyTap("tab");
                logger.debug(`Tab press ${i + 1}/44`);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        } else {
            for (let i = 0; i < 63; i++) {
                robot.keyTap("tab");
            logger.debug(`Tab press ${i + 1}/63`);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }

        // Input the URL
        robot.typeString(url);
        logger.debug(`Typed URL: ${url}`);
        await new Promise(resolve => setTimeout(resolve, 200));

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