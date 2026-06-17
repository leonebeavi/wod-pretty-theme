/**
 * WoD Pretty Theme
 * ----------------
 * A cosmetic theme module for the World of Darkness 5e (wod5e) system.
 *
 * The whole theme is pure CSS scoped under classes that this script toggles on
 * <body>. Doing it this way gives us two things for free:
 *   1. A clean on/off (and per-option) toggle without touching files.
 *   2. Extra selector specificity, so our rules reliably win over the wod5e
 *      system stylesheet (which is loaded before module styles, but uses some
 *      high-specificity rules of its own).
 *
 * Body classes managed here:
 *   .wod-pretty-theme        master switch — every themed rule is scoped under it
 *   .wpt-accent-splat        accent color follows the splat (vampire/werewolf/...)
 *   .wpt-accent-unified      single crimson accent everywhere (Progeny style)
 *   .wpt-accent-neutral      muted neutral accent, most minimal look
 *   .wpt-chrome              also restyle the Foundry chrome (sidebar/chat/dialogs)
 */

const MODULE_ID = "wod-pretty-theme";

const SETTINGS = {
  enabled: "enabled",
  accentMode: "accentMode",
  styleChrome: "styleChrome"
};

/** Read settings and reflect them onto <body> as classes. */
function applyBodyClasses() {
  const body = document.body;
  if (!body) return;

  const enabled = game.settings.get(MODULE_ID, SETTINGS.enabled);
  const accentMode = game.settings.get(MODULE_ID, SETTINGS.accentMode);
  const styleChrome = game.settings.get(MODULE_ID, SETTINGS.styleChrome);

  // Clear everything we own first, then re-apply.
  body.classList.remove(
    "wod-pretty-theme",
    "wpt-accent-splat",
    "wpt-accent-unified",
    "wpt-accent-neutral",
    "wpt-chrome"
  );

  if (!enabled) return;

  body.classList.add("wod-pretty-theme");
  body.classList.add(`wpt-accent-${accentMode}`);
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

  game.settings.register(MODULE_ID, SETTINGS.accentMode, {
    name: "WPT.Settings.AccentMode.Name",
    hint: "WPT.Settings.AccentMode.Hint",
    scope: "client",
    config: true,
    type: String,
    choices: {
      splat: "WPT.Settings.AccentMode.Choices.splat",
      unified: "WPT.Settings.AccentMode.Choices.unified",
      neutral: "WPT.Settings.AccentMode.Choices.neutral"
    },
    default: "splat",
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

// Re-apply once everything is loaded, just in case body was swapped out.
Hooks.once("ready", () => applyBodyClasses());
