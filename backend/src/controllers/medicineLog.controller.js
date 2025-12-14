const medicineLogModel = require('../models/medicineLog.model')

async function getTodayLogs(req, res){
    try {
        const userId = req.userId;

        if (!userId){
            return res.status(401).json({
                message : "Unauthorized."
            });
        }
        const today = new Date();

        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999); // Note this it is done like this.

        const todayLogs = await medicineLogModel.find({
            date : {$gte : todayStart, $lte : todayEnd},
            userId
        })

        // if (todayLogs.length == 0){
        //     return res.status(400).json({
        //         message : "No medications made yet."
        //     })
        // }

        return res.status(200).json({
            message : `Today's logs found`,
            logs : todayLogs
        });
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

async function markAsTaken(req, res) {
    try {
        const { logId } = req.params;
        const userId = req.userId;
        const today = new Date();
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized."
            });
        }

        if (!logId) {
            return res.status(400).json({
                message: "logId is required."
            });
        }

        const log = await medicineLogModel.findOneAndUpdate(
            {
                _id: logId,
                userId,
                status: "pending",
                date : { $gte : todayStart, $lte : todayEnd }
            },
            { $set: { status: "taken" } },
            { new: true }
        );

        if (!log) {
            return res.status(404).json({
                message: "Log not found or already finalized."
            });
        }

        return res.status(200).json({
            message: "Medicine marked as taken."
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    getTodayLogs,
    markAsTaken
}