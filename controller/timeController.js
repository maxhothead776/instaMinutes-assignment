const moment = require("moment");

const triggerFunction = async (req, res) => {
  try {
    
    // importing the reqquestbody

    let eventArray = req.body.eventQueue;

    // if body is empty
    if (!eventArray) {
      return res
        .status(400)
        .send({ status: "failure", msg: "input the time events" });
    }

    // going through every event
    for (let i = 0; i < eventArray.length; i++) {
      const givenDate = moment(new Date(`${eventArray[i].dateTime}`)).format(
        "Y-M-D H:m:s"
      );

      // how to get the delay between current time and inputted time
      const date = new Date(givenDate);
      const currentDate = new Date();
      console.log(date);
      console.log(currentDate);
      let diff = date - currentDate;
      let delayTime = diff + eventArray[i].text.length * 1000;

      // consoling the output after the delay
      setTimeout(() => {
        console.log(`waiting for ${eventArray[i].text.length} seconds`);
        console.log(eventArray[i].text.split("").reverse().join(""));
      }, delayTime);
    }

    res.status(201).send({ status: "success", msg: "event initiated" });

  } catch (err) {
    res.status(500).send({ status: "failure", err: err.message });
  }
};

module.exports.triggerFunction = triggerFunction;
