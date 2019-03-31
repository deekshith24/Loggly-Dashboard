const parseAuthData = (authData, result) => {
  //console.log("auth start");
  for (let i = 0; i < authData.events.length; i++) {
    const gtxnId = authData.events[i].event.json.GlobalTrasactionId;
    result[gtxnId]["Auth"] = {
      TotalTransactionTime: authData.events[i].event.json.TotalTransactionTime
    };
  }
  console.log("auth done");
  return result;
};

const parseDBData = (DBData, result) => {
  for (let i = 0; i < DBData.events.length; i++) {
    const gtxnId = DBData.events[i].event.json.GlobalTrasactionId;
    if (gtxnId) {
      //console.log(gtxnId);
      //console.log("result[gtxnId]:",result[gtxnId])
      if (!result[gtxnId].hasOwnProperty("DB")) {
        result[gtxnId]["DB"] = {
          TotalTransactionTime: DBData.events[i].event.json.TotalTransactionTime
        };
      } else {
        result[gtxnId]["DB"]["TotalTransactionTime"] +=
          DBData.events[i].event.json.TotalTransactionTime;
      }
    }
  }
  console.log("db done");
  return result;
};

const parseMuleData = muleData => {
  let result = {};
  for (let i = 0; i < muleData.events.length; i++) {
    const gtxnId = muleData.events[i].event.json.GlobalTrasactionId;
    let tempMuleResult = {};
    tempMuleResult["Response_Status"] =
      muleData.events[i].event.json.Response_Status;
    tempMuleResult["Response_Length"] =
      muleData.events[i].event.json.Response_Length;
      
    tempMuleResult["TotalTransactionTime"] = muleData.events[
      i
    ].event.json.TotalTransactionTime.split(" ")[0];
    tempMuleResult["TotalTimeTakenMule"] = muleData.events[
      i
    ].event.json.TotalTimeTakenMule.split(" ")[0];
    tempMuleResult["END_TIME"] = muleData.events[i].event.json.END_TIME;
    tempMuleResult["URL_PATH"] = muleData.events[i].event.json.URL_PATH;

    tempMuleResult["METHOD_TYPE"] = muleData.events[i].event.json.METHOD_TYPE;
    result[gtxnId] = { Mule: tempMuleResult };
  }
  console.log("mule done");
  return result;
};

module.exports = { parseMuleData, parseAuthData, parseDBData };
