# Mom Infoblock

**Mom Infoblock** is a SillyTavern extension that turns structured XML from assistant replies into a live roleplay dashboard.

It tracks scene state, characters, relationship meters, private NPC thoughts, chronicle events, open plot threads, notes, and optional intimate context — all in a customizable visual panel with **34 built-in themes**, **22 bar styles**, corner geometry controls, floating mode, dock mode, and inline rendering.

Yes, it is extra. That is the point.

---

## ✨ Features

- **Live Scene Dashboard** parsed automatically from `<mom_infoblock>` XML:
  - Scene location, time, date, and weather;
  - Characters currently in the scene (with presence badges, tags, and moods);
  - Relationship meters (`Affection`, `Trust`, `Love` + negative counterparts) with delta tracking;
  - Surge highlights when relationship stats jump significantly (`±4` or more) in a single turn;
  - Private NPC thoughts (kept out of visible narrative);
  - Interactive Chronicle events & Open Plot Threads;
  - Character Dossier quick-viewer (`☰`);
  - Optional NSFW context section.
- **Multiple Display Modes:**
  - **Inline** — inside assistant messages;
  - **Floating Window** — draggable, resizable, and collapsible;
  - **Side Dock** — collapsible left/right drawer (with a dedicated mobile slide-out panel);
  - **Inline + Side Dock** — both at once.
- **Deep Visual Customization (`◈` Style Menu):**
  - **34 Themes** (including dark, retro CRT, noir, gothic, cyberpunk, and light porcelain);
  - **22 Bar Styles** (from classic gradients and neon rails to lunar phases, oil brushstrokes, rosary chains, and ECG heartbeats);
  - **Corner Shape Switcher** (`Auto by theme` / `Rounded` / `Sharp`) protected from external SillyTavern theme overrides;
  - **Per-Character Style Binding** — lock a specific theme, bar style, and corner geometry to an individual character card;
  - **Full / Compact** panel view modes;
  - **Custom CSS** editor with built-in quick presets and font scaling (`Small` / `Normal` / `Large` / `Extra Large`).
