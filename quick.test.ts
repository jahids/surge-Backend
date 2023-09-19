import { TradeSdk } from "./src/utils/TradeSdk";

// {
//     id: 'e849d955-b948-4d49-becb-cca3950289ef',
//     class: 'us_equity',
//     exchange: 'OTC',
//     symbol: 'NESR',
//     name: 'National Energy Services Reunited Corp. Ordinary Shares',
//     status: 'active',
//     tradable: false,
//     marginable: false,
//     maintenance_margin_requirement: 100,
//     shortable: true,
//     easy_to_borrow: true,
//     fractionable: false,
//     attributes: []
//   }

const main = async () => {
    console.clear();
    const result = await TradeSdk.getAssets({
        status: "active",
    });
    // const accountData = await TradeSdk.getAccount();
    // console.log(`account status : ${accountData.status}`);
    console.log(result.filter((v: any) => v.tradable));
};

main();
