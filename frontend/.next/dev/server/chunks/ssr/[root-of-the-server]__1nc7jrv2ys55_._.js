module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/src/components/AdaptiveProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADAPTIVE_ACCENTS",
    ()=>ADAPTIVE_ACCENTS,
    "ADAPTIVE_MODES",
    ()=>ADAPTIVE_MODES,
    "AdaptiveRoot",
    ()=>AdaptiveRoot,
    "DEFAULT_ADAPTIVE_PREFERENCES",
    ()=>DEFAULT_ADAPTIVE_PREFERENCES,
    "default",
    ()=>AdaptiveProvider,
    "useAdaptive",
    ()=>useAdaptive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DEFAULT_ADAPTIVE_PREFERENCES = {
    mode: "easy",
    appearance: "light",
    accent: "emerald",
    textSize: "normal",
    motion: false,
    hideBalance: false,
    onboardingCompleted: false
};
/* LOCAL STORAGE */ const STORAGE_KEY = "agentvault-adaptive-preferences";
const ADAPTIVE_MODES = [
    {
        id: "easy",
        name: "Kolay kullanım",
        description: "Sade ekranlar ve anlaşılır yönlendirmeler."
    },
    {
        id: "standard",
        name: "Standart kullanım",
        description: "Finansal özetler ve günlük istatistikler."
    },
    {
        id: "professional",
        name: "Profesyonel kullanım",
        description: "Teknik ayrıntılar ve gelişmiş kontroller."
    }
];
const ADAPTIVE_ACCENTS = [
    {
        id: "emerald",
        name: "Zümrüt",
        light: "#21664d",
        dark: "#80eac0"
    },
    {
        id: "ocean",
        name: "Okyanus",
        light: "#315db7",
        dark: "#91c8ff"
    },
    {
        id: "lavender",
        name: "Lavanta",
        light: "#6745ad",
        dark: "#c4adff"
    }
];
const AdaptiveContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
/* VALIDATE STORED PREFERENCES */ function parsePreferences(value) {
    const parsed = JSON.parse(value);
    return {
        mode: parsed?.mode === "easy" || parsed?.mode === "standard" || parsed?.mode === "professional" ? parsed.mode : "easy",
        appearance: parsed?.appearance === "light" || parsed?.appearance === "dark" || parsed?.appearance === "system" ? parsed.appearance : "light",
        accent: parsed?.accent === "emerald" || parsed?.accent === "ocean" || parsed?.accent === "lavender" ? parsed.accent : "emerald",
        textSize: parsed?.textSize === "normal" || parsed?.textSize === "large" || parsed?.textSize === "extra-large" ? parsed.textSize : "normal",
        motion: typeof parsed?.motion === "boolean" ? parsed.motion : false,
        hideBalance: typeof parsed?.hideBalance === "boolean" ? parsed.hideBalance : false,
        onboardingCompleted: typeof parsed?.onboardingCompleted === "boolean" ? parsed.onboardingCompleted : false
    };
}
function AdaptiveProvider({ children }) {
    const [preferences, setPreferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_ADAPTIVE_PREFERENCES);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [storageAvailable, setStorageAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [systemDark, setSystemDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [systemReducedMotion, setSystemReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    /* RESTORE SAVED PREFERENCES */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setPreferences(parsePreferences(saved));
            }
        } catch  {
            setStorageAvailable(false);
        } finally{
            setReady(true);
        }
    }, []);
    /* WATCH SYSTEM APPEARANCE AND MOTION */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const colorQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        function updateSystemPreferences() {
            setSystemDark(colorQuery.matches);
            setSystemReducedMotion(motionQuery.matches);
        }
        updateSystemPreferences();
        colorQuery.addEventListener("change", updateSystemPreferences);
        motionQuery.addEventListener("change", updateSystemPreferences);
        return ()=>{
            colorQuery.removeEventListener("change", updateSystemPreferences);
            motionQuery.removeEventListener("change", updateSystemPreferences);
        };
    }, []);
    /* SAVE PREFERENCES */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ready) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            setStorageAvailable(true);
        } catch  {
            setStorageAvailable(false);
        }
    }, [
        preferences,
        ready
    ]);
    /* RESOLVE THEME */ const resolvedAppearance = preferences.appearance === "system" ? systemDark ? "dark" : "light" : preferences.appearance;
    const motionEnabled = preferences.motion && !systemReducedMotion;
    /* UPDATE PREFERENCES */ function setMode(mode) {
        setPreferences((previous)=>({
                ...previous,
                mode
            }));
    }
    function setAppearance(appearance) {
        setPreferences((previous)=>({
                ...previous,
                appearance
            }));
    }
    function setAccent(accent) {
        setPreferences((previous)=>({
                ...previous,
                accent
            }));
    }
    function setTextSize(textSize) {
        setPreferences((previous)=>({
                ...previous,
                textSize
            }));
    }
    function setMotion(motion) {
        setPreferences((previous)=>({
                ...previous,
                motion
            }));
    }
    function setHideBalance(hideBalance) {
        setPreferences((previous)=>({
                ...previous,
                hideBalance
            }));
    }
    /* ONBOARDING */ function completeOnboarding() {
        setPreferences((previous)=>({
                ...previous,
                onboardingCompleted: true
            }));
    }
    /* RESET APPEARANCE AND EXPERIENCE */ function resetPreferences() {
        setPreferences((previous)=>({
                ...DEFAULT_ADAPTIVE_PREFERENCES,
                onboardingCompleted: previous.onboardingCompleted
            }));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AdaptiveContext.Provider, {
        value: {
            preferences,
            resolvedAppearance,
            motionEnabled,
            ready,
            storageAvailable,
            setMode,
            setAppearance,
            setAccent,
            setTextSize,
            setMotion,
            setHideBalance,
            completeOnboarding,
            resetPreferences
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/AdaptiveProvider.tsx",
        lineNumber: 394,
        columnNumber: 5
    }, this);
}
function useAdaptive() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AdaptiveContext);
    if (!context) {
        throw new Error("useAdaptive must be used inside AdaptiveProvider.");
    }
    return context;
}
function AdaptiveRoot({ children, className = "" }) {
    const { preferences, resolvedAppearance, motionEnabled } = useAdaptive();
    const fontSize = preferences.textSize === "extra-large" ? "1.375rem" : preferences.textSize === "large" ? "1.25rem" : "1rem";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `adaptive-root ${className}`,
        "data-appearance": resolvedAppearance,
        "data-accent": preferences.accent,
        "data-mode": preferences.mode,
        "data-large-text": preferences.textSize !== "normal",
        "data-motion": motionEnabled ? "on" : "off",
        style: {
            fontSize
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/AdaptiveProvider.tsx",
        lineNumber: 455,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/AdaptiveShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdaptiveShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.mjs [app-ssr] (ecmascript) <export default as House>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.mjs [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.mjs [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2d$clock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw-clock.mjs [app-ssr] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.mjs [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.mjs [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.mjs [app-ssr] (ecmascript) <export default as CircleHelp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flask-conical.mjs [app-ssr] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdaptiveProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
/* ==========================================
   ADAPTIVE ONE 2.0
   APPLICATION SHELL
========================================== */ const navigation = [
    {
        name: "Ana Sayfa",
        shortName: "Ana Sayfa",
        href: "/",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__["House"]
    },
    {
        name: "Param",
        shortName: "Param",
        href: "/vault",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
    },
    {
        name: "Asistanlarım",
        shortName: "Asistanlar",
        href: "/agents",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"]
    },
    {
        name: "Güvenliğim",
        shortName: "Güvenlik",
        href: "/policies",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
    },
    {
        name: "İşlemlerim",
        shortName: "İşlemler",
        href: "/transactions",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2d$clock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
    },
    {
        name: "Ayarlarım",
        shortName: "Ayarlar",
        href: "/settings",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
    }
];
/* MODE SELECTOR */ function ModeSelector({ id }) {
    const { preferences, setMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdaptive"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "adaptive-mode-selector",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "adaptive-small",
                children: "Kullanım biçiminiz"
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                id: id,
                className: "adaptive-input",
                value: preferences.mode,
                onChange: (event)=>setMode(event.target.value),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADAPTIVE_MODES"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: item.id,
                        children: item.name
                    }, item.id, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdaptiveShell.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
function AdaptiveShell({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { preferences, resolvedAppearance, ready, setAppearance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdaptive"])();
    const [helpOpen, setHelpOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dark = resolvedAppearance === "dark";
    const isOnboarding = pathname === "/onboarding";
    const isPreview = pathname === "/adaptive-preview";
    const needsOnboarding = ready && !preferences.onboardingCompleted && !isOnboarding && !isPreview;
    /* FIRST VISIT REDIRECTION */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (needsOnboarding) {
            router.replace("/onboarding");
        }
    }, [
        needsOnboarding,
        router
    ]);
    /* ACTIVE NAVIGATION */ function isActive(href) {
        if (href === "/") {
            return pathname === "/" || pathname === "/adaptive-preview";
        }
        return pathname === href || pathname.startsWith(href + "/");
    }
    function closeMenus() {
        setHelpOpen(false);
        setMobileMenuOpen(false);
    }
    function toggleAppearance() {
        setAppearance(dark ? "light" : "dark");
    }
    /* INITIAL LOADING */ if (!ready || needsOnboarding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdaptiveRoot"], {
            className: "adaptive-loading-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "adaptive-stack",
                role: "status",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                        size: 48,
                        style: {
                            color: "var(--ad-accent)",
                            marginInline: "auto"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "adaptive-heading",
                        children: "AgentVault."
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "adaptive-description",
                        children: needsOnboarding ? "Karşılama ekranı açılıyor..." : "Tercihleriniz yükleniyor..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/AdaptiveShell.tsx",
            lineNumber: 211,
            columnNumber: 7
        }, this);
    }
    /* ONBOARDING WITHOUT NAVIGATION */ if (isOnboarding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdaptiveRoot"], {
            className: "adaptive-standalone",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                id: "main-content",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 251,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/AdaptiveShell.tsx",
            lineNumber: 248,
            columnNumber: 7
        }, this);
    }
    /* LEGACY PAGE COMPATIBILITY */ const adaptivePages = new Set([
        "/",
        "/adaptive-preview",
        "/vault",
        "/agents",
        "/policies",
        "/transactions",
        "/settings"
    ]);
    const legacyPage = !adaptivePages.has(pathname);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdaptiveRoot"], {
        className: "adaptive-app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "#main-content",
                className: "adaptive-skip-link",
                children: "Ana içeriğe geç"
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "adaptive-topbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "adaptive-topbar-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "adaptive-brand",
                                "aria-label": "AgentVault ana sayfa",
                                onClick: closeMenus,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-brand-logo",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            size: 27
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 303,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "adaptive-brand-name",
                                                children: "AgentVault."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 309,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "adaptive-brand-edition",
                                                children: "ADAPTIVE ONE 2.0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 313,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "adaptive-topbar-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-demo-label",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                                size: 17
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 327,
                                                columnNumber: 15
                                            }, this),
                                            "Demo hesabı"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "adaptive-icon-button",
                                        "aria-label": dark ? "Açık temaya geç" : "Koyu temaya geç",
                                        onClick: toggleAppearance,
                                        children: dark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 345,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 347,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "adaptive-icon-button",
                                        "aria-label": "Yardım menüsü",
                                        "aria-expanded": helpOpen,
                                        "aria-controls": "adaptive-help-panel",
                                        onClick: ()=>{
                                            setHelpOpen(!helpOpen);
                                            setMobileMenuOpen(false);
                                        },
                                        children: helpOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 365,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__["CircleHelp"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 367,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 352,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    helpOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "adaptive-help-panel",
                        className: "adaptive-help-panel adaptive-stack",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "adaptive-section-heading",
                                children: "Nasıl yardımcı olabiliriz?"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "adaptive-description",
                                children: "AgentVault ile paranızı, dijital asistanlarınızı ve güvenlik kurallarınızı yönetebilirsiniz."
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "adaptive-small",
                                children: "Şu anda demo ortamındasınız. Gerçek para veya blockchain işlemi kullanılmaz."
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/onboarding",
                                onClick: closeMenus,
                                className: "adaptive-button adaptive-button-secondary",
                                children: [
                                    "Kurulum rehberini aç",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 413,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 405,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "adaptive-button adaptive-button-secondary",
                                onClick: ()=>setHelpOpen(false),
                                children: "Kapat"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 417,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "adaptive-workspace",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "adaptive-sidebar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "adaptive-sidebar-inner",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "adaptive-sidebar-title",
                                    children: "MENÜ"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 444,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    "aria-label": "Ana navigasyon",
                                    className: "adaptive-desktop-nav",
                                    children: navigation.map((item)=>{
                                        const Icon = item.icon;
                                        const active = isActive(item.href);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            "aria-current": active ? "page" : undefined,
                                            "data-active": active,
                                            className: "adaptive-nav-link",
                                            onClick: closeMenus,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 23
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 21
                                                }, this),
                                                active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    size: 17,
                                                    className: "adaptive-nav-indicator"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, item.href, true, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 460,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 448,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "adaptive-divider"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 492,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeSelector, {
                                    id: "desktop-usage-mode"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 494,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "adaptive-sidebar-info",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "adaptive-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    size: 20,
                                                    style: {
                                                        color: "var(--ad-success)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontWeight: 600
                                                    },
                                                    children: "Demo ortamı"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 509,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 500,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "adaptive-small",
                                            children: "Gerçek para kullanılmaz."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 517,
                                            columnNumber: 15
                                        }, this),
                                        preferences.mode === "professional" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "adaptive-small",
                                            children: [
                                                "Hedef ağ: Solana Devnet",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 527,
                                                    columnNumber: 21
                                                }, this),
                                                "Cüzdan bağlı değil."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 525,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 498,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "adaptive-sidebar-footer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "adaptive-small",
                                            children: "AgentVault © 2026"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 536,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "adaptive-small",
                                            children: "Adaptive One 2.0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 540,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 534,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        id: "main-content",
                        tabIndex: -1,
                        className: "adaptive-main-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "adaptive-mobile-mode",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeSelector, {
                                    id: "mobile-usage-mode"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 562,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 560,
                                columnNumber: 11
                            }, this),
                            legacyPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "adaptive-status adaptive-status-warning",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                                size: 23
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 575,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "adaptive-grow",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: 600
                                                        },
                                                        children: "Tasarım geçişi devam ediyor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "adaptive-small",
                                                        style: {
                                                            color: "inherit"
                                                        },
                                                        children: "Bu sayfa henüz yeni tasarıma geçirilmedi. Mevcut özellikleri kullanmaya devam edebilirsiniz."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 577,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 573,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "adaptive-legacy-page bg-background text-foreground",
                                        children: children
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 602,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this) : children,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                className: "adaptive-content-footer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "adaptive-small",
                                        children: "Herkes için finans. Herkes için kontrol."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 617,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "adaptive-small",
                                        children: "AgentVault — Adaptive One 2.0 · Demo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 624,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 552,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "adaptive-mobile-menu-backdrop",
                        "aria-label": "Diğer menüsünü kapat",
                        onClick: ()=>setMobileMenuOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 644,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "adaptive-mobile-more",
                        className: "adaptive-mobile-more adaptive-stack",
                        "aria-label": "Diğer sayfalar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "adaptive-row adaptive-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "adaptive-section-heading",
                                        children: "Diğer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 661,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "adaptive-icon-button",
                                        "aria-label": "Menüyü kapat",
                                        onClick: ()=>setMobileMenuOpen(false),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 21
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 665,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 659,
                                columnNumber: 13
                            }, this),
                            navigation.slice(4).map((item)=>{
                                const Icon = item.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "adaptive-list-item",
                                    "aria-current": isActive(item.href) ? "page" : undefined,
                                    onClick: closeMenus,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "adaptive-icon-box",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                size: 23
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 695,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 694,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "adaptive-grow",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 698,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 702,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.href, true, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 682,
                                    columnNumber: 17
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/adaptive-preview",
                                className: "adaptive-list-item",
                                onClick: closeMenus,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-icon-box",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            size: 23
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 715,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 714,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-grow",
                                        children: "Yeni görünüm tercihleri"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 718,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 722,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 708,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 653,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 642,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "adaptive-bottom-nav",
                "aria-label": "Mobil navigasyon",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "adaptive-bottom-nav-inner",
                    children: [
                        navigation.slice(0, 4).map((item)=>{
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "adaptive-bottom-link",
                                "aria-current": active ? "page" : undefined,
                                "data-active": active,
                                onClick: closeMenus,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-bottom-icon",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            size: 23,
                                            strokeWidth: active ? 2.3 : 1.8
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 762,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 760,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.shortName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 771,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 749,
                                columnNumber: 15
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "adaptive-bottom-link",
                            "data-active": mobileMenuOpen || isActive("/transactions") || isActive("/settings"),
                            "aria-expanded": mobileMenuOpen,
                            "aria-controls": "adaptive-mobile-more",
                            onClick: ()=>{
                                setMobileMenuOpen(!mobileMenuOpen);
                                setHelpOpen(false);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "adaptive-bottom-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                        size: 23
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 799,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 797,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Diğer"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 803,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                            lineNumber: 779,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                    lineNumber: 740,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 735,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdaptiveShell.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/DemoVaultProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DemoVaultProvider,
    "useDemoVault",
    ()=>useDemoVault
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/agentvault-policy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/demo-vault.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const KEY = 'agentvault-demo-vault-v1';
// Explicitly local simulation; localStorage is not an authorization boundary.
function restore(raw) {
    const d = JSON.parse(raw);
    if (!d || !d.vault || d.vault.id !== 'demo-vault-001' || !Number.isSafeInteger(d.vault.balance) || d.vault.balance < 0 || !Array.isArray(d.vault.agents) || !Array.isArray(d.vault.logs) || !Array.isArray(d.vault.ownerMovements) || !d.profiles) throw Error('Geçersiz demo kaydı');
    // Access all derived records now; corrupted records fall back to fresh demo.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recordsFor"])(d);
    for (const a of d.vault.agents){
        if (!a.policy || !Array.isArray(a.policy.allowlist) || !Array.isArray(a.policy.denylist) || !d.profiles[a.id]) throw Error('Geçersiz asistan kaydı');
    }
    return d;
}
const C = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function DemoVaultProvider({ children }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialDemo"])(0));
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(data);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false), [storageAvailable, setStorageAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true), [day, setDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('1970-01-01');
    function commit(next) {
        ref.current = next;
        setData(next);
        try {
            localStorage.setItem(KEY, JSON.stringify(next));
            setStorageAvailable(true);
        } catch  {
            setStorageAvailable(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialDemo"])(Date.now());
        try {
            const raw = localStorage.getItem(KEY);
            if (raw) next = restore(raw);
            else localStorage.setItem(KEY, JSON.stringify(next));
        } catch  {
            setStorageAvailable(false);
        }
        ref.current = next;
        setData(next);
        setDay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayAt"])(Date.now()));
        setReady(true);
        const timer = window.setInterval(()=>setDay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayAt"])(Date.now())), 1000 * 30);
        return ()=>window.clearInterval(timer);
    }, []);
    function move(kind, cents) {
        if (!ready || !Number.isSafeInteger(cents) || cents <= 0 || cents > 100000000) return false;
        try {
            const prev = ref.current;
            const vault = (kind === 'deposit' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["demoDeposit"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["demoWithdraw"])(prev.vault, cents * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CENT"], Date.now());
            commit({
                ...prev,
                vault
            });
            return true;
        } catch  {
            return false;
        }
    }
    function request(id, cents, recipient, identity, matchingSigner) {
        if (!ready) throw Error('Demo yükleniyor.');
        const prev = ref.current, a = prev.vault.agents.find((x)=>x.id === id);
        if (!a || !Number.isSafeInteger(cents) || cents <= 0 || cents > 100000000) throw Error('Geçersiz talep.');
        const now = Date.now();
        const outcome = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulateTransfer"])(prev.vault, {
            vaultId: prev.vault.id,
            agentId: id,
            agentPublicKey: a.publicKey,
            recipientWallet: recipient,
            recipientIdentity: identity,
            amount: cents * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CENT"],
            nonce: a.lastNonce + 1,
            expiresAt: now + 60000
        }, matchingSigner ? a.publicKey : null, now);
        commit({
            ...prev,
            vault: outcome.state
        });
        return outcome.entry;
    }
    const value = {
        data,
        ready,
        storageAvailable,
        day,
        move,
        request,
        freeze: (f)=>{
            if (ready) {
                const p = ref.current;
                commit({
                    ...p,
                    vault: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDemoFrozen"])(p.vault, f)
                });
            }
        },
        saveAgent: (id, profile, daily)=>{
            if (!ready) throw Error('Demo yükleniyor.');
            commit((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["putAgent"])(ref.current, id, profile, daily, Date.now()));
        },
        status: (id, s)=>{
            if (ready) commit((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["changeAgentStatus"])(ref.current, id, s));
        },
        savePolicy: (id, p)=>{
            if (!ready) throw Error('Demo yükleniyor.');
            commit((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updatePolicy"])(ref.current, id, p));
        },
        reset: ()=>{
            if (ready) commit((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialDemo"])(Date.now()));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(C.Provider, {
        value: value,
        children: !ready ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            role: "status",
            style: {
                padding: 24
            },
            children: "AgentVault demo verileri yükleniyor…"
        }, void 0, false, {
            fileName: "[project]/src/components/DemoVaultProvider.tsx",
            lineNumber: 25,
            columnNumber: 43
        }, this) : children
    }, void 0, false, {
        fileName: "[project]/src/components/DemoVaultProvider.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
function useDemoVault() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(C);
    if (!ctx) throw Error('DemoVaultProvider eksik.');
    return ctx;
}
}),
"[project]/src/components/ThemeProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NEXUS_THEMES",
    ()=>NEXUS_THEMES,
    "default",
    ()=>ThemeProvider,
    "useNexusTheme",
    ()=>useNexusTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const NEXUS_THEMES = [
    {
        id: "emerald",
        name: "Emerald",
        color: "#80eac0",
        edition: "Signature edition",
        description: "The original NEXUS experience."
    },
    {
        id: "glacier",
        name: "Glacier",
        color: "#91c8ff",
        edition: "Precision edition",
        description: "Clarity, precision and intelligence."
    },
    {
        id: "amethyst",
        name: "Amethyst",
        color: "#c4adff",
        edition: "Intelligence edition",
        description: "A new dimension of autonomy."
    }
];
const STORAGE_KEY = "agentvault-preferences";
const DEFAULT_PREFERENCES = {
    theme: "emerald",
    motion: true
};
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function isValidTheme(value) {
    return value === "emerald" || value === "glacier" || value === "amethyst";
}
function ThemeProvider({ children }) {
    const [preferences, setPreferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PREFERENCES);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [storageAvailable, setStorageAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Restore saved preferences.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setPreferences({
                    theme: isValidTheme(parsed?.theme) ? parsed.theme : "emerald",
                    motion: typeof parsed?.motion === "boolean" ? parsed.motion : true
                });
            }
        } catch  {
            setStorageAvailable(false);
        } finally{
            setReady(true);
        }
    }, []);
    // Apply preferences to the entire application.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ready) return;
        const root = document.documentElement;
        root.dataset.theme = preferences.theme;
        root.dataset.motion = preferences.motion ? "enabled" : "disabled";
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            setStorageAvailable(true);
        } catch  {
            setStorageAvailable(false);
        }
    }, [
        preferences,
        ready
    ]);
    function setTheme(theme) {
        setPreferences((previous)=>({
                ...previous,
                theme
            }));
    }
    function setMotion(motion) {
        setPreferences((previous)=>({
                ...previous,
                motion
            }));
    }
    function resetPreferences() {
        setPreferences({
            ...DEFAULT_PREFERENCES
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme: preferences.theme,
            motion: preferences.motion,
            ready,
            storageAvailable,
            setTheme,
            setMotion,
            resetPreferences
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ThemeProvider.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
function useNexusTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error("useNexusTheme must be used inside ThemeProvider.");
    }
    return context;
}
}),
"[project]/src/lib/agentvault-policy.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Browser-independent DEMO reference model. Not a Solana program or an authentication boundary. */ __turbopack_context__.s([
    "MAX_VIOLATIONS",
    ()=>MAX_VIOLATIONS,
    "USDC_SCALE",
    ()=>USDC_SCALE,
    "demoDeposit",
    ()=>demoDeposit,
    "demoWithdraw",
    ()=>demoWithdraw,
    "parseUsdc",
    ()=>parseUsdc,
    "setDemoAgentStatus",
    ()=>setDemoAgentStatus,
    "setDemoFrozen",
    ()=>setDemoFrozen,
    "simulateTransfer",
    ()=>simulateTransfer,
    "validPolicy",
    ()=>validPolicy
]);
const USDC_SCALE = 1_000_000;
const MAX_VIOLATIONS = 5;
const nonnegative = (n)=>Number.isSafeInteger(n) && n >= 0;
const positive = (n)=>nonnegative(n) && n > 0;
function parseUsdc(text) {
    const normalized = text.trim().replace(",", ".");
    if (!/^\d+(\.\d{1,6})?$/.test(normalized)) throw new Error("En fazla altı ondalık basamak girin.");
    const [whole, fraction = ""] = normalized.split(".");
    const units = Number(whole) * USDC_SCALE + Number(fraction.padEnd(6, "0"));
    if (!nonnegative(units)) throw new Error("Tutar güvenli sayı aralığının dışında.");
    return units;
}
function validPolicy(p) {
    return nonnegative(p.minTransfer) && positive(p.maxTransfer) && positive(p.dailyLimit) && positive(p.totalLimit) && p.minTransfer <= p.maxTransfer && p.maxTransfer <= p.dailyLimit && p.maxTransfer <= p.totalLimit;
}
function simulateTransfer(state, request, simulatedSignerPublicKey, now) {
    if (!Number.isSafeInteger(now) || now < 0 || now > 8_640_000_000_000_000) throw new Error("Invalid simulation clock");
    const day = new Date(now).toISOString().slice(0, 10);
    const agent = state.agents.find((a)=>a.id === request.agentId && a.publicKey === request.agentPublicKey);
    const record = (reason, updated, suspended = false)=>{
        const entry = {
            request: {
                ...request
            },
            at: now,
            decision: reason ? "rejected" : "approved",
            ...reason ? {
                reason
            } : {},
            suspended
        };
        return {
            entry,
            state: {
                ...state,
                balance: reason ? state.balance : state.balance - request.amount,
                agents: updated ? state.agents.map((a)=>a.id === updated.id ? updated : a) : state.agents,
                logs: [
                    ...state.logs,
                    entry
                ]
            }
        };
    };
    if (request.vaultId !== state.id) return record("WRONG_VAULT");
    if (!agent) return record("UNKNOWN_AGENT");
    if (!simulatedSignerPublicKey || simulatedSignerPublicKey !== agent.publicKey) return record("IDENTITY_NOT_VERIFIED");
    if (!positive(request.nonce) || request.nonce <= agent.lastNonce) return record("REPLAY");
    if (!Number.isSafeInteger(request.expiresAt) || request.expiresAt <= now) return record("EXPIRED");
    const current = {
        ...agent,
        lastNonce: request.nonce,
        day,
        dailySpent: agent.day === day ? agent.dailySpent : 0
    };
    if (current.status !== "active") return record("AGENT_INACTIVE", current);
    if (state.frozen) return record("VAULT_FROZEN", current);
    if (!validPolicy(current.policy)) return record("INVALID_POLICY", current);
    const violation = (reason)=>{
        const violations = current.violations + 1;
        const suspended = violations >= MAX_VIOLATIONS;
        return record(reason, {
            ...current,
            violations,
            status: suspended ? "suspended" : current.status
        }, suspended);
    };
    if (!positive(request.amount) || !request.recipientWallet.trim() || !request.recipientIdentity.trim()) return violation("INVALID_REQUEST");
    const p = current.policy;
    if (p.denylist.includes(request.recipientWallet)) return violation("DENYLIST");
    if (p.allowlistEnabled && !p.allowlist.includes(request.recipientWallet)) return violation("NOT_ALLOWLISTED");
    if (request.amount < p.minTransfer) return violation("BELOW_MINIMUM");
    if (request.amount > p.maxTransfer) return violation("ABOVE_MAXIMUM");
    if (request.amount > p.dailyLimit - current.dailySpent) return violation("DAILY_LIMIT");
    if (request.amount > p.totalLimit - current.totalSpent) return violation("TOTAL_LIMIT");
    if (request.amount > state.balance) return record("INSUFFICIENT_BALANCE", current);
    return record(undefined, {
        ...current,
        dailySpent: current.dailySpent + request.amount,
        totalSpent: current.totalSpent + request.amount
    });
}
function setDemoFrozen(state, frozen) {
    return {
        ...state,
        frozen
    };
}
function setDemoAgentStatus(state, id, status) {
    return {
        ...state,
        agents: state.agents.map((a)=>a.id !== id || a.status === "revoked" || a.status === "suspended" && status === "paused" ? a : {
                ...a,
                status,
                violations: status === "active" && a.status === "suspended" ? 0 : a.violations
            })
    };
}
function demoDeposit(state, amount, at) {
    if (!positive(amount) || !nonnegative(state.balance + amount)) throw new Error("Geçersiz demo yatırma tutarı.");
    return {
        ...state,
        balance: state.balance + amount,
        ownerMovements: [
            ...state.ownerMovements,
            {
                kind: "deposit",
                amount,
                at
            }
        ]
    };
}
function demoWithdraw(state, amount, at) {
    if (state.frozen || !positive(amount) || amount > state.balance) throw new Error("Demo çekme işlemi engellendi.");
    return {
        ...state,
        balance: state.balance - amount,
        ownerMovements: [
            ...state.ownerMovements,
            {
                kind: "withdraw",
                amount,
                at
            }
        ]
    };
}
}),
"[project]/src/lib/demo-vault.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CENT",
    ()=>CENT,
    "DEMO_RECIPIENT",
    ()=>DEMO_RECIPIENT,
    "changeAgentStatus",
    ()=>changeAgentStatus,
    "dayAt",
    ()=>dayAt,
    "defaultPolicy",
    ()=>defaultPolicy,
    "initialDemo",
    ()=>initialDemo,
    "putAgent",
    ()=>putAgent,
    "reasonLabel",
    ()=>reasonLabel,
    "recordsFor",
    ()=>recordsFor,
    "statusLabel",
    ()=>statusLabel,
    "updatePolicy",
    ()=>updatePolicy,
    "validAddress",
    ()=>validAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/agentvault-policy.ts [app-ssr] (ecmascript)");
