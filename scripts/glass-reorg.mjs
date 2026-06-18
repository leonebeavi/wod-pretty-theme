/**
 * WoD Pretty Theme — structural reorganization ("Glass Gótico")
 * ------------------------------------------------------------
 * Subclasses each PC splat sheet to consolidate the system's ~10 tabs into a
 * compact set: Core · [splat tabs] · Profile · Inventory · Notes — with a
 * horizontal labeled top bar, and the Settings form relocated GM-only inside
 * Profile.
 *
 * How the merge works (no system markup is copied):
 *  - We REUSE the system's own part templates (stats/features/experience/
 *    biography/equipment/notepad/disciplines/...).
 *  - "Profile" is three parts (features, experience, biography, +settings) that
 *    all render with `data-tab="profile"`. Foundry's changeTab toggles every
 *    `.tab[data-group]` whose data-tab matches, so they show together.
 *  - Each part's `context.tab` is set explicitly from `context.tabs[id]`,
 *    mirroring Foundry's own `partId in context.tabs` mechanism.
 *
 * Safety: gated behind the `restructure` world setting (default on). If it ever
 * misbehaves, turn it off and reload — the system's original sheets return and
 * the v1.1.0 visual theme still applies.
 */

const MODULE_ID = "wod-pretty-theme";
const NAV_TEMPLATE = `modules/${MODULE_ID}/templates/tab-navigation.hbs`;

// Custom per-tab templates that replace the system's (keyed by part/tab id).
// Tabs not listed here keep the system's own template, re-skinned via CSS.
const CUSTOM_TEMPLATES = {
  core:        `modules/${MODULE_ID}/templates/core.hbs`,
  disciplines: `modules/${MODULE_ID}/templates/disciplines.hbs`,
  blood:       `modules/${MODULE_ID}/templates/blood.hbs`,
  advantages:  `modules/${MODULE_ID}/templates/advantages.hbs`,
  profile:     `modules/${MODULE_ID}/templates/profile.hbs`,
  inventory:   `modules/${MODULE_ID}/templates/inventory.hbs`,
  notepad:     `modules/${MODULE_ID}/templates/notepad.hbs`,
  settings:    `modules/${MODULE_ID}/templates/settings.hbs`
};

// Custom header templates, keyed by Actor subtype. A splat without an entry
// keeps the system's own header (still re-skinned via CSS).
const CUSTOM_HEADERS = {
  vampire: `modules/${MODULE_ID}/templates/header-vampire.hbs`
};

