require("dotenv/config"); // 27_env 파일 가져온다 . (중요) 맨처음 dotenv  모듈을 설치를 안했는데, npm install dotenv를 설치를 해주자
require("./mqttClient");

const express = require("express"); //(23)_express 객체 생성
const { connectToDB } = require("./db");
const app = express(); //24_express의 생성자로 만든다.

// web server 만들기 : express
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Express server listening on localhost:${PORT}`);

  connectToDB();
});
