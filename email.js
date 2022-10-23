const aws = require("aws-sdk");
aws.config.update({
  region: "eu-west-1",
});

// const propertyInfo = {
//   "Property-Id": 2694301,
//   Title: "2 bed flat to rent",
//   "Agent-Name": "Homelink",
//   "Agent-Phone": "01834 818024",
//   "Location-Approx": 0,
//   "Furnished-State": "part_furnished",
//   "Property-Type": "Flat",
//   "Rental-Price": 1400,
//   "Available-From": "Available from 30th Oct 2022",
//   "Display-Address": "Balcony Flat, West Mall, Clifton BS8",
//   Details:
//     "https://www.zoopla.co.uk/to-rent/details/62711294?utm_source=v1:5bWFDybfWx7C7AGpeagt7mP3PgcqjuqJ&utm_medium=api",
// };

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
  //return email_data
}

function getResponseProperty(propertyInfo) {
  console.log("STUART LOG: Property Info Object", propertyInfo);

  const response = `
          <h1> New Property Added: <\/h1>
          <h3> Check out the details below! </h3>
          <p> Property-Id: ${propertyInfo["listingId"]} <br>
              Title: ${propertyInfo["Title"]} <br>
              Agent-Name: ${propertyInfo["Agent-Name"]} <br>
              Agent-Phone: ${propertyInfo["Agent-Phone"]} <br>
              Location-Approx: ${propertyInfo["Location-Approx"]} <br>
              Furnished-State: ${propertyInfo["Furnished-State"]} <br>
              Property-Type: ${propertyInfo["Property-Type"]} <br>
              Rental-Price: ${propertyInfo["Rental-Price"]} <br>
              Available-From: ${propertyInfo["Available-From"]} <br>
              Display-Address: ${propertyInfo["Display-Address"]} <br>
              Details: ${propertyInfo["Details"]} 
          <\/p>
      `;

  return response;
}

// sendPropertyEmail(propertyInfo);

module.exports = { sendPropertyEmail };
