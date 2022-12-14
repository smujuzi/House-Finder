const axios = require("axios");
const Property = require("./property.js");
require("dotenv/config");
const upload = require("./write");
const searchCriteria = require("./searchCriteria.js");

exports.handler = (event, context, callback) => {
  response = findHouse();

  callback(null, response);
};

async function findHouse() {
  try {
    axios
      .request(searchCriteria.options)
      .then(function (response) {
        let properties = response.data.listing;
        for (let property of properties) {
          listing = new Property.Property(
            parseInt(property.listing_id),
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
          upload.process(listing, parseInt(property.listing_id));
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch {
    console.log("failed!");
    return false;
  }
  return true;
}

//findHouse();
