import express from "express";
import { StudentInfo } from "../models/student.js";
import { GamesInfo } from "../models/game.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let gameLists = await StudentInfo.find({}, { choices: 1, _id: 0 });
        let games = await GamesInfo.find({}); // احصل على games من GamesInfo

        // كائن لتتبع عدد الطلبات لكل لعبة
        let gameCounts = {};

        // حساب عدد الطلبات لكل لعبة
        for (let i = 0; i < gameLists.length; i++) {
            let gameList = gameLists[i].choices;
            
            for (let j = 0; j < gameList.length; j++) {
                let gameName = gameList[j];
                if (gameCounts[gameName]) {
                    gameCounts[gameName] += 1;
                } else {
                    gameCounts[gameName] = 1;
                }
            }
        }

        // تحديث إجمالي الطلبات لكل لعبة في قاعدة البيانات
        for (let gameName in gameCounts) {
            await GamesInfo.findOneAndUpdate(
                { name: gameName },
                { $inc: { total: gameCounts[gameName] } }
            );
        }

        // إعادة تحميل الألعاب من قاعدة البيانات للتأكد من أن البيانات محدثة
        games = await GamesInfo.find({});

        // بناء الاستجابة النهائية
        let totalOrdersPerList = [];
        for (let gameName in gameCounts) {
            totalOrdersPerList.push({ game: gameName, totalOrders: gameCounts[gameName] });
        }

        return res.status(200).json({ totalOrdersPerList });
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ message: "حدث خطأ في استرجاع البيانات" });
    }
});

export default router;
