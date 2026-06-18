# Changelog

All notable changes to **WoD Pretty Theme** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.16] - 2026-06-18

### Changed
- **Editable fields are now legible**: inputs, textareas, selects and the
  rich-text editors use the clean sans (Manrope) at a comfortable size while you
  type, instead of the elegant serif. Display text, titles, values and character
  names keep the serif.

## [1.7.15] - 2026-06-18

### Changed / Fixed
- **Experience rebuilt as a lean bar**: just two directly-editable fields —
  **Remaining** and **Total** — side by side. Dropped the Legacy/Calculated
  split, the Add/Spend buttons, and the history list.
- **Header portrait**: uploaded images now fill the tile edge to edge — removed
  the inset-shadow vignette and forced `object-fit: cover`, so no more side
  bars/borders on custom avatars.

## [1.7.14] - 2026-06-18

### Changed
- **Experience** now shows just **Remaining** and **Total** as single numbers —
  the Legacy / Calculated split was removed.
- **De-bleed pass**: undo the wod5e system's global, unscoped CSS that leaked
  into Foundry's own windows (e.g. Scene Config) — the system was shrinking and
  squaring **every** number input (`max-width: 35px`, `border-radius: 0`) and
  forcing a serif on collapsible text. Foundry's own windows now keep their
  default look (plus our theme), not the system's.

## [1.7.13] - 2026-06-18

### Fixed
- **Experience panel (legacy XP)** no longer looks broken: the Remaining/Total
  trackers are now clean cards with subtle labels (instead of big red headers)
  and tidy centered Legacy/Calculated number fields.

## [1.7.12] - 2026-06-18

### Changed
- **Item sheets themed to the Obsidian item design**: rounded icon tile, a clean
  name field, the Level / Cost / Type stats as small-labelled glass field cards,
  and comfortable body padding — applied to every item type. (The Level/Cost
  fields stay as styled inputs; an exact dots/stepper would need a custom item
  template.)

## [1.7.11] - 2026-06-18

### Changed
- On the Core tab, the **entire attribute / skill row is now the roll target**
  (not just the name) — click anywhere on the row to roll. The dots still set
  the value (Foundry fires only the closest control), and in input-fields mode
  the row isn't rollable so the number field stays editable.

## [1.7.10] - 2026-06-18

### Changed
- **Roll & prompt windows fully re-themed**: every dialog (the dice roll dialog,
  select dialogs, confirmations, modifier popouts) is now an **opaque, elegant
  dark-glass window** standardized with the sheet — themed header/title, dark
  content (no more see-through), themed inputs/selects, and buttons where the
  default/Roll action carries the splat accent.
- **Chat cards**: softer, more subtle shadow; slightly less rounded corners; and
  the modifier pills (Blood Potency, Blood Surge…) are centered in the card.

## [1.7.9] - 2026-06-18

### Changed — chat redesigned to match the glass-gothic concept
- **Roll cards rebuilt**: rounded glass card with a tinted header (round avatar ·
  sender · timestamp · delete), a centered body with proper padding (nothing hugs
  the edges anymore), **smaller dice tiles**, a **smaller mixed-case title**, and
  a **full-width result footer** in the design's softer green / red / amber tones.
- **Chat sidebar panel** is now transparent (removed the grey semi-transparent
  background behind the messages).

## [1.7.8] - 2026-06-18

### Added
- **Rename the Humanity track** per actor — a new field in the GM Settings tab
  lets you type a custom name (e.g. "Conviction", "Harmony"); blank keeps
  "Humanity". The Blood tab title updates to match.

### Fixed
- **Resist Frenzy** pill no longer overlaps the **Frenzy Status** line above it.
- The Clan **edit pen** sits inline after the clan name instead of overlapping
  it in edit mode.
- **Health / Willpower** square trackers sit closer to their labels.
- The **Humanity** title's underline is back below the title (it was rendering
  off to the side).

## [1.7.7] - 2026-06-18

### Changed / Fixed
- **Footer banner rebuilt from scratch** as a clean, in-flow bar (custom
  template) — no more sticky overlap or content bleeding through it.
- **One font everywhere** for consistency: the elegant display serif is now
  applied to every text element (icons keep their own font).
- **Health / Willpower damage marks** redesigned: superficial = a clean diagonal
  half-fill, aggravated = a solid square (no more messy line/cross gradients).
- **Hunger can be set to 0 again** — the clear marker is back, but as a clean
  faint ring instead of the ugly "×".
