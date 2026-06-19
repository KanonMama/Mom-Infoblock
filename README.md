# Mom Infoblock

**Mom Infoblock** is a SillyTavern extension that turns structured XML from assistant replies into a live roleplay dashboard.

It tracks scene state, characters, relationship meters, private NPC thoughts, chronicle events, open plot threads, notes, and optional intimate context — all in a compact visual panel with themes, bar styles, floating mode, dock mode, and inline rendering.

Yes, it is extra. That is the point.

---

## Features

- Parses `<mom_infoblock>` XML from assistant replies.
- Renders an in-chat infoblock with:
  - scene location, time, date, weather;
  - characters currently in scene;
  - relationship meters;
  - NPC private thoughts;
  - chronicle events;
  - open plot threads;
  - optional NSFW context.
- Supports multiple display modes:
  - inline in messages;
  - floating window;
  - side dock;
  - inline + side dock.
- Includes compact/full panel modes.
- Includes relationship filtering:
  - top 3;
  - top 1;
  - changed only;
  - all.
- Supports pinned NPCs.
- Includes a local per-chat notepad.
- Includes XML inspector/editor for debugging and correction.
- Supports custom CSS and visual presets.
- Includes many built-in themes and bar styles.

---

## Installation

Install like any regular extension or download/clone this repository into your SillyTavern third-party extensions folder:

`SillyTavern/public/scripts/extensions/third-party/Mom-Infoblock`

Then:

1. Restart SillyTavern or reload the page.
2. Open **Extensions**.
3. Enable **Mom Infoblock**.
4. Configure display mode, language, theme, and bar style.

---

## XML Fields

- Scene

*time — current time.
date — current date.
weather — current weather or environment.
loc — current location.*

- Characters

*icon — small visual marker.
name — full NPC name.
tags — short tags separated by |.
mood — short visible emotional state.*

- 5 presence tags are supported:

*focus | рядом | near | наблюдает | watching | на периферии | background | вышел | left*

- Relationships

*a — affection, from -100 to 100.
ac — affection change this message.
tr — trust, from -100 to 100.
tc — trust change this message.
l — love/attachment, from -100 to 100.
lc — love change this message.
status — short relationship status.*

Negative values are interpreted as:

*negative affection — dislike / aversion;
negative trust — distrust / suspicion;
negative love — hatred / destructive attachment / anti-attachment.*

---

## Chronicle

- event — important new event.
- thread — unresolved plot hook.

## NPC Thoughts

Private thoughts are displayed inside the infoblock if enabled.
They should not appear in visible narration outside the XML.

Notes
The Notes tab is a local per-chat notepad.

**Important:**

The **Notes** tab is a local per-chat notepad.
By default, notes are stored only in your browser and do **not** get sent to the model.
This means you can use the notepad for personal reminders, scene planning, references, or random scratch notes without wasting tokens.
If you want, you can enable a separate setting:
`Inject notes into prompt`
When this option is enabled, non-empty notes are added to the extension prompt as user memory.

So the behavior is:
- notes are always stored locally;
- notes do not consume tokens by default;
- notes only affect context if **Inject notes into prompt** is turned on;
- longer injected notes will use more prompt space.
- 
In short:
- **Notes off prompt** = private local notepad;
- **Notes in prompt** = manual memory injection.

---

## Display Modes

- Available display modes:

- Inline — renders the infoblock inside assistant messages.
- Floating Window — renders a movable floating panel.
- Side Dock — renders a collapsible side panel.
- Inline + Side Dock — renders both inline panels and dock panel.
- Floating and dock modes use the latest known infoblock state.

## Themes

Mom Infoblock includes a large theme catalog.

*Current themes include:*

Nocturne, Burgundy, Ash Rose, Cold Steel, Frost White, Pixel Neon, Pink Bite, Violet Glass, Verdant Grove, Sandalwood,
Gengar, System Log, Terminal, Oracle Moon, Blood Moon, Case File, Obsidian Registry, Neon Quest,
Shockwave, Lockdown, Hot Rod, Gryffindor, Slytherin, Ravenclaw, Hufflepuff.


*Bar Styles*
Relationship meters support multiple visual styles:

Classic, Deep Neon, Glass Needle, Soft Matte, Pixel Blocks, Candy Gloss, Prism Glass, Neon Rails, Terminal Segments
Heart Meter, Constellation Stars, Vials, Evidence Tape, Runic Shards, Sigil Bands, Energon

---

## XML Inspector

The XML inspector allows you to:

view the raw XML;
copy XML;
edit XML;
apply corrected XML to the current or latest infoblock message.
This is useful when the model outputs malformed XML or when you want to manually fix relationship values.

## Custom CSS

Mom Infoblock supports custom CSS from extension settings.

*Example:*

`Css
.mib-board {
    border-color: red;
}
Custom CSS is stored locally in the browser.`

Built-in presets are also available:

compact thin;
bigger text;
more transparent;
high contrast;
purple glow.

## Local Storage
The extension stores data locally in the browser via localStorage.

## Export / Import
The extension supports exporting and importing data.

## !! I recommend checking the settings; many things, such as Thoughts, Chronicle, etc., can be turned off if you're saving tokens or don't use them. 

## You can also use the extension separately for Dossier and Notepad. I made it an additional extension, finding it useful overall. (Notepad in this version doesn't have the ability to send to Prompt.)
https://github.com/KanonMama/KanonNotes
