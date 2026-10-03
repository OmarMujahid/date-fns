import { buildMatchPatternFn } from "../../../_lib/buildMatchPatternFn/index.ts";
import { buildMatchFn } from "../../../_lib/buildMatchFn/index.ts";
import type { Quarter } from "../../../../types.ts";
import type { Match } from "../../../types.ts";

const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,
  wide: /^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i,
};
const parseEraPatterns = {
  any: [/^قبل/i, /^بعد/i] as const,
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^ر[1234]/i,
  wide: /^الربع [1234]/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const matchMonthPatterns = {
  narrow: /^[يفمأغشند]/i,
  abbreviated:
    /^(ينا|فبر|مارس|أبريل|ماي|يونـ?|يولـ?|غشت|شتنـ?|أكتـ?|نونـ?|دجنـ?)/i,
  wide: /^(يناير|فبراير|مارس|أبريل|ماي|يونيو|يوليوز|غشت|شتنبر|أكتوبر|نونبر|دجنبر)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^ي/i,
    /^ف/i,
    /^م/i,
    /^أ/i,
    /^م/i,
    /^ي/i,
    /^ي/i,
    /^غ/i,
    /^ش/i,
    /^أ/i,
    /^ن/i,
    /^د/i,
  ] as const,
  any: [
    /^ين/i,
    /^فب/i,
    /^مار/i,
    /^أب/i,
    /^ماي/i,
    /^يون/i,
    /^يول/i,
    /^غشت/i,
    /^ش/i,
    /^أك/i,
    /^ن/i,
    /^د/i,
  ] as const,
};

const matchDayPatterns = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|[اإ]ثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|[اإ]ثنـ?|ثلا|أربـ?|خميـ?|جمعة|سبت)/i,
  wide: /^(الأحد|الإثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i,
};
const parseDayPatterns = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i] as const,
  wide: [
    /^الأحد/i,
    /^الإثنين/i,
    /^الثلاثاء/i,
    /^الأربعاء/i,
    /^الخميس/i,
    /^الجمعة/i,
    /^السبت/i,
  ] as const,
  any: [/^أح/i, /^[اإ]ث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i] as const,
};

const matchDayPeriodPatterns = {
  narrow:
    /^(نصف الليل|ن|ظهر|ظ|في الصباح|صباحاً|بعد الظـ?هر|في المساء|مساءاً|في الليل|ليلاً|ص|م)/i,
  any: /^(نصف الليل|ن|ظهر|ظ|في الصباح|صباحاً|بعد الظـ?هر|في المساء|مساءاً|في الليل|ليلاً|ص|م)/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^ص$/i,
    pm: /^م$/i,
    midnight: /^(ن|نصف الليل)$/i,
    noon: /^(ظ|ظهر)$/i,
    morning: /^(في الصباح|صباحاً)$/i,
    afternoon: /^بعد الظـ?هر$/i,
    evening: /^(في المساء|مساءاً)$/i,
    night: /^(في الليل|ليلاً)$/i,
  },
};

export const match: Match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value: string) => parseInt(value, 10),
  }),

  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => (Number(index) + 1) as Quarter,
  }),

  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};
