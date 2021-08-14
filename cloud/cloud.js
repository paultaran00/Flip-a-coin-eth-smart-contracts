Moralis.Cloud.define("biggestwinners", async (request) => {
    const query = new Parse.Query("flips");
    query.equalTo("win", true);

    const pipeline = [
        {
            group:{
                objectId: "$user",
                total_sum: { $sum: {$toInt: "$bet"}}
            }
        },
        { sort : { total_sum: -1 } }
    ]


    const result = await query.aggregate(pipeline, {useMasterKey: true});
    return result;
});











// use to compile and send to server
// moralis-admin-cli watch-cloud-folder --moralisApiKey lUPMZBeuo1q0hxj --moralisApiSecret sIWenaTAO6uZLXL --moralisSubdomain qbgrfr4bspbb.moralisweb3.com --autoSave 1 --moralisCloudfolder "C:/Users/pol/Desktop/flipacoin/cloud"


// truffle console
// migrate
// pui contract address:    0xcaBA4acd7......  la contractInstance
// .\frpc.exe -c .\frpc.ini ca sa linkeze ganacheu cu db ul