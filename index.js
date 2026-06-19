const kExtensionName = "Mom-Infoblock";
const kExtensionFolderPath = `scripts/extensions/third-party/${kExtensionName}`;
const kSettingsFile = `${kExtensionFolderPath}/settings.html`;

const kVersion = "2.0.0";
const kPromptInjectionId = "MIB_PromptInjection";

const kStoragePrefix = "MIB_";
const kStatePrefix = `${kStoragePrefix}State_`;
const kNotesPrefix = `${kStoragePrefix}Notes_`;

const kEnabledKey = `${kStoragePrefix}Enabled`;
const kLangKey = `${kStoragePrefix}Lang`;
const kThemeKey = `${kStoragePrefix}Theme`;
const kBarStyleKey = `${kStoragePrefix}BarStyle`;
const kDisplayModeKey = `${kStoragePrefix}DisplayMode`;
const kDockSideKey = `${kStoragePrefix}DockSide`;
const kHideRawKey = `${kStoragePrefix}HideRaw`;
const kHideThoughtLeaksKey = `${kStoragePrefix}HideThoughtLeaks`;
const kShowNsfwKey = `${kStoragePrefix}ShowNsfw`;
const kChronicleEnabledKey = `${kStoragePrefix}ChronicleEnabled`;
const kChronicleLimitKey = `${kStoragePrefix}ChronicleLimit`;
const kActiveTabKey = `${kStoragePrefix}ActiveTab`;
const kFloatingLayoutKey = `${kStoragePrefix}FloatingLayout`;
const kDockCollapsedKey = `${kStoragePrefix}DockCollapsed`;
const kPinnedNpcsKey = `${kStoragePrefix}PinnedNpcs`;
const kSceneViewModeKey = `${kStoragePrefix}SceneViewMode`;
const kRelationFilterKey = `${kStoragePrefix}RelationFilter`;
const kFloatingCollapsedKey = `${kStoragePrefix}FloatingCollapsed`;
const kCustomCssKey = `${kStoragePrefix}CustomCss`;
const kFontSizeKey = `${kStoragePrefix}FontSize`;
const kThoughtsEnabledKey = `${kStoragePrefix}ThoughtsEnabled`;

let gEnabled = false;
let gLang = "ru";
let gTheme = "nocturne";
let gBarStyle = "classic";
let gDisplayMode = "inline";
let gDockSide = "right";
let gHideRaw = true;
let gHideThoughtLeaks = true;
let gShowNsfw = true;
let gChronicleEnabled = true;
let gChronicleLimit = 10;
let gActiveTab = "scene";
let gLastRawXml = "";
let gNotes = "";
let gPinnedNpcs = [];
let gSceneViewMode = "full";
let gRelationFilter = "top3";
let gCustomCss = "";
let gFontSize = "normal";
let gThoughtsEnabled = true;
let gStyleMenuOpen = false;

const kDefaultState = {
    scene: {
        time: "???",
        date: "???",
        weather: "???",
        loc: "???"
    },
    chars: [],
    rels: [],
    thoughts: [],
    chronicle: {
        events: [],
        threads: []
    },
    nsfw: null
};

let gState = Clone(kDefaultState);

const kLangMap = {
    ru: {
        enable: "Включить Mom Infoblock",
        language: "Язык",
        theme: "Тема",
        displayMode: "Режим отображения",
        displayInline: "В сообщениях",
        displayFloating: "Плавающее окно",
        displayDock: "Боковая панель",
        displayInlineDock: "Сообщения + боковая панель",
        dockSide: "Сторона панели",
        dockLeft: "Слева",
        dockRight: "Справа",
        hideRaw: "Скрывать сырой XML из сообщений",
        hideThoughtLeaks: "Скрывать утёкшие мысли NPC из текста",
        showNsfw: "Показывать NSFW блок",
        chronicleEnabled: "Включить хронику",
        chronicleLimit: "Лимит событий хроники",
        active: "Mom Infoblock активен",
        inactive: "Mom Infoblock отключён",
        currentState: "Текущее состояние:",
        disabledPrompt: "Отключено — промт не инжектится.",
        resetState: "Сбросить состояние",
        reprocess: "Перепарсить чат",
        exportData: "Экспорт данных",
        importData: "Импорт данных",
        importFail: "Импорт не удался. Невалидный JSON.",
        resetConfirm: "Сбросить состояние Mom Infoblock для этого чата?",
        sceneTab: "Сцена",
        chronicleTab: "Хроника",
        notesTab: "Блокнот",
        chars: "Персонажи в сцене",
        rels: "Отношения",
        thoughts: "Мысли NPC",
        chronicle: "Хроника",
        openThreads: "Открытые нити",
        notes: "Блокнот",
        notesPlaceholder: "Твои заметки. Сохраняются локально для этого чата.",
        nsfw: "Интимный контекст",
        fetishes: "Фетиши",
        positions: "Позиции",
        noData: "Нет данных.",
        noNotes: "Пока пусто.",
        floatingTitle: "Mom Infoblock",
        dockTitle: "Mom Infoblock",
        openDock: "Открыть",
        closeDock: "Свернуть",
        noStatus: "не определено",
        affection: "Симпатия",
        trust: "Доверие",
        love: "Любовь",
        aversion: "Неприязнь",
        distrust: "Недоверие",
        hatred: "Ненависть",
        debugXml: "XML",
copyXml: "Копировать",
applyXml: "Применить XML",
closeXml: "Закрыть",
xmlApplied: "XML применён",
xmlInvalid: "XML не распознан. Проверь <mom_infoblock>.",
xmlNoMessage: "Не удалось найти сообщение для правки.",
        sceneFull: "Полный",
sceneCompact: "Компакт",
        relationFilter: "Фильтр отношений",
relationTop3: "Топ 3",
relationTop1: "Топ 1",
relationChanged: "Только изменившиеся",
relationAll: "Все",
noRelationChanges: "Изменений нет",
        applyLatestXml: "Применить к последнему",
xmlLatestNotFound: "Не найдено последнее сообщение с <mom_infoblock>.",
        customCss: "Custom CSS",
customCssPlaceholder: "Пиши CSS для Mom Infoblock. Например: .mib-board { border-color: red; }",
saveCustomCss: "Сохранить CSS",
clearCustomCss: "Очистить CSS",
        fontSize: "Размер текста",
fontSmall: "Мелкий",
fontNormal: "Обычный",
fontLarge: "Крупный",
fontXLarge: "Очень крупный",
        thoughtsEnabled: "Включить мысли NPC",
        cssPresetCompactThin: "Тоньше и плотнее",
cssPresetBiggerText: "Крупнее текст",
cssPresetTransparent: "Прозрачнее",
cssPresetHighContrast: "Контрастнее",
cssPresetPurpleGlow: "Фиолетовое свечение",
insertPreset: "Вставить пресет",
        dossier: "Досье",
dossierEmpty: "Описание персонажа не найдено.",
dossierClose: "Закрыть",
        focus: "в фокусе",
nearby: "рядом",
watching: "наблюдает",
background: "на периферии",
leftScene: "вышел",
        styleMenu: "Стиль",
barStyle: "Стиль полос",
barClassic: "Classic",
barGlass: "Glass Needle",
barNeon: "Neon Rails",
barTerminal: "Terminal Segments",
barHearts: "Heart Meter",
barConstellation: "Constellation Stars",
barVials: "Vials",
barEvidence: "Evidence Tape",
barRunic: "Runic Shards",
barEnergon: "Energon",
        barDeep: "Deep Neon",
barSoft: "Soft Matte",
barPixel: "Pixel Blocks",
barCandy: "Candy Gloss",
barPrism: "Prism Glass",
barSigil: "Sigil Bands",
        themePreview: "Палитра темы",
themePreviewMissing: "Превью недоступно",
    },
    en: {
        enable: "Enable Mom Infoblock",
        language: "Language",
        theme: "Theme",
        displayMode: "Display Mode",
        displayInline: "Inline",
        displayFloating: "Floating Window",
        displayDock: "Side Dock",
        displayInlineDock: "Inline + Side Dock",
        dockSide: "Side Dock Position",
        dockLeft: "Left",
        dockRight: "Right",
        hideRaw: "Hide raw XML from messages",
        hideThoughtLeaks: "Hide leaked NPC thoughts from visible text",
        showNsfw: "Show NSFW section",
        chronicleEnabled: "Enable Chronicle",
        chronicleLimit: "Chronicle Event Limit",
        active: "Mom Infoblock is active",
        inactive: "Mom Infoblock is inactive",
        currentState: "Current State:",
        disabledPrompt: "Disabled — not injecting prompts.",
        resetState: "Reset State",
        reprocess: "Reprocess Chat",
        exportData: "Export Data",
        importData: "Import Data",
        importFail: "Import failed. Invalid JSON.",
        resetConfirm: "Reset Mom Infoblock state for this chat?",
        sceneTab: "Scene",
        chronicleTab: "Chronicle",
        notesTab: "Notes",
        chars: "Characters in Scene",
        rels: "Relationships",
        thoughts: "NPC Thoughts",
        chronicle: "Chronicle",
        openThreads: "Open Threads",
        notes: "Notes",
        notesPlaceholder: "Your notes. Stored locally for this chat.",
        nsfw: "Intimate Context",
        fetishes: "Fetishes",
        positions: "Positions",
        noData: "No data.",
        noNotes: "Empty for now.",
        floatingTitle: "Mom Infoblock",
        dockTitle: "Mom Infoblock",
        openDock: "Open",
        closeDock: "Collapse",
        noStatus: "undefined",
        affection: "Affection",
        trust: "Trust",
        love: "Love",
        aversion: "Aversion",
        distrust: "Distrust",
        hatred: "Hatred",
        debugXml: "XML",
copyXml: "Copy",
applyXml: "Apply XML",
closeXml: "Close",
xmlApplied: "XML applied",
xmlInvalid: "XML was not recognized. Check <mom_infoblock>.",
xmlNoMessage: "Could not find message to edit.",
        sceneFull: "Full",
sceneCompact: "Compact",
        relationFilter: "Relationship Filter",
relationTop3: "Top 3",
relationTop1: "Top 1",
relationChanged: "Changed only",
relationAll: "All",
noRelationChanges: "No changes",
        applyLatestXml: "Apply to latest",
xmlLatestNotFound: "No latest message with <mom_infoblock> found.",
        customCss: "Custom CSS",
customCssPlaceholder: "Write CSS for Mom Infoblock. Example: .mib-board { border-color: red; }",
saveCustomCss: "Save CSS",
clearCustomCss: "Clear CSS",
        fontSize: "Font Size",
fontSmall: "Small",
fontNormal: "Normal",
fontLarge: "Large",
fontXLarge: "Extra large",
        thoughtsEnabled: "Enable NPC Thoughts",
        cssPresetCompactThin: "Compact thin",
cssPresetBiggerText: "Bigger text",
cssPresetTransparent: "More transparent",
cssPresetHighContrast: "High contrast",
cssPresetPurpleGlow: "Purple glow",
insertPreset: "Insert preset",
        dossier: "Dossier",
dossierEmpty: "Character description not found.",
dossierClose: "Close",
        focus: "focus",
nearby: "nearby",
watching: "watching",
background: "background",
leftScene: "left",
        styleMenu: "Style",
barStyle: "Bar Style",
barClassic: "Classic",
barGlass: "Glass Needle",
barNeon: "Neon Rails",
barTerminal: "Terminal Segments",
barHearts: "Heart Meter",
barConstellation: "Constellation Stars",
barVials: "Vials",
barEvidence: "Evidence Tape",
barRunic: "Runic Shards",
barEnergon: "Energon",
        barDeep: "Deep Neon",
barSoft: "Soft Matte",
barPixel: "Pixel Blocks",
barCandy: "Candy Gloss",
barPrism: "Prism Glass",
barSigil: "Sigil Bands",
        themePreview: "Theme palette",
themePreviewMissing: "Preview unavailable",
    }
};

const kSystemPromptRu = `Mom Infoblock:
Append exactly one XML block at the end of every assistant response. Fill all values in Russian. Keep it concise, accurate, and updated every message.

Format:
<mom_infoblock time="" date="" weather="" loc="">
<chars>
<c icon="" name="" tags="" mood="" />
</chars>
<rels>
<rel source="" target="{{user}}" a="" ac="" tr="" tc="" l="" lc="" status="" />
</rels>
<chronicle>
<event></event>
<thread></thread>
</chronicle>
<thk></thk>
</mom_infoblock>

Optional only for explicitly intimate scenes:
<nsfw f="" p="" />

Rules:
- Output exactly one <mom_infoblock> block in every message
- Fill all values in Russian
- No extra XML tags or commentary
- Add one <c /> for each NPC currently present
- Use the exact same full NPC name in <chars name="">, <rel source="">, and <thk>
- Never shorten NPC names in <rel> or <thk>
- Do not include {{user}} as NPC
- tags: 1-4 short tags separated by |
- tags must be short labels, not phrases or sentences
- Never write explanations, actions, or long descriptions in tags
- Use scene presence tags only when clearly relevant: focus | рядом | наблюдает | на периферии | вышел
- Use at most one scene presence tag per NPC
- Do not invent new presence tags
- mood: 1-3 words, visible current emotional state only
- Leave mood empty if unclear
- Do not duplicate mood inside tags
- Add one <rel /> per relevant present NPC describing feelings toward {{user}} only
- Add <rel /> only for the 1-3 most relevant present NPCs
- a, tr, l: from -100 to 100
- ac, tc, lc: per-message change, usually within -5..+5 unless major event
- Negative affection = aversion/dislike
- Negative trust = distrust/suspicion/fear
- Negative love = hatred/destructive obsession/anti-attachment
- status: 1-3 words only, relationship phase/status only
- status must not describe events, thoughts, explanations, or causes
- Never write full sentences in status
- Good status examples: заинтересована | доверяет | тянется | защитная привязанность | сложное влечение
- Bad status examples: её слова пробили защиту | впервые не знает что сказать | привязанность перешла в новую фазу
- Put all NPC private thoughts into one <thk> block
- One NPC per line in <thk>
- Never include {{user}} thoughts in <thk>
- Private thoughts must appear only inside <thk>
- Never output private NPC thoughts in visible narrative text
- Private NPC thoughts: max 1 sentence and max 30 words per NPC
- Do not explain feelings in <thk>; write only the immediate private thought
- Never write <thk> thoughts as visible lines before the XML
- No "Имя: мысль" thought list in visible narrative
- Chronicle events: add only important new events from this response
- Chronicle events: max 3 <event> entries per response, max 18 words each
- Chronicle threads: include only currently unresolved plot hooks, max 4 <thread> entries, do not rephrase old threads
- Do not repeat old chronicle events unless they changed meaning
- Do not write guesses as facts in chronicle
- Omit <chronicle> if nothing important changed
- Omit <nsfw /> if the scene is not intimate
- Never write chronicle events, thread lists, summaries, recaps, or bullet-point scene summaries in visible narrative
- Chronicle content must appear only inside <chronicle>
- Never duplicate <event> or <thread> content outside XML
- Do not write visible lines like "Что произошло", "Открытые вопросы", "Сводка", or question lists after the scene
- Visible narrative must contain only roleplay prose/dialogue, not system summaries

<thk> strict format:
- Use the exact full NPC name exactly as in <chars>
- Always write the name before the thought
- Never shorten names
- No markdown, quotes, asterisks, or brackets
- Format only: Полное Имя: мысль`;

