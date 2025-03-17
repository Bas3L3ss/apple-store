import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables from root `.env`
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Define absolute paths for client and server
const rootDir = path.resolve(__dirname);
const serverDir = path.join(rootDir, "server");
const clientDir = path.join(rootDir, "client");
const websocketDir = path.join(rootDir, "websocket");

// Check if the directories exist before running commands
if (!fs.existsSync(serverDir))
  throw new Error("❌ Server directory not found!");
if (!fs.existsSync(clientDir))
  throw new Error("❌ Client directory not found!");

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
  },

  webServer: [
    {
      command: `npm --prefix ${serverDir} start`, // Explicitly use server path
      port: 8080,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `npm --prefix ${websocketDir} start`,
      port: 3001,
      reuseExistingServer: false,
    },
    {
      command: `npm --prefix ${clientDir} run dev`, // Explicitly use client path
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
