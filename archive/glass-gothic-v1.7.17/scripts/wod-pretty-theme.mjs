/**
 * WoD Pretty Theme
 * ----------------
 * A cosmetic theme module for the World of Darkness 5e (wod5e) system.
 *
 * The theme is pure CSS scoped under classes this script toggles on <body>:
 *   .wod-pretty-theme   master switch — every themed rule is scoped under it
 *   .wpt-chrome         restore Foundry's default interface (undo the wod5e
 *                       system's chrome overrides)
 *
 * Accent colour is always per-splat (Vampire crimson, Werewolf green,
 * Hunter amber, Mortal slate) — there is no accent-mode option.
 */

const MODULE_ID = "wod-pretty-theme";

const SETTINGS = {
  enabled: "enabled",
  styleChrome: "styleChrome"
};

/** Read settings and reflect them onto <body> as classes. */
function applyBodyClasses() {
  const body = document.body;
  if (!body) return;

  const enabled = game.settings.get(MODULE_ID, SETTINGS.enabled);
  const styleChrome = game.settings.get(MODULE_ID, SETTINGS.styleChrome);

  body.classList.remove("wod-pretty-theme", "wpt-chrome");
  if (!enabled) return;

  body.classList.add("wod-pretty-theme");
  if (styleChrome) body.classList.add("wpt-chrome");
}

Hooks.once("init", () => {
  const reapply = () => applyBodyClasses();

  game.settings.register(MODULE_ID, SETTINGS.enabled, {
    name: "WPT.Settings.Enabled.Name",
    hint: "WPT.Settings.Enabled.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: reapply
  });

  game.settings.register(MODULE_ID, SETTINGS.styleChrome, {
    name: "WPT.Settings.StyleChrome.Name",
    hint: "WPT.Settings.StyleChrome.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: reapply
  });

  // <body> already exists this early; apply immediately so there is no flash.
  applyBodyClasses();
});

Hooks.once("ready", () => applyBodyClasses());
