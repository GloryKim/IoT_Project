const mongoose = require("mongoose"); // 26_mongoose도 가져온다

function connectToDB() {
  mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
  );
}

module.exports = {
  connectToDB,
};
