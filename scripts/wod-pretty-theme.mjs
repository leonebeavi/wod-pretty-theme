/**
 * WoD Pretty Theme — theme activation
 * -----------------------------------
 * The Glass Gótico look lives in styles/glass.css and the custom sheet templates
 * (registered by scripts/glass-reorg.mjs). That CSS is built ON TOP of the wod5e
 * system stylesheet — it reuses the system's base geometry (dot/box sizes, grids,
 * chat-card layout) and only recolours/relayouts it. So the system stylesheet
 * stays loaded; we just switch the theme on with two body classes:
 *
 *   .wod-pretty-theme  master switch — the whole glass theme is scoped under it
 *   .wpt-chrome        restores Foundry's DEFAULT interface (the theme's own
 *                      de-bleed of the system's chrome overrides)
 *
 * NOTE: a more aggressive "remove the system CSS from Foundry's native windows"
 * pass was tried and reverted — it broke the sheets/chat, which genuinely need
 * the system's base styling. The native-window de-bleed will return later as a
 * separate, surgical layer that does not touch the sheets or chat.
 */

const MODULE_ID = "wod-pretty-theme";

/** Tag <body> so the theme applies (and Foundry's chrome is restored). */
function applyThemeClasses() {
  const body = document.body;
  if (!body) return;
  body.classList.add("wod-pretty-theme", "wpt-chrome");
}

if (typeof Hooks !== "undefined") {
  // <body> exists this early; apply immediately so there is no flash.
  Hooks.once("setup", applyThemeClasses);
  Hooks.once("ready", applyThemeClasses);
}

export { applyThemeClasses };
