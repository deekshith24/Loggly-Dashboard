const request = require("request");
const URLs = require("../utils/URLs");
const { parseMuleData, parseAuthData, parseDBData } = require("./getData");

const getPerformanceMatrix = async (req, res, next) => {
  const muleData = await getLogglyData(
    URLs.muleURL + `from=${req.query.from}&until=${req.query.to}`
  );
  let result = await parseMuleData(muleData);

  const DBData = await getLogglyData(
    URLs.DBURL + `from=${req.query.from}&until=${req.query.to}`
  );
  result = await parseDBData(DBData, result);

  const authData = await getLogglyData(
    URLs.AuthURL + `from=${req.query.from}&until=${req.query.to}`
  );
  result = await parseAuthData(authData, result);

  res.setHeader("Content-Type", "application/json");
  
  res.send(JSON.stringify(result));
};
const getLogglyData = url => {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      headers: {
        Authorization: "bearer 67b2fa0c-0dba-4262-91e7-ce6ec100a244"
      }
    };
    console.log("requesting data")
    request(options, function(error, response, body) {

      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body);
        console.log("got data")
        resolve(result);
      }
    });
   
  });
};
module.exports = getPerformanceMatrix;
