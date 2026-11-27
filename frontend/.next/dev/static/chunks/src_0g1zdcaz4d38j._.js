(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AdaptiveProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
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
const AdaptiveContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
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
    _s();
    const [preferences, setPreferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_ADAPTIVE_PREFERENCES);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [storageAvailable, setStorageAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [systemDark, setSystemDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [systemReducedMotion, setSystemReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /* RESTORE SAVED PREFERENCES */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdaptiveProvider.useEffect": ()=>{
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
        }
    }["AdaptiveProvider.useEffect"], []);
    /* WATCH SYSTEM APPEARANCE AND MOTION */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdaptiveProvider.useEffect": ()=>{
            const colorQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            function updateSystemPreferences() {
                setSystemDark(colorQuery.matches);
                setSystemReducedMotion(motionQuery.matches);
            }
            updateSystemPreferences();
            colorQuery.addEventListener("change", updateSystemPreferences);
            motionQuery.addEventListener("change", updateSystemPreferences);
            return ({
                "AdaptiveProvider.useEffect": ()=>{
                    colorQuery.removeEventListener("change", updateSystemPreferences);
                    motionQuery.removeEventListener("change", updateSystemPreferences);
                }
            })["AdaptiveProvider.useEffect"];
        }
    }["AdaptiveProvider.useEffect"], []);
    /* SAVE PREFERENCES */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdaptiveProvider.useEffect": ()=>{
            if (!ready) return;
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
                setStorageAvailable(true);
            } catch  {
                setStorageAvailable(false);
            }
        }
    }["AdaptiveProvider.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdaptiveContext.Provider, {
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
_s(AdaptiveProvider, "FPPU0zzjGxMosY7ogmBi/KDAtHo=");
_c = AdaptiveProvider;
function useAdaptive() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AdaptiveContext);
    if (!context) {
        throw new Error("useAdaptive must be used inside AdaptiveProvider.");
    }
    return context;
}
_s1(useAdaptive, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function AdaptiveRoot({ children, className = "" }) {
    _s2();
    const { preferences, resolvedAppearance, motionEnabled } = useAdaptive();
    const fontSize = preferences.textSize === "extra-large" ? "1.375rem" : preferences.textSize === "large" ? "1.25rem" : "1rem";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s2(AdaptiveRoot, "Nl/OWrpPYdtBxJ8Se+QFMz6+Ixs=", false, function() {
    return [
        useAdaptive
    ];
});
_c1 = AdaptiveRoot;
var _c, _c1;
__turbopack_context__.k.register(_c, "AdaptiveProvider");
__turbopack_context__.k.register(_c1, "AdaptiveRoot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AdaptiveShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdaptiveShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WalletProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WalletProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.mjs [app-client] (ecmascript) <export default as House>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.mjs [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.mjs [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2d$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw-clock.mjs [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.mjs [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.mjs [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.mjs [app-client] (ecmascript) <export default as CircleHelp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flask-conical.mjs [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdaptiveProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__["House"]
    },
    {
        name: "Param",
        shortName: "Param",
        href: "/vault",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
    },
    {
        name: "Asistanlarım",
        shortName: "Asistanlar",
        href: "/agents",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"]
    },
    {
        name: "Güvenliğim",
        shortName: "Güvenlik",
        href: "/policies",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
    },
    {
        name: "İşlemlerim",
        shortName: "İşlemler",
        href: "/transactions",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2d$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
    },
    {
        name: "Ayarlarım",
        shortName: "Ayarlar",
        href: "/settings",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
    }
];
/* MODE SELECTOR */ function ModeSelector({ id }) {
    _s();
    const { preferences, setMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdaptive"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "adaptive-mode-selector",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "adaptive-small",
                children: "Kullanım biçiminiz"
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                id: id,
                className: "adaptive-input",
                value: preferences.mode,
                onChange: (event)=>setMode(event.target.value),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADAPTIVE_MODES"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: item.id,
                        children: item.name
                    }, item.id, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdaptiveShell.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(ModeSelector, "ftfi3Q05H4uG9CwPsUuJ1qElMlE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdaptive"]
    ];
});
_c = ModeSelector;
function AdaptiveShell({ children }) {
    _s1();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { connection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WalletProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletConnection"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { preferences, resolvedAppearance, ready, setAppearance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdaptive"])();
    const [helpOpen, setHelpOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dark = resolvedAppearance === "dark";
    const isOnboarding = pathname === "/onboarding";
    const isPreview = pathname === "/adaptive-preview";
    const needsOnboarding = ready && !preferences.onboardingCompleted && !isOnboarding && !isPreview;
    /* FIRST VISIT REDIRECTION */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdaptiveShell.useEffect": ()=>{
            if (needsOnboarding) {
                router.replace("/onboarding");
            }
        }
    }["AdaptiveShell.useEffect"], [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdaptiveRoot"], {
            className: "adaptive-loading-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "adaptive-stack",
                role: "status",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                        size: 48,
                        style: {
                            color: "var(--ad-accent)",
                            marginInline: "auto"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "adaptive-heading",
                        children: "AgentVault."
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "adaptive-description",
                        children: needsOnboarding ? "Karşılama ekranı açılıyor..." : "Tercihleriniz yükleniyor..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 234,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/AdaptiveShell.tsx",
            lineNumber: 213,
            columnNumber: 7
        }, this);
    }
    /* ONBOARDING WITHOUT NAVIGATION */ if (isOnboarding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdaptiveRoot"], {
            className: "adaptive-standalone",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                id: "main-content",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 253,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/AdaptiveShell.tsx",
            lineNumber: 250,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdaptiveRoot"], {
        className: "adaptive-app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "#main-content",
                className: "adaptive-skip-link",
                children: "Ana içeriğe geç"
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "adaptive-topbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "adaptive-topbar-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "adaptive-brand",
                                "aria-label": "AgentVault ana sayfa",
                                onClick: closeMenus,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-brand-logo",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            size: 27
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 305,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "adaptive-brand-name",
                                                children: "AgentVault."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 311,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "adaptive-brand-edition",
                                                children: "ADAPTIVE ONE 2.0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 315,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 309,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "adaptive-topbar-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/vault#wallet-connection",
                                        className: "av-wallet-header-link",
                                        "aria-label": connection ? "Bağlı cüzdanı yönet" : "Cüzdan ile bağlan",
                                        onClick: closeMenus,
                                        children: [
                                            connection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 19,
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 328,
                                                columnNumber: 29
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                size: 19,
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 328,
                                                columnNumber: 77
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: connection ? connection.name : "Cüzdan ile bağlan"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 329,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 327,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-demo-label",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                                size: 17
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 334,
                                                columnNumber: 15
                                            }, this),
                                            "Demo hesabı"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 332,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "adaptive-icon-button",
                                        "aria-label": dark ? "Açık temaya geç" : "Koyu temaya geç",
                                        onClick: toggleAppearance,
                                        children: dark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 352,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 354,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 340,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "adaptive-icon-button",
                                        "aria-label": "Yardım menüsü",
                                        "aria-expanded": helpOpen,
                                        "aria-controls": "adaptive-help-panel",
                                        onClick: ()=>{
                                            setHelpOpen(!helpOpen);
                                            setMobileMenuOpen(false);
                                        },
                                        children: helpOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 372,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__["CircleHelp"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 374,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    helpOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "adaptive-help-panel",
                        className: "adaptive-help-panel adaptive-stack",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "adaptive-section-heading",
                                children: "Nasıl yardımcı olabiliriz?"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 391,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "adaptive-description",
                                children: "AgentVault ile paranızı, dijital asistanlarınızı ve güvenlik kurallarınızı yönetebilirsiniz."
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "adaptive-small",
                                children: "Finansal ekranlar demo ortamındadır. Cüzdan sahipliği gerçek mesaj imzasıyla doğrulanabilir; blockchain transferi yapılmaz."
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 404,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/onboarding",
                                onClick: closeMenus,
                                className: "adaptive-button adaptive-button-secondary",
                                children: [
                                    "Kurulum rehberini aç",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 419,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "adaptive-button adaptive-button-secondary",
                                onClick: ()=>setHelpOpen(false),
                                children: "Kapat"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 423,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 386,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "adaptive-workspace",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "adaptive-sidebar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "adaptive-sidebar-inner",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "adaptive-sidebar-title",
                                    children: "MENÜ"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    "aria-label": "Ana navigasyon",
                                    className: "adaptive-desktop-nav",
                                    children: navigation.map((item)=>{
                                        const Icon = item.icon;
                                        const active = isActive(item.href);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            "aria-current": active ? "page" : undefined,
                                            "data-active": active,
                                            className: "adaptive-nav-link",
                                            onClick: closeMenus,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 23
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 21
                                                }, this),
                                                active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    size: 17,
                                                    className: "adaptive-nav-indicator"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 486,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, item.href, true, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 466,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "adaptive-divider"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 498,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeSelector, {
                                    id: "desktop-usage-mode"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 500,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "adaptive-sidebar-info",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "adaptive-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    size: 20,
                                                    style: {
                                                        color: "var(--ad-success)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 508,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontWeight: 600
                                                    },
                                                    children: "Demo ortamı"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 506,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "adaptive-small",
                                            children: "Gerçek para kullanılmaz."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 523,
                                            columnNumber: 15
                                        }, this),
                                        preferences.mode === "professional" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "adaptive-small",
                                            children: [
                                                "Hedef ağ: Solana Devnet",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                    lineNumber: 533,
                                                    columnNumber: 21
                                                }, this),
                                                "Cüzdan bağlı değil."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 531,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 504,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "adaptive-sidebar-footer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "adaptive-small",
                                            children: "AgentVault © 2026"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 542,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "adaptive-small",
                                            children: "Adaptive One 2.0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 546,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 540,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                            lineNumber: 448,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 446,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        id: "main-content",
                        tabIndex: -1,
                        className: "adaptive-main-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "adaptive-mobile-mode",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeSelector, {
                                    id: "mobile-usage-mode"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 568,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 566,
                                columnNumber: 11
                            }, this),
                            legacyPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "adaptive-status adaptive-status-warning",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                                size: 23
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 581,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "adaptive-grow",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: 600
                                                        },
                                                        children: "Tasarım geçişi devam ediyor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "adaptive-small",
                                                        style: {
                                                            color: "inherit"
                                                        },
                                                        children: "Bu sayfa henüz yeni tasarıma geçirilmedi. Mevcut özellikleri kullanmaya devam edebilirsiniz."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 583,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "adaptive-legacy-page bg-background text-foreground",
                                        children: children
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 608,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 577,
                                columnNumber: 13
                            }, this) : children,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                className: "adaptive-content-footer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "adaptive-small",
                                        children: "Herkes için finans. Herkes için kontrol."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 623,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "adaptive-small",
                                        children: "AgentVault — Adaptive One 2.0 · Demo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 630,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 621,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 558,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "adaptive-mobile-menu-backdrop",
                        "aria-label": "Diğer menüsünü kapat",
                        onClick: ()=>setMobileMenuOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 650,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "adaptive-mobile-more",
                        className: "adaptive-mobile-more adaptive-stack",
                        "aria-label": "Diğer sayfalar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "adaptive-row adaptive-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "adaptive-section-heading",
                                        children: "Diğer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 667,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "adaptive-icon-button",
                                        "aria-label": "Menüyü kapat",
                                        onClick: ()=>setMobileMenuOpen(false),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 21
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 679,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 671,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 665,
                                columnNumber: 13
                            }, this),
                            navigation.slice(4).map((item)=>{
                                const Icon = item.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "adaptive-list-item",
                                    "aria-current": isActive(item.href) ? "page" : undefined,
                                    onClick: closeMenus,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "adaptive-icon-box",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                size: 23
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                                lineNumber: 701,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 700,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "adaptive-grow",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 704,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 708,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.href, true, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 688,
                                    columnNumber: 17
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/adaptive-preview",
                                className: "adaptive-list-item",
                                onClick: closeMenus,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-icon-box",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            size: 23
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 721,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 720,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-grow",
                                        children: "Yeni görünüm tercihleri"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 724,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 728,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 714,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                        lineNumber: 659,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 648,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "adaptive-bottom-nav",
                "aria-label": "Mobil navigasyon",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "adaptive-bottom-nav-inner",
                    children: [
                        navigation.slice(0, 4).map((item)=>{
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "adaptive-bottom-link",
                                "aria-current": active ? "page" : undefined,
                                "data-active": active,
                                onClick: closeMenus,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "adaptive-bottom-icon",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            size: 23,
                                            strokeWidth: active ? 2.3 : 1.8
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                                            lineNumber: 768,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 766,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.shortName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 777,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/src/components/AdaptiveShell.tsx",
                                lineNumber: 755,
                                columnNumber: 15
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "adaptive-bottom-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                        size: 23
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdaptiveShell.tsx",
                                        lineNumber: 805,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 803,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Diğer"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                                    lineNumber: 809,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdaptiveShell.tsx",
                            lineNumber: 785,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdaptiveShell.tsx",
                    lineNumber: 746,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AdaptiveShell.tsx",
                lineNumber: 741,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdaptiveShell.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
_s1(AdaptiveShell, "WIwixJG1zCISyRKr1Q8c6mWN278=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WalletProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletConnection"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdaptiveProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdaptive"]
    ];
});
_c1 = AdaptiveShell;
var _c, _c1;
__turbopack_context__.k.register(_c, "ModeSelector");
__turbopack_context__.k.register(_c1, "AdaptiveShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DemoVaultProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DemoVaultProvider,
    "useDemoVault",
    ()=>useDemoVault
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/agentvault-policy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/demo-vault.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const KEY = 'agentvault-demo-vault-v1';
// Explicitly local simulation; localStorage is not an authorization boundary.
function restore(raw) {
    const d = JSON.parse(raw);
    if (!d || !d.vault || d.vault.id !== 'demo-vault-001' || !Number.isSafeInteger(d.vault.balance) || d.vault.balance < 0 || !Array.isArray(d.vault.agents) || !Array.isArray(d.vault.logs) || !Array.isArray(d.vault.ownerMovements) || !d.profiles) throw Error('Geçersiz demo kaydı');
    // Access all derived records now; corrupted records fall back to fresh demo.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recordsFor"])(d);
    for (const a of d.vault.agents){
        if (!a.policy || !Array.isArray(a.policy.allowlist) || !Array.isArray(a.policy.denylist) || !d.profiles[a.id]) throw Error('Geçersiz asistan kaydı');
    }
    return d;
}
const C = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function DemoVaultProvider({ children }) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DemoVaultProvider.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemo"])(0)
    }["DemoVaultProvider.useState"]);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(data);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), [storageAvailable, setStorageAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true), [day, setDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1970-01-01');
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DemoVaultProvider.useEffect": ()=>{
            let next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemo"])(Date.now());
            try {
                const raw = localStorage.getItem(KEY);
                if (raw) next = restore(raw);
                else localStorage.setItem(KEY, JSON.stringify(next));
            } catch  {
                setStorageAvailable(false);
            }
            ref.current = next;
            setData(next);
            setDay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dayAt"])(Date.now()));
            setReady(true);
            const timer = window.setInterval({
                "DemoVaultProvider.useEffect.timer": ()=>setDay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dayAt"])(Date.now()))
            }["DemoVaultProvider.useEffect.timer"], 1000 * 30);
            return ({
                "DemoVaultProvider.useEffect": ()=>window.clearInterval(timer)
            })["DemoVaultProvider.useEffect"];
        }
    }["DemoVaultProvider.useEffect"], []);
    function move(kind, cents) {
        if (!ready || !Number.isSafeInteger(cents) || cents <= 0 || cents > 100000000) return false;
        try {
            const prev = ref.current;
            const vault = (kind === 'deposit' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoDeposit"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoWithdraw"])(prev.vault, cents * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CENT"], Date.now());
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
        const outcome = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulateTransfer"])(prev.vault, {
            vaultId: prev.vault.id,
            agentId: id,
            agentPublicKey: a.publicKey,
            recipientWallet: recipient,
            recipientIdentity: identity,
            amount: cents * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CENT"],
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
                    vault: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDemoFrozen"])(p.vault, f)
                });
            }
        },
        saveAgent: (id, profile, daily)=>{
            if (!ready) throw Error('Demo yükleniyor.');
            commit((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["putAgent"])(ref.current, id, profile, daily, Date.now()));
        },
        status: (id, s)=>{
            if (ready) commit((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["changeAgentStatus"])(ref.current, id, s));
        },
        savePolicy: (id, p)=>{
            if (!ready) throw Error('Demo yükleniyor.');
            commit((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePolicy"])(ref.current, id, p));
        },
        reset: ()=>{
            if (ready) commit((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2d$vault$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemo"])(Date.now()));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(C.Provider, {
        value: value,
        children: !ready ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(DemoVaultProvider, "b+vibXR6y5Zu3FQ2ta/ve9QubjA=");
_c = DemoVaultProvider;
function useDemoVault() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(C);
    if (!ctx) throw Error('DemoVaultProvider eksik.');
    return ctx;
}
_s1(useDemoVault, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "DemoVaultProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NEXUS_THEMES",
    ()=>NEXUS_THEMES,
    "default",
    ()=>ThemeProvider,
    "useNexusTheme",
    ()=>useNexusTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function isValidTheme(value) {
    return value === "emerald" || value === "glacier" || value === "amethyst";
}
function ThemeProvider({ children }) {
    _s();
    const [preferences, setPreferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PREFERENCES);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [storageAvailable, setStorageAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Restore saved preferences.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
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
        }
    }["ThemeProvider.useEffect"], []);
    // Apply preferences to the entire application.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
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
        }
    }["ThemeProvider.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
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
_s(ThemeProvider, "LAcP0Ogb2wgi7Cut9uprI1Aq8CU=");
_c = ThemeProvider;
function useNexusTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error("useNexusTheme must be used inside ThemeProvider.");
    }
    return context;
}
_s1(useNexusTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/WalletProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WalletProvider,
    "useWalletConnection",
    ()=>useWalletConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wallet$2d$proof$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wallet-proof.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function findWallet(name) {
    const w = window;
    const p = name === 'Phantom' ? w.phantom?.solana ?? w.solana : w.solflare ?? w.solana;
    if (!p || !(name === 'Phantom' ? p.isPhantom : p.isSolflare)) return;
    if (typeof p.connect !== 'function' || typeof p.signMessage !== 'function' || typeof p.disconnect !== 'function' || typeof p.on !== 'function' || !(p.off || p.removeListener)) return;
    return p;
}
function matches(p, address) {
    return p.publicKey?.toString() === address && p.isConnected !== false;
}
const WalletContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function WalletProvider({ children }) {
    _s();
    const [connection, setConnection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const generation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const verified = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function clear() {
        generation.current++;
        cleanup.current?.();
        cleanup.current = null;
        active.current = null;
        verified.current = null;
        setConnection(null);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletProvider.useEffect": ()=>({
                "WalletProvider.useEffect": ()=>{
                    generation.current++;
                    cleanup.current?.();
                    cleanup.current = null;
                    active.current = null;
                    verified.current = null;
                }
            })["WalletProvider.useEffect"]
    }["WalletProvider.useEffect"], []);
    async function connect(name) {
        if (lock.current || active.current) return;
        setError('');
        if (!window.isSecureContext || !globalThis.crypto?.subtle) {
            setError('Cüzdan doğrulaması için localhost veya HTTPS kullanın.');
            return;
        }
        const provider = findWallet(name);
        if (!provider) {
            setError(`${name} uyumlu tarayıcı uzantısı bulunamadı. Resmî uzantıyı kurup sayfayı yenileyin.`);
            return;
        }
        lock.current = true;
        setBusy(true);
        const attempt = ++generation.current;
        active.current = provider;
        try {
            const result = await provider.connect();
            if (generation.current !== attempt) throw Error('Bağlantı değişti. Yeniden bağlanın.');
            const address = (result?.publicKey ?? provider.publicKey)?.toString();
            if (!address || provider.publicKey?.toString() !== address) throw Error('Cüzdan adresi alınamadı.');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wallet$2d$proof$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicKeyBytes"])(address);
            const invalidate = ()=>{
                if (active.current === provider) {
                    clear();
                    setError('Cüzdan hesabı değişti veya bağlantı kesildi. Yeniden imza ile bağlanın.');
                }
            };
            const onAccount = (...args)=>{
                const key = args[0];
                if (!key || String(key) !== address || provider.publicKey?.toString() !== address) invalidate();
            };
            const onDisconnect = ()=>invalidate();
            cleanup.current = ()=>{
                const off = provider.off ?? provider.removeListener;
                off?.call(provider, 'accountChanged', onAccount);
                off?.call(provider, 'disconnect', onDisconnect);
            };
            provider.on('accountChanged', onAccount);
            provider.on('disconnect', onDisconnect);
            const proof = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wallet$2d$proof$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProof"])(address, window.location.origin);
            // Keep the expected bytes independent of the provider's input buffer.
            const response = await provider.signMessage(Uint8Array.from(proof.message), 'utf8');
            if (generation.current !== attempt || !matches(provider, address)) throw Error('İmza sırasında cüzdan hesabı değişti.');
            const signature = response instanceof Uint8Array ? response : response.signature;
            if (!(signature instanceof Uint8Array) || !(response instanceof Uint8Array) && response.publicKey && response.publicKey.toString() !== address) throw Error('Cüzdan geçersiz imza yanıtı verdi.');
            let valid = false;
            try {
                valid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wallet$2d$proof$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyProof"])(address, proof.message, signature);
            } catch  {
                throw Error('Ed25519 doğrulanamadı. Güncel Chrome veya Edge kullanın.');
            }
            if (!valid) throw Error('İmza doğrulanamadı.');
            if (Date.now() > proof.expiresAt || generation.current !== attempt || !matches(provider, address)) throw Error('İmza isteğinin süresi doldu veya bağlantı değişti.');
            verified.current = address;
            setConnection({
                name,
                address,
                verifiedAt: Date.now()
            });
        } catch (e) {
            if (active.current === provider) clear();
            try {
                await provider.disconnect();
            } catch  {}
            const code = e?.code;
            setError(code === 4001 ? 'Cüzdan bağlantısı veya imza isteği iptal edildi.' : e instanceof Error ? e.message : 'Cüzdan bağlantısı tamamlanamadı.');
        } finally{
            lock.current = false;
            setBusy(false);
        }
    }
    async function disconnect() {
        if (lock.current) return;
        const p = active.current;
        clear();
        setError('');
        if (!p) return;
        lock.current = true;
        setBusy(true);
        try {
            await p.disconnect();
        } catch  {
            setError('Yerel bağlantı kapatıldı. Uzantıdaki site iznini ayrıca kaldırabilirsiniz.');
        } finally{
            lock.current = false;
            setBusy(false);
        }
    }
    // Additional check when returning to the tab, even if a wallet event is missed.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletProvider.useEffect": ()=>{
            const check = {
                "WalletProvider.useEffect.check": ()=>{
                    const p = active.current;
                    if (verified.current && (!p || p.publicKey?.toString() !== verified.current || p.isConnected === false)) {
                        clear();
                        setError('Cüzdan bağlantısı değişti. Yeniden bağlanın.');
                    }
                }
            }["WalletProvider.useEffect.check"];
            window.addEventListener('focus', check);
            document.addEventListener('visibilitychange', check);
            return ({
                "WalletProvider.useEffect": ()=>{
                    window.removeEventListener('focus', check);
                    document.removeEventListener('visibilitychange', check);
                }
            })["WalletProvider.useEffect"];
        }
    }["WalletProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletContext.Provider, {
        value: {
            connection,
            busy,
            error,
            connect,
            disconnect
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/WalletProvider.tsx",
        lineNumber: 99,
        columnNumber: 10
    }, this);
}
_s(WalletProvider, "KXMJQzWHvAYdTV/D2xpIBNJqIrk=");
_c = WalletProvider;
function useWalletConnection() {
    _s1();
    const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WalletContext);
    if (!c) throw Error('WalletProvider eksik.');
    return c;
}
_s1(useWalletConnection, "rCFJOMMDYLWM7qBzTJAGkiO6eRA=");
var _c;
__turbopack_context__.k.register(_c, "WalletProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/agentvault-policy.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/demo-vault.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/agentvault-policy.ts [app-client] (ecmascript)");
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
    vault = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoDeposit"])(vault, 10000 * CENT, now);
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
        vault = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulateTransfer"])(vault, {
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
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validPolicy"])(policy)) throw Error('Minimum ≤ maksimum; maksimum ≤ günlük ve toplam sınır olmalı.');
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
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validPolicy"])(p) || existing.status === 'revoked') throw Error('Güvenliğim ekranındaki işlem sınırlarını kontrol edin.');
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
        vault: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$agentvault$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDemoAgentStatus"])(data.vault, id, status)
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/wallet-proof.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PROOF_TTL",
    ()=>PROOF_TTL,
    "createProof",
    ()=>createProof,
    "publicKeyBytes",
    ()=>publicKeyBytes,
    "verifyProof",
    ()=>verifyProof
]);
/** Local ownership proof only; never use as server authentication or authority. */ const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function publicKeyBytes(address) {
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) throw Error('Geçersiz Solana adresi.');
    const bytes = [];
    for (const c of address){
        let carry = ALPHABET.indexOf(c);
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
    const leading = address.match(/^1*/)?.[0].length ?? 0;
    if (leading + bytes.length !== 32) throw Error('Geçersiz Solana adresi.');
    return Uint8Array.from([
        ...Array(leading).fill(0),
        ...bytes.reverse()
    ]);
}
const PROOF_TTL = 5 * 60_000;
function createProof(address, origin, now = Date.now()) {
    publicKeyBytes(address);
    const nonce = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b)=>b.toString(16).padStart(2, '0')).join('');
    const expiresAt = now + PROOF_TTL;
    const message = `AgentVault cüzdan sahipliği doğrulaması\nBu imza para transferi veya harcama yetkisi vermez.\nOrigin: ${origin}\nSolana address: ${address}\nNonce: ${nonce}\nIssued at: ${new Date(now).toISOString()}\nExpires at: ${new Date(expiresAt).toISOString()}`;
    return {
        message: new TextEncoder().encode(message),
        expiresAt
    };
}
async function verifyProof(address, message, signature) {
    if (signature.length !== 64) return false;
    const key = await crypto.subtle.importKey('raw', publicKeyBytes(address), {
        name: 'Ed25519'
    }, false, [
        'verify'
    ]);
    return crypto.subtle.verify({
        name: 'Ed25519'
    }, key, Uint8Array.from(signature), Uint8Array.from(message));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0g1zdcaz4d38j._.js.map