;
const CENT = 10_000;
const DEMO_RECIPIENT = '11111111111111111111111111111111';
const statusLabel = {
    active: 'Yetkili',
    paused: 'Duraklatıldı',
    suspended: 'Askıya alındı',
    revoked: 'Yetkisi iptal edildi'
};
const reasonLabel = {
    IDENTITY_NOT_VERIFIED: 'Örnek imzacı eşleşmedi',
    WRONG_VAULT: 'Yanlış kasa',
    UNKNOWN_AGENT: 'Kayıtsız asistan',
    REPLAY: 'Tekrarlanan talep',
    EXPIRED: 'Talep süresi doldu',
    INVALID_REQUEST: 'Geçersiz talep',
    AGENT_INACTIVE: 'Asistan yetkili değil',
    VAULT_FROZEN: 'Kasa donduruldu',
    INVALID_POLICY: 'Geçersiz kural',
    DENYLIST: 'Yasaklanan alıcı',
    NOT_ALLOWLISTED: 'Alıcı izin listesinde değil',
    BELOW_MINIMUM: 'Minimum tutarın altında',
    ABOVE_MAXIMUM: 'İşlem başına sınır aşıldı',
    DAILY_LIMIT: 'Günlük sınır aşıldı',
    TOTAL_LIMIT: 'Toplam yetki sınırı aşıldı',
    INSUFFICIENT_BALANCE: 'Yetersiz kasa bakiyesi'
};
const dayAt = (now)=>new Date(now).toISOString().slice(0, 10);
const defaultPolicy = (daily)=>({
        dailyLimit: daily,
        minTransfer: 0,
        maxTransfer: Math.min(daily, 25 * 100 * CENT),
        totalLimit: Math.min(daily * 10, 1e12),
        allowlistEnabled: false,
        allowlist: [],
        denylist: []
    });
