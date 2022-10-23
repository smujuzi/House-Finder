const email = require("./email");
let AWS = require("aws-sdk");
let awsConfig = {
  region: "eu-west-1",
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let checkPresent = async function (property_id) {
  let params = {
    TableName: "Properties",
    Key: {
      propertyId: property_id,
    },
    AttributesToGet: [property_id],
  };

  let exists = false;
  console.log("right here");
  let result = await docClient.get(params).promise();
  if (result.Item !== undefined && result.Item !== null) {
    exists = true;
  }
  console.log("out");

  return exists;
};

let process = async function (input, property_id) {
  console.log("current property id", property_id);
  //console.log("current input", input);

  let result = await checkPresent(property_id);

  if (!result) {
    await save(input);
    await email.sendPropertyEmail(input);
  } else {
    console.log("STUART LOG: Property already in table");
  }
  //else do nothing as property already in table
  console.log("end");
};

let save = async function (input) {
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
module.exports = { process };