/** Splat-specific tabs to preserve, keyed by Actor subtype. */
const SPLAT_TABS = {
  vampire: [
    { id: "disciplines", title: "WOD5E.VTM.Disciplines", icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>' },
    { id: "blood",       title: "WOD5E.VTM.Blood",       icon: '<i class="fa-solid fa-droplet"></i>' }
  ],
  ghoul: [
    { id: "disciplines", title: "WOD5E.VTM.Disciplines", icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>' }
  ],
  werewolf: [
    { id: "gifts", title: "WOD5E.WTA.GiftsAndRenown", icon: '<span class="wod5e-symbol">h</span>' },
    { id: "wolf",  title: "WOD5E.WTA.Wolf",           icon: '<i class="fa-brands fa-wolf-pack-battalion"></i>' }
  ],
  hunter: [
    { id: "edges", title: "WOD5E.HTR.Edges", icon: '<span class="wod5e-symbol hunter">e</span>' }
  ],
  mortal: []
};

/** Find the wod5e system's registered sheet class for an Actor subtype. */
function getSystemSheetClass(type) {
  const reg = CONFIG.Actor?.sheetClasses?.[type] ?? {};
  return Object.values(reg)
    .map(e => e?.cls)
    .find(cls => cls && cls.PARTS && ("stats" in cls.PARTS) && (cls.name || "").endsWith("ActorSheet"));
}

/** Build a tab-consolidating subclass of a given splat sheet. */
function buildGlassSheet(Base, splatTabs, type) {
  const splatParts = {};
  for (const t of splatTabs) {
    if (CUSTOM_TEMPLATES[t.id]) splatParts[t.id] = { template: CUSTOM_TEMPLATES[t.id] };
    else if (Base.PARTS[t.id]) splatParts[t.id] = Base.PARTS[t.id];
  }
  const headerPart = CUSTOM_HEADERS[type] ? { template: CUSTOM_HEADERS[type] } : Base.PARTS.header;

  return class GlassGothicSheet extends Base {
    static PARTS = {
      header:        headerPart,
      tabs:          { template: NAV_TEMPLATE },
      core:          { template: CUSTOM_TEMPLATES.core },
      ...splatParts,
      advantages:    { template: CUSTOM_TEMPLATES.advantages },
      profile:       { template: CUSTOM_TEMPLATES.profile },
      inventory:     { template: CUSTOM_TEMPLATES.inventory },
      notepad:       { template: CUSTOM_TEMPLATES.notepad },
      settings:      { template: CUSTOM_TEMPLATES.settings },
      banner:        Base.PARTS.banner,
      limited:       Base.PARTS.limited
    };

    /** Consolidated nav: Core · [splat] · Advantages · Profile · Inventory · Notes · [Settings (GM)]. */
    tabs = (() => {
      const t = {
        core: { id: "core", group: "primary", title: "WPT.Tabs.Core", icon: '<i class="fa-regular fa-chart-line"></i>' }
      };
      for (const s of splatTabs) t[s.id] = { id: s.id, group: "primary", title: s.title, icon: s.icon };
      t.advantages = { id: "advantages", group: "primary", title: "WPT.Tabs.Advantages", icon: '<i class="fas fa-gem"></i>' };
      t.profile    = { id: "profile",    group: "primary", title: "WPT.Tabs.Profile",    icon: '<i class="fas fa-id-card"></i>' };
      t.inventory  = { id: "inventory",  group: "primary", title: "WPT.Tabs.Inventory",  icon: '<i class="fa-solid fa-toolbox"></i>' };
      t.notepad    = { id: "notepad",    group: "primary", title: "WPT.Tabs.Notes",      icon: '<i class="fas fa-sticky-note"></i>' };
      if (game.user?.isGM) t.settings = { id: "settings", group: "primary", title: "WPT.Tabs.Settings", icon: '<i class="fa-solid fa-gears"></i>' };
      return t;
    })();

    tabGroups = { primary: "core" };

    /** Drop the GM-only Settings part for non-GM users. */
    _configureRenderParts(options) {
      const parts = super._configureRenderParts(options);
      if (!game.user.isGM) delete parts.settings;
      return parts;
    }

    async _preparePartContext(partId, context, options) {
      const actor = this.actor;

      // Parent prep first. This handles the splat-specific tabs (disciplines,
      // blood, gifts, wolf, edges), notepad, limited, etc., AND — crucially —
      // the system's prepare* helpers each set `context.tab = context.tabs.<id>`
      // using their ORIGINAL id. We override that at the very end.
      context = { ...(await super._preparePartContext(partId, context, options)) };

      // Our renamed / merged parts have no case in the parent, so run their prep.
      let tabId = partId;
      switch (partId) {
        // Custom header needs `generation` (only the system's Blood part sets it).
        case "header":    context.generation = actor.system?.headers?.generation ?? ""; break;
        case "core":       context = await this.prepareStatsContext(context, actor);     tabId = "core"; break;
        case "inventory":  context = await this.prepareEquipmentContext(context, actor); tabId = "inventory"; break;
        // Advantages = the character's features (backgrounds/merits/flaws/boons).
        case "advantages": context = await this.prepareFeaturesContext(context, actor);  tabId = "advantages"; break;
        // Profile = identity (from Features) + Experience + Biography.
        case "profile":
          context = await this.prepareFeaturesContext(context, actor);
          context = await this.prepareExperienceContext(context, actor);
          context = await this.prepareBiographyContext(context, actor);
          tabId = "profile";
          break;
        case "settings":   context = await this.prepareSettingsContext(context, actor);  tabId = "settings"; context.isGM = game.user.isGM; break;
      }

      // Bind the correct tab LAST — the system helpers above set context.tab to
      // their original id (undefined after our rename/merge), so this fixes it
      // and makes the merged Profile parts share data-tab="profile".
      if (context?.tabs && tabId in context.tabs) context.tab = context.tabs[tabId];
      return context;
    }
  };
}

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "restructure", {
    name: "WPT.Settings.Restructure.Name",
    hint: "WPT.Settings.Restructure.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });
});

/**
 * Register + activate the reorganized sheets at READY.
 *
 * Timing matters: the system registers its sheets during init, but those
 * registrations are queued and only flushed by DocumentSheetConfig.initializeSheets()
 * which runs just BEFORE the "ready" hook. So at "setup", CONFIG.Actor.sheetClasses
 * is still empty and we can't find the system's base classes. At "ready" they exist.
 *
 * Activation: Foundry's _getSheetClass() picks the registered entry whose
 * `.default === true`; `makeDefault` is ignored when the world already has a saved
 * default. So after registering we set the `.default` flag on our entries directly
 * (this session) and persist the choice to the core "sheetClasses" setting (future
 * reloads). The `restructure` setting gates all of this — turn it off and reload to
 * fall back to the system's sheets.
 */
Hooks.once("ready", async () => {
  if (!game.settings.get(MODULE_ID, "restructure")) return;
  const SHEET_ID = `${MODULE_ID}.GlassGothicSheet`;

  // Make sure our nav template is available before sheets render.
  try {
    const load = foundry.applications?.handlebars?.loadTemplates ?? globalThis.loadTemplates;
    if (load) await load([NAV_TEMPLATE, ...Object.values(CUSTOM_TEMPLATES), ...Object.values(CUSTOM_HEADERS)]);
  } catch (e) {
    console.warn(`${MODULE_ID} | could not preload nav template`, e);
  }

  // Register a reorganized subclass for each supported splat.
  const Actors = foundry.documents?.collections?.Actors ?? globalThis.Actors;
  for (const [type, splatTabs] of Object.entries(SPLAT_TABS)) {
    try {
      const Base = getSystemSheetClass(type);
      if (!Base) { console.warn(`${MODULE_ID} | no system sheet found for "${type}"; skipping reorg`); continue; }
      const Sheet = buildGlassSheet(Base, splatTabs, type);
      Actors.registerSheet(MODULE_ID, Sheet, {
        types: [type],
        makeDefault: true,
        label: "WoD Pretty Theme (Glass Gótico)"
      });
    } catch (e) {
      console.error(`${MODULE_ID} | failed to register reorganized sheet for "${type}"`, e);
    }
  }

  // Make our sheet the ACTIVE default for this session (set the .default flag).
  for (const type of Object.keys(SPLAT_TABS)) {
    const sheets = CONFIG.Actor?.sheetClasses?.[type];
    if (sheets?.[SHEET_ID]) {
      for (const s of Object.values(sheets)) s.default = false;
      sheets[SHEET_ID].default = true;
    }
  }

  // Persist the choice so it survives reloads (GM only — it's a world setting).
  if (game.user?.isGM) {
    try {
      const current = foundry.utils.deepClone(game.settings.get("core", "sheetClasses") ?? {});
      current.Actor ??= {};
      let changed = false;
      for (const type of Object.keys(SPLAT_TABS)) {
        if (CONFIG.Actor?.sheetClasses?.[type]?.[SHEET_ID] && current.Actor[type] !== SHEET_ID) {
          current.Actor[type] = SHEET_ID; changed = true;
        }
      }
      if (changed) {
        await game.settings.set("core", "sheetClasses", current);
        ui.notifications?.info("WoD Pretty Theme: Glass Gótico sheets enabled — close and reopen actor sheets to see them.");
      }
    } catch (e) {
      console.error(`${MODULE_ID} | could not persist default sheets`, e);
    }
  }
});
