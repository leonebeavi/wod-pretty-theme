# WoD Pretty Theme

A **dark, modern and minimalist** theme for the [World of Darkness 5e](https://github.com/WoD5E-Developers/wod5e) (`wod5e`) game system on **Foundry VTT v14**.

The wod5e system is excellent under the hood, but its default styling is heavy: busy background textures, harsh white borders, square corners and blend-mode color tints that also bleed into Foundry's own interface. **WoD Pretty Theme** overrides that styling with a clean, restrained look inspired by the [Progeny VtM v5 character creator](https://progeny.odin-matthias.de/) — warm near-black surfaces, soft off-white text, low-alpha structure, gentle shadows and a single disciplined accent color per splat.

> ⚠️ This is an unofficial, **cosmetic-only** fan module. It ships **no** wod5e code or assets — only CSS (plus a tiny script for its toggles). It is not affiliated with the wod5e developers, Paradox Interactive or White Wolf.

---

## ✨ Features

- **Dark, modern, minimal** restyle of every wod5e actor and item sheet.
- **Per-splat accent colors** layered on the shared dark base:
  - 🩸 Vampire / Ghoul → **crimson**
  - 🐺 Werewolf → **green**
  - 🎯 Hunter → **amber**
  - 👤 Mortal → **slate**
- **Cleans up the Foundry chrome too** — sidebar, chat, dialogs, scene controls, hotbar and the roll/compendium windows — undoing the system styling that overrides Foundry's own defaults.
- Removes the background-image textures and blend-mode tints, softens corners and replaces harsh `#fff`/`#000` borders with subtle hairlines.
- Recolors health/willpower damage marks so they stay legible on dark (superficial = light, aggravated = crimson).
- **Three accent modes** and a **chrome toggle**, all per-player (client) settings — no reload needed.

---

## 📦 Installation

### From the manifest (recommended)

In Foundry: **Add-on Modules → Install Module**, paste this **Manifest URL** and click *Install*:

```
https://github.com/leonebeavi/wod-pretty-theme/releases/latest/download/module.json
```

Then enable **WoD Pretty Theme** in your world's **Manage Modules**. (Requires the `wod5e` system to be installed.)

### Manual

Download `module.zip` from the [latest release](https://github.com/leonebeavi/wod-pretty-theme/releases/latest) and extract it into your Foundry `Data/modules/` folder so the path is `Data/modules/wod-pretty-theme/module.json`.

---

## ⚙️ Settings

All settings are **per-player** (client scope) and apply instantly:

| Setting | Default | Description |
|---|---|---|
| **Enable WoD Pretty Theme** | On | Master switch. Off restores the default wod5e look. |
| **Accent color mode** | Per-splat | `Per-splat` (Vampire crimson / Werewolf green / Hunter amber), `Unified crimson` (Progeny style), or `Neutral minimalist`. |
| **Also restyle Foundry interface** | On | Apply the theme to the Foundry chrome too (sidebar, chat, dialogs). Off themes only the wod5e sheets. |

---

## 🧩 Compatibility

| | |
|---|---|
| Foundry VTT | **v13–v14** (verified on v14) |
| System | `wod5e` **5.x** (verified 5.3.19) |

Because the theme works by re-skinning the system's stylesheet, it tracks the wod5e DOM. If a future wod5e version reworks its sheets, a theme update may be needed — please [open an issue](https://github.com/leonebeavi/wod-pretty-theme/issues).

---

## 🔧 How it works

The theme is almost entirely CSS, scoped under a `wod-pretty-theme` class that the module adds to `<body>`. The wod5e system is **CSS-variable-driven**, so the theme:

1. **Redefines the system's color variables on `<body>`.** Since `<body>` is a closer ancestor than `<html>`, those values win for all sheet content — even over the splat colors wod5e writes inline on `<html>` at runtime — with no specificity hacks.
2. **Neutralizes the noise**: background-texture variables → `none`, blend-mode tint filters → `transparent`.
3. **Routes each splat's accent** through one `--wpt-accent` token, so switching accent modes is a single variable change.
4. **Adds back the polish** the system strips: rounded corners, hairline borders, soft shadows and a gothic display font (Cinzel) for headings.

Scoping under a body class also makes the whole theme a clean on/off toggle.

---

## 🇧🇷 Português

Tema **escuro, moderno e minimalista** para o sistema **World of Darkness 5e** (`wod5e`) no Foundry VTT v14, inspirado no criador de fichas **Progeny**. Ele sobrescreve o estilo pesado do sistema (texturas, bordas brancas, cantos retos e tintas de cor que vazam para a interface do Foundry) por um visual limpo, com **cor de destaque por splat** (Vampiro = carmesim, Lobisomem = verde, Caçador = âmbar, Mortal = ardósia).

**Instalação:** em *Módulos Complementares → Instalar Módulo*, cole a URL do manifest acima. Requer o sistema `wod5e`. Há configurações por jogador para ligar/desligar o tema, escolher o modo de cor de destaque e estilizar (ou não) a interface do Foundry.

---

## 📝 License

[MIT](LICENSE) © 2026 leonebeavi. See [CHANGELOG](CHANGELOG.md) for release history.
