# Changelog

All notable changes to **WoD Pretty Theme** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
