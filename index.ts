import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import launchMacOSApp from "./src/utils/launch-app.js";
import goToWebpage from "./src/utils/go-to-webpage.js";
import inputUrl from "./src/utils/input-ig-url.js";
import downloadImage from "./src/utils/download-image.js";
import { config } from "./src/config.js";
import { logger } from "./src/utils/logger.js";
import readline from "readline";
import closeTabAndQuit from "./src/utils/close-tab-and-quit.js";
const execAsync = promisify(exec);

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisify the question method
const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
};

/**
 * Configuration type for the Instagram downloader
 */
interface DownloaderConfig {
    downloaderUrl: string;
    imagePath: string;
    browserPath: string;
}

/**
 * Gets Instagram URL either from command line args or user input
 * @returns {Promise<string>} The Instagram profile URL
 */
async function getInstagramUrl(): Promise<string> {
    // Check for URL in command line args (skip first two args: node and script path)
    const urlArg = process.argv[2];
    
    if (urlArg?.includes("instagram.com")) {
        logger.info("Using URL from command line arguments");
        return urlArg;
    }

    // If no valid URL in args, prompt user
    let igProfileUrl: string | null = null;
    while (!igProfileUrl) {
        igProfileUrl = await question("Enter the Instagram profile URL: ");
        if (!igProfileUrl?.includes("instagram.com")) {
            logger.warn("Invalid Instagram URL provided");
            igProfileUrl = null;
        }
    }
    
    return igProfileUrl;
}

/**
 * Main function to handle the Instagram profile picture download process
 * @throws {Error} If any step in the process fails
 */
async function downloadInstagramProfilePicture(
    config: DownloaderConfig
): Promise<void> {
    try {
        // Get the Instagram profile URL
        const igProfileUrl = await getInstagramUrl();

        // Close readline interface
        rl.close();

        // Launch browser
        await launchMacOSApp(config.browserPath);
        logger.info("Browser launched successfully");
        // Wait for browser to fully launch
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Navigate to the downloader website
        await goToWebpage(config.downloaderUrl);
        logger.info("Navigated to downloader website");
        // Wait for page to load
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Input the Instagram profile URL
        await inputUrl(igProfileUrl);
        logger.info("Instagram URL inputted successfully");
        // Wait for URL processing
        await new Promise(resolve => setTimeout(resolve, 15000));

        // Download the profile picture
        await downloadImage();
        logger.info("Profile picture downloaded successfully");
        // Wait for download to complete
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Clean up: close tab and quit browser
        await closeTabAndQuit();
        logger.info("Browser closed successfully");

        // Open the downloaded image
        /* await openImage(config.imagePath);
        logger.info("Image opened successfully"); */

        // Cooldown
        await new Promise(resolve => setTimeout(resolve, 20000));

        // Open the Shortcuts app (because this will be automated)
        await launchMacOSApp("/System/Applications/Shortcuts.app");
        logger.info("Shortcuts app opened successfully");

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        logger.error(`Process failed: ${errorMessage}`);
        throw new Error(`Failed to process Instagram profile picture: ${errorMessage}`);
    }
}

/**
 * Opens an image file using the default macOS image viewer
 * @param imagePath - Path to the image file
 * @throws {Error} If the image cannot be opened
 */
async function openImage(imagePath: string): Promise<void> {
    const absolutePath = path.resolve(imagePath);
    
    try {
        await execAsync(`open "${absolutePath}"`);
        logger.info(`Image opened successfully: ${absolutePath}`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        logger.error(`Failed to open image: ${errorMessage}`);
        throw new Error(`Failed to open image: ${errorMessage}`);
    }
}

/**
 * Initialize the application
 */
async function init(): Promise<void> {
    try {
        await downloadInstagramProfilePicture({
            downloaderUrl: config.downloaderUrl,
            imagePath: config.imagePath,
            browserPath: config.browserPath
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        logger.error(`Application failed: ${errorMessage}`);
        process.exit(1);
    }
}

// Start the application
init();
