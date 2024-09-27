import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import { en } from "./en/translation";
import { uk } from "./uk/translation";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en,
            uk
        },
        lng: "en",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });