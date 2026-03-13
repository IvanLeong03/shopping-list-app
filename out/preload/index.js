"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  // We'll define the bridge functions here
  getItems: () => electron.ipcRenderer.invoke("get-items"),
  addItem: (item) => electron.ipcRenderer.invoke("add-item", item),
  updateItem: (item) => electron.ipcRenderer.invoke("update-item", item),
  deleteItem: (id) => electron.ipcRenderer.invoke("delete-item", id),
  getSettings: () => electron.ipcRenderer.invoke("get-settings"),
  updateSettings: (settings) => electron.ipcRenderer.invoke("update-settings", settings)
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
}
