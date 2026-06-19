# Archived: "Glass Gótico" theme (v1.7.17)

This folder holds the complete, previously-shipped **WoD Pretty Theme** as of
**v1.7.17** — the dark/glass restyling plus the structural sheet reorganization.

It is **stored but not active**: none of these files are referenced from
`module.json`, so Foundry does not load them. They are kept here intact so the
ground-up overhaul can re-introduce pieces of this work, stage by stage.

## Contents

- `scripts/wod-pretty-theme.mjs` — original entry point: `enabled` + `styleChrome`
  body-class toggles for the full CSS theme.
- `scripts/glass-reorg.mjs` — per-splat sheet subclasses that consolidated the
  wod5e tabs into a horizontal top bar (Core · [splat] · Advantages · Profile ·
  Inventory · Notes · Settings), gated by the `restructure` world setting.
- `styles/wod-pretty-theme.css` — the full ~2.7k-line theme.
- `templates/*.hbs` — the custom sheet/tab templates used by `glass-reorg.mjs`.

## Reactivation notes (for future stages)

- The templates were loaded by absolute module paths
  (`modules/wod-pretty-theme/templates/...`). If reactivated from this archived
  location, either move them back to `templates/` or update those paths.
- `glass-reorg.mjs` persisted its sheet choice into the core `sheetClasses`
  world setting. With the reorg unloaded, Foundry falls back to the system's
  default actor sheets automatically (a missing sheet class is handled
  gracefully); no manual cleanup is required.
- The original setting/i18n keys (`WPT.Settings.Enabled`, `WPT.Settings.StyleChrome`,
  `WPT.Settings.Restructure`, `WPT.Tabs.*`, `WPT.Settings.HumanityLabel`) are still
  present in `lang/en.json` / `lang/pt-BR.json`.
