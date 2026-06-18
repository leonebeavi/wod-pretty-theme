# Changelog

All notable changes to **WoD Pretty Theme** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2026-06-17

### Fixed
- **Blank tabs.** The system's `prepare*Context` helpers each set
  `context.tab = context.tabs.<originalId>` themselves. Because we renamed
  stats→core / equipment→inventory and merged features/experience/biography into
  Profile, those lookups were undefined and (since we set the tab before calling
  the helper) the section ended up with no `tab` → it rendered empty. Now the
  helper runs first and we bind the correct tab last, so Core/Inventory/Profile
  render their content and the merged Profile parts correctly share the Profile tab.

## [1.2.2] - 2026-06-17

### Fixed
- **The reorganized sheets really register now.** They were being registered at
  the `setup` phase, but Foundry only flushes queued sheet registrations (and
  populates `CONFIG.Actor.sheetClasses`) just before `ready` — so at `setup` the
  system's base sheet classes weren't found yet and the reorg was silently
  skipped. Registration moved to the `ready` hook, and the Glass Gótico sheet is
  now forced active by setting its registration `default` flag directly (Foundry
  picks the entry whose `default === true`), with the choice persisted for
  reloads. Close and reopen an actor sheet after reloading.

## [1.2.1] - 2026-06-17

### Fixed
- **The reorganized sheets now actually apply.** `makeDefault` is silently
  ignored by Foundry when the world already has a saved default sheet for a
  type, so the reorg never showed (the system's tabs stayed). The module now
  explicitly sets the Glass Gótico sheet as the default for vampire/ghoul/
  werewolf/hunter/mortal (GM-only, gated by the "Reorganize sheets" setting).
  Reopen actor sheets after reloading to see the new layout.

## [1.2.0] - 2026-06-17

### Added
- **Sheet reorganization (Glass Gótico layout)** via per-splat sheet subclasses.
  The system's ~10 tabs are consolidated into a compact set with a **horizontal
  labeled top tab bar**:
  - **Core** (stats), the splat's own tabs (Vampire: Disciplines + Blood;
    Werewolf: Gifts + Wolf; Hunter: Edges; Ghoul: Disciplines), **Profile**
    (Features + Experience + Biography merged), **Inventory**, **Notes**.
  - **Settings** is relocated into a **GM-only** block inside Profile.
  - Implemented by reusing the system's own part templates (no markup copied):
    the merged Profile is several parts sharing `data-tab="profile"`, and each
    part's tab is bound the way Foundry itself does it.
  - Applies to PC splats (Vampire, Ghoul, Werewolf, Hunter, Mortal). SPC and
    Group sheets keep their structure and just get the visual theme.
- New **"Reorganize sheets"** world setting (default on, requires reload) — a
  safety valve: turn it off to restore the system's original tabs while keeping
  the Glass Gótico visual.

## [1.1.0] - 2026-06-17

### Changed
- **New "Glass Gótico" (Obsidian) visual** — the approved redesign. Solid warm-black
  sheet base with a per-splat glow at the top, **frosted translucent panels**
  (backdrop blur, soft borders, depth shadows), rounded 18px window, rubi dot
  trackers, and the **Cormorant Garamond + Manrope** type pairing. Applied to
  **all splats** with the per-splat accent (Vampire = Obsidian crimson #d2122e,
  Werewolf green, Hunter amber, Mortal slate). Foundry-default sidebar and the
  glass chat cards are retained.

### Note
- This release is the **visual** layer of the Glass Gótico guide. The structural
  reorganization (10→6 tabs, merged Profile tab, top tab bar, Settings relocated)
  is coming in 1.2.0 as a sheet subclass, validated per-splat.

## [1.0.7] - 2026-06-17

### Fixed
- **Name plate is back at the bottom** of the portrait. The previous wrap fix
  removed the `height: 100%` the view-mode name relies on (it has no `bottom`
  in that state), which floated it to the top; now it's explicitly bottom-anchored
  and grows upward.
- **Chat header is now compact & modern**: a single row of avatar (smaller) ·
  sender · timestamp + delete, with a small muted timestamp, instead of the
  timestamp wrapping to its own line.

## [1.0.6] - 2026-06-17

### Fixed
- **Character name no longer truncates** — the name plate now wraps long names
  (and the font was sized down) instead of cutting off with an ellipsis.
- **Chat timestamp placement** cleaned up: the header is now a tidy row
  (avatar · sender · timestamp + delete top-right), with the timestamp small and
  muted, instead of dropping awkwardly below the sender.

## [1.0.5] - 2026-06-17

### Changed
- **Standardized header typography:** the header labels (Health, Willpower,
  Clan, Frenzy, Hunger) and the character name now use the same gothic display
  font as the body section titles (they were `label.field-header.resource-label`
  and had been falling back to the UI sans).
