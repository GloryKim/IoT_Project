const mongoose=require("mongoose"); //(12)moogoose 라이브러리를 만들고 스키마를 만드는 것이다.
const DHT11Schema=mongoose.Schema({//(13)스키마를 만들고 3개의 속성을 만단다.
    tmp : { 
       type : String,//(14)string 현재
       required : true //(15)필수 입력 항목을 의미
    },
    hum  : { 
       type : String,
       required : true
    },
    created_at : { 
       type : Date,
       default : Date.now  } //(16)몽고디비에 있는 날짜 그대로 입력 미국시간 기준으로 해버린다.
    });
   module.exports = mongoose.model('DHT11', DHT11Schema); //(17)dht11이라는 객체 변수에 저장하는 것인데 이름을 DHT11로 저장했다. 자동으로 생성된다.