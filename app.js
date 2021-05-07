// (1)mosquitto server dht11 topic에서 온도 습도 데이터를 읽어오기
const mqtt = require("mqtt"); //(2)mqtt 모듈을 먼저 불러오는 작업이다.
const client = mqtt.connect("mqtt://192.168.0.48");//(3)가장 먼저 수행을 해야할 것은 바로 mqtt와 접속할 수 있는 client를 만들어 주는 작업을 수행해야한다. 이 말이 바로 nodejs와 mqtt 쪽에서 connect를 하겠다라는 의미라고 생각하시면 쉽습니다.
const DHT11=require("./models/DHT11");//(18)모듈을 불러오고 이 객체의 이름을 DHT11로 하겠다.

const express = require("express"); //(23)_express 객체 생성
const app = express();//24_express의 생성자로 만든다.
const http = require("http");//25_http 모듈도 가져와야한다.
const mongoose=require("mongoose");// 26_mongoose도 가져온다
require('dotenv/config');// 27_env 파일 가져온다 . (중요) 맨처음 dotenv  모듈을 설치를 안했는데, npm install dotenv를 설치를 해주자

//(4) nodejs ---> mosquitto server 즉 Nodejs에서 mosquitto server로 접속을 하는 작업이다.
client.on("connect", ()=>{  //(5)on이라는 함수가 이벤트 함수인데 "connect"가 된다면 {} 사이의 내용이 실행된다.
    console.log("mqtt connect"); //(6) console 로그 창에 mqtt connect가 나오게 되고
    client.subscribe("dht11"); //(7) dht11을 구독하고 있는 작업을 수행하는 것까지 작성을 한다. 수신자를 설정 하는 작업
 });


 client.on("message", (topic, message)=>{  //(8) {"tmp":25.00,"hum":37.00} =>JSON(Object) //message가 들어오면 아래의 작업을 수행을 하는데 우리가 mqtt에서 배웠을때 예시로 dht11 이라고 선언한 토픽에 대한 내용도 추가를 해줘야만 한다. 그래서 토픽과, 실제 값이 들어가는 인자 값 까지 챙겨야하니 이 부분을 참고한다.
    var obj=JSON.parse(message);//(9) 이작업은 mqtt에서 들어온 msg가 {"tmp":25.00,"hum":37.00}라는 문자열로 들어온다. 그런데 이건 너무 귀찮으니 JSON 형태로 바꿔주면 속성값으로 취급이 가능하기가 용이하기에 JSON으로 바꿔주는 작업을 수행한다.
    var date = new Date(); //(10)우리는 tmp랑 hum 값만 취급했는데 여기에 date를 집어 넣고
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();//(11)표준시차
    obj.created_at=new Date(Date.UTC(year, month, today, hours, minutes, seconds));  //(11)created_at 이후로 date 를 넣어서 출력을 할 수도 있다. obj에 create를 하는 작업
    console.log(obj)

    const dht11=new DHT11({ //(19)객체를 생성을 하고
        tmp : obj.tmp, //20_값들을 집어 넣는 작업이다.
        hum : obj.hum,
        created_at : obj.created_at
     });
     try{
       const saveDHT11=dht11.save(); //21_DB에 저장한 다음에
       console.log("insert OK");
     }catch(err){
        console.log({message : err}); //22_예외 처리를 해주는 작업
     }

    
});




   // web server 만들기 : express
   app.set("port", "3000");
   var server=http.createServer(app); //서버를 하나 만든다.


   server.listen(3000, (err)=>{ //에러처리
     if(err){
         return console.log(err);
     }else{
        console.log("server ready");
        //Connection To DB
        mongoose.connect(process.env.MONGODB_URL, 
            { useNewUrlParser: true,useUnifiedTopology: true },
            ()=> console.log('connected to DB!')
        );
     }
    });