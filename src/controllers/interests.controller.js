import { db } from "../index.js"
import { dateToTimestamp } from "../utils/common.functions.js";

async function calculateInterest(req, res) {
    try {
        const { fromDate, toDate, monthlyInterestRate, totalAmount } = req.body

        const from = await dateToTimestamp(fromDate);
        const to = await dateToTimestamp(toDate);
        const days = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);

        const dailyInterestRate = monthlyInterestRate * 12 / 365;
        const totalInterest = parseFloat((totalAmount * dailyInterestRate * days / 100).toFixed(2));
  
        res.send({ statusCode: 200, days, totalInterest, totalAmountAfterInterest: totalAmount + totalInterest });
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const interestController = {
    calculateInterest
}