"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const Store = require("electron-store");
const icon = path.join(__dirname, "../../resources/icon.png");
const store = new Store({
  defaults: {
    items: [],
    settings: {
      categories: ["Electronics", "Sports Gear", "Clothing"],
      currencies: ["HKD", "GBP", "JPY"]
    }
  }
});
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  electron.ipcMain.handle("get-items", async () => {
    return store.get("items") || [];
  });
  electron.ipcMain.handle("add-item", async (_event, item) => {
    const items = store.get("items");
    store.set("items", [...items, item]);
    return { success: true };
  });
  electron.ipcMain.handle("update-item", async (_event, updatedItem) => {
    const items = store.get("items") || [];
    const index = items.findIndex((i) => i.id === updatedItem.id);
    if (index !== -1) {
      const newItems = [...items];
      newItems[index] = updatedItem;
      store.set("items", newItems);
      return { success: true };
    }
    return { success: false, error: "Item not found" };
  });
  electron.ipcMain.handle("delete-item", async (_event, itemId) => {
    const items = store.get("items") || [];
    const filtered = items.filter((i) => i.id !== itemId);
    store.set("items", filtered);
    return { success: true };
  });
  electron.ipcMain.handle("get-settings", async () => {
    return store.get("settings");
  });
  electron.ipcMain.handle("update-settings", async (_event, newSettings) => {
    store.set("settings", newSettings);
    return { success: true };
  });
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
