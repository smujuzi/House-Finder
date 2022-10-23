const aws = require("aws-sdk");
aws.config.update({
  region: "eu-west-1",
});

async function sendCelebrationEmail(tempKampala, tempLondon) {
  const ses = new aws.SES();

  // Create createTemplate params
  //   var testtemplate = {
  //     Template: {
  //       TemplateName: "testtemplate" /* required */,
  //       HtmlPart:
  //         "<html>\r\n\r\n<head>\r\n <title>Test Title</title>\r\n</head>\r\n\r\n<body>\r\n {{response}} \r\n</body>\r\n\r\n</html>",
  //       SubjectPart: "Temperature Difference",
  //       TextPart: "Test email body!",
  //     },
  //   };
  // USED TO CREATE EMAIL TEMPLATE - ONLY NEEDS TO BE CREATED ONCE IN AWS
  //   try {
  //     result = await ses.createTemplate(testtemplate).promise();
  //   } catch {
  //     console.log("failed");
  //   }

  const destination = {
    ToAddresses: ["stuartmujuzi@gmail.com"],
  };

  tempKampala = Math.round(tempKampala);
  tempLondon = Math.round(tempLondon);
  const diff = getDiff(tempKampala, tempLondon);

  const templateData = {
    response: getResponse(diff, tempKampala, tempKampala),
  };

  const params = {
    Source: "stuartmujuzi@gmail.com",
    Destination: destination,
    Template: "testtemplate",
    TemplateData: JSON.stringify(templateData),
  };

  console.log("Up to here");

  const email_data = await ses.sendTemplatedEmail(params).promise();
  console.info("Successfully sent the email : " + JSON.stringify(email_data));
  //return email_data
}

function getDiff(tempKampala, tempLondon) {
  return Math.round(tempKampala - tempLondon);
}

function getResponse(diff, tempKampala, tempLondon) {
  const response = `<h1> Temperature: <\/h1> <h3> The day has finally arrived! </h3> <p> Uganda: ${tempKampala}C <br> UK: ${tempLondon}C <br> Difference: ${diff}C`;

  return response;
}

sendCelebrationEmail(20, 25);

module.exports = { sendCelebrationEmail, getResponse, getDiff };
