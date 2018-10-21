const assert = require('assert');

const mqttProvider = require('../src/mqtt-provider')

describe('TCP Connection - simple send/receive', () => {
    
    it("should send and receive a message using TCP connection.", (done) => {
        mqttProvider.init("mqtt://localhost:1884", "", "", "simple-mqtt-client/test", (mqttClient) => {
            
            mqttClient.subscribe("simpleTestTCP", (msg) => {
                assert.equal(msg.text, "HelloWorld!");            
                done();
            })
            setTimeout(() => {
                mqttClient.publish("simpleTestTCP", { text: "HelloWorld!" })
            }, 30)
        });
    }).timeout(5000)
  
})