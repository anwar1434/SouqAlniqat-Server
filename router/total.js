import express from "express";
import { StudentInfo } from "../models/student.js";
import { GamesInfo } from "../models/game.js";

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        // جلب جميع الطلاب وجميع الألعاب من قاعدة البيانات
        let students = await StudentInfo.find({});
        let games = await GamesInfo.find({});

        // كائن لتتبع عدد الطلبات لكل لعبة
        let gameCounts = games.map(game => ({
            gameName: game.name,
            count: 0
        }));

        // حساب عدد الطلبات لكل لعبة
        await students.forEach(student => {
            student.choices.forEach(choice => {
                // البحث عن اللعبة في قائمة الألعاب وحساب عدد مرات الطلب
                let game = gameCounts.find(g => g.gameName === choice.name);
                if (game) {
                    game.count += 1;
                }
            });
        });

        // إرجاع النتائج كـ JSON
        res.json(gameCounts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error });
    }
});

export default router