import { rateLimit } from "express-rate-limit";

const shortenerLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Çox sayda sorğu. 1 dəqiqədən sonra yenidən cəhd edin"
});

export default shortenerLimiter;