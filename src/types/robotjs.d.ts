declare module "robotjs" {
    interface KeyboardOptions {
        autoDelay?: number;
        keyboardDelay?: number;
    }

    interface MouseOptions {
        mouseDelay?: number;
    }

    interface ScreenOptions {
        screenId?: number;
    }

    interface Point {
        x: number;
        y: number;
    }

    interface Size {
        width: number;
        height: number;
    }

    interface Bitmap {
        width: number;
        height: number;
        image: number[];
        byteWidth: number;
        bitsPerPixel: number;
        bytesPerPixel: number;
    }

    export function setKeyboardDelay(ms: number): void;
    export function keyTap(key: string, modifier?: string | string[]): void;
    export function keyToggle(key: string, down: "down" | "up", modifier?: string | string[]): void;
    export function typeString(string: string): void;
    export function typeStringDelayed(string: string, cpm: number): void;
    export function mouseClick(button?: string, double?: boolean): void;
} 