- **Refined chat roll-card elements:** softer dice tiles with subtle depth, a
  clean dark "Total / Difficulty" bar, rounded flat result banners (with tuned
  success/failure/messy/desperation/rage colors), subtle dark modifier pills,
  display-font roll labels, and muted-until-hover control icons.

## [1.0.4] - 2026-06-17

### Changed
- Reverted the display/body fonts back to **Cinzel + Inter** (the vampire font
  was too heavy). Still exactly two fonts, with the system's mixed fonts
  overridden.

### Fixed
- **View-mode (locked) character name** no longer has the system's black
  text-outline (`-webkit-text-stroke`) that made it look broken — it's now plain
  white, matching the edit mode.
- **Roll dialog modifier popout** ("Selectable / Custom Modifiers") is no longer
  see-through — it now has its own opaque dark background.
- **Chat avatar** lost its hard square border (now softly rounded), and the
  **sender name wraps** instead of being truncated with an ellipsis.

## [1.0.3] - 2026-06-17

### Fixed
- **Fonts now load reliably & consistently.** Dropped the remote Google Fonts
  import (it doesn't reliably load in Foundry's Electron context, which caused
  the mix of fallback fonts). The theme now uses only **local** fonts: the
  wod5e **vampire** font for titles & subtitles and Foundry's **Signika** for
  everything else — exactly two fonts.
- **Character names** (header plate and window title) are now a plain, legible
  **white** in the simple UI font instead of a thin decorative serif.
- **Right sidebar** chrome reset rewritten. Foundry's `@layer` order puts the
  system's styles *above* Foundry core, so `revert-layer` was only reaching the
  system's (ugly) values. Replaced with explicit resets from the module layer,
  so the system's black tab strip / white underline / grey directory headers /
  blurple buttons are removed and Foundry's clean defaults show.
- **Roll / select-roll dialogs** are no longer see-through (near-opaque dark).

### Changed
- **Chat** is now styled to match the dark glass look (translucent dark cards,
  soft borders, light legible text) instead of the reverted grey default.

## [1.0.2] - 2026-06-17

### Fixed
- **Per-splat accents are now truly per-splat.** The derived accent shades
  (fills, borders, glows used by tabs, hovers, focus rings, banner) were being
  computed once on `<body>` with the default crimson, so non-Vampire sheets
  showed red details. They are now derived on the sheet root, so Werewolf gets
  green, Hunter amber, Mortal slate everywhere — not just on the dots.
- **Character names in view mode** are now plain, legible **white** on a more
  opaque backing plate.

### Changed
- **Standardized typography:** Cinzel (gothic display) for headings, names and
  banners; Inter (modern sans) for everything else. The system's mixed fonts
  (vampireRevised / Modesto Condensed / Amarante / Vollkorn) are overridden so
  the sheet reads as one cohesive, elegant, modern-gothic scheme. Icons are
  untouched.
- Tightened section titles to their cards (notably the Conditions / Custom Rolls
  side panel).
- Broadened the "restore Foundry default interface" reset to cover the right
  sidebar tab bar, so the native Foundry sidebar tabs come back.

## [1.0.1] - 2026-06-17

### Changed
- **Glass redesign:** translucent, blurred (frosted) sheets and panels, rounded
  corners everywhere, and removal of the hard square boxes and harsh white/black
  outlines in favour of soft, low-alpha glass borders.
- **Foundry chrome:** the "interface" option now genuinely **restores Foundry's
  default interface** (right sidebar, chat, directories, controls) by reverting
  the wod5e system's chrome overrides via `revert-layer`, instead of applying a
  custom dark skin.
- Hover and text-selection highlights now follow each splat's accent colour
  (e.g. green for Werewolf, amber for Hunter), not just Vampire.
- Right-sized the oversized section titles (Attributes, Conditions, etc.).

### Fixed
- Character names no longer truncate over the portrait; the name plate was
  widened and the font sized to fit (with a graceful ellipsis for very long
  names) and given a higher-contrast glass backing.
- The "clear to zero" ✕ marks next to traits are now faint/neutral instead of
  tinted red.

### Removed
- The accent-mode setting (unified / neutral). Accent colour is now always
  per-splat, which is the only intended behaviour.

## [1.0.0] - 2026-06-17

### Added
- Initial release: a dark, modern, minimalist override theme for the
  **World of Darkness 5e** (`wod5e`) system on Foundry VTT v14.
- Design tokens (CSS custom properties) for a unified dark palette inspired by
  the Progeny VtM v5 character creator.
- Per-splat accent colors (Vampire = crimson, Werewolf = green, Hunter = amber/blue)
  layered on top of the shared dark base.
- Restyled actor and item sheets, resource trackers, dice pools and tabs.
- Restyled Foundry core chrome (sidebar, chat, dialogs, windows, forms,
  scrollbars) to match, counter-acting the system styles that override
  Foundry's defaults.
