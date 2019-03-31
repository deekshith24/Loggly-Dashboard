const { Router } = require("express");
const router = Router();
const getPerformanceMatrix = require("../controller/getPerformanceMatrix");

router.get("/getPerformanceMatrix", getPerformanceMatrix);
// router.get("/getPerformanceMatrix",function(req,res,next){
//     res.setHeader("Content-Type", "application/json");
//     res.send(JSON.stringify({
//         "1000006198": {
//             "Mule": {
//                 "Response_Status": 200,
//                 "Response_Length": "149418",
//                 "TotalTransactionTime": "5.132",
//                 "TotalTimeTakenMule": "5.132",
//                 "END_TIME": "2019-03-06T05:34:54.392Z",
//                 "URL_PATH": "http://uat-lineage-wms-api.us-w2.cloudhub.io/orders/outbounds/details"
//             },
//             "DB": {
//                 "TotalTransactionTime": 4.893
//             },
//             "Auth": {
//                 "TotalTransactionTime": "0.053"
//             }
//         },
//         "1000006199": {
//             "Mule": {
//                 "Response_Status": 200,
//                 "Response_Length": "15860",
//                 "TotalTransactionTime": "0.256",
//                 "TotalTimeTakenMule": "0.256",
//                 "END_TIME": "2019-03-06T05:34:55.999Z",
//                 "URL_PATH": "http://uat-lineage-wms-api.us-w2.cloudhub.io/orders/outbounds?outbound_order_id=O_5_1330845"
//             },
//             "DB": {
//                 "TotalTransactionTime": 0.42600000000000005
//             },
//             "Auth": {
//                 "TotalTransactionTime": "0.002"
//             }
//         },
//         "1000006200": {
//             "Mule": {
//                 "Response_Status": 200,
//                 "Response_Length": "195150",
//                 "TotalTransactionTime": "1.149",
//                 "TotalTimeTakenMule": "1.149",
//                 "END_TIME": "2019-03-06T05:34:57.692Z",
//                 "URL_PATH": "http://uat-lineage-wms-api.us-w2.cloudhub.io/orders/inbounds/details"
//             },
//             "DB": {
//                 "TotalTransactionTime": 0.808
//             },
//             "Auth": {
//                 "TotalTransactionTime": "0.004"
//             }
//         },
//         "1000006201": {
//             "Mule": {
//                 "Response_Status": 200,
//                 "Response_Length": "1542",
//                 "TotalTransactionTime": "0.366",
//                 "TotalTimeTakenMule": "0.366",
//                 "END_TIME": "2019-03-06T05:34:59.382Z",
//                 "URL_PATH": "http://uat-lineage-wms-api.us-w2.cloudhub.io/orders/inbounds?inbound_order_id=I_5_1326683"
//             },
//             "DB": {
//                 "TotalTransactionTime": 0.21000000000000002
//             },
//             "Auth": {
//                 "TotalTransactionTime": "0.001"
//             }
//         },
//         "1000006202": {
//             "Mule": {
//                 "Response_Status": 200,
//                 "Response_Length": "149418",
//                 "TotalTransactionTime": "4.951",
//                 "TotalTimeTakenMule": "4.951",
//                 "END_TIME": "2019-03-06T10:31:45.696Z",
//                 "URL_PATH": "http://uat-lineage-wms-api.us-w2.cloudhub.io/orders/outbounds/details"
//             },
//             "DB": {
//                 "TotalTransactionTime": 4.604
//             },
//             "Auth": {
//                 "TotalTransactionTime": "0.045"
//             }
//         },
//         "1000006203": {
//             "Mule": {
//                 "Response_Status": 200,
//                 "Response_Length": "15860",
//                 "TotalTransactionTime": "0.212",
//                 "TotalTimeTakenMule": "0.212",
//                 "END_TIME": "2019-03-06T10:31:47.291Z",
//                 "URL_PATH": "http://uat-lineage-wms-api.us-w2.cloudhub.io/orders/outbounds?outbound_order_id=O_5_1330846"
//             },
//             "DB": {
//                 "TotalTransactionTime": 0.213
//             },
//             "Auth": {
//                 "TotalTransactionTime": "0.002"
//             }
//         },
//         "1000006204": {
//             "Mule": {
//                 "Response_Status": 200,
//                 "Response_Length": "195150",
//                 "TotalTransactionTime": "1.43",
//                 "TotalTimeTakenMule": "1.43",
//                 "END_TIME": "2019-03-06T10:31:48.907Z",
//                 "URL_PATH": "http://uat-lineage-wms-api.us-w2.cloudhub.io/orders/inbounds/details"
//             },
//             "DB": {
//                 "TotalTransactionTime": 0.948
//             },
//             "Auth": {
//                 "TotalTransactionTime": "0.002"
//             }
//         },
//         "1000006205": {
//             "Mule": {
//                 "Response_Status": 200,
//                 "Response_Length": "1542",
//                 "TotalTransactionTime": "0.333",
//                 "TotalTimeTakenMule": "0.333",
//                 "END_TIME": "2019-03-06T10:31:50.578Z",
//                 "URL_PATH": "http://uat-lineage-wms-api.us-w2.cloudhub.io/orders/inbounds?inbound_order_id=I_5_1326683"
//             },
//             "DB": {
//                 "TotalTransactionTime": 0.21700000000000003
//             },
//             "Auth": {
//                 "TotalTransactionTime": "0.001"
//             }
//         }
//     }))
// })
module.exports = router;
