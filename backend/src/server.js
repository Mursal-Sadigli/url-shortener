import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import shortenerRoutes from "./routes/shortenerRoutes.js";
import controller from "./controllers/shortenerController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//Esas route
app.get("/", (req, res) => {
    res.json({ message: "URL Qısaldıcı API işləyir" });
});

// shortener routes
app.use("/api", shortenerRoutes);
app.get("/:code", controller.redirectUrl);

app.use(errorHandler)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});