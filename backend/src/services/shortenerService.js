import { nanoid } from "nanoid";

/**
 * Müvəqqəti məlumat depoları (In-memory storage)
 */
const urlStorage = new Map();
const analyticsData = [];

/**
 * Yeni qısa URL kodu yaradır və bazaya saxlayır
 * @param {string} originalUrl - Orijinal URL ünvanı
 * @returns {string} Yaradılmış unikal kod
 */
export function createShortUrl(originalUrl) {
    const code = nanoid(6);
    urlStorage.set(code, originalUrl);
    return code;
}

/**
 * Kod vasitəsilə orijinal URL-i tapır
 * @param {string} code - Qısa URL kodu
 * @returns {string|undefined} Tapılmış orijinal URL
 */
export function getOriginalUrl(code) {
    return urlStorage.get(code);
}

/**
 * Analitika məlumatlarını qeyd edir
 * @param {object} data - Klik məlumatları
 */
export function saveAnalytics(data) {
    analyticsData.push(data);
}

/**
 * Müəyyən kod üzrə statistika məlumatlarını toplayır
 * @param {string} code - Qısa URL kodu
 * @returns {object|null} Statistika obyekti
 */
export function getStats(code) {
    const originalUrl = urlStorage.get(code);
    if (!originalUrl) return null;

    const allClicks = analyticsData.filter(item => item.code === code);
    
    // Son 24 saatın hesablanması
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const last24hClicks = allClicks.filter(item => {
        const clickTime = new Date(item.timestamp).getTime();
        return clickTime > oneDayAgo;
    });

    return {
        originalUrl,
        totalClicks: allClicks.length,
        last24Clicks: last24hClicks.length
    };
}

export default {
    createShortUrl,
    getOriginalUrl,
    saveAnalytics,
    getStats
};