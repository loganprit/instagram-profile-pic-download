import { exec } from "child_process";
import { promisify } from "util";
import { logger } from "./logger.js";

const execAsync = promisify(exec);

/**
 * Launches a macOS application using JavaScript.
 * This function utilizes the 'child_process' module to execute the 'open' command,
 * which is a built-in macOS command to open applications.
 * 
 * @param {string} appPath - The path to the application to be launched.
 * @throws {Error} Throws an error if the application path is invalid or if the launch fails.
 */
async function launchMacOSApp(appPath: string): Promise<void> {
    // Validate the input type
    if (typeof appPath !== "string") {
        const error = "Invalid input: appPath must be a string.";
        logger.error(error);
        throw new Error(error);
    }

    try {
        await execAsync(`open "${appPath}"`);
        logger.info(`Application launched successfully: ${appPath}`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        logger.error(`Failed to launch application: ${errorMessage}`);
        throw new Error(`Failed to launch application: ${errorMessage}`);
    }
}

export default launchMacOSApp;