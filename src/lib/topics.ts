export interface Topic {
    label: string;
    symbol: string;
    href: string;
}

export interface Group {
    name: string;
    swatch: string;
    onSwatch: string;
    rule: string;
    topics: Topic[];
}

export const groups: Group[] = [
    {
        name: "Primitives",
        swatch: "bg-group-primitives",
        rule: "border-group-primitives",
        onSwatch: "text-ink",
        topics: [
            { label: "Arrays", symbol: "Ar", href: "/visual/primitives/arrays" },
            { label: "Objects", symbol: "Ob", href: "/visual/primitives/objects" },
            { label: "Strings", symbol: "St", href: "/visual/primitives/strings" },
            { label: "Numbers", symbol: "Nu", href: "/visual/primitives/numbers" },
        ],
    },
    {
        name: "Core concepts",
        swatch: "bg-group-core",
        rule: "border-group-core",
        onSwatch: "text-ground",
        topics: [
            { label: "Functions", symbol: "Fn", href: "/visual/core-concepts/functions" },
            { label: "Loops", symbol: "Lp", href: "/visual/core-concepts/loops" },
            { label: "Conditionals", symbol: "Cd", href: "/visual/core-concepts/conditionals" },
            { label: "Promises", symbol: "Pr", href: "/visual/core-concepts/promises" },
            { label: "Variables", symbol: "Va", href: "/visual/core-concepts/variables" },
            { label: "DOM manipulation", symbol: "Dm", href: "/visual/core-concepts/dom-manipulation" },
        ],
    },
    {
        name: "Browser APIs",
        swatch: "bg-group-browser",
        rule: "border-group-browser",
        onSwatch: "text-ground",
        topics: [
            { label: "Intersection Observer", symbol: "Io", href: "/visual/browser-apis/intersection-observer" },
            { label: "Pointer Events", symbol: "Pe", href: "/visual/browser-apis/pointer-events" },
            { label: "Sanitizer API", symbol: "Sa", href: "/visual/browser-apis/sanitizer-api" },
        ],
    },
    {
        name: "Git",
        swatch: "bg-group-git",
        rule: "border-group-git",
        onSwatch: "text-ground",
        topics: [{ label: "How Git works", symbol: "Gt", href: "/visual/git/how-git-works" }],
    },
];

/** Position of a topic across the whole chart, starting at 1. */
export const numberFor = (href: string) =>
    groups.flatMap((g) => g.topics).findIndex((t) => t.href === href) + 1;

export const topicFor = (path: string) =>
    groups.flatMap((g) => g.topics).find((t) => path.startsWith(t.href));

export const groupFor = (path: string) =>
    groups.find((g) => g.topics.some((t) => path.startsWith(t.href)));
