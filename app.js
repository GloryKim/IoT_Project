require("dotenv/config"); // 27_env 파일 가져온다 . (중요) 맨처음 dotenv  모듈을 설치를 안했는데, npm install dotenv를 설치를 해주자
require("./mqttClient");

const express = require("express"); //(23)_express 객체 생성
const app = express(); //24_express의 생성자로 만든다.
const http = require("http"); //25_http 모듈도 가져와야한다.
const mongoose = require("mongoose"); // 26_mongoose도 가져온다

// web server 만들기 : express
app.set("port", process.env.PORT);
var server = http.createServer(app); //서버를 하나 만든다.

server.listen(3000, (err) => {
  //에러처리
  if (err) {
    return console.log(err);
  } else {
    console.log("server ready");
    //Connection To DB
    mongoose.connect(
      process.env.MONGODB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("connected to DB!")
    );
  }
});
