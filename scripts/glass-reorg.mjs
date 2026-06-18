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

/** Splat-specific tabs to preserve, keyed by Actor subtype. */
const SPLAT_TABS = {
  vampire: [
    { id: "disciplines", title: "WOD5E.VTM.Disciplines", icon: '<span class="wod5e-symbol">b</span>' },
    { id: "blood",       title: "WOD5E.VTM.Blood",       icon: '<i class="fa-solid fa-droplet"></i>' }
  ],
  ghoul: [
    { id: "disciplines", title: "WOD5E.VTM.Disciplines", icon: '<span class="wod5e-symbol">b</span>' }
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
function buildGlassSheet(Base, splatTabs) {
  const splatParts = {};
  for (const t of splatTabs) if (Base.PARTS[t.id]) splatParts[t.id] = Base.PARTS[t.id];

  return class GlassGothicSheet extends Base {
    static PARTS = {
      header:        Base.PARTS.header,
      tabs:          { template: NAV_TEMPLATE },
      core:          Base.PARTS.stats,
      ...splatParts,
      pf_features:   Base.PARTS.features,
      pf_experience: Base.PARTS.experience,
      pf_biography:  Base.PARTS.biography,
      pf_settings:   Base.PARTS.settings,
      inventory:     Base.PARTS.equipment,
      notepad:       Base.PARTS.notepad,
      banner:        Base.PARTS.banner,
      limited:       Base.PARTS.limited
    };

    /** Consolidated navigation: Core · [splat] · Profile · Inventory · Notes. */
    tabs = (() => {
      const t = {
        core: { id: "core", group: "primary", title: "WPT.Tabs.Core", icon: '<i class="fa-regular fa-chart-line"></i>' }
      };
      for (const s of splatTabs) t[s.id] = { id: s.id, group: "primary", title: s.title, icon: s.icon };
      t.profile   = { id: "profile",   group: "primary", title: "WPT.Tabs.Profile",   icon: '<i class="fas fa-id-card"></i>' };
      t.inventory = { id: "inventory", group: "primary", title: "WPT.Tabs.Inventory", icon: '<i class="fa-solid fa-toolbox"></i>' };
      t.notepad   = { id: "notepad",   group: "primary", title: "WPT.Tabs.Notes",     icon: '<i class="fas fa-sticky-note"></i>' };
      return t;
    })();

    tabGroups = { primary: "core" };

    /** Drop the GM-only settings part for non-GM users. */
    _configureRenderParts(options) {
      const parts = super._configureRenderParts(options);
      if (!game.user.isGM) delete parts.pf_settings;
      return parts;
    }

    async _preparePartContext(partId, context, options) {
      const actor = this.actor;
      const setTab = (id) => { if (context?.tabs && id in context.tabs) context.tab = context.tabs[id]; };

      switch (partId) {
        case "core":
          context = { ...(await super._preparePartContext(partId, context, options)) };
          setTab("core");
          return this.prepareStatsContext(context, actor);

        case "inventory":
          context = { ...(await super._preparePartContext(partId, context, options)) };
          setTab("inventory");
          return this.prepareEquipmentContext(context, actor);

        case "pf_features":
          context = { ...(await super._preparePartContext(partId, context, options)) };
          setTab("profile"); context.isGM = game.user.isGM;
          return this.prepareFeaturesContext(context, actor);

        case "pf_experience":
          context = { ...(await super._preparePartContext(partId, context, options)) };
          setTab("profile");
          return this.prepareExperienceContext(context, actor);

        case "pf_biography":
          context = { ...(await super._preparePartContext(partId, context, options)) };
          setTab("profile");
          return this.prepareBiographyContext(context, actor);

        case "pf_settings":
          context = { ...(await super._preparePartContext(partId, context, options)) };
          setTab("profile"); context.isGM = game.user.isGM;
          return this.prepareSettingsContext(context, actor);

        default:
          // header / tabs / banner / limited / notepad / splat-specific:
          // let the parent prepare them, then attach the matching tab.
          context = await super._preparePartContext(partId, context, options);
          setTab(partId);
          return context;
      }
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

Hooks.once("setup", async () => {
  if (!game.settings.get(MODULE_ID, "restructure")) return;

  // Make sure our nav template is available before sheets render.
  try {
    const load = foundry.applications?.handlebars?.loadTemplates ?? globalThis.loadTemplates;
    if (load) await load([NAV_TEMPLATE]);
  } catch (e) {
    console.warn(`${MODULE_ID} | could not preload nav template`, e);
  }

  const Actors = foundry.documents?.collections?.Actors ?? globalThis.Actors;
  for (const [type, splatTabs] of Object.entries(SPLAT_TABS)) {
    try {
      const Base = getSystemSheetClass(type);
      if (!Base) { console.warn(`${MODULE_ID} | no system sheet found for "${type}"; skipping reorg`); continue; }
      const Sheet = buildGlassSheet(Base, splatTabs);
      Actors.registerSheet(MODULE_ID, Sheet, {
        types: [type],
        makeDefault: true,
        label: "WoD Pretty Theme (Glass Gótico)"
      });
    } catch (e) {
      console.error(`${MODULE_ID} | failed to register reorganized sheet for "${type}"`, e);
    }
  }
});

/**
 * Force our sheet to be the active default for the reorganized types.
 * `makeDefault: true` is silently ignored when the world already has a saved
 * default sheet for a type (Foundry respects the existing choice), so we set it
 * explicitly. GM-only, gated by the `restructure` setting; turning that off (and
 * reloading) lets Foundry fall back to the system sheets.
 */
Hooks.once("ready", async () => {
  if (!game.user?.isGM) return;
  if (!game.settings.get(MODULE_ID, "restructure")) return;
  const SHEET_ID = `${MODULE_ID}.GlassGothicSheet`;
  try {
    const current = foundry.utils.deepClone(game.settings.get("core", "sheetClasses") ?? {});
    current.Actor ??= {};
    let changed = false;
    for (const type of Object.keys(SPLAT_TABS)) {
      if (current.Actor[type] !== SHEET_ID) { current.Actor[type] = SHEET_ID; changed = true; }
    }
    if (changed) {
      await game.settings.set("core", "sheetClasses", current);
      ui.notifications?.info("WoD Pretty Theme: Glass Gótico sheets enabled — reopen actor sheets to see them.");
    }
  } catch (e) {
    console.error(`${MODULE_ID} | could not set default sheets`, e);
  }
});
