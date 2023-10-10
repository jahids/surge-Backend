import { countryModel } from "../../models/country.model";
import { Request, Response } from "express";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { availableCountries } from "../../configs/AvailableCountryList";

export const getAllCountries = async (req: Request, res: Response) => {
    const allCountry = await countryModel
        .find({}, ["name", "iso3", "-_id"])
        .exec();
    return res.status(200).json(ApiSuccess(allCountry));
};