const kSystemPromptEn = `Mom Infoblock:
Append exactly one XML block at the end of every assistant response. Fill all values in English. Keep it concise, accurate, and updated every message.

Format:
<mom_infoblock time="" date="" weather="" loc="">
<chars>
<c icon="" name="" tags="" mood="" />
</chars>
<rels>
<rel source="" target="{{user}}" a="" ac="" tr="" tc="" l="" lc="" status="" />
</rels>
<chronicle>
<event></event>
<thread></thread>
</chronicle>
<thk></thk>
</mom_infoblock>

Optional only for explicitly intimate scenes:
<nsfw f="" p="" />

Rules:
- Output exactly one <mom_infoblock> block in every message
- Fill all values in English
- No extra XML tags or commentary
- Add one <c /> for each NPC currently present
- Use the exact same full NPC name in <chars name="">, <rel source="">, and <thk>
- Never shorten NPC names in <rel> or <thk>
- Do not include {{user}} as NPC
- tags: 1-4 short tags separated by |
- tags must be short labels, not phrases or sentences
- Never write explanations, actions, or long descriptions in tags
- Use scene presence tags only when clearly relevant: focus | near | watching | background | left
- Use at most one scene presence tag per NPC
- Do not invent new presence tags
- mood: 1-3 words, visible current emotional state only
- Leave mood empty if unclear
- Do not duplicate mood inside tags
- Add one <rel /> per relevant present NPC describing feelings toward {{user}} only
- Add <rel /> only for the 1-3 most relevant present NPCs
- a, tr, l: from -100 to 100
- ac, tc, lc: per-message change, usually within -5..+5 unless major event
- Negative affection = aversion/dislike
- Negative trust = distrust/suspicion/fear
- Negative love = hatred/destructive obsession/anti-attachment
- status: 1-3 words only, relationship phase/status only
- status must not describe events, thoughts, explanations, or causes
- Never write full sentences in status
- Good status examples: interested | trusts you | drawn in | protective attachment | complicated attraction
- Bad status examples: her words pierced his defenses | does not know what to say | attachment moved into a new phase
- Put all NPC private thoughts into one <thk> block
- One NPC per line in <thk>
- Never include {{user}} thoughts in <thk>
- Private thoughts must appear only inside <thk>
- Never output private NPC thoughts in visible narrative text
- Private NPC thoughts: max 1 sentence and max 20 words per NPC
- Do not explain feelings in <thk>; write only the immediate private thought
- Never write <thk> thoughts as visible lines before the XML
- No "Name: thought" thought list in visible narrative
- Chronicle events: add only important new events from this response
- Chronicle events: max 3 <event> entries per response, max 18 words each
- Chronicle threads: include only currently unresolved plot hooks, max 4 <thread> entries, do not rephrase old threads
- Do not repeat old chronicle events unless they changed meaning
- Do not write guesses as facts in chronicle
- Omit <chronicle> if nothing important changed
- Omit <nsfw /> if the scene is not intimate
- Never write chronicle events, thread lists, summaries, recaps, or bullet-point scene summaries in visible narrative
- Chronicle content must appear only inside <chronicle>
- Never duplicate <event> or <thread> content outside XML
- Do not write visible lines like "What happened", "Open questions", "Summary", or question lists after the scene
- Visible narrative must contain only roleplay prose/dialogue, not system summaries

<thk> strict format:
- Use the exact full NPC name exactly as in <chars>
- Always write the name before the thought
- Never shorten names
- No markdown, quotes, asterisks, or brackets
- Format only: Full NPC Name: thought`;

function T(key) {
    return kLangMap[gLang]?.[key] ?? key;
}

function Clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function EscapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function Clamp(value, min, max) {
    const n = parseInt(value, 10);
    if (Number.isNaN(n)) return 0;
    return Math.max(min, Math.min(max, n));
}

function LimitText(value, maxChars = 180) {
    const clean = String(value ?? "").replace(/\s+/g, " ").trim();
    if (clean.length <= maxChars) return clean;
    return clean.slice(0, maxChars).replace(/\s+\S*$/, "").trim();
}

