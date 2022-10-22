let AWS = require("aws-sdk");
let awsConfig = {
  region: "eu-west-1",
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function (input) {
  
  let params = {
    TableName: "Properties",
    Item: input,
  };
  docClient.put(params, function (err, data) {
    if (err) {
      console.log("Properties::save::error - " + JSON.stringify(err, null, 2));
    } else {
      console.log("Properties::save::success");
    }
  });
};
module.exports = { save };
