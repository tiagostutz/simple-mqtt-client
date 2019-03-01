const assert = require('assert');

const mqttProvider = require('../src/mqtt-provider')

describe('WebSocket - simple send/receive', () => {    

    it("should send and receive a message using WebSocket with port config.", (done) => {
        mqttProvider.new().init("http://localhost:8084/mqtt", "", "", "simple-mqtt-client/test", (mqttClient) => {            
            
            mqttClient.subscribe("simpleTestWS", (msg) => {
                assert.equal(msg.text, "HelloWorldWS!");            
                done();
            })
            setTimeout(() => {
                mqttClient.publish("simpleTestWS", { text: "HelloWorldWS!" })
            }, 30)
        });
    }).timeout(5000)
    
})