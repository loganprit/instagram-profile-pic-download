import { logger } from "./logger.js";
import robot from "robotjs";

/**
 * Closes the current tab using the Cmd+W keyboard shortcut and quits the application.
 * This function utilizes the 'robotjs' library to simulate keyboard events.
 * 
 * @throws {Error} Throws an error if the closing tab or quitting process fails.
 */
async function closeTabAndQuit(): Promise<void> {
    try {
        // Validate that we're on macOS (since we're using Cmd key)
        if (process.platform !== "darwin") {
            throw new Error("This function is only supported on macOS");
        }

        // Close the current tab
        robot.keyTap("w", ["command"]);
        logger.debug("Sent Cmd+W command");
        
        // Wait for tab to close
        await new Promise(resolve => setTimeout(resolve, 500));
        logger.info("Tab closed successfully");

        // Wait briefly before quitting
        await new Promise(resolve => setTimeout(resolve, 500));

        // Quit the application
        robot.keyTap("q", ["command"]);
        logger.debug("Sent Cmd+Q command");
        
        // Wait for quit command to process
        await new Promise(resolve => setTimeout(resolve, 500));
        logger.info("Application quit successfully");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        logger.error(`Failed to close tab and quit application: ${errorMessage}`);
        throw new Error(`Failed to close tab and quit application: ${errorMessage}`);
    }
}

export default closeTabAndQuit;