- **Interactive Memory & QoL:**
  - **Manual Chronicle Control** — add your own events or plot threads with `+`, or delete unwanted model entries with `×` (deleted items are remembered and won't be re-added on chat re-parse);
  - **Per-Chat Notepad** with optional prompt injection (`Inject notes into prompt`);
  - **Pinned NPCs** (`☆ / ★`) to keep key characters at the top;
  - **Persistent Accordion State** — collapsed relationship cards stay collapsed across turns;
  - **XML Inspector (`</>`)** to view, copy, or live-edit raw XML.

---

## 📦 Installation

Install via SillyTavern's built-in extension installer using the repository URL, or clone/download it into your third-party extensions folder:

`SillyTavern/public/scripts/extensions/third-party/Mom-Infoblock`

Then:
1. Restart SillyTavern or reload the page.
2. Open **Extensions** → **Mom Infoblock**.
3. Check **Enable Mom Infoblock**.
4. Choose your preferred language (`RU` / `EN`), display mode, and open the `◈` menu on the board to pick your theme and bar style.

---

## 🧩 XML Structure & Fields

The extension automatically injects instructions for the model to append a `<mom_infoblock>` block at the end of each reply.

### Scene
- `time` — current time.
- `date` — current date.
- `weather` — current weather or environment.
- `loc` — current location.

### Characters (`<chars>`)
- `icon` — emoji or short visual marker.
- `name` — exact full NPC name.
- `tags` — 1–4 short labels separated by `|`.
- `mood` — short visible emotional state (1–3 words).
- **Supported Presence Tags:**
  `focus` | `рядом` / `near` | `наблюдает` / `watching` | `на периферии` / `background` | `вышел` / `left`

### Relationships (`<rels>`)
- `a` — Affection (`-100` to `100`). Negative values represent **Aversion / Dislike**.
- `ac` — Affection change in this message.
- `tr` — Trust (`-100` to `100`). Negative values represent **Distrust / Suspicion**.
- `tc` — Trust change in this message.
- `l` — Love / Attachment (`-100` to `100`). Negative values represent **Hatred / Destructive Attachment**.
- `lc` — Love change in this message.
- `status` — short relationship phase (1–3 words).

### Chronicle (`<chronicle>`)
- `<event>` — important new event from the current turn.
- `<thread>` — unresolved plot hook or active storyline.
- **Manual Editing:** In the **Chronicle** tab, you can delete any entry using the `×` button or add custom events and threads via the `+` input field. Both automatic and manual entries are included in the state prompt.

### NPC Thoughts (`<thk>`)
- `<t name="EXACT FULL NPC NAME">Private thought</t>`
- Private thoughts are displayed inside the character's relationship card (or in a separate section) and are automatically stripped if they leak into visible narration.

---

## 📝 Notepad (Notes Tab)

The **Notes** tab is a local per-chat scratchpad.

- By default, notes are stored **only in your browser** and do **not** consume prompt tokens.
- If you enable **Inject notes into prompt** (`Отправлять блокнот модели`) in the settings, non-empty notes are injected into the extension prompt as persistent user memory (indicated by a green dot on the Notes tab).

In short:
- **Inject Notes OFF** = private local scratchpad (0 tokens).
- **Inject Notes ON** = manual memory injection.

---

## 🎨 Themes & Bar Styles Catalog

### 34 Built-in Themes
- **Signature & Atmospheric:** `Kanon.exe`, `Nocturne`, `Revachol Disco`, `VHS 1994`, `Kintsugi Porcelain` *(Light)*, `Bio-Abyss`, `Arcana Tarot`, `Reliquary`, `Aurum`, `Silver Nitrate`, `Case File`, `Obsidian Registry`, `Oracle Moon`, `Blood Moon`.
- **Sci-Fi, Retro & HUD:** `Terminal`, `System Log`, `Neon Quest`, `Pixel Neon`, `Shockwave`, `Lockdown`, `Hot Rod`.
- **Aesthetic & Palette:** `Burgundy`, `Ash Rose`, `Cold Steel`, `Frost White`, `Pink Bite`, `Violet Glass`, `Verdant Grove`, `Sandalwood`.
- **Fandom & Pop-Culture:** `Gengar`, `Spider-Man`, `Venom`, `Gryffindor`, `Slytherin`, `Ravenclaw`, `Hufflepuff`.

### 22 Bar Styles
`Kanon Souls`, `Classic`, `Deep Neon`, `Glass Needle`, `Soft Matte`, `Pixel Blocks`, `Candy Gloss`, `Prism Glass`, `Neon Rails`, `Terminal Segments`, `Heart Meter`, `Constellation Stars`, `Vials`, `Evidence Tape`, `Runic Shards`, `Rosary Chain`, `Sigil Bands`, `Energon`, `Spiderweb`, `Brush Stroke`, `Heartbeat ECG`, `Moon Phases`.

### Corner Geometry (`◈` Menu)
- **Auto (by theme):** automatically applies crisp, sharp corners to retro/brutalist themes (`Kanon.exe`, `Revachol Disco`, `Terminal`, `System Log`, `Case File`, `VHS 1994`, `Neon Quest`, `Lockdown`, `Silver Nitrate`, `Pixel Neon`) and smooth rounded corners to others.
- **Rounded:** forces soft, rounded cards and pill-shaped tags on any theme.
- **Sharp:** forces crisp, square-edged geometry on any theme.

---

## 🛠️ XML Inspector & Custom CSS

- **XML Inspector (`</>`):** View, copy, or manually edit the raw `<mom_infoblock>` XML and apply changes to the current or latest message.
- **Custom CSS:** Write your own CSS rules in the extension settings or insert built-in presets (`Compact thin`, `Bigger text`, `Transparent`, `High contrast`, `Purple glow`).

```css
/* Example Custom CSS */
.mib-board {
    border-color: #5ce1ff;
}
```

---

## 🔒 Privacy & Security

- **100% Local & Offline:** All state data, notes, and settings are stored strictly in your browser's `localStorage` (with full JSON Export / Import support).
- **Zero External Requests:** The extension makes **no** external network calls, loads no remote scripts or trackers, and never accesses API keys or connection secrets. All textures and icons are embedded directly as inline SVGs.

---

## 💡 Tips & Standalone Tools

- **Saving Tokens:** If you want to save context tokens, you can disable **NPC Thoughts** or **Chronicle** in the extension settings at any time — the prompt will automatically adjust.
- **Standalone Dossier & Notepad:** If you only want the Dossier viewer and local Notepad without the XML dashboard, check out the standalone lightweight extension:
  👉 **[KanonNotes](https://github.com/KanonMama/KanonNotes)**
