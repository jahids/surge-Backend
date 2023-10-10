import { UserRawActivity } from "../api/portfolio/portfolio.service";
import { addNewPortfolioStats } from "../models/portfolio-stats";
import { allUser } from "../models/user.model";
import { BrokerInstance } from "../utils/AlpacaInstance";
import nodeCron from "node-cron";
const getMarketStaus = async () => {
    const { data } = await BrokerInstance.get(`/v1/clock`);
    return data;
};
export const portfolioValueJobRunner = async () => {
    const cronSchedulePattern = `30 19 * * *`;
    const every2MinCronSchedulePattern = `*/3 * * * *`;
    nodeCron.schedule(cronSchedulePattern, () => {
        console.log(`🔥‼ Started Cron Job`);
        __portfolioJobRunner__();
    });
};

const __portfolioJobRunner__ = async () => {
    const userList = await allUser();
    for (let i = 0; i < userList.length; i++) {
        try {
            const res = await singlePortfolioJob(
                userList[i].alpaca_id,
                userList[i]._id.toString(),
            );
        } catch (error) {
            console.log((error as Error).message);
        }
    }
    console.log(`🔥‼ Cron Job Done!`);
};

const singlePortfolioJob = async (alpacaId: string, dbId: string) => {
    //get data from alpaca by alpaca id
    //insert data to stats db by dbId
    const { position_market_value: value } = await UserRawActivity(alpacaId);
    const finalValue = parseFloat(value!) || 0;
    const dbPayload = {
        date: new Date(),
        value: finalValue,
    };
    const result = await addNewPortfolioStats(dbId, dbPayload);
    // console.log(`🏡🏠🏡🏡 cron job Done for  : db_id = ${dbId}`);
};