- **Header text no longer truncates** (e.g. the Clan name showed "New …").
- The **eye toggle** is properly centered with its title (headings are flex).

## [1.7.6] - 2026-06-18

### Fixed (header pass)
- The **"reveal to all" eye toggle** is now vertically centered next to its title.
- **Health & Willpower** labels and square rows are uniformly left-aligned
  (Willpower was drifting toward center).
- Removed the **ugly boxes** around **Clan / Generation / Hunger** in the header
  (now bare label+value / dots, matching the design).
- **Hunger** no longer shows the leading "×" clear marker (just the dots).
- **Re-added the Frenzy status** (Active / Inactive) above the Resist Frenzy
  pill, as in the original sheet.

## [1.7.5] - 2026-06-18

### Fixed
- **Window control buttons** (collapse / config / close) render again — the
  universal-font rule was overriding their Font Awesome glyphs.
- **Tab labels no longer truncate** ("Merit & Fla…") — tabs now size to their
  content and grow to fill the bar, so every label shows in full.
- **Biography / Appearance** no longer show a duplicated title (the panel title
  and the editor's inner label were both rendering).
- The **"reveal to all" eye toggle** is now a small, subtle inline icon next to
  the card title (was a large, awkward icon on its own line).
- **Experience** panel now matches the **Identity** panel's height.
- **Header vitals** (Health / Willpower) labels and square trackers are
  left-aligned together (were misaligned).

## [1.7.4] - 2026-06-18

### Changed (print-review pass 2)
- **"Merit & Flaws" tab** (renamed from Advantages) now laid out as a **2×2 grid**
  — Merit | Flaw on top, Background | Boon below — with each entry on a single
  line and **horizontal** dot ratings (were stacking vertically).
- **Tab bar is now dynamic**: the tabs flex to fill the full width at a larger
  size, always edge-to-edge, still on one line.
- **Profile** rebalanced: the Experience panel no longer has a big empty gap
  (top row uses natural heights), and two more description cards were added —
  **Convictions / Touchstones** (a WoD Pretty extra, the widest/most prominent
  card) and a full-width **Chronicle Tenets** — alongside Biography & Appearance.
- **Footer banner** is now an opaque bar (content no longer bleeds through it).

## [1.7.3] - 2026-06-18

### Fixed / Changed (print-review pass)
- **Tab bar fits on one line** again (compacted padding/typography) now that
  there are 8 tabs — no more wrapping to a second row.
- **Core**: the Physical / Social / Mental column headers are centered over
  their columns.
- **Disciplines**: the search and add buttons sit side by side (were stacked);
  the tab icon is now a fitting "magic powers" glyph instead of the raw symbol.
- **Blood**: the Clan Bane card no longer stretches full-width awkwardly (it's a
  normal field card), and the **Generation** field was removed here (it already
  lives in the header).
- **Advantages**: reworked — clean, subtle column headers (no oversized
  red-underlined titles) and tidy rows.
- **Profile**: more balanced card distribution (equal-height panels/cards).
- **Typography**: the whole sheet now uses the elegant display serif for text —
  no plain/rounded sans left on sheet content (icons keep their own font).

## [1.7.2] - 2026-06-18

### Changed — design-accurate polish pass
- Audited every region against the reference design and tightened the CSS to its
  exact values:
  - **Dots** now use the brighter lit colour and the design's **per-context
    sizes** (Attributes 12px, Skills 10px, Disciplines 10px, Blood Potency 14px,
    Hunger 15px, Humanity 18px, Advantages 8px) with matching gaps.
  - **Tab bar** padding/typography, **scrollbar** (11px, accent-tinted, hover),
    **window title** in the display serif, and the **footer banner** (centered,
    wide tracking) match the design.
  - **Core** section titles centered with the short gradient underline; column
    heads and trait-name sizing tuned.
  - **Disciplines/Blood/Profile/Advantages/Inventory/Notes** card padding,
    radii, and label/value typography aligned to the design (power cards 11px,
    discipline items 13×15/12px, Profile cards 11×14, inventory rows 11×15/10px,
    notes editor dark box 11px, etc.).

## [1.7.1] - 2026-06-18

### Changed
- **Window corners are now subtly rounded** (~6px, Foundry-like) instead of the
  large 22px curve, which read as too circular.

## [1.7.0] - 2026-06-18

### Changed — tab structure
- **New "Advantages" tab** (before Profile) holding the character's
  Backgrounds / Merits / Flaws / Boons in four columns with dot ratings and
  item controls, moved out of Profile.
- **New "Settings" tab** (after Notes, **GM-only** — hidden entirely for
  players) holding the actor settings (header/background images, actor type,
  input-fields toggle, splat power toggles), moved out of Profile.
- **Profile** is now just Identity + Experience (top row) and roomier
  Biography / Appearance editors below — cleaner, better-balanced distribution
  now that Advantages and Settings have their own tabs.

New tab bar: Core · [splat] · Advantages · Profile · Inventory · Notes ·
Settings (GM).

## [1.6.1] - 2026-06-18

### Fixed
- **Header Health/Willpower** now show as bare square trackers under their
  labels (removed the boxed container that wrapped them) to match the design.
- **Inventory** equipment group panels now span the **full width** (they were
  shrink-wrapped by the system's item-list styling) and no longer draw a
  double box around their contents.
- **Profile → Settings** (the GM-only actor settings) is now a single tidy
  contained glass panel ("Settings · GM") at the bottom of the tab instead of a
  raw, full-bleed form. Feature/advantage category columns no longer draw boxes.

## [1.6.0] - 2026-06-18

### Added — the sheet now matches the Obsidian design end to end
- **All remaining tabs rebuilt as custom layouts** matching the reference design,
  each reusing the system's own data-actions so everything stays functional:
  - **Blood** — Blood Potency dots + Humanity squares in two centered glass
    panels, the six derived blood-potency stat cards, and the Sire / Generation /
    Predator / Resonance / Clan-Bane fields.
  - **Profile** — a single merged page: **Identity** (concept/chronicle/ambition/
    desire + Chronicle Tenets), **Experience** (remaining/total + Add/Spend +
    history), **Advantages** (backgrounds/merits/flaws/boons with dots), and
    **Biography / Appearance** editors.
  - **Inventory** — equipment grouped by type as glass panels + Equipment Notes.
  - **Notes** — Public and Private (owner-gated) notes side by side.

### Changed
- **Header rebuilt to the exact design**: 16px rounded-square Health/Willpower
  boxes, a **128px rounded-square portrait** with the **name overlaid at the
  bottom** in plain white and a **"VAMPIRE · CLAN · GENERATION" subtitle** below,
  and a right-aligned **Clan │ Gen · Hunger · Resist Frenzy pill** stack.
- **Design tokens tuned to the reference**: 22px window radius, brighter lit
  dots, accent-soft, and a shared set of building-block classes (panels, cards,
  section titles with gradient underline, column heads, pills) so every tab is
  visually consistent.

## [1.5.0] - 2026-06-17

### Added
- **Custom Vampire header** matching the Obsidian design — a clean three-column
  layout: Health/Willpower on the left, a compact portrait with the **name
  centered below it** and a **"VAMPIRE · CLAN · GENERATION" subtitle**, and on
  the right the Clan field plus a new **Generation field**, Hunger dots, and the
  Resist Frenzy pill. The portrait no longer covers the name, and the name reads
  as plain white. Reuses the system's own partials and data-actions, so editing
  the image/name/generation, the Health/Willpower counters, Clan add/edit,
  Hunger, Rouse and Resist/End Frenzy all keep working. Other splats keep the
  system header (still themed) for now.

## [1.4.1] - 2026-06-17

### Changed
- Polish: more compact header (smaller portrait), the Resist/End Frenzy button is
  now a crimson pill, and the Disciplines panels have a minimum height so the tab
  no longer looks empty.

## [1.4.0] - 2026-06-17

### Added
- **Custom Disciplines tab** (Vampire & Ghoul) matching the Obsidian design:
  a master–detail layout — selectable discipline list with dots on the left, and
  the selected discipline's powers as cards (name · level badge · description) on
  the right. Reuses the system's data-actions (select, dot counters, roll,
  chat, add/remove, edit/delete, rouse) so it stays fully functional.

## [1.3.0] - 2026-06-17

### Added
- **Custom Core tab** matching the Obsidian design: full-width Attributes and
  Skills laid out in three columns (Physical / Social / Mental), no side panel
  crowding them. Conditions and Custom Rolls are kept available in a compact row
  below so nothing is lost. Built by reusing the system's exact rollable labels
  and dot-counter widgets, so all interactivity (rolling, setting dots, editing
  skills, add/remove) is preserved. First of the per-tab custom layouts; the
  other tabs follow next.

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
