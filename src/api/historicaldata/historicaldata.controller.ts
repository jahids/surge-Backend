// import { Request, Response } from "express";
// import { ApiSuccess } from "../../utils/ApiSuccess";
// import { ApiError } from "../../utils/ApiError";
// import axios from "axios";

// export const historicaldata = async (req: Request, res: Response) => {

//     try {
//         // const response = await axios.get(`http://api.marketstack.com/v1/eod`, {
//         //     params: {
//         //         access_key: '9bb7121cefa8c8c7d092d4676813b413',
//         //         symbols: req?.body?.symbol || 'AMD',
//         //         date_from: req?.body?.datefrom || '2023-05-1',
//         //         date_to: '2023-09-23',
//         //       },
//         // })

//         let config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: 'http://api.marketstack.com/v1/eod?access_key=9bb7121cefa8c8c7d092d4676813b413&symbols=TSLA&date_from=2023-09-13&date_to=2023-09-14',
//             headers: { }
//           };

//        const response =   axios.request(config)
//           .then((response) => {
//             console.log(JSON.stringify(response.data));
//           })
//           .catch((error) => {
//             console.log(error);
//           });

//         console.log('dta-.', response);

//         return res.status(200).json(ApiSuccess(response));
//     } catch (error) {
//       //return res.send(error)
//         return res.status(500).json(ApiError((error as Error).message));
//     }
// };

import { Request, Response } from "express";
import axios from "axios";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";

export const historicaldata = async (req: Request, res: Response) => {
    try {
        const { dateFrom, symbol, startdate } = req?.params;
        // Define the API request configuration
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://api.marketstack.com/v1/eod",
            params: {
                access_key: "9bb7121cefa8c8c7d092d4676813b413",
                symbols: symbol,
                date_from: dateFrom,
                date_to: startdate,
            },
        };

        // Send the API request
        const response = await axios.request(config);

        // Log the response data (for debugging purposes)
        console.log("API Response:", response?.data);

        // Return the API response to the client as a successful response
        return res.status(200).json(ApiSuccess(response?.data));
    } catch (error) {
        // Handle errors
        console.error("API Error:", error);

        // Return an error response to the client
        return res
            .status(500)
            .json(
                ApiError(
                    error instanceof Error
                        ? error.message
                        : "Internal Server Error",
                ),
            );
    }
};
