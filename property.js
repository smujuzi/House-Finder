const fs = require("fs");

class Property {
  //important
  title;
  agentName;
  agentPhone;
  locationIsApprox;
  furnishedState;
  propertyType;
  rentalPrice;
  availableFrom;
  displayableAddress;
  details;

  //extra
  /**
     * lastPublishedDate;
       numBedrooms;
       lisitngStatus;
       listingDate;
       shortDescription;
       status; 
       propertyBadge;
       firstPublishedDate;
     */

  constructor(
    title,
    agentName,
    agentPhone,
    locationIsApprox,
    furnishedState,
    propertyType,
    rentalPrice,
    availableFrom,
    displayableAddress,
    details
  ) {
    this.title = title;
    this.agentName = agentName;
    this.agentPhone = agentPhone;
    this.locationIsApprox = locationIsApprox;
    this.furnishedState = furnishedState;
    this.propertyType = propertyType;
    this.rentalPrice = rentalPrice;
    this.availableFrom = availableFrom;
    this.displayableAddress = displayableAddress;
    this.details = details;
  }

  createJSONFile() {
    let jsonObject = {
      Title: this.title,
      "Agent-Name": this.agentName,
      "Agent-Phone": this.agentPhone,
      "Location-Approx": this.locationIsApprox,
      "Furnished-State": this.furnishedState,
      "Property-Type": this.propertyType,
      "Rental-Price": this.rentalPrice,
      "Available-From": this.availableFrom,
      "Display-Address": this.displayableAddress,
      Details: this.details,
    };
    let fileName = this.displayableAddress.replace(/\s+/g, "");

    fs.appendFile(
      "./propertyListings/" + fileName + ".json",
      JSON.stringify(jsonObject),
      function (err) {
        if (err) throw err;
        console.log("Saved " + fileName + "!");
      }
    );
  }
}

module.exports = {
  Property,
};
