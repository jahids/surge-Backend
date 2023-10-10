import { getAlpacaInstance } from "../../utils/AlpacaInstance";
import { faker, tr } from "@faker-js/faker";

export const accountRequestBuilder = (obj: any) => {
    const country = String("USA").toUpperCase();

    // console.log(`dead=`, obj);

    const defaultData = {
        contact: {
            email_address: obj.email_address,
            phone_number: obj.phone_number,
            street_address: [obj.street_address],
            // unit: "string",
            city: obj.city,
            state: obj.state,
            postal_code: obj.postal_code,
        },
        identity: {
            given_name: obj.given_name,
            family_name: obj.family_name,
            date_of_birth: new Date(obj.date_of_birth),
            //generating randomly from faker.js
            // tax_id: "666-55-4321",
            tax_id: faker.phone.number("###-##-####"),
            tax_id_type: "USA_SSN",
            country_of_citizenship: country,
            country_of_birth: country,
            country_of_tax_residence: country,
            funding_source: obj["funding_source"],
            // funding_source: ["employment_income"],
        },
        disclosures: {
            is_control_person: false,
            is_affiliated_exchange_or_finra: false,
            is_politically_exposed: false,
            immediate_family_exposed: false,
        },
        agreements: [
            {
                agreement: "customer_agreement",
                signed_at: new Date(),
                ip_address: obj.ip ?? faker.internet.ipv4(),
                // revision: "string",
            },
        ],
        documents: [
            {
                document_type: "identity_verification",
                document_sub_type: "passport",
                content: "/9j/Cg==",
                mime_type: "image/jpeg",
            },
        ],
        trusted_contact: {
            given_name: obj.given_name,
            family_name: obj.family_name,
            email_address: obj.email_address,
        },
        enabled_assets: ["us_equity"],
    };
    return defaultData;
};

export const createClientAccount = async (accountData: any, ip: string) => {
    const AlpacaInstance = getAlpacaInstance();

    const finalData = accountRequestBuilder({ ...accountData, ip });

    const { data } = await AlpacaInstance.post("/v1/accounts", finalData);
    return data;
};

export const getAllAlpacaAccount = async () => {
    const AlpacaInstance = getAlpacaInstance();
    const { data } = await AlpacaInstance.get("/v1/accounts");
    return data;
};
export const getSingleAccount = async (acountId: string) => {
    const AlpacaInstance = getAlpacaInstance();
    const { data } = await AlpacaInstance.get(`/v1/accounts/${acountId}`);
    return data;
};
