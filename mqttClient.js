// (1)mosquitto server dht11 topic에서 온도 습도 데이터를 읽어오기
const mqtt = require("mqtt"); //(2)mqtt 모듈을 먼저 불러오는 작업이다.
const client = mqtt.connect(process.env.MQTT_URL); //(3)가장 먼저 수행을 해야할 것은 바로 mqtt와 접속할 수 있는 client를 만들어 주는 작업을 수행해야한다. 이 말이 바로 nodejs와 mqtt 쪽에서 connect를 하겠다라는 의미라고 생각하시면 쉽습니다.
const DHT11 = require("./models/DHT11"); //(18)모듈을 불러오고 이 객체의 이름을 DHT11로 하겠다.
const { getCurrentUTCDate } = require("./lib/utils");

//(4) nodejs ---> mosquitto server 즉 Nodejs에서 mosquitto server로 접속을 하는 작업이다.
client.on("connect", () => {
  //(5)on이라는 함수가 이벤트 함수인데 "connect"가 된다면 {} 사이의 내용이 실행된다.
  console.log("MQTT Connected"); //(6) console 로그 창에 mqtt connect가 나오게 되고
  client.subscribe("dht11"); //(7) dht11을 구독하고 있는 작업을 수행하는 것까지 작성을 한다. 수신자를 설정 하는 작업
});

client.on("message", (topic, message) => {
  //(8) {"tmp":25.00,"hum":37.00} =>JSON(Object) //message가 들어오면 아래의 작업을 수행을 하는데 우리가 mqtt에서 배웠을때 예시로 dht11 이라고 선언한 토픽에 대한 내용도 추가를 해줘야만 한다. 그래서 토픽과, 실제 값이 들어가는 인자 값 까지 챙겨야하니 이 부분을 참고한다.
  const { tmp, hum } = JSON.parse(message); //(9) 이작업은 mqtt에서 들어온 msg가 {"tmp":25.00,"hum":37.00}라는 문자열로 들어온다. 그런데 이건 너무 귀찮으니 JSON 형태로 바꿔주면 속성값으로 취급이 가능하기가 용이하기에 JSON으로 바꿔주는 작업을 수행한다.

  const dht11 = new DHT11({
    //(19)객체를 생성을 하고
    tmp, //20_값들을 집어 넣는 작업이다.
    hum,
    created_at: getCurrentUTCDate(),
  });
  try {
    const saveDHT11 = dht11.save(); //21_DB에 저장한 다음에
    console.log("insert OK");
  } catch (err) {
    console.log({ message: err }); //22_예외 처리를 해주는 작업
  }
});
