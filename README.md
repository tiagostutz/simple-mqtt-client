# Simple MQTT Client

A simple MQTT client that allows you to link your subscriptions directly to callback functions.

## How to use?

First, install the lib:

`npm i --save simple-mqtt-client`

Then use it as follows:

```javascript
    mqttProvider.init("https://iot.eclipse.org/ws", "", "", "simple-mqtt-client/test", (mqttClient) => {
            
            mqttClient.subscribe("simpleTest", (msg) => {
                console.log("message:", msg.text)
            })

            mqttClient.publish("simpleTest", { text: "HelloWorld!" })

        });
```

The parameters you provide to the `init` function are:
- mqttBrokerHost: MQTT broker to connect; it can be a TCP address connection (_mqtt://_), **Websocket** (_http://_) or **Websocket Secure** (_https://_)
- mqttUserName: Used if your broker requires authentication
- mqttPassord: Used if your broker requires authentication
- baseTopic: A base topic to append to the topic passed as parameter to every `publish`, `subscribe` or `unsubscribe` invocation
- readyCallback(mqttClient): callback function invoked when the MqttClient is prepared
