const assert = require('assert');

const mqttProvider = require('../src/mqtt-provider')

describe('WebSocketSecure - simple send/receive', () => {
    
    it("should send and receive a message using WebSocketSecure in default port.", (done) => {
        mqttProvider.init("https://iot.eclipse.org/ws", "", "", "simple-mqtt-client-wss/test", (mqttClient) => {            
            
            mqttClient.subscribe("simpleTestWSS", (msg) => {
                assert.equal(msg.text, "HelloWorldWSS!");            
                done();
            })
            setTimeout(() => {
                mqttClient.publish("simpleTestWSS", { text: "HelloWorldWSS!" })
            }, 30)
        });
    }).timeout(5000)

})