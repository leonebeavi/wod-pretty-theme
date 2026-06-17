# Changelog

All notable changes to **WoD Pretty Theme** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
