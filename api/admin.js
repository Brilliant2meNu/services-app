
// admin.js
import { initModal } from "./modalHandler.js";
import { setupEventHandlers } from "./eventHandlers.js";
import { setupButtonActions } from "./buttonActions.js";

initModal("registerModal", ".tab-button", ".tab-content");
setupEventHandlers();
setupButtonActions();
