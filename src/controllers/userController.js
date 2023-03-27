const userModel = require("../models/userModel");
const axios = require("axios");
const moment = require("moment");
const { isValid, isValidTime, getUUID } = require("../utils/utils");

//------------------------------------------------------------------------------------------------------------------------------------------------------

const createUser = async (req, res) => {
  try {
    // data sent through request body
    const body = req.body;

    let { name, value } = body;
    value = parseInt(value);

    if (!isValid(name)) {
      return res.status(400).send({
        status: false,
        message: "name is required and it should contain only alphabets",
      });
    }

    if (!isValidTime(value)) {
      return res.status(400).send({
        status: false,
        message: "value is required and it should be a valid number",
      });
    }
    const id = getUUID();
    const sql = "INSERT INTO users(id, name, value) VALUES ?";
    const values = [[id, name, value]];

    await userModel.create(sql, values);
    const checkIdQuery = "SELECT * FROM users WHERE id = ?";
    const user = await userModel.findOne(checkIdQuery, id);
    const userData = JSON.parse(JSON.stringify(user));
    const requestedTime = value;

    const currentTime = moment().format("HH");

    if (requestedTime < currentTime) {
      return res.status(400).send("Requested time has already passed today.");
    }

    const weatherResponse = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/3120827?apikey=mUqyGmwvC8XHUosh2P5a9vSZvDu95s0G`
    );
    const weatherData = weatherResponse.data;
    for (const weather of weatherData) {
      const weatherTime = moment(weather.EpochDateTime * 1000).format("HH");
      if (requestedTime == weatherTime) {
        return res.status(200).send({
          status: true,
          data: { name: userData[0].name, weather: weather.Temperature },
        });
      }
    }
    return res
      .status(400)
      .send(
        `Weather data is not available for the requested time: ${requestedTime}`
      );
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { createUser };
