import validator from "validator";
import * as service from "../services/shortenerService.js";


 // URL qısaltma əməliyyatını həyata keçirir

export async function shortenUrl(req, res, next) {
    try {
        const { url } = req.body;

        if (!url || !validator.isURL(url)) {
            return res.status(400).json({ message: "Daxil edilən URL ünvanı yanlışdır" });
        }

        const code = service.createShortUrl(url);
        const shortUrl = `${req.protocol}://${req.get("host")}/${code}`;

        return res.status(201).json({ shortUrl });
    } catch (error) {
        return next(error);
    }
}

// Qısa kodu orijinal URL-ə yönləndirir və analitikanı qeyd edir

export async function redirectUrl(req, res, next) {
    try {
        const { code } = req.params;
        const originalUrl = service.getOriginalUrl(code);

        if (!originalUrl) {
            return res.status(404).json({ message: "Belə bir qısa link tapılmadı" });
        }

        // Klik məlumatını qeyd edirik
        service.saveAnalytics({
            code,
            timestamp: new Date(),
            ip: req.ip,
            userAgent: req.get("user-agent") || "Bilinmir"
        });

        return res.redirect(originalUrl);
    } catch (error) {
        return next(error);
    }
}

// Belirlənmiş kod üzrə statistika məlumatlarını qaytarır

export async function getStats(req, res, next) {
    try {
        const { code } = req.params;
        const stats = service.getStats(code);

        if (!stats) {
            return res.status(404).json({ message: "Bu link üçün statistika tapılmadı" });
        }

        return res.json(stats);
    } catch (error) {
        return next(error);
    }
}

export default {
    shortenUrl,
    redirectUrl,
    getStats
};