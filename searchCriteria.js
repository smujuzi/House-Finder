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

  module.exports = { options };