function NormalizeText(value) {
    return String(value ?? "")
        .toLowerCase()
        .replace(/[«»„“”"']/g, "")
        .replace(/[—–]/g, "-")
        .replace(/\s+/g, " ")
        .trim();
}

function NormalizeName(value) {
    return NormalizeText(value);
}

function StripNameDecorators(value) {
    return String(value ?? "")
        .replace(/[*_~`"“”„]/g, "")
        .replace(/[(){}\[\]]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function GetNameAliases(name) {
    const raw = String(name ?? "").trim();
    if (!raw) return [];

    const clean = StripNameDecorators(raw);
    const lower = clean.toLowerCase();
    const parts = clean.split(/\s+/).filter(Boolean);

    const aliases = new Set();
    aliases.add(lower);

    if (parts.length > 1) {
        aliases.add(parts[0].toLowerCase());
        aliases.add(parts[parts.length - 1].toLowerCase());
        aliases.add(parts.slice(-2).join(" ").toLowerCase());
    }

    const noPunct = lower.replace(/[^\p{L}\p{N}\s-]/gu, "").trim();
    if (noPunct) aliases.add(noPunct);

    return [...aliases].filter(Boolean);
}

function NamesLikelyMatch(a, b) {
    const aAliases = GetNameAliases(a);
    const bAliases = GetNameAliases(b);

    for (const x of aAliases) {
        for (const y of bAliases) {
            if (!x || !y) continue;
            if (x === y) return true;

            const minLen = Math.min(x.length, y.length);
            const maxLen = Math.max(x.length, y.length);

            if (minLen >= 4 && (x.includes(y) || y.includes(x))) {
                if (minLen / maxLen >= 0.65) {
                    return true;
                }
            }
        }
    }

    return false;
}

function ThoughtOwnerMatchesNpc(thoughtName, npcName, allNpcNames = []) {
    const thought = StripNameDecorators(thoughtName).toLowerCase().trim();
    const npc = StripNameDecorators(npcName).toLowerCase().trim();

    if (!thought || !npc) return false;
    if (thought === npc) return true;

    const thoughtParts = thought.split(/\s+/).filter(Boolean);
    const npcParts = npc.split(/\s+/).filter(Boolean);

    if (!thoughtParts.length || !npcParts.length) return false;

    const thoughtFirst = thoughtParts[0];
    const thoughtLast = thoughtParts[thoughtParts.length - 1];
    const npcFirst = npcParts[0];
    const npcLast = npcParts[npcParts.length - 1];

    if (thought === npcFirst || thought === npcLast) {
        if (thought === npcLast) {
            const sameLastCount = allNpcNames.filter(name => {
                const parts = StripNameDecorators(name).toLowerCase().trim().split(/\s+/).filter(Boolean);
                return parts.length && parts[parts.length - 1] === npcLast;
            }).length;

            return sameLastCount <= 1;
        }

        return true;
    }

    if (thought.includes(npc) || npc.includes(thought)) {
        const minLen = Math.min(thought.length, npc.length);
        const maxLen = Math.max(thought.length, npc.length);
        return minLen >= 4 && (minLen / maxLen >= 0.65);
    }

    if (thoughtFirst === npcFirst && thoughtLast === npcLast) return true;

    return false;
}

function ParsePresenceState(tags = []) {
    const normalized = tags.map(tag => NormalizeName(tag));

    if (normalized.some(tag => ["focus"].includes(tag))) {
        return { key: "focus", cls: "mib-presence-focus" };
    }

    if (normalized.some(tag => ["рядом", "near"].includes(tag))) {
        return { key: "nearby", cls: "mib-presence-near" };
    }

    if (normalized.some(tag => ["наблюдает", "watching"].includes(tag))) {
        return { key: "watching", cls: "mib-presence-watch" };
    }

    if (normalized.some(tag => ["на периферии", "background"].includes(tag))) {
        return { key: "background", cls: "mib-presence-background" };
    }

    if (normalized.some(tag => ["вышел", "left"].includes(tag))) {
        return { key: "leftScene", cls: "mib-presence-left" };
    }

    return null;
}

function IsPresenceTag(tag) {
    const normalized = NormalizeName(tag);

    return [
        "focus",
        "рядом",
        "near",
        "наблюдает",
        "watching",
        "на периферии",
        "background",
        "вышел",
        "left"
    ].includes(normalized);
}

function GetPresencePriority(char) {
    const key = char?.presence?.key || "";

    const priorities = {
        focus: 0,
        nearby: 1,
        watching: 2,
        background: 3,
        leftScene: 4
    };

    return priorities[key] ?? 10;
}

function GetContextSafe() {
    try {
        return SillyTavern.getContext();
    } catch {
        return {};
    }
}

function GetUserName() {
    const stContext = GetContextSafe();

    return (
        stContext.name1 ||
        stContext.chatMetadata?.persona ||
        stContext.user?.name ||
        "User"
    );
}

function GetChatId() {
    const stContext = GetContextSafe();

    return (
        stContext.chatMetadata?.chat_id ||
        stContext.characters?.[stContext.characterId]?.chat ||
        "default"
    );
}

function GetStateKey() {
    return kStatePrefix + GetChatId();
}

function GetNotesKey() {
    return kNotesPrefix + GetChatId();
}

function IsUserLikeName(name) {
    const n = NormalizeName(name);
    const user = NormalizeName(GetUserName());

    return !n ||
        n === "{{user}}" ||
        n === "user" ||
        n === "you" ||
        n === "ты" ||
        n === "вы" ||
        n === user;
}

function SignedText(value) {
    const n = parseInt(value, 10) || 0;
    return n >= 0 ? `+${n}` : `${n}`;
}

function LoadSettings() {
    gEnabled = localStorage.getItem(kEnabledKey) === "true";
    gLang = localStorage.getItem(kLangKey) || "ru";
    gTheme = localStorage.getItem(kThemeKey) || "nocturne";
    gDisplayMode = localStorage.getItem(kDisplayModeKey) || "inline";
    gDockSide = localStorage.getItem(kDockSideKey) || "right";
    gHideRaw = localStorage.getItem(kHideRawKey) !== "false";
    gHideThoughtLeaks = localStorage.getItem(kHideThoughtLeaksKey) !== "false";
    gShowNsfw = localStorage.getItem(kShowNsfwKey) !== "false";
    gChronicleEnabled = localStorage.getItem(kChronicleEnabledKey) !== "false";
    gChronicleLimit = parseInt(localStorage.getItem(kChronicleLimitKey), 10) || 10;
    gActiveTab = localStorage.getItem(kActiveTabKey) || "scene";
    gSceneViewMode = localStorage.getItem(kSceneViewModeKey) || "full";
    gRelationFilter = localStorage.getItem(kRelationFilterKey) || "top3";
    gFontSize = localStorage.getItem(kFontSizeKey) || "normal";
    gThoughtsEnabled = localStorage.getItem(kThoughtsEnabledKey) !== "false";
    gBarStyle = localStorage.getItem(kBarStyleKey) || "classic";
}

function SaveSettings() {
    localStorage.setItem(kEnabledKey, String(gEnabled));
    localStorage.setItem(kLangKey, gLang);
    localStorage.setItem(kThemeKey, gTheme);
    localStorage.setItem(kDisplayModeKey, gDisplayMode);
    localStorage.setItem(kDockSideKey, gDockSide);
    localStorage.setItem(kHideRawKey, String(gHideRaw));
    localStorage.setItem(kHideThoughtLeaksKey, String(gHideThoughtLeaks));
    localStorage.setItem(kShowNsfwKey, String(gShowNsfw));
    localStorage.setItem(kChronicleEnabledKey, String(gChronicleEnabled));
    localStorage.setItem(kChronicleLimitKey, String(gChronicleLimit));
    localStorage.setItem(kActiveTabKey, gActiveTab);
    localStorage.setItem(kSceneViewModeKey, gSceneViewMode);
    localStorage.setItem(kRelationFilterKey, gRelationFilter);
    localStorage.setItem(kFontSizeKey, gFontSize);
    localStorage.setItem(kThoughtsEnabledKey, String(gThoughtsEnabled));
    localStorage.setItem(kBarStyleKey, gBarStyle);
}

function LoadState() {
    try {
        const raw = localStorage.getItem(GetStateKey());
        if (!raw) {
            gState = Clone(kDefaultState);
            return false;
        }

        gState = NormalizeImportedState(JSON.parse(raw));
        return true;
    } catch (error) {
        console.warn("[MIB] LoadState failed:", error);
        gState = Clone(kDefaultState);
        return false;
    }
}

function SaveState() {
    try {
        localStorage.setItem(GetStateKey(), JSON.stringify(gState));
    } catch (error) {
        console.warn("[MIB] SaveState failed:", error);
    }
}

function LoadNotes() {
    try {
        gNotes = localStorage.getItem(GetNotesKey()) || "";
    } catch {
        gNotes = "";
    }
}

function SaveNotes() {
    try {
        localStorage.setItem(GetNotesKey(), gNotes || "");
    } catch (error) {
        console.warn("[MIB] SaveNotes failed:", error);
    }
}

const kCssPresets = {
    compactThin: `
.mib-board {
    padding: 8px;
    border-radius: 12px;
}

.mib-section,
.mib-header,
.mib-char,
.mib-rel,
.mib-compact-rel {
    padding: 7px 8px;
    margin-bottom: 6px;
}

.mib-tabs {
    margin-bottom: 7px;
}
`.trim(),

    biggerText: `
.mib-board,
#mib_floating_host,
#mib_dock_host {
    font-size: 15px;
}

.mib-chip,
.mib-status-chip,
.mib-mini-stat {
    font-size: 11px;
}
`.trim(),

    transparent: `
.mib-board {
    background: rgba(12, 18, 28, 0.58);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.mib-section,
.mib-header,
.mib-char,
.mib-rel,
.mib-compact-rel {
    background: rgba(255,255,255,0.018);
}
`.trim(),

    highContrast: `
.mib-board {
    --mib-text: #ffffff;
    --mib-muted: #d7e1ff;
    --mib-dim: #a8b8dd;
    --mib-border: rgba(180, 205, 255, 0.42);
    --mib-soft-border: rgba(180, 205, 255, 0.24);
}

.mib-chip,
.mib-status-chip {
    color: #ffffff;
}
`.trim(),

    purpleGlow: `
.mib-board {
    --mib-accent: #b98cff;
    --mib-accent-2: #ff8fe8;
    --mib-border: rgba(185, 140, 255, 0.38);
    --mib-soft-border: rgba(185, 140, 255, 0.18);
    box-shadow: 0 0 22px rgba(185, 140, 255, 0.18), 0 14px 34px rgba(0,0,0,0.38);
}

.mib-tab-active,
.mib-pin-btn.mib-pinned {
    box-shadow: 0 0 12px rgba(185, 140, 255, 0.22);
}
`.trim()
};

function LoadCustomCss() {
    try {
        gCustomCss = localStorage.getItem(kCustomCssKey) || "";
    } catch {
        gCustomCss = "";
    }
}

function SaveCustomCss() {
    try {
        localStorage.setItem(kCustomCssKey, gCustomCss || "");
    } catch (error) {
        console.warn("[MIB] SaveCustomCss failed:", error);
    }
}

function ApplyCustomCss() {
    let style = document.getElementById("mib_custom_css");

    if (!gCustomCss.trim()) {
        style?.remove();
        return;
    }

    if (!style) {
        style = document.createElement("style");
        style.id = "mib_custom_css";
        document.head.appendChild(style);
    }

    style.textContent = gCustomCss;
}

function InsertCustomCssPreset(name) {
    const preset = kCssPresets[name];
    if (!preset) return;

    const textarea = $("#mib_custom_css_input");
    const current = textarea.val() || "";
    const next = current.trim()
        ? `${current.trim()}\n\n/* ${name} */\n${preset}`
        : `/* ${name} */\n${preset}`;

    textarea.val(next);
    gCustomCss = next;
    SaveCustomCss();
    ApplyCustomCss();
}

function ApplyFontSize() {
    document.documentElement.setAttribute("data-mib-font-size", gFontSize || "normal");
}

function LoadPinnedNpcs() {
    try {
        const raw = localStorage.getItem(kPinnedNpcsKey);
        gPinnedNpcs = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(gPinnedNpcs)) gPinnedNpcs = [];
    } catch {
        gPinnedNpcs = [];
    }
}

function SavePinnedNpcs() {
    try {
        localStorage.setItem(kPinnedNpcsKey, JSON.stringify(gPinnedNpcs));
    } catch (error) {
        console.warn("[MIB] SavePinnedNpcs failed:", error);
    }
}

function IsPinnedNpc(name) {
    const normalized = NormalizeName(name);
    return gPinnedNpcs.some(pinned => NormalizeName(pinned) === normalized);
}

function TogglePinnedNpc(name) {
    if (!name) return;

    const normalized = NormalizeName(name);
    const index = gPinnedNpcs.findIndex(pinned => NormalizeName(pinned) === normalized);

    if (index >= 0) {
        gPinnedNpcs.splice(index, 1);
    } else {
        gPinnedNpcs.push(name);
    }

    SavePinnedNpcs();
}

function SortCharsByPriority(chars = []) {
    return [...chars].sort((a, b) => {
        const ap = IsPinnedNpc(a.name) ? 0 : 1;
        const bp = IsPinnedNpc(b.name) ? 0 : 1;

        if (ap !== bp) return ap - bp;

        const apres = GetPresencePriority(a);
        const bpres = GetPresencePriority(b);

        if (apres !== bpres) return apres - bpres;

        return String(a.name || "").localeCompare(String(b.name || ""), undefined, {
            sensitivity: "base"
        });
    });
}

function SortRelationsByPriority(rels = []) {
    return [...rels].sort((a, b) => {
        const ap = IsPinnedNpc(a.source) ? 0 : 1;
        const bp = IsPinnedNpc(b.source) ? 0 : 1;

        if (ap !== bp) return ap - bp;

        const av = Math.abs(parseInt(a.a) || 0) + Math.abs(parseInt(a.tr) || 0) + Math.abs(parseInt(a.l) || 0);
        const bv = Math.abs(parseInt(b.a) || 0) + Math.abs(parseInt(b.tr) || 0) + Math.abs(parseInt(b.l) || 0);

        return bv - av;
    });
}

function NormalizeImportedState(input) {
    const source = input || {};
    const state = Clone(kDefaultState);

    if (source.scene) {
        state.scene = {
            ...state.scene,
            ...source.scene
        };
    } else {
        state.scene = {
            time: source.time || state.scene.time,
            date: source.date || state.scene.date,
            weather: source.weather || state.scene.weather,
            loc: source.loc || state.scene.loc
        };
    }

    state.chars = Array.isArray(source.chars) ? source.chars : [];
    state.rels = Array.isArray(source.rels) ? source.rels : [];
    state.thoughts = Array.isArray(source.thoughts) ? source.thoughts : [];

    if (source.chronicle) {
        state.chronicle = {
            events: Array.isArray(source.chronicle.events) ? source.chronicle.events : [],
            threads: Array.isArray(source.chronicle.threads) ? source.chronicle.threads : []
        };
    }

    state.nsfw = source.nsfw || null;

    return state;
}

function BuildStateInjection() {
    const lines = [];

    lines.push("[MOM INFOBLOCK STATE]");
    lines.push(`Time: ${gState.scene.time}`);
    lines.push(`Date: ${gState.scene.date}`);
    lines.push(`Weather: ${gState.scene.weather}`);
    lines.push(`Location: ${gState.scene.loc}`);

    if (gState.chars.length) {
        lines.push("NPCs:");
        for (const c of gState.chars) {
            const tags = Array.isArray(c.tags) ? c.tags.join(", ") : "";
            const mood = c.mood ? ` mood: ${c.mood}` : "";
            lines.push(`- ${c.name}${tags ? ` [${tags}]` : ""}${mood}`);
        }
    }

    if (gState.rels.length) {
        lines.push("Relationships:");
        for (const r of gState.rels) {
            lines.push(`- ${r.source}: A ${r.a} (${SignedText(r.ac)}), T ${r.tr} (${SignedText(r.tc)}), L ${r.l} (${SignedText(r.lc)}), status: ${r.status}`);
        }
    }

    if (gChronicleEnabled && gState.chronicle.events.length) {
        lines.push("Chronicle events already known:");
        for (const event of gState.chronicle.events.slice(-gChronicleLimit)) {
            lines.push(`- ${event}`);
        }
    }

    if (gChronicleEnabled && gState.chronicle.threads.length) {
        lines.push("Open plot threads:");
        for (const thread of gState.chronicle.threads.slice(0, 8)) {
            lines.push(`- ${thread}`);
        }
    }

    if (gNotes.trim()) {
        lines.push("User notes:");
        lines.push(gNotes.trim());
    }

if (gThoughtsEnabled && gState.thoughts.length) {
    lines.push("Private NPC thoughts - internal memory only, never write these in visible narrative:");
    for (const t of gState.thoughts) {
        lines.push(`- ${t.name}: ${t.text}`);
    }
}

    lines.push("[/MOM INFOBLOCK STATE]");

    return lines.join("\n");
}

function InjectPrompt() {
    try {
        const stContext = GetContextSafe();

        if (!gEnabled) {
            stContext.setExtensionPrompt?.(kPromptInjectionId, "", 1, 0);
            return;
        }

        RebuildStateFromCurrentChat();

        const systemPrompt = gLang === "en" ? kSystemPromptEn : kSystemPromptRu;
const chronicleHint = gChronicleEnabled
    ? ""
    : "\nChronicle module is disabled. Omit <chronicle>.";

const thoughtsHint = gThoughtsEnabled
    ? ""
    : "\nNPC thoughts module is disabled. Omit <thk> entirely and do not write private NPC thoughts.";

 const fullPrompt = `${systemPrompt}${chronicleHint}${thoughtsHint}\n\n${BuildStateInjection()}`;

        stContext.setExtensionPrompt?.(kPromptInjectionId, fullPrompt, 1, 0);
    } catch (error) {
        console.error("[MIB] InjectPrompt failed:", error);
    }
}

function RepairXml(xml) {
    return String(xml || "").replace(
        /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g,
        "&amp;"
    );
}

function ParseThoughtLine(line) {
    let clean = String(line || "").trim();
    if (!clean) return null;

    clean = clean
        .replace(/^\s*[*_~`]+/, "")
        .replace(/[*_~`]+\s*$/, "")
        .trim();

    const match = clean.match(/^([^:—]+?)\s*[:—]\s*(.+)$/u);
    if (!match) return null;

    const name = StripNameDecorators(match[1]);
    const text = String(match[2] || "")
        .replace(/^\s*[*_~`]+/, "")
        .replace(/[*_~`]+\s*$/, "")
        .trim();

    if (!name || !text || IsUserLikeName(name)) return null;

    return {
        name: LimitText(name, 80),
        text: LimitText(text, 220)
    };
}

function NormalizeThoughtOwners(parsed) {
    if (!parsed?.thoughts?.length) return;

    const singleRelName = parsed.rels?.length === 1 ? parsed.rels[0].source : "";
    const singleCharName = parsed.chars?.length === 1 ? parsed.chars[0].name : "";

    parsed.thoughts = parsed.thoughts
        .map(thought => {
            let thoughtName = thought.name;

            const isUnassigned =
                NormalizeName(thoughtName) === "__unassigned__" ||
                NormalizeName(thoughtName) === "npc";

            if (isUnassigned) {
                if (singleRelName || singleCharName) {
                    thoughtName = singleRelName || singleCharName;
                } else {
                    return {
                        ...thought,
                        name: "__UNASSIGNED__"
                    };
                }
            }

            const allNpcNames = [
                ...parsed.rels.map(rel => rel.source),
                ...parsed.chars.map(char => char.name)
            ];

            const relMatches = parsed.rels.filter(rel => ThoughtOwnerMatchesNpc(thoughtName, rel.source, allNpcNames));
            const charMatches = parsed.chars.filter(char => ThoughtOwnerMatchesNpc(thoughtName, char.name, allNpcNames));

            const canonicalName =
                relMatches.length === 1 ? relMatches[0].source :
                charMatches.length === 1 ? charMatches[0].name :
                thoughtName;

            return {
                ...thought,
                name: canonicalName
            };
        })
        .filter(thought => !IsUserLikeName(thought.name));

    if (parsed.chars.length > 0 || parsed.rels.length > 0) {
        parsed.thoughts = parsed.thoughts.filter(thought => {
            const n = NormalizeName(thought.name);
            if (n === "npc" || n === "__unassigned__") return false;

            const byChar = parsed.chars.some(char => NamesLikelyMatch(char.name, thought.name));
            const byRel = parsed.rels.some(rel => NamesLikelyMatch(rel.source, thought.name));

            return byChar || byRel;
        });
    }
}

function ParseMomInfoblock(text) {
    const rawText = String(text || "");
    const blockMatch = rawText.match(/<mom_infoblock\b[\s\S]*?<\/mom_infoblock>/i);

    if (!blockMatch) return null;

    const rawXml = blockMatch[0];
    const xmlForParsing = RepairXml(rawXml);

    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlForParsing, "text/xml");

    if (doc.querySelector("parsererror")) {
        console.warn("[MIB] XML parser error");
        return null;
    }

    const root = doc.querySelector("mom_infoblock");
    if (!root) return null;

    const parsed = {
        scene: {
            time: root.getAttribute("time") || "???",
            date: root.getAttribute("date") || "???",
            weather: root.getAttribute("weather") || "???",
            loc: root.getAttribute("loc") || "???"
        },
        chars: [],
        rels: [],
        thoughts: [],
        chronicle: {
            events: [],
            threads: []
        },
        nsfw: null,
        rawXml
    };

    doc.querySelectorAll("chars > c").forEach(node => {
        const name = node.getAttribute("name") || "";
        if (IsUserLikeName(name)) return;

const tags = String(node.getAttribute("tags") || "")
    .split("|")
    .map(x => LimitText(x, 24))
    .filter(Boolean)
    .slice(0, 4);

parsed.chars.push({
    icon: node.getAttribute("icon") || "•",
    name: LimitText(name, 80),
    tags,
    mood: LimitText(node.getAttribute("mood") || "", 40),
    presence: ParsePresenceState(tags)
});
    });

    doc.querySelectorAll("rels > rel").forEach(node => {
        const source = node.getAttribute("source") || "";
        if (IsUserLikeName(source)) return;

        parsed.rels.push({
            source: LimitText(source, 80),
            target: GetUserName(),
            a: Clamp(node.getAttribute("a"), -100, 100),
            ac: Clamp(node.getAttribute("ac"), -100, 100),
            tr: Clamp(node.getAttribute("tr"), -100, 100),
            tc: Clamp(node.getAttribute("tc"), -100, 100),
            l: Clamp(node.getAttribute("l"), -100, 100),
            lc: Clamp(node.getAttribute("lc"), -100, 100),
            status: LimitText(node.getAttribute("status") || T("noStatus"), 48)
        });
    });

    const chronicle = doc.querySelector("chronicle");

    if (chronicle && gChronicleEnabled) {
        chronicle.querySelectorAll("event").forEach(node => {
            const event = LimitText(node.textContent || "", 160);
            if (event) parsed.chronicle.events.push(event);
        });

        chronicle.querySelectorAll("thread").forEach(node => {
            const thread = LimitText(node.textContent || "", 140);
            if (thread) parsed.chronicle.threads.push(thread);
        });
    }

const thk = doc.querySelector("thk");

if (thk && gThoughtsEnabled) {
    parsed.thoughts = String(thk.textContent || "")
        .replace(/\r/g, "\n")
        .split("\n")
        .map(ParseThoughtLine)
        .filter(Boolean);
}

    const tailText = rawText.slice(rawText.indexOf(rawXml) + rawXml.length);
    const nsfwMatch = tailText.match(/<nsfw\s+f="(.*?)"\s+p="(.*?)"\s*\/?>/i);

    if (nsfwMatch) {
        parsed.nsfw = {
            f: LimitText(nsfwMatch[1], 160),
            p: LimitText(nsfwMatch[2], 160)
        };
    }

if (parsed.rels.length && parsed.chars.length) {
    parsed.rels = parsed.rels.map(rel => {
        const matches = parsed.chars.filter(char => NamesLikelyMatch(char.name, rel.source));

        if (matches.length === 1) {
            return {
                ...rel,
                source: matches[0].name
            };
        }

        return rel;
    });
}

NormalizeThoughtOwners(parsed);
    
    return parsed;
}

function MergeUniqueList(existing, incoming, limit) {
    const result = [];

    for (const item of [...existing, ...incoming]) {
        const clean = LimitText(item, 180);
        if (!clean) continue;

        const normalized = NormalizeText(clean);
        const alreadyExists = result.some(x => NormalizeText(x) === normalized);

        if (!alreadyExists) {
            result.push(clean);
        }
    }

    return result.slice(Math.max(0, result.length - limit));
}

function ApplyParsedToState(parsed, baseState = gState) {
    const next = Clone(baseState);

    next.scene = {
        ...next.scene,
        ...parsed.scene
    };

    next.chars = Array.isArray(parsed.chars) ? parsed.chars : [];
    next.rels = Array.isArray(parsed.rels) ? parsed.rels : [];
 next.thoughts = gThoughtsEnabled && Array.isArray(parsed.thoughts) ? parsed.thoughts : [];
    next.nsfw = parsed.nsfw || null;

    if (gChronicleEnabled) {
        next.chronicle.events = MergeUniqueList(
            next.chronicle.events,
            parsed.chronicle?.events || [],
            gChronicleLimit
        );

next.chronicle.threads = MergeUniqueList(
    next.chronicle.threads,
    parsed.chronicle?.threads || [],
    6
);
    }

    if (parsed.rawXml) {
        gLastRawXml = parsed.rawXml;
    }

    return next;
}

function RenderMetric(label, value, delta, positiveLabel, negativeLabel) {
    const n = Clamp(value, -100, 100);
    const abs = Math.abs(n);
    const sideClass = n >= 0 ? "mib-meter-pos" : "mib-meter-neg";
    const title = n >= 0 ? positiveLabel : negativeLabel;

    let barClass = "";

    if (label === "a") {
        barClass = n >= 0 ? "mib-bar-affection-pos" : "mib-bar-affection-neg";
    } else if (label === "tr") {
        barClass = n >= 0 ? "mib-bar-trust-pos" : "mib-bar-trust-neg";
    } else {
        barClass = n >= 0 ? "mib-bar-love-pos" : "mib-bar-love-neg";
    }

    return `
        <div class="mib-meter ${sideClass}">
            <div class="mib-meter-top">
                <span>${EscapeHtml(title)}</span>
                <span>${n}/100 (${EscapeHtml(SignedText(delta))})</span>
            </div>
            <div class="mib-bar">
                <div class="mib-bar-fill ${barClass}" style="width:${Math.max(abs, abs ? 4 : 0)}%"></div>
            </div>
        </div>`;
}

function RenderTabs() {
    const tabs = [
        ["scene", T("sceneTab")],
        ["chronicle", T("chronicleTab")],
        ["notes", T("notesTab")]
    ];

    return `
        <div class="mib-tabs">
            ${tabs.map(([key, label]) => `
                <button type="button" class="mib-tab ${gActiveTab === key ? "mib-tab-active" : ""}" data-mib-tab="${key}">
                    ${EscapeHtml(label)}
                </button>
            `).join("")}
        </div>`;
}

function FindThoughtForNpc(thoughts = [], npcName = "", rels = []) {
    if (!npcName) return null;

    const allNpcNames = (rels || []).map(rel => rel.source);

    return thoughts.find(thought => ThoughtOwnerMatchesNpc(thought.name, npcName, allNpcNames)) || null;
}

function RenderMiniStatChip(label, value, delta, kind) {
    const n = Clamp(value, -100, 100);
    const d = parseInt(delta, 10) || 0;
    const cls = n >= 0 ? "mib-mini-pos" : "mib-mini-neg";
    const deltaHtml = d
        ? `<span class="mib-mini-delta ${d > 0 ? "mib-delta-pos" : "mib-delta-neg"}">${EscapeHtml(SignedText(d))}</span>`
        : "";

    return `
        <span class="mib-mini-stat ${cls} mib-mini-${EscapeHtml(kind)}">
            <span class="mib-mini-label">${EscapeHtml(label)}</span>
            <span class="mib-mini-value">${n}</span>
            ${deltaHtml}
        </span>`;
}

function RenderRelationCard(r, state) {
const thought = gThoughtsEnabled ? FindThoughtForNpc(state.thoughts, r.source, state.rels) : null;

    return `
        <div class="mib-rel mib-rel-accordion mib-open">
            <button type="button" class="mib-rel-toggle" aria-expanded="true">
                <div class="mib-rel-toggle-main">
                    <span class="mib-rel-name">${EscapeHtml(r.source)} → ${EscapeHtml(r.target)}</span>
                    <span class="mib-status-chip">${EscapeHtml(r.status)}</span>
                </div>

                <div class="mib-rel-mini">
                    ${RenderMiniStatChip("A", r.a, r.ac, "affection")}
                    ${RenderMiniStatChip("T", r.tr, r.tc, "trust")}
                    ${RenderMiniStatChip("L", r.l, r.lc, "love")}
                    <span class="mib-rel-arrow" aria-hidden="true"></span>
                </div>
            </button>

            <div class="mib-rel-body">
                ${RenderMetric("a", r.a, r.ac, T("affection"), T("aversion"))}
                ${RenderMetric("tr", r.tr, r.tc, T("trust"), T("distrust"))}
                ${RenderMetric("l", r.l, r.lc, T("love"), T("hatred"))}

${thought ? `
    <div class="mib-thought mib-rel-thought">
        ${EscapeHtml(thought.text)}
    </div>
` : ""}
            </div>
        </div>`;
}


function RelationHasDelta(rel) {
    return (
        (parseInt(rel.ac, 10) || 0) !== 0 ||
        (parseInt(rel.tc, 10) || 0) !== 0 ||
        (parseInt(rel.lc, 10) || 0) !== 0
    );
}

function GetFilteredRelations(rels = []) {
    const sorted = SortRelationsByPriority(rels);

    if (gRelationFilter === "top1") {
        return sorted.slice(0, 1);
    }

    if (gRelationFilter === "changed") {
        const changed = sorted.filter(RelationHasDelta);
        return changed.length ? changed : sorted.slice(0, 3);
    }

    if (gRelationFilter === "all") {
        return sorted;
    }

    return sorted.slice(0, 3);
}

function RenderRelationFilterNote(rels = []) {
    if (gRelationFilter !== "changed") return "";
    if (rels.some(RelationHasDelta)) return "";

    return `<div class="mib-filter-note">${EscapeHtml(T("noRelationChanges"))}</div>`;
}

function RenderSceneTab(state) {
const sortedChars = SortCharsByPriority(state.chars);

const charsHtml = sortedChars.length
    ? sortedChars.map(c => {
        const visibleTags = (c.tags || []).filter(tag => !IsPresenceTag(tag));
        const mood = String(c.mood || "").trim();

        return `
            <div class="mib-char">
                <div class="mib-char-main">
                    <span class="mib-char-icon">${EscapeHtml(c.icon || "•")}</span>
                    <span class="mib-char-name">${EscapeHtml(c.name)}</span>
                    <button
                        type="button"
                        class="mib-pin-btn ${IsPinnedNpc(c.name) ? "mib-pinned" : ""}"
                        data-mib-pin="${EscapeHtml(c.name)}"
                        title="${EscapeHtml(IsPinnedNpc(c.name) ? "Unpin NPC" : "Pin NPC")}"
                    ></button>
                    ${c.presence ? `<span class="mib-presence-chip ${c.presence.cls}">${EscapeHtml(T(c.presence.key))}</span>` : ""}
                    ${mood ? `<span class="mib-chip mib-mood">${EscapeHtml(mood)}</span>` : ""}
                </div>
                <div class="mib-tags">
                    ${visibleTags.map(tag => `<span class="mib-chip">${EscapeHtml(tag)}</span>`).join("")}
                </div>
            </div>
        `;
    }).join("")
    : `<div class="mib-empty">${EscapeHtml(T("noData"))}</div>`;

const sortedRels = SortRelationsByPriority(state.rels);
const filteredRels = GetFilteredRelations(state.rels);

const relsHtml = filteredRels.length
    ? `${RenderRelationFilterNote(sortedRels)}${filteredRels.map(r => RenderRelationCard(r, state)).join("")}`
    : `<div class="mib-empty">${EscapeHtml(T("noData"))}</div>`;

const allNpcNames = sortedRels.map(rel => rel.source);

const extraThoughts = gThoughtsEnabled
    ? (state.thoughts || []).filter(thought => {
        return !sortedRels.some(rel => ThoughtOwnerMatchesNpc(thought.name, rel.source, allNpcNames));
    })
    : [];

const thoughtsHtml = extraThoughts.length
    ? extraThoughts.map(t => `
        <div class="mib-thought">
            <b>${EscapeHtml(t.name)}:</b> ${EscapeHtml(t.text)}
        </div>
    `).join("")
    : "";

    const nsfwHtml = gShowNsfw && state.nsfw
        ? `
            <div class="mib-section mib-nsfw">
                <div class="mib-section-title">${EscapeHtml(T("nsfw"))}</div>
                <div><b>${EscapeHtml(T("fetishes"))}:</b> ${EscapeHtml(state.nsfw.f)}</div>
                <div><b>${EscapeHtml(T("positions"))}:</b> ${EscapeHtml(state.nsfw.p)}</div>
            </div>`
        : "";

return `
    <div class="mib-scene-grid">
        <div class="mib-header">
                <div class="mib-location">📍 ${EscapeHtml(state.scene.loc)}</div>
                <div class="mib-meta">
                    <span>⏰ ${EscapeHtml(state.scene.time)}</span>
                    <span>📅 ${EscapeHtml(state.scene.date)}</span>
                    <span>☁ ${EscapeHtml(state.scene.weather)}</span>
                </div>
            </div>

            <div class="mib-section">
                <div class="mib-section-title">${EscapeHtml(T("chars"))}</div>
                ${charsHtml}
            </div>

            <div class="mib-section">
                <div class="mib-section-title">${EscapeHtml(T("rels"))}</div>
                ${relsHtml}
            </div>

            ${thoughtsHtml ? `
                <div class="mib-section">
                    <div class="mib-section-title">${EscapeHtml(T("thoughts"))}</div>
                    ${thoughtsHtml}
                </div>` : ""}

            ${nsfwHtml}
        </div>`;
}

function RenderChronicleTab(state) {
    if (!gChronicleEnabled) {
        return `<div class="mib-empty">${EscapeHtml(T("noData"))}</div>`;
    }

    const events = state.chronicle.events || [];
    const threads = state.chronicle.threads || [];

    return `
        <div class="mib-section">
            <div class="mib-section-title">${EscapeHtml(T("chronicle"))}</div>
            ${events.length
                ? `<ol class="mib-chronicle-list">${events.map(event => `<li>${EscapeHtml(event)}</li>`).join("")}</ol>`
                : `<div class="mib-empty">${EscapeHtml(T("noData"))}</div>`}
        </div>

        <div class="mib-section">
            <div class="mib-section-title">${EscapeHtml(T("openThreads"))}</div>
            ${threads.length
                ? `<ul class="mib-thread-list">${threads.map(thread => `<li>${EscapeHtml(thread)}</li>`).join("")}</ul>`
                : `<div class="mib-empty">${EscapeHtml(T("noData"))}</div>`}
        </div>`;
}

function RenderNotesTab() {
    return `
        <div class="mib-section mib-notes-section">
            <div class="mib-section-title">${EscapeHtml(T("notes"))}</div>
            <textarea class="mib-notes-input" placeholder="${EscapeHtml(T("notesPlaceholder"))}">${EscapeHtml(gNotes)}</textarea>
        </div>`;
}

const kBarStyleOptions = [
    ["classic", "barClassic"],
    ["deep", "barDeep"],
    ["glass", "barGlass"],
    ["soft", "barSoft"],
    ["pixel", "barPixel"],
    ["candy", "barCandy"],
    ["prism", "barPrism"],
    ["neon", "barNeon"],
    ["terminal", "barTerminal"],
    ["hearts", "barHearts"],
    ["constellation", "barConstellation"],
    ["vials", "barVials"],
    ["evidence", "barEvidence"],
    ["runic", "barRunic"],
    ["sigil", "barSigil"],
    ["energon", "barEnergon"]
];

const kThemeOptions = [
    ["nocturne", "Nocturne"],
    ["burgundy", "Burgundy"],
    ["ashrose", "Ash Rose"],
    ["coldsteel", "Cold Steel"],
    ["frostwhite", "Frost White"],
    ["pixel", "Pixel Neon"],
    ["pinkbite", "Pink Bite"],
    ["violetglass", "Violet Glass"],
    ["verdantgrove", "Verdant Grove"],
    ["sandalwood", "Sandalwood"],
    ["gengar", "Gengar"],
    ["systemlog", "System Log"],
    ["terminal", "Terminal"],
    ["oraclemoon", "Oracle Moon"],
    ["bloodmoon", "Blood Moon"],
    ["casefile", "Case File"],
    ["obsidianregistry", "Obsidian Registry"],
    ["neonquest", "Neon Quest"],
    ["shockwave", "Shockwave"],
    ["lockdown", "Lockdown"],
    ["hotrod", "Hot Rod"],
    ["gryffindor", "Gryffindor"],
    ["slytherin", "Slytherin"],
    ["ravenclaw", "Ravenclaw"],
    ["hufflepuff", "Hufflepuff"]
];

const kThemePreviewMap = {
    nocturne: {
        label: { ru: "Ночное синее стекло", en: "Midnight blue glass" },
        bg: "#141824",
        bg2: "#1c2232",
        accent: "#8fb4ff",
        accent2: "#c09cff",
        text: "#dbe3ff",
        danger: "#ff8f9f"
    },
    burgundy: {
        label: { ru: "Винный, тёплый, драматичный", en: "Wine-dark and dramatic" },
        bg: "#221419",
        bg2: "#311c24",
        accent: "#ff9bb3",
        accent2: "#e0a7ff",
        text: "#ffe2ea",
        danger: "#ff9bb3"
    },
    ashrose: {
        label: { ru: "Пепельная роза", en: "Muted rose dusk" },
        bg: "#211a20",
        bg2: "#2d242c",
        accent: "#f0a8c4",
        accent2: "#caa8ff",
        text: "#f3dfe8",
        danger: "#f0a8c4"
    },
    coldsteel: {
        label: { ru: "Холодный металл", en: "Cold iron and steel" },
        bg: "#15191c",
        bg2: "#20272d",
        accent: "#9ec7d9",
        accent2: "#b3b9df",
        text: "#dde6eb",
        danger: "#c89292"
    },
    frostwhite: {
        label: { ru: "Морозное небо", en: "Frosted pale blue" },
        bg: "#253446",
        bg2: "#2d4158",
        accent: "#7fb8ff",
        accent2: "#a8bfff",
        text: "#e3eefc",
        danger: "#e06c84"
    },
    pixel: {
        label: { ru: "Пиксельный неон", en: "Retro pixel neon" },
        bg: "#17132b",
        bg2: "#221b3f",
        accent: "#a6ff78",
        accent2: "#7de8ff",
        text: "#d8ffd0",
        danger: "#ff7f9f"
    },
    pinkbite: {
        label: { ru: "Сахарный розовый укус", en: "Sweet pink bite" },
        bg: "#2a1526",
        bg2: "#3a1d35",
        accent: "#ff8fc7",
        accent2: "#ffc2e6",
        text: "#ffe6f4",
        danger: "#ff7ba5"
    },
    violetglass: {
        label: { ru: "Фиолетовое стекло", en: "Soft violet glass" },
        bg: "#1b1830",
        bg2: "#2a2344",
        accent: "#b69cff",
        accent2: "#8fd4ff",
        text: "#efeaff",
        danger: "#ff92b2"
    },
    verdantgrove: {
        label: { ru: "Лес, мох и приглушённое золото", en: "Forest moss and muted gold" },
        bg: "#162019",
        bg2: "#223126",
        accent: "#9fcb8f",
        accent2: "#d6c68b",
        text: "#e7f1e4",
        danger: "#d97f87"
    },
    sandalwood: {
        label: { ru: "Тёплое дерево и бежевый свет", en: "Warm sandalwood and beige light" },
        bg: "#2a221b",
        bg2: "#3a2f25",
        accent: "#ddb27a",
        accent2: "#cfa98e",
        text: "#f5eadc",
        danger: "#d98b7d"
    },
    gengar: {
        label: { ru: "Фиолетовый неон и призрачная пакость", en: "Purple neon ghost mischief" },
        bg: "#14091f",
        bg2: "#25103d",
        accent: "#b86cff",
        accent2: "#ff5fd7",
        text: "#f3e7ff",
        danger: "#ff5d8f"
    },
    systemlog: {
        label: { ru: "Терминальный лог, холодный неон", en: "System log and cold neon" },
        bg: "#07090c",
        bg2: "#101820",
        accent: "#6bd6ff",
        accent2: "#ff6f9f",
        text: "#d8e7ee",
        danger: "#ff5e6c"
    },
    terminal: {
        label: { ru: "Старый зелёный CRT", en: "Old green CRT" },
        bg: "#020b06",
        bg2: "#06160c",
        accent: "#38ff7a",
        accent2: "#b6ff6a",
        text: "#c8ffd2",
        danger: "#ff9b4a"
    },
    oraclemoon: {
        label: { ru: "Мистическая луна и бархат", en: "Mystic moon velvet" },
        bg: "#171122",
        bg2: "#261a35",
        accent: "#d8b86a",
        accent2: "#b98cff",
        text: "#f2e8ff",
        danger: "#ff7fa8"
    },
    bloodmoon: {
        label: { ru: "Бордо, кровь и старое золото", en: "Burgundy blood and old gold" },
        bg: "#1a080d",
        bg2: "#2a1017",
        accent: "#b84552",
        accent2: "#d6a35f",
        text: "#f4e1dc",
        danger: "#e05a67"
    },
    casefile: {
        label: { ru: "Детективное дело и лента улик", en: "Case file and evidence tape" },
        bg: "#151412",
        bg2: "#25221d",
        accent: "#e0b84f",
        accent2: "#b7afa1",
        text: "#eee5d8",
        danger: "#d65f4f"
    },
    obsidianregistry: {
        label: { ru: "Тёмный архив и старое золото", en: "Dark archive and old gold" },
        bg: "#07130f",
        bg2: "#10231b",
        accent: "#d7c28a",
        accent2: "#77b68c",
        text: "#e4eee5",
        danger: "#d9876f"
    },
    neonquest: {
        label: { ru: "Игровой HUD и синий неон", en: "Game HUD and blue neon" },
        bg: "#020817",
        bg2: "#061a33",
        accent: "#00d9ff",
        accent2: "#2f7cff",
        text: "#d8f7ff",
        danger: "#ff4f9a"
    },
    shockwave: {
        label: { ru: "Фиолетовый техно-металл", en: "Violet techno metal" },
        bg: "#120b18",
        bg2: "#261534",
        accent: "#cc7cff",
        accent2: "#ff71c8",
        text: "#f3ebff",
        danger: "#ff6a9d"
    },
    lockdown: {
        label: { ru: "Серый металл и охотничий HUD", en: "Gray steel hunter HUD" },
        bg: "#0d1114",
        bg2: "#1c2327",
        accent: "#86c98a",
        accent2: "#a6b2b8",
        text: "#e6ecef",
        danger: "#d9876f"
    },
    hotrod: {
        label: { ru: "Огонь, чёрный металл и скорость", en: "Fire black speed" },
        bg: "#120b08",
        bg2: "#2a1208",
        accent: "#ff8a2a",
        accent2: "#ffcf63",
        text: "#fff1d8",
        danger: "#ff6f4f"
    },
    gryffindor: {
        label: { ru: "Бордо, золото и гербовый жар", en: "Crimson gold heraldry" },
        bg: "#2a1114",
        bg2: "#4a161b",
        accent: "#d4a94e",
        accent2: "#f0d28a",
        text: "#f9e8db",
        danger: "#ff8b7f"
    },
    slytherin: {
        label: { ru: "Изумруд, серебро и холод", en: "Emerald silver cold sheen" },
        bg: "#0f1b16",
        bg2: "#173027",
        accent: "#7dc8a2",
        accent2: "#c7d2cf",
        text: "#e6f2ed",
        danger: "#c98f98"
    },
    ravenclaw: {
        label: { ru: "Сапфир и бронза", en: "Sapphire and bronze" },
        bg: "#121c2f",
        bg2: "#1b2d4a",
        accent: "#8da8d8",
        accent2: "#b8894f",
        text: "#edf2fb",
        danger: "#d58d86"
    },
    hufflepuff: {
        label: { ru: "Мёд, янтарь и тёплый свет", en: "Honey amber warmth" },
        bg: "#241d13",
        bg2: "#3a2b14",
        accent: "#e0b94a",
        accent2: "#f3d889",
        text: "#f8eed5",
        danger: "#d69a62"
    }
};

function GetThemePreview(theme = gTheme) {
    return kThemePreviewMap[theme] || null;
}

function RenderThemeSelectOptions(activeValue) {
    return kThemeOptions.map(([value, label]) => `
        <option value="${EscapeHtml(value)}" ${activeValue === value ? "selected" : ""}>
            ${EscapeHtml(label)}
        </option>
    `).join("");
}

function RenderThemePreview(theme = gTheme) {
    const preview = GetThemePreview(theme);

    if (!preview) {
        return `
            <div class="mib-theme-preview">
                <div class="mib-theme-preview-label">${EscapeHtml(T("themePreviewMissing"))}</div>
            </div>
        `;
    }

    const label = preview.label?.[gLang] || preview.label?.en || "";

    return `
        <div class="mib-theme-preview" data-mib-theme-preview>
            <div class="mib-theme-preview-swatches">
                <span class="mib-swatch" style="background:${EscapeHtml(preview.bg)}"></span>
                <span class="mib-swatch" style="background:${EscapeHtml(preview.bg2)}"></span>
                <span class="mib-swatch" style="background:${EscapeHtml(preview.accent)}"></span>
                <span class="mib-swatch" style="background:${EscapeHtml(preview.accent2)}"></span>
                <span class="mib-swatch" style="background:${EscapeHtml(preview.text)}"></span>
                <span class="mib-swatch" style="background:${EscapeHtml(preview.danger)}"></span>
            </div>
            <div class="mib-theme-preview-label">
                ${EscapeHtml(T("themePreview"))}: ${EscapeHtml(label)}
            </div>
        </div>
    `;
}

function RenderStyleSelectOptions(options, activeValue) {
    return options.map(([value, labelKey]) => `
        <option value="${EscapeHtml(value)}" ${activeValue === value ? "selected" : ""}>
            ${EscapeHtml(T(labelKey))}
        </option>
    `).join("");
}

function RenderCompactPanel(state = gState) {
const rels = GetFilteredRelations(state.rels || []).slice(0, gRelationFilter === "all" ? 8 : 5);

    const relsHtml = rels.length
        ? rels.map(r => `
            <div class="mib-compact-rel">
                <div class="mib-compact-rel-top">
                    <span class="mib-compact-name">${EscapeHtml(r.source)}</span>
                    <span class="mib-status-chip">${EscapeHtml(r.status)}</span>
                </div>

                <div class="mib-compact-stats">
                    ${RenderMiniStatChip("A", r.a, r.ac, "affection")}
                    ${RenderMiniStatChip("T", r.tr, r.tc, "trust")}
                    ${RenderMiniStatChip("L", r.l, r.lc, "love")}
                </div>
            </div>
        `).join("")
        : `<div class="mib-empty">${EscapeHtml(T("noData"))}</div>`;

    return `
<div class="mib-board mib-board-compact mib-theme-${EscapeHtml(gTheme)} mib-bars-${EscapeHtml(gBarStyle)}" data-mib-board>
            <div class="mib-compact-topbar">
                <div class="mib-compact-brand">Mom Infoblock</div>

<div class="mib-title-actions">
    <button type="button" class="mib-style-btn" title="${EscapeHtml(T("styleMenu"))}">◈</button>
    <button type="button" class="mib-dossier-btn" title="${EscapeHtml(T("dossier"))}">☰</button>
    <button type="button" class="mib-panel-mode-btn" data-mib-panel-mode="full" title="${EscapeHtml(T("sceneFull"))}">↗</button>
    <button type="button" class="mib-debug-btn" title="${EscapeHtml(T("debugXml"))}">&lt;/&gt;</button>
</div>
            </div>

            <div class="mib-compact-list">
                ${relsHtml}
            </div>

            <div class="mib-compact-location">📍 ${EscapeHtml(state.scene.loc || "???")}</div>
        </div>`;
}

function RenderPanel(state = gState) {
    if (gSceneViewMode === "compact") {
        return RenderCompactPanel(state);
    }

    const body = gActiveTab === "chronicle"
        ? RenderChronicleTab(state)
        : gActiveTab === "notes"
            ? RenderNotesTab()
            : RenderSceneTab(state);

    return `
<div class="mib-board mib-theme-${EscapeHtml(gTheme)} mib-bars-${EscapeHtml(gBarStyle)}" data-mib-board>
            <div class="mib-title-row">
                <div>
                    <div class="mib-title">Mom Infoblock</div>
                </div>

<div class="mib-title-actions">
<button type="button" class="mib-style-btn" title="${EscapeHtml(T("styleMenu"))}">◈</button>
    <button type="button" class="mib-dossier-btn" title="${EscapeHtml(T("dossier"))}">☰</button>
<button type="button" class="mib-panel-mode-btn" data-mib-panel-mode="compact" title="${EscapeHtml(T("sceneCompact"))}">↘</button>
    <button type="button" class="mib-debug-btn" title="${EscapeHtml(T("debugXml"))}">&lt;/&gt;</button>
</div>
            </div>

            ${RenderTabs()}

            <div class="mib-tab-body">
                ${body}
            </div>
        </div>`;
}

function WirePanel(root) {
    if (!root) return;

    root.querySelectorAll("[data-mib-tab]").forEach(button => {
        button.addEventListener("click", () => {
            gActiveTab = button.dataset.mibTab || "scene";
            localStorage.setItem(kActiveTabKey, gActiveTab);
            RerenderAllPanels();
        });
    });

    root.querySelectorAll(".mib-notes-input").forEach(textarea => {
        textarea.addEventListener("input", () => {
            gNotes = textarea.value || "";
            SaveNotes();
            SyncNotesTextareas(textarea);
        });
    });

    root.querySelectorAll(".mib-pin-btn").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const name = button.dataset.mibPin || "";
        if (!name) return;

        TogglePinnedNpc(name);
        ReprocessChat();
        RenderFloatingOrDock();
    });
});

root.querySelectorAll(".mib-rel-toggle").forEach(toggle => {
    toggle.addEventListener("click", event => {
        event.preventDefault();

        const card = toggle.closest(".mib-rel-accordion");
        if (!card) return;

        const isOpen = card.classList.toggle("mib-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
});

root.querySelectorAll(".mib-style-btn").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        ToggleStyleMenu(root);
    });
});
    
    root.querySelectorAll(".mib-dossier-btn").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        ToggleDossier(root);
    });
});
    
root.querySelectorAll("[data-mib-panel-mode]").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        gSceneViewMode = button.dataset.mibPanelMode || "full";
        localStorage.setItem(kSceneViewModeKey, gSceneViewMode);

        RerenderAllPanels();
    });
});
    
    root.querySelectorAll(".mib-debug-btn").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        ToggleXmlInspector(root);
    });
});
}

function GetInspectorHost(root) {
    return root.closest(".mib-board-host, #mib_floating_host, #mib_dock_host") || root;
}


function FindMessageByHost(host) {
    const mesId = host?.dataset?.mesId;
    if (!mesId) return null;

    const stContext = GetContextSafe();
    const index = Number(mesId);

    if (Number.isNaN(index)) return null;

    return {
        index,
        message: stContext.chat?.[index] || null
    };
}

function FindLatestInfoblockMessage() {
    const stContext = GetContextSafe();
    const chat = stContext.chat;

    if (!Array.isArray(chat)) return null;

    for (let index = chat.length - 1; index >= 0; index--) {
        const message = chat[index];

        if (!message || message.is_user) continue;
        if (!/<mom_infoblock\b[\s\S]*?<\/mom_infoblock>/i.test(message.mes || "")) continue;

        return {
            index,
            message
        };
    }

    return null;
}

function ReplaceMomInfoblockInMessage(messageText, nextXml) {
    const text = String(messageText || "");
    const xml = String(nextXml || "").trim();

    if (!/<mom_infoblock\b[\s\S]*?<\/mom_infoblock>/i.test(xml)) {
        return null;
    }

    if (/<mom_infoblock\b[\s\S]*?<\/mom_infoblock>/i.test(text)) {
        return text.replace(/<mom_infoblock\b[\s\S]*?<\/mom_infoblock>/i, xml);
    }

    return `${text.trim()}\n\n${xml}`;
}

function GetCurrentCharacterDossier() {
    const stContext = GetContextSafe();
    const character = stContext.characters?.[stContext.characterId];

    if (!character) {
        return {
            name: "",
            description: ""
        };
    }

    return {
        name: character.name || stContext.name2 || "",
        description: character.description || ""
    };
}

function ToggleDossier(root) {
    const board = root.querySelector?.("[data-mib-board]") || root.closest?.("[data-mib-board]") || root;
    if (!board) return;

    const existing = board.querySelector(".mib-dossier-panel");

if (existing) {
    existing.remove();
    gStyleMenuOpen = false;
    return;
}

    const dossier = GetCurrentCharacterDossier();

    const panel = document.createElement("div");
    panel.className = "mib-dossier-panel";
    panel.innerHTML = `
        <div class="mib-dossier-head">
            <div>
                <div class="mib-dossier-kicker">${EscapeHtml(T("dossier"))}</div>
                <div class="mib-dossier-name">${EscapeHtml(dossier.name || "???")}</div>
            </div>
            <button type="button" class="mib-dossier-close">${EscapeHtml(T("dossierClose"))}</button>
        </div>

        <div class="mib-dossier-body">
            ${dossier.description
                ? EscapeHtml(dossier.description).replace(/\n/g, "<br>")
                : `<span class="mib-empty">${EscapeHtml(T("dossierEmpty"))}</span>`}
        </div>
    `;

    panel.querySelector(".mib-dossier-close")?.addEventListener("click", () => {
        panel.remove();
    });

    board.appendChild(panel);
}

function ToggleStyleMenu(root) {
    const board = root.querySelector?.("[data-mib-board]") || root.closest?.("[data-mib-board]") || root;
    if (!board) return;

    const existing = board.querySelector(".mib-style-menu");

    if (existing) {
        existing.remove();
        return;
    }

    const menu = document.createElement("div");
    menu.className = "mib-style-menu";
    menu.innerHTML = `
<div class="mib-style-menu-row">
    <label>
        <span>${EscapeHtml(T("theme"))}</span>
        <select class="mib-style-theme-select">
            ${RenderThemeSelectOptions(gTheme)}
        </select>
    </label>
</div>

${RenderThemePreview(gTheme)}

        <div class="mib-style-menu-row">
            <label>
                <span>${EscapeHtml(T("barStyle"))}</span>
                <select class="mib-style-bar-select">
                    ${RenderStyleSelectOptions(kBarStyleOptions, gBarStyle)}
                </select>
            </label>
        </div>
    `;

menu.querySelector(".mib-style-theme-select")?.addEventListener("change", event => {
    gTheme = event.target.value || "nocturne";
    SaveSettings();

    const previewHost = menu.querySelector("[data-mib-theme-preview]");
    if (previewHost) {
        previewHost.outerHTML = RenderThemePreview(gTheme);
    }

    RerenderAllPanels();
});

    menu.querySelector(".mib-style-bar-select")?.addEventListener("change", event => {
        gBarStyle = event.target.value || "classic";
        SaveSettings();
        RerenderAllPanels();
    });

const titleRow = board.querySelector(".mib-title-row, .mib-compact-topbar, .mib-floating-header, .mib-dock-header");
titleRow?.after(menu);
gStyleMenuOpen = true;

function ToggleXmlInspector(root) {
    const host = GetInspectorHost(root);
    const board = root.querySelector?.("[data-mib-board]") || root.closest?.("[data-mib-board]") || root;

    if (!host || !board) return;

    const existing = board.querySelector(".mib-xml-inspector");

    if (existing) {
        existing.remove();
        return;
    }

    const rawXml = host.dataset.rawXml || gLastRawXml || "";
    const canEditExactMessage = Boolean(host.dataset.mesId);

    const inspector = document.createElement("div");
    inspector.className = "mib-xml-inspector";
    inspector.innerHTML = `
        <div class="mib-xml-actions">
            ${canEditExactMessage
                ? `<button type="button" class="mib-xml-apply">${EscapeHtml(T("applyXml"))}</button>`
                : `<button type="button" class="mib-xml-apply-latest">${EscapeHtml(T("applyLatestXml"))}</button>`
            }
            <button type="button" class="mib-xml-copy">${EscapeHtml(T("copyXml"))}</button>
            <button type="button" class="mib-xml-close">${EscapeHtml(T("closeXml"))}</button>
        </div>
        <textarea class="mib-xml-editor" spellcheck="false"></textarea>
        <div class="mib-xml-status"></div>
    `;

    const textarea = inspector.querySelector(".mib-xml-editor");
    const status = inspector.querySelector(".mib-xml-status");

    textarea.value = rawXml;

    const setStatus = (text, isError = false) => {
        status.textContent = text;
        status.classList.toggle("mib-xml-status-error", isError);
    };

    const applyXmlToFoundMessage = (found, nextXml) => {
        const parsed = ParseMomInfoblock(nextXml);

        if (!parsed) {
            setStatus(T("xmlInvalid"), true);
            return false;
        }

        if (!found?.message) {
            setStatus(T("xmlNoMessage"), true);
            return false;
        }

        const nextMessageText = ReplaceMomInfoblockInMessage(found.message.mes, nextXml);

        if (!nextMessageText) {
            setStatus(T("xmlInvalid"), true);
            return false;
        }

        found.message.mes = nextMessageText;
        host.dataset.rawXml = nextXml;

        setStatus(T("xmlApplied"), false);

        RebuildStateFromCurrentChat();
        ReprocessChat();
        RenderFloatingOrDock();
        InjectPrompt();

        return true;
    };

    inspector.querySelector(".mib-xml-close")?.addEventListener("click", () => {
        inspector.remove();
    });

    inspector.querySelector(".mib-xml-copy")?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(textarea.value || "");
            setStatus(T("copyXml"), false);
        } catch (error) {
            console.warn("[MIB] Copy XML failed:", error);
        }
    });

    inspector.querySelector(".mib-xml-apply")?.addEventListener("click", () => {
        const nextXml = textarea.value || "";
        const found = FindMessageByHost(host);

        applyXmlToFoundMessage(found, nextXml);
    });

    inspector.querySelector(".mib-xml-apply-latest")?.addEventListener("click", () => {
        const nextXml = textarea.value || "";
        const found = FindLatestInfoblockMessage();

        if (!found?.message) {
            setStatus(T("xmlLatestNotFound"), true);
            return;
        }

        applyXmlToFoundMessage(found, nextXml);
    });

    board.appendChild(inspector);
}

function SyncNotesTextareas(source) {
    document.querySelectorAll(".mib-notes-input").forEach(textarea => {
        if (textarea !== source) {
            textarea.value = gNotes;
        }
    });
}

function ShouldRenderInline() {
    return gDisplayMode === "inline" || gDisplayMode === "inline_dock";
}

function ShouldRenderFloating() {
    return gDisplayMode === "floating";
}

function ShouldRenderDock() {
    return gDisplayMode === "dock" || gDisplayMode === "inline_dock";
}

function GetOrCreateMessageHost(mesTextEl) {
    let host = mesTextEl.querySelector(".mib-board-host");

    if (!host) {
        host = document.createElement("div");
        host.className = "mib-board-host";
        mesTextEl.appendChild(host);
    }

    return host;
}

function CleanupRawXmlDom(messageTextEl) {
    if (!gHideRaw || !messageTextEl) return;

    messageTextEl
        .querySelectorAll("mom_infoblock, chars, rels, chronicle, event, thread, c, rel, thk, nsfw")
        .forEach(node => {
            if (node.closest(".mib-board-host, .mib-board")) return;
            node.remove();
        });
}

function RemoveRawXmlFromText(messageTextEl) {
    if (!gHideRaw || !messageTextEl) return;

    const walker = document.createTreeWalker(
        messageTextEl,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node.parentElement) return NodeFilter.FILTER_REJECT;
                if (node.parentElement.closest(".mib-board-host, .mib-board")) return NodeFilter.FILTER_REJECT;

                const text = node.textContent || "";

                return text.includes("<mom_infoblock") ||
                    text.includes("</mom_infoblock>") ||
                    text.includes("<nsfw")
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
            }
        }
    );

    const targets = [];
    let current = walker.nextNode();

    while (current) {
        targets.push(current);
        current = walker.nextNode();
    }

    for (const node of targets) {
        node.textContent = String(node.textContent || "")
            .replace(/<mom_infoblock\b[\s\S]*?<\/mom_infoblock>/gi, "")
            .replace(/<nsfw\b[\s\S]*?\/?>/gi, "")
            .replace(/\n{3,}/g, "\n\n");
    }
}

function NormalizeLeakText(value) {
    return String(value ?? "")
        .toLowerCase()
        .replace(/[«»„“”"']/g, "")
        .replace(/[—–]/g, "-")
        .replace(/[!?.,:;]+/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function NormalizeThoughtText(value) {
    return NormalizeLeakText(value)
        .replace(/[,:;!?]/g, "")
        .replace(/\.\.\./g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function LooksLikeStandaloneThoughtFragment(rawText, thoughtEntries = []) {
    const raw = String(rawText || "").trim();
    if (!raw) return false;

    const normalized = NormalizeLeakText(raw);
    const soft = NormalizeThoughtText(raw);

    if (!normalized || soft.length < 18) return false;

    const looksQuoted =
        /^[«"„“].+[»"“”]$/.test(raw) ||
        /^["'][^"']+["']$/.test(raw);

    const looksShortFragment =
        raw.length <= 120 &&
        (
            looksQuoted ||
            /^\.{0,3}[^.!?]{18,120}\.{0,3}$/.test(raw)
        );

    if (!looksShortFragment) return false;

    return thoughtEntries.some(thought => {
        if (!thought?.softText) return false;

        return (
            soft.length >= 18 &&
            (
                thought.softText.includes(soft) ||
                thought.normalizedText.includes(normalized) ||
                thought.normalizedFull.includes(normalized)
            )
        );
    });
}

function StripBulletPrefix(line) {
    return String(line || "")
        .replace(/^\s*[-–—*•]+\s*/u, "")
        .replace(/^\s*\d+[.)]\s*/u, "")
        .trim();
}

function LooksLikeChronicleLeakLine(line, parsed) {
    const raw = StripBulletPrefix(line);
    if (!raw) return false;

    const normalized = NormalizeLeakText(raw);

    const chronicleItems = [
        ...(parsed?.chronicle?.events || []),
        ...(parsed?.chronicle?.threads || [])
    ]
        .map(NormalizeLeakText)
        .filter(x => x.length >= 10);

    if (!chronicleItems.length) return false;

    return chronicleItems.some(item => {
        if (normalized === item) return true;
        if (normalized.includes(item) || item.includes(normalized)) {
            const minLen = Math.min(normalized.length, item.length);
            const maxLen = Math.max(normalized.length, item.length);
            return minLen >= 12 && minLen / maxLen >= 0.72;
        }
        return false;
    });
}

function RemoveChronicleLeaks(messageTextEl, parsed) {
    if (!messageTextEl || !parsed?.chronicle) return;

    const hasChronicle =
        parsed.chronicle.events?.length ||
        parsed.chronicle.threads?.length;

    if (!hasChronicle) return;

    const walker = document.createTreeWalker(
        messageTextEl,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node.parentElement) return NodeFilter.FILTER_REJECT;
                if (node.parentElement.closest(".mib-board-host, .mib-board")) {
                    return NodeFilter.FILTER_REJECT;
                }

                const raw = node.textContent || "";
                if (!raw.trim()) return NodeFilter.FILTER_SKIP;

                const lines = raw.split(/\r?\n/);
                return lines.some(line => LooksLikeChronicleLeakLine(line, parsed))
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
            }
        }
    );

    const targets = [];
    let current = walker.nextNode();

    while (current) {
        targets.push(current);
        current = walker.nextNode();
    }

    for (const node of targets) {
        const lines = String(node.textContent || "").split(/\r?\n/);
        node.textContent = lines
            .filter(line => !LooksLikeChronicleLeakLine(line, parsed))
            .join("\n")
            .replace(/\n{3,}/g, "\n\n");
    }
}

function ParseVisibleThoughtLine(line) {
    const clean = String(line || "").trim();
    if (!clean) return null;

    const match = clean.match(/^([^:—]+?)\s*[:—]\s*(.+)$/u);
    if (!match) return null;

    return {
        name: match[1].trim(),
        text: match[2].trim()
    };
}

function NamesSoftMatch(a, b) {
    if (NamesLikelyMatch(a, b)) return true;
    const x = NormalizeLeakText(a);
    const y = NormalizeLeakText(b);

    if (!x || !y) return false;
    if (x === y) return true;

    if (x.includes(y) || y.includes(x)) {
        const minLen = Math.min(x.length, y.length);
        const maxLen = Math.max(x.length, y.length);
        return minLen >= 3 && minLen / maxLen >= 0.62;
    }

    return false;
}

function LooksLikeThoughtLeakLine(line, parsed) {
    const raw = StripBulletPrefix(line);
    if (!raw) return false;

    const parsedLine = ParseVisibleThoughtLine(raw);
    const normalizedLine = NormalizeLeakText(raw);

    const thoughts = (parsed?.thoughts || [])
        .map(thought => ({
            name: String(thought.name || "").trim(),
            text: String(thought.text || "").trim(),
            full: `${String(thought.name || "").trim()}: ${String(thought.text || "").trim()}`,
            softText: NormalizeThoughtText(thought.text || ""),
            normalizedText: NormalizeLeakText(thought.text || ""),
            normalizedFull: NormalizeLeakText(`${String(thought.name || "").trim()}: ${String(thought.text || "").trim()}`)
        }))
        .filter(thought => thought.name && thought.text);

    if (!thoughts.length) return false;

    if (LooksLikeStandaloneThoughtFragment(raw, thoughts)) return true;

    return thoughts.some(thought => {
        const thoughtText = thought.softText;
        const thoughtFull = thought.normalizedFull;

        if (thoughtText.length < 10) return false;

        if (parsedLine) {
            const ownerMatches = NamesLikelyMatch(parsedLine.name, thought.name) ||
                ThoughtOwnerMatchesNpc(parsedLine.name, thought.name, (parsed?.chars || []).map(char => char.name));

            const lineText = NormalizeThoughtText(parsedLine.text);

            if (ownerMatches) {
                if (lineText === thoughtText) return true;

                if (lineText.includes(thoughtText) || thoughtText.includes(lineText)) {
                    const minLen = Math.min(lineText.length, thoughtText.length);
                    const maxLen = Math.max(lineText.length, thoughtText.length);
                    return minLen >= 12 && minLen / maxLen >= 0.62;
                }
            }
        }

        if (normalizedLine === thoughtFull || NormalizeThoughtText(raw) === thoughtText) return true;

        const softRaw = NormalizeThoughtText(raw);

        if (softRaw.includes(thoughtText) || thoughtText.includes(softRaw)) {
            const minLen = Math.min(softRaw.length, thoughtText.length);
            const maxLen = Math.max(softRaw.length, thoughtText.length);
            return minLen >= 14 && minLen / maxLen >= 0.62;
        }

        return false;
    });
}

function RemoveThoughtLeaks(messageTextEl, parsed) {
    if (!gHideThoughtLeaks || !messageTextEl || !parsed?.thoughts?.length) return;

    const walker = document.createTreeWalker(
        messageTextEl,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node.parentElement) return NodeFilter.FILTER_REJECT;
                if (node.parentElement.closest(".mib-board-host, .mib-board")) {
                    return NodeFilter.FILTER_REJECT;
                }

                const raw = node.textContent || "";
                if (!raw.trim()) return NodeFilter.FILTER_SKIP;

                const lines = raw.split(/\r?\n/);
                return lines.some(line => LooksLikeThoughtLeakLine(line, parsed))
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
            }
        }
    );

    const targets = [];
    let current = walker.nextNode();

    while (current) {
        targets.push(current);
        current = walker.nextNode();
    }

    for (const node of targets) {
        const lines = String(node.textContent || "").split(/\r?\n/);

        node.textContent = lines
            .filter(line => !LooksLikeThoughtLeakLine(line, parsed))
            .join("\n")
            .replace(/\n{3,}/g, "\n\n");
    }
}

function CleanupEmptyMessageNodes(messageTextEl) {
    if (!messageTextEl) return;

    const isEmptyElement = (node) => {
        if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
        if (node.closest(".mib-board-host, .mib-board")) return false;

        const tag = node.tagName?.toLowerCase();
        if (tag === "br") return true;

        const text = String(node.textContent || "")
            .replace(/\u00a0/g, " ")
            .trim();

        const hasMedia = node.querySelector("img, video, audio, iframe, svg, canvas");
        const hasBoard = node.querySelector(".mib-board-host, .mib-board");

        if (hasMedia || hasBoard) return false;

        const meaningfulChildren = [...node.childNodes].some(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                return String(child.textContent || "").replace(/\u00a0/g, " ").trim();
            }

            if (child.nodeType === Node.ELEMENT_NODE) {
                const childTag = child.tagName?.toLowerCase();
                if (childTag === "br") return false;
                if (child.classList?.contains("mib-board-host")) return false;
                return !isEmptyElement(child);
            }

            return false;
        });

        return !text && !meaningfulChildren;
    };

    let changed = true;

    while (changed) {
        changed = false;

        [...messageTextEl.querySelectorAll("p, div, span, br")].forEach(node => {
            if (node.classList?.contains("mib-board-host")) return;
            if (node.closest(".mib-board-host, .mib-board")) return;

            if (isEmptyElement(node)) {
                node.remove();
                changed = true;
            }
        });
    }

    messageTextEl.normalize();
}

function RenderBoardIntoMessage(mesTextEl, state, parsed) {
    if (!mesTextEl || !parsed) return;

CleanupRawXmlDom(mesTextEl);
RemoveRawXmlFromText(mesTextEl);
CleanupRawXmlDom(mesTextEl);
RemoveChronicleLeaks(mesTextEl, parsed);
RemoveThoughtLeaks(mesTextEl, parsed);
CleanupRawXmlDom(mesTextEl);
CleanupEmptyMessageNodes(mesTextEl);

    if (!ShouldRenderInline()) {
        const host = mesTextEl.querySelector(".mib-board-host");
        if (host) host.remove();
        return;
    }

const host = GetOrCreateMessageHost(mesTextEl);
const mesNode = mesTextEl.closest(".mes");

host.dataset.rawXml = parsed.rawXml || "";
host.dataset.mesId = mesNode?.getAttribute("mesid") || "";
host.innerHTML = RenderPanel(state);
WirePanel(host);
}

function ProcessMessage(messageDiv, msgIndex) {
    if (!gEnabled) return;

    const stContext = GetContextSafe();
    const msg = stContext.chat?.[msgIndex];

    if (!msg || msg.is_user) return;

    const parsed = ParseMomInfoblock(msg.mes || "");
    if (!parsed) return;

    const mesTextEl = messageDiv.querySelector(".mes_text");
    if (!mesTextEl) return;

    gState = ApplyParsedToState(parsed);
    SaveState();

    RenderBoardIntoMessage(mesTextEl, gState, parsed);
    UpdateStatusDisplay();
    RenderFloatingOrDock();
}

function RebuildStateFromCurrentChat() {
    const stContext = GetContextSafe();
    let rollingState = Clone(kDefaultState);
    let lastRawXml = "";

    if (!Array.isArray(stContext.chat)) {
        gState = rollingState;
        SaveState();
        return;
    }

    for (const msg of stContext.chat) {
        if (!msg || msg.is_user) continue;

        const parsed = ParseMomInfoblock(msg.mes || "");
        if (!parsed) continue;

        rollingState = ApplyParsedToState(parsed, rollingState);

        if (parsed.rawXml) {
            lastRawXml = parsed.rawXml;
        }
    }

    gState = rollingState;

    if (lastRawXml) {
        gLastRawXml = lastRawXml;
    }

    SaveState();
}

function ReprocessChat() {
    const stContext = GetContextSafe();
    let rollingState = Clone(kDefaultState);

    if (!Array.isArray(stContext.chat)) return;

    document.querySelectorAll(".mes").forEach(node => {
        const msgId = Number(node.getAttribute("mesid"));
        if (Number.isNaN(msgId)) return;

        const msg = stContext.chat[msgId];
        if (!msg || msg.is_user) return;

        const mesTextEl = node.querySelector(".mes_text");
        if (!mesTextEl) return;

        const parsed = ParseMomInfoblock(msg.mes || "");

        CleanupRawXmlDom(mesTextEl);
        RemoveRawXmlFromText(mesTextEl);
        CleanupRawXmlDom(mesTextEl);

if (parsed) {
    RemoveChronicleLeaks(mesTextEl, parsed);
    RemoveThoughtLeaks(mesTextEl, parsed);
    CleanupEmptyMessageNodes(mesTextEl);
}

if (!parsed) {
    const host = mesTextEl.querySelector(".mib-board-host");
    if (host) host.remove();
    CleanupEmptyMessageNodes(mesTextEl);
    return;
}

        rollingState = ApplyParsedToState(parsed, rollingState);
        RenderBoardIntoMessage(mesTextEl, rollingState, parsed);
    });

    gState = rollingState;
    SaveState();
    UpdateStatusDisplay();
    RenderFloatingOrDock();
}

function Debounce(fn, delay = 250) {
    let timer = null;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

const ScheduleReprocessChat = Debounce(ReprocessChat, 250);

function IsFloatingCollapsed() {
    return localStorage.getItem(kFloatingCollapsedKey) === "true";
}

function SetFloatingCollapsed(value) {
    localStorage.setItem(kFloatingCollapsedKey, String(value));
}

function RemoveFloating() {
    document.getElementById("mib_floating_host")?.remove();
}

function RenderFloating() {
    if (!gEnabled || !ShouldRenderFloating()) {
        RemoveFloating();
        return;
    }

    let host = document.getElementById("mib_floating_host");

    if (!host) {
        host = document.createElement("div");
        host.id = "mib_floating_host";
        document.body.appendChild(host);
        RestoreFloatingLayout(host);
    }

    const collapsed = IsFloatingCollapsed();

    host.className = [
        `mib-theme-${gTheme}`,
        collapsed ? "mib-floating-collapsed" : "mib-floating-open"
    ].join(" ");

    host.dataset.rawXml = gLastRawXml || "";

    if (collapsed) {
        host.innerHTML = `
            <button type="button" class="mib-floating-launcher">
                <span>Mom</span>
            </button>
        `;

        host.querySelector(".mib-floating-launcher")?.addEventListener("click", () => {
            SetFloatingCollapsed(false);
            RenderFloating();
        });

        return;
    }

    host.innerHTML = `
        <div class="mib-floating-shell">
<div class="mib-floating-header">
    <div class="mib-floating-title">${EscapeHtml(T("floatingTitle"))}</div>

    <div class="mib-title-actions">
        <button type="button" class="mib-style-btn" title="${EscapeHtml(T("styleMenu"))}">◈</button>
        <button type="button" class="mib-dossier-btn" title="${EscapeHtml(T("dossier"))}">☰</button>
        <button type="button" class="mib-panel-mode-btn" data-mib-panel-mode="${gSceneViewMode === "compact" ? "full" : "compact"}" title="${EscapeHtml(T(gSceneViewMode === "compact" ? "sceneFull" : "sceneCompact"))}">
            ${gSceneViewMode === "compact" ? "↗" : "↘"}
        </button>
        <button type="button" class="mib-debug-btn" title="${EscapeHtml(T("debugXml"))}">&lt;/&gt;</button>
        <button type="button" class="mib-floating-close" title="Collapse">×</button>
    </div>
</div>
            <div class="mib-floating-body">
                ${RenderPanel(gState)}
            </div>
        </div>`;

    WirePanel(host);

    host.querySelector(".mib-floating-close")?.addEventListener("click", () => {
        SaveFloatingLayout(host);
        SetFloatingCollapsed(true);
        RenderFloating();
    });

    MakeFloatingDraggable(host);
}
function RestoreFloatingLayout(host) {
    try {
        const raw = localStorage.getItem(kFloatingLayoutKey);
        if (!raw) return;

        const data = JSON.parse(raw);

        host.style.left = `${Clamp(data.left, 0, window.innerWidth - 160)}px`;
        host.style.top = `${Clamp(data.top, 0, window.innerHeight - 120)}px`;
        host.style.width = `${Clamp(data.width, 280, window.innerWidth - 20)}px`;
        host.style.height = `${Clamp(data.height, 220, window.innerHeight - 20)}px`;
        host.style.right = "auto";
        host.style.bottom = "auto";
    } catch {
        // Layout restore is optional.
    }
}

function SaveFloatingLayout(host) {
    if (!host) return;

    const rect = host.getBoundingClientRect();

    localStorage.setItem(kFloatingLayoutKey, JSON.stringify({
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
    }));
}

function MakeFloatingDraggable(host) {
    if (!host) return;

    if (host._mibDragCleanup) {
        host._mibDragCleanup();
        host._mibDragCleanup = null;
    }

    const header = host.querySelector(".mib-floating-header");
    if (!header) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let activePointerId = null;

    const onPointerDown = (event) => {
        if (event.target.closest("button")) return;
        if (event.button !== undefined && event.button !== 0) return;

        const rect = host.getBoundingClientRect();

        dragging = true;
        activePointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        startLeft = rect.left;
        startTop = rect.top;

        host.style.left = `${rect.left}px`;
        host.style.top = `${rect.top}px`;
        host.style.right = "auto";
        host.style.bottom = "auto";

        document.body.classList.add("mib-floating-dragging");

        try {
            header.setPointerCapture?.(event.pointerId);
        } catch {}

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);

        event.preventDefault();
    };

    const onPointerMove = (event) => {
        if (!dragging) return;
        if (activePointerId !== null && event.pointerId !== activePointerId) return;

        const rect = host.getBoundingClientRect();

        const left = Clamp(
            startLeft + event.clientX - startX,
            0,
            Math.max(0, window.innerWidth - rect.width)
        );

        const top = Clamp(
            startTop + event.clientY - startY,
            0,
            Math.max(0, window.innerHeight - 80)
        );

        host.style.left = `${left}px`;
        host.style.top = `${top}px`;
        host.style.right = "auto";
        host.style.bottom = "auto";
    };

    const onPointerUp = (event) => {
        if (!dragging) return;

        dragging = false;
        activePointerId = null;

        document.body.classList.remove("mib-floating-dragging");

        try {
            header.releasePointerCapture?.(event.pointerId);
        } catch {}

        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);

        SaveFloatingLayout(host);
    };

    header.addEventListener("pointerdown", onPointerDown);

    host._mibDragCleanup = () => {
        header.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        document.body.classList.remove("mib-floating-dragging");
    };
}

function RemoveDock() {
    document.getElementById("mib_dock_host")?.remove();
}

function IsDockCollapsed() {
    return localStorage.getItem(kDockCollapsedKey) === "true";
}

function SetDockCollapsed(value) {
    localStorage.setItem(kDockCollapsedKey, String(value));
}

function RenderDock() {
    if (!gEnabled || !ShouldRenderDock()) {
        RemoveDock();
        return;
    }

    let host = document.getElementById("mib_dock_host");

    if (!host) {
        host = document.createElement("div");
        host.id = "mib_dock_host";
        document.body.appendChild(host);
    }

   const collapsed = IsDockCollapsed();

host.dataset.rawXml = gLastRawXml || "";

host.className = [
    `mib-theme-${gTheme}`,
    `mib-dock-${gDockSide}`,
    collapsed ? "mib-dock-collapsed" : "mib-dock-open"
].join(" ");

    host.innerHTML = `
        <button type="button" class="mib-dock-handle">
            ${collapsed ? EscapeHtml(T("openDock")) : EscapeHtml(T("closeDock"))}
        </button>
        <div class="mib-dock-panel">
<div class="mib-dock-header">
    <div class="mib-dock-title">${EscapeHtml(T("dockTitle"))}</div>

    <div class="mib-title-actions">
        <button type="button" class="mib-style-btn" title="${EscapeHtml(T("styleMenu"))}">◈</button>
        <button type="button" class="mib-dossier-btn" title="${EscapeHtml(T("dossier"))}">☰</button>
        <button type="button" class="mib-panel-mode-btn" data-mib-panel-mode="${gSceneViewMode === "compact" ? "full" : "compact"}" title="${EscapeHtml(T(gSceneViewMode === "compact" ? "sceneFull" : "sceneCompact"))}">
            ${gSceneViewMode === "compact" ? "↗" : "↘"}
        </button>
        <button type="button" class="mib-debug-btn" title="${EscapeHtml(T("debugXml"))}">&lt;/&gt;</button>
    </div>
</div>
            <div class="mib-dock-body">
                ${RenderPanel(gState)}
            </div>
        </div>`;

    host.querySelector(".mib-dock-handle")?.addEventListener("click", () => {
        SetDockCollapsed(!IsDockCollapsed());
        RenderDock();
    });

    WirePanel(host);
}

function RenderFloatingOrDock() {
    if (ShouldRenderFloating()) {
        RenderFloating();
    } else {
        RemoveFloating();
    }

    if (ShouldRenderDock()) {
        RenderDock();
    } else {
        RemoveDock();
    }
}

function RerenderAllPanels() {
    document.querySelectorAll(".mib-board-host").forEach(host => {
        host.innerHTML = RenderPanel(gState);
        WirePanel(host);

        if (gStyleMenuOpen && !host.querySelector(".mib-style-menu")) {
            ToggleStyleMenu(host);
        }
    });

    RenderFloatingOrDock();

    if (gStyleMenuOpen) {
        document.querySelectorAll("#mib_floating_host, #mib_dock_host").forEach(host => {
            if (host.querySelector(".mib-style-btn") && !host.querySelector(".mib-style-menu")) {
                ToggleStyleMenu(host);
            }
        });
    }
}

function BuildExportPackage() {
    return {
        schema: "Mom-Infoblock.Export",
        version: kVersion,
        exportedAt: new Date().toISOString(),
        chatId: GetChatId(),
        settings: {
            lang: gLang,
            theme: gTheme,
            displayMode: gDisplayMode,
            dockSide: gDockSide,
            hideRaw: gHideRaw,
            hideThoughtLeaks: gHideThoughtLeaks,
            showNsfw: gShowNsfw,
            chronicleEnabled: gChronicleEnabled,
            chronicleLimit: gChronicleLimit,
            activeTab: gActiveTab,
            relationFilter: gRelationFilter,
            customCss: gCustomCss,
            fontSize: gFontSize,
thoughtsEnabled: gThoughtsEnabled,
            barStyle: gBarStyle,
        },
        state: gState,
        notes: gNotes,
        ui: {
            floatingLayout: SafeJsonParse(localStorage.getItem(kFloatingLayoutKey)),
            dockCollapsed: IsDockCollapsed()
        }
    };
}

function SafeJsonParse(raw) {
    try {
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function ExportData() {
    try {
        const data = JSON.stringify(BuildExportPackage(), null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `mom-infoblock-${GetChatId()}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("[MIB] Export failed:", error);
    }
}

function ApplyImportedPackage(data) {
    if (data?.schema === "Mom-Infoblock.Export") {
        gState = NormalizeImportedState(data.state);
        gNotes = String(data.notes || "");

        if (data.settings) {
            gLang = data.settings.lang || gLang;
            gTheme = data.settings.theme || gTheme;
            gDisplayMode = data.settings.displayMode || gDisplayMode;
            gDockSide = data.settings.dockSide || gDockSide;
            gHideRaw = data.settings.hideRaw !== false;
            gHideThoughtLeaks = data.settings.hideThoughtLeaks !== false;
            gShowNsfw = data.settings.showNsfw !== false;
            gChronicleEnabled = data.settings.chronicleEnabled !== false;
            gChronicleLimit = parseInt(data.settings.chronicleLimit, 10) || gChronicleLimit;
            gActiveTab = data.settings.activeTab || gActiveTab;
            gRelationFilter = data.settings.relationFilter || gRelationFilter;
            gCustomCss = data.settings.customCss || gCustomCss;
            gFontSize = data.settings.fontSize || gFontSize;
gThoughtsEnabled = data.settings.thoughtsEnabled !== false;
            gBarStyle = data.settings.barStyle || gBarStyle;
        }

        if (data.ui?.floatingLayout) {
            localStorage.setItem(kFloatingLayoutKey, JSON.stringify(data.ui.floatingLayout));
        }

        if (typeof data.ui?.dockCollapsed === "boolean") {
            SetDockCollapsed(data.ui.dockCollapsed);
        }

        SaveSettings();
        SaveState();
        SaveNotes();
        ApplyFontSize();
        SaveCustomCss();
ApplyCustomCss();
        return;
    }

    // Legacy fallback: old plain state export.
    gState = NormalizeImportedState(data);
    SaveState();
}

async function ImportDataFromFile(file) {
    if (!file) return;

    try {
        const text = await file.text();
        const data = JSON.parse(text);

        ApplyImportedPackage(data);
        SyncSettingsControls();
        UpdateSettingsText();
        UpdateStatusDisplay();
        ReprocessChat();
        RenderFloatingOrDock();
    } catch (error) {
        console.error("[MIB] Import failed:", error);
        alert(T("importFail"));
    }
}

function UpdateSettingsText() {
    $('label[for="mib_enabled"]').html(`<b>${T("enable")}</b>`);
    $('label[for="mib_lang"]').html(`<b>${T("language")}</b>`);
    $('label[for="mib_theme"]').html(`<b>${T("theme")}</b>`);
    $('label[for="mib_display_mode"]').html(`<b>${T("displayMode")}</b>`);
    $('label[for="mib_dock_side"]').html(`<b>${T("dockSide")}</b>`);
    $('label[for="mib_hide_raw"]').text(T("hideRaw"));
    $('label[for="mib_hide_thought_leaks"]').text(T("hideThoughtLeaks"));
    $('label[for="mib_show_nsfw"]').text(T("showNsfw"));
    $('label[for="mib_chronicle_enabled"]').text(T("chronicleEnabled"));
    $('label[for="mib_chronicle_limit"]').html(`<b>${T("chronicleLimit")}</b>`);
$('label[for="mib_relation_filter"]').html(`<b>${T("relationFilter")}</b>`);
$("#mib_relation_filter option[value='top3']").text(T("relationTop3"));
$("#mib_relation_filter option[value='top1']").text(T("relationTop1"));
$("#mib_relation_filter option[value='changed']").text(T("relationChanged"));
$("#mib_relation_filter option[value='all']").text(T("relationAll"));
    $("#mib_display_mode option[value='inline']").text(T("displayInline"));
    $("#mib_display_mode option[value='floating']").text(T("displayFloating"));
    $("#mib_display_mode option[value='dock']").text(T("displayDock"));
    $("#mib_display_mode option[value='inline_dock']").text(T("displayInlineDock"));

    $("#mib_dock_side option[value='left']").text(T("dockLeft"));
    $("#mib_dock_side option[value='right']").text(T("dockRight"));

    $("#mib_state_label").text(T("currentState"));
    $("#mib_reset_state").text(T("resetState"));
    $("#mib_reprocess_chat").text(T("reprocess"));
    $("#mib_export_data").text(T("exportData"));
    $("#mib_import_data").text(T("importData"));
    $("#mib_toggle_custom_css").text(T("customCss"));
$("#mib_save_custom_css").text(T("saveCustomCss"));
$("#mib_clear_custom_css").text(T("clearCustomCss"));
$("#mib_custom_css_input").attr("placeholder", T("customCssPlaceholder"));
    $('label[for="mib_font_size"]').html(`<b>${T("fontSize")}</b>`);
$("#mib_font_size option[value='small']").text(T("fontSmall"));
$("#mib_font_size option[value='normal']").text(T("fontNormal"));
$("#mib_font_size option[value='large']").text(T("fontLarge"));
$("#mib_font_size option[value='xlarge']").text(T("fontXLarge"));
    $("#mib_thoughts_enabled").closest("label").find("span").text(T("thoughtsEnabled"));

    $('[data-mib-css-preset="compactThin"]').text(T("cssPresetCompactThin"));
$('[data-mib-css-preset="biggerText"]').text(T("cssPresetBiggerText"));
$('[data-mib-css-preset="transparent"]').text(T("cssPresetTransparent"));
$('[data-mib-css-preset="highContrast"]').text(T("cssPresetHighContrast"));
$('[data-mib-css-preset="purpleGlow"]').text(T("cssPresetPurpleGlow"));
    
}

function SyncSettingsControls() {
    $("#mib_enabled").prop("checked", gEnabled);
    $("#mib_lang").val(gLang);
    $("#mib_theme").val(gTheme);
    $("#mib_display_mode").val(gDisplayMode);
    $("#mib_dock_side").val(gDockSide);
    $("#mib_hide_raw").prop("checked", gHideRaw);
    $("#mib_hide_thought_leaks").prop("checked", gHideThoughtLeaks);
    $("#mib_show_nsfw").prop("checked", gShowNsfw);
    $("#mib_chronicle_enabled").prop("checked", gChronicleEnabled);
    $("#mib_chronicle_limit").val(String(gChronicleLimit));
    $("#mib_relation_filter").val(gRelationFilter);
    $("#mib_custom_css_input").val(gCustomCss);
    $("#mib_font_size").val(gFontSize);
$("#mib_thoughts_enabled").prop("checked", gThoughtsEnabled);
}

function UpdateStatusDisplay() {
    const $status = $("#mib_status");
    const $summary = $("#mib_state_summary");

    if (gEnabled) {
        $status.html(`<span style="color:#7fb68a">${EscapeHtml(T("active"))}</span>`);
        $summary.html(
            `${EscapeHtml(gState.scene.time)} | ${EscapeHtml(gState.scene.date)}<br>` +
            `${EscapeHtml(gState.scene.weather)}<br>` +
            `📍 ${EscapeHtml(gState.scene.loc)}<br>` +
            `${EscapeHtml(T("chars"))}: ${gState.chars.map(c => EscapeHtml(c.name)).join(", ") || "—"}`
        );
    } else {
        $status.html(`<span style="color:#888">${EscapeHtml(T("inactive"))}</span>`);
        $summary.text(T("disabledPrompt"));
    }
}

function WireSettings() {
    $("#mib_enabled").on("change", function () {
        gEnabled = $(this).is(":checked");
        SaveSettings();
        UpdateStatusDisplay();
        InjectPrompt();

        if (gEnabled) {
            ReprocessChat();
            RenderFloatingOrDock();
        } else {
            document.querySelectorAll(".mib-board-host").forEach(el => el.remove());
            RemoveFloating();
            RemoveDock();
        }
    });

    $("#mib_lang").on("change", function () {
        gLang = $(this).val() || "ru";
        SaveSettings();
        UpdateSettingsText();
        UpdateStatusDisplay();
        InjectPrompt();
        RerenderAllPanels();
    });

    $("#mib_theme").on("change", function () {
        gTheme = $(this).val() || "nocturne";
        SaveSettings();
        RerenderAllPanels();
    });

    $("#mib_display_mode").on("change", function () {
        gDisplayMode = $(this).val() || "inline";
        SaveSettings();
        ReprocessChat();
        RenderFloatingOrDock();
    });

    $("#mib_dock_side").on("change", function () {
        gDockSide = $(this).val() || "right";
        SaveSettings();
        RenderDock();
    });

    $("#mib_hide_raw").on("change", function () {
        gHideRaw = $(this).is(":checked");
        SaveSettings();
        ReprocessChat();
    });

    $("#mib_hide_thought_leaks").on("change", function () {
        gHideThoughtLeaks = $(this).is(":checked");
        SaveSettings();
        ReprocessChat();
    });

    $("#mib_show_nsfw").on("change", function () {
        gShowNsfw = $(this).is(":checked");
        SaveSettings();
        RerenderAllPanels();
    });

    $("#mib_chronicle_enabled").on("change", function () {
        gChronicleEnabled = $(this).is(":checked");
        SaveSettings();
        InjectPrompt();
        RerenderAllPanels();
    });

    $("#mib_chronicle_limit").on("change", function () {
        gChronicleLimit = parseInt($(this).val(), 10) || 10;
        SaveSettings();
        RerenderAllPanels();
    });


$("#mib_font_size").on("change", function () {
    gFontSize = $(this).val() || "normal";
    SaveSettings();
    ApplyFontSize();
});

$(".mib-css-preset").on("click", function () {
    InsertCustomCssPreset($(this).data("mibCssPreset"));
});
    
$("#mib_thoughts_enabled").on("change", function () {
    gThoughtsEnabled = $(this).is(":checked");
    SaveSettings();

    if (!gThoughtsEnabled) {
        gState.thoughts = [];
        SaveState();
    }

    InjectPrompt();
    ReprocessChat();
    RenderFloatingOrDock();
});
    
$("#mib_relation_filter").on("change", function () {
    gRelationFilter = $(this).val() || "top3";
    SaveSettings();
    RerenderAllPanels();
});
    
    $("#mib_reset_state").on("click", function () {
        if (!confirm(T("resetConfirm"))) return;

        gState = Clone(kDefaultState);
        SaveState();
        UpdateStatusDisplay();
        ReprocessChat();
        RenderFloatingOrDock();
    });

    $("#mib_reprocess_chat").on("click", function () {
        ReprocessChat();
    });

    $("#mib_toggle_custom_css").on("click", function () {
    $("#mib_custom_css_block").toggle();
});

$("#mib_save_custom_css").on("click", function () {
    gCustomCss = $("#mib_custom_css_input").val() || "";
    SaveCustomCss();
    ApplyCustomCss();
});

$("#mib_clear_custom_css").on("click", function () {
    gCustomCss = "";
    $("#mib_custom_css_input").val("");
    SaveCustomCss();
    ApplyCustomCss();
});
    
    $("#mib_export_data").on("click", function () {
        ExportData();
    });

    $("#mib_import_data").on("click", function () {
        $("#mib_import_file").trigger("click");
    });

    $("#mib_import_file").on("change", function (event) {
        const file = event.target.files?.[0];
        if (file) {
            ImportDataFromFile(file);
        }
        event.target.value = "";
    });
}

function OnChatChanged() {
    LoadState();
    LoadNotes();
    LoadPinnedNpcs();
    UpdateStatusDisplay();

    if (gEnabled) {
        ScheduleReprocessChat();
        RenderFloatingOrDock();
    }
}

jQuery(async () => {
    const stContext = GetContextSafe();

    try {
        const settingsHtml = await $.get(kSettingsFile);
        const $extensions = $("#extensions_settings");
        const $existing = $extensions.find(".mib-settings");

        if ($existing.length) {
            $existing.replaceWith(settingsHtml);
        } else {
            $extensions.append(settingsHtml);
        }
    } catch (error) {
        console.warn("[MIB] settings.html not loaded:", error);
    }

LoadSettings();
LoadState();
LoadNotes();
LoadPinnedNpcs();
LoadCustomCss();
ApplyCustomCss();
ApplyFontSize();

    SyncSettingsControls();
    UpdateSettingsText();
    UpdateStatusDisplay();
    WireSettings();

    if (stContext.eventTypes?.GENERATION_STARTED) {
        stContext.eventSource.on(stContext.eventTypes.GENERATION_STARTED, InjectPrompt);
    }

    if (stContext.eventTypes?.CHAT_CHANGED) {
        stContext.eventSource.on(stContext.eventTypes.CHAT_CHANGED, OnChatChanged);
    }

    if (stContext.eventTypes?.MESSAGE_RECEIVED) {
        stContext.eventSource.on(stContext.eventTypes.MESSAGE_RECEIVED, () => {
            ScheduleReprocessChat();
        });
    }

    if (stContext.eventTypes?.MESSAGE_EDITED) {
        stContext.eventSource.on(stContext.eventTypes.MESSAGE_EDITED, () => {
            ScheduleReprocessChat();
        });
    }

    if (stContext.eventTypes?.MESSAGE_SWIPED) {
        stContext.eventSource.on(stContext.eventTypes.MESSAGE_SWIPED, () => {
            document.querySelectorAll(".mib-board-host").forEach(el => el.remove());
            ScheduleReprocessChat();
        });
    }

    if (stContext.eventTypes?.MESSAGE_DELETED) {
        stContext.eventSource.on(stContext.eventTypes.MESSAGE_DELETED, () => {
            RebuildStateFromCurrentChat();
            document.querySelectorAll(".mib-board-host").forEach(el => el.remove());
            setTimeout(ReprocessChat, 120);
            setTimeout(RenderFloatingOrDock, 250);
        });
    }

    setTimeout(ReprocessChat, 150);
    setTimeout(RenderFloatingOrDock, 250);

    InjectPrompt();

    console.log("[MIB] Mom Infoblock ready");
});
