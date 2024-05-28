import express from "express";
import { StudentInfo } from "../models/student.js";
import { GamesInfo } from "../models/game.js";

const router = express.Router();

router.get("/", async (req, res) => { //  استخدام  req  و res  
    try {
        const students = await StudentInfo.find({}); //  تنفيذ البحث
        const games = await GamesInfo.find({}); //  تنفيذ البحث

        return res.status(200).json({ students, games }); //  إعادة البيانات
    } catch (error) {
        console.error("Error fetching data:", error); //  طباعة  الخطأ  في  السجل 
        return res.status(500).json({ message: "حدث خطأ في استرجاع البيانات" }); //  رسالة  الخطأ  للإستجابة 
    }
});

export default router;
