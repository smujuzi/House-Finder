const aws = require("aws-sdk");
aws.config.update({
  region: "eu-west-1",
});

async function sendPropertyEmail(propertyInfo) {
  const ses = new aws.SES();

  //Create createTemplate params
  // var propertytemplate = {
  //   Template: {
  //     TemplateName: "propertytemplate" /* required */,
  //     HtmlPart:
  //       "<html>\r\n\r\n<head>\r\n <title>Test Title</title>\r\n</head>\r\n\r\n<body>\r\n {{response}} \r\n</body>\r\n\r\n</html>",
  //     SubjectPart: "* NEW PROPERTY AVAILABLE *",
  //     TextPart: "Test email body!",
  //   },
  // };
  // //USED TO CREATE EMAIL TEMPLATE - ONLY NEEDS TO BE CREATED ONCE IN AWS
  // try {
  //   result = await ses.createTemplate(propertytemplate).promise();
  // } catch {
  //   console.log("failed");
  // }

  const destination = {
    ToAddresses: ["stuartmujuzi@gmail.com"],
  };

  const templateData = {
    response: getResponseProperty(propertyInfo),
  };

  const params = {
    Source: "stuartmujuzi@gmail.com",
    Destination: destination,
    Template: "propertytemplate",
    TemplateData: JSON.stringify(templateData),
  };

  const email_data = await ses.sendTemplatedEmail(params).promise();
  console.info("Successfully sent the email : " + JSON.stringify(email_data));
}

function getResponseProperty(propertyInfo) {
  console.log("STUART LOG: Property Info Object", propertyInfo);

  const response = `
          <h1> New Property Added: <\/h1>
          <h3> Check out the details below! </h3>
          <p> Property-Id: ${propertyInfo["propertyId"]} <br>
              Title: ${propertyInfo["title"]} <br>
              Agent-Name: ${propertyInfo["agentName"]} <br>
              Agent-Phone: ${propertyInfo["agentPhone"]} <br>
              Location-Approx: ${propertyInfo["locationIsApprox"]} <br>
              Furnished-State: ${propertyInfo["furnishedState"]} <br>
              Property-Type: ${propertyInfo["propertyType"]} <br>
              Rental-Price: ${propertyInfo["rentalPrice"]} <br>
              Available-From: ${propertyInfo["availableFrom"]} <br>
              Display-Address: ${propertyInfo["displayableAddress"]} <br>
              Details: ${propertyInfo["details"]} 
          <\/p>
      `;

  return response;
}

module.exports = { sendPropertyEmail };