function initialDemo(now) {
    const a = 'demo-payment-01', b = 'demo-trading-02';
    let vault = {
        id: 'demo-vault-001',
        ownerPublicKey: 'demo-owner',
        frozen: false,
        balance: 0,
        agents: [
            a,
            b
        ].map((id, i)=>({
                id,
                publicKey: 'demo-key-' + id,
                status: 'active',
                policy: defaultPolicy((i ? 5000 : 2500) * CENT),
                day: dayAt(now),
                dailySpent: 0,
                totalSpent: 0,
                violations: 0,
                lastNonce: 0
            })),
        logs: [],
        ownerMovements: []
    };
    vault = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["demoDeposit"])(vault, 10000 * CENT, now);
    for (const [id, amount] of [
        [
            a,
            1000
        ],
        [
            b,
            2500
        ]
    ]){
        vault = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulateTransfer"])(vault, {
            vaultId: vault.id,
            agentId: id,
            agentPublicKey: 'demo-key-' + id,
            recipientWallet: DEMO_RECIPIENT,
            recipientIdentity: 'Örnek alıcı',
            amount: amount * CENT,
            nonce: 1,
            expiresAt: now + 60000
        }, 'demo-key-' + id, now).state;
    }
    return {
        vault,
        profiles: {
            [a]: {
                name: 'Ödeme asistanı',
                type: 'payment'
            },
            [b]: {
                name: 'Alım satım asistanı',
                type: 'trading'
            }
        }
    };
}
function updatePolicy(data, id, policy) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validPolicy"])(policy)) throw Error('Minimum ≤ maksimum; maksimum ≤ günlük ve toplam sınır olmalı.');
    if (!data.vault.agents.some((a)=>a.id === id && a.status !== 'revoked')) throw Error('Yetkisi iptal edilmiş veya bulunamayan asistan.');
    return {
        ...data,
        vault: {
            ...data.vault,
            agents: data.vault.agents.map((a)=>a.id === id ? {
                    ...a,
                    policy: {
                        ...policy,
                        allowlist: [
                            ...policy.allowlist
                        ],
                        denylist: [
                            ...policy.denylist
                        ]
                    }
                } : a)
        }
    };
}
function putAgent(data, id, profile, dailyCents, now) {
    if (!Number.isSafeInteger(dailyCents) || dailyCents <= 0 || dailyCents > 100000000 || profile.name.trim().length < 2 || profile.name.trim().length > 40) throw Error('Geçersiz asistan bilgisi.');
    const daily = dailyCents * CENT, existing = data.vault.agents.find((a)=>a.id === id);
    let vault = data.vault;
    if (existing) {
        const p = {
            ...existing.policy,
            dailyLimit: daily
        };
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validPolicy"])(p) || existing.status === 'revoked') throw Error('Güvenliğim ekranındaki işlem sınırlarını kontrol edin.');
        vault = updatePolicy(data, id, p).vault;
    } else {
        if (vault.agents.filter((a)=>a.status !== 'revoked').length >= 6) throw Error('En fazla 6 yetkisi iptal edilmemiş demo asistanı.');
        vault = {
            ...vault,
            agents: [
                ...vault.agents,
                {
                    id,
                    publicKey: 'demo-key-' + id,
                    status: 'paused',
                    policy: defaultPolicy(daily),
                    day: dayAt(now),
                    dailySpent: 0,
                    totalSpent: 0,
                    violations: 0,
                    lastNonce: 0
                }
            ]
        };
    }
    return {
        ...data,
        vault,
        profiles: {
            ...data.profiles,
            [id]: profile
        }
    };
}
function changeAgentStatus(data, id, status) {
    return {
        ...data,
        vault: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDemoAgentStatus"])(data.vault, id, status)
    };
}
function recordsFor(data) {
    const owners = data.vault.ownerMovements.map((m, i)=>({
            id: 'OWNER-' + (i + 1),
            name: m.kind === 'deposit' ? 'Para yatırma' : 'Para çekme',
            description: 'Demo kasa sahibi',
            date: new Date(m.at).toISOString(),
            amount: (m.kind === 'deposit' ? 1 : -1) * m.amount / CENT,
            status: 'Tamamlandı'
        }));
    const requests = data.vault.logs.map((l, i)=>({
            id: 'REQ-' + (i + 1),
            name: data.profiles[l.request.agentId]?.name ?? 'Bilinmeyen asistan',
            description: l.reason ? reasonLabel[l.reason] : 'Örnek USDC transferi',
            date: new Date(l.at).toISOString(),
            amount: -l.request.amount / CENT,
            status: l.decision === 'approved' ? 'Tamamlandı' : 'Engellendi',
            agentId: l.request.agentId,
            recipient: l.request.recipientWallet,
            reason: l.reason,
            nonce: l.request.nonce,
            suspended: l.suspended
        }));
    return [
        ...owners,
        ...requests
    ].reverse().sort((a, b)=>b.date.localeCompare(a.date));
}
function validAddress(value) {
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)) return false;
    let bytes = [];
    for (const ch of value){
        let carry = alphabet.indexOf(ch);
        for(let i = 0; i < bytes.length; i++){
            carry += bytes[i] * 58;
            bytes[i] = carry & 255;
            carry >>= 8;
        }
        while(carry){
            bytes.push(carry & 255);
            carry >>= 8;
        }
    }
    return bytes.length + (value.match(/^1*/)?.[0].length ?? 0) === 32;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1nc7jrv2ys55_._.js.map