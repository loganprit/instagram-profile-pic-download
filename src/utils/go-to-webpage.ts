import robot from "robotjs";
import { logger } from "./logger.js";

/**
 * Navigates to a webpage using keyboard automation.
 * 
 * @param {string} url - The URL to navigate to.
 * @throws {Error} Throws an error if the URL is invalid or if navigation fails.
 */
async function goToWebpage(url: string): Promise<void> {
    try {
        // Validate the input type
        if (typeof url !== "string") {
            throw new Error("Invalid input: url must be a string.");
        }

        // Open a new tab
        robot.keyTap("t", ["command"]);
        logger.debug("Opened new tab");

        // Wait for tab to open
        await new Promise(resolve => setTimeout(resolve, 100));

        // Focus on the URL input field
        robot.keyTap("l", ["command"]);
        logger.debug("Focused on URL input field");
        await new Promise(resolve => setTimeout(resolve, 10));

        // Select all existing text and delete it
        robot.keyTap("a", ["command"]); // Select all
        logger.debug("Selected all text in URL field");
        await new Promise(resolve => setTimeout(resolve, 10));
        
        robot.keyTap("delete"); // Delete selection
        logger.debug("Cleared URL field");
        await new Promise(resolve => setTimeout(resolve, 10));

        // Type URL
        logger.debug(`Attempting to type URL: ${url}`);
        robot.typeString(url);
        logger.debug(`Completed typing URL: ${url}`);

        // Press Enter to navigate
        robot.keyTap("enter");
        logger.debug("Pressed Enter to navigate");

        // Wait for navigation
        logger.info("Navigation completed");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        logger.error(`Failed to navigate to webpage: ${errorMessage}`);
        throw new Error(`Failed to navigate to webpage: ${errorMessage}`);
    }
}

export default goToWebpage;