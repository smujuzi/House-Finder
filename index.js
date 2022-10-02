const axios = require("axios");
const Property = require("./property.js");
require('dotenv/config');

const options = {
  method: "GET",
  url: "https://zoopla.p.rapidapi.com/properties/list",
  params: {
    area: "Bristol",
    identifier: "Bristol",
    category: "residential",
    order_by: "age",
    ordering: "descending",
    page_number: "1",
    page_size: "3",
  },
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "zoopla.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    let properties = response.data.listing;

    for (let property of properties) {
      listing = new Property.Property(
        property.title,
        property.agent_name,
        property.agent_phone,
        property.location_is_approximate,
        property.furnished_state,
        property.property_type,
        property.rental_prices.per_month,
        property.available_from_display,
        property.displayable_address,
        property.details_url
      );
      listing.createJSONFile();
    }

    // fs.appendFile(
    //   "./propertyListings/result3.json",
    //   JSON.stringify(response.data.listing[0]),
    //   function (err) {
    //     if (err) throw err;
    //     console.log("Saved!");
    //   }
    // );
  })
  .catch(function (error) {
    console.error(error);
  });
