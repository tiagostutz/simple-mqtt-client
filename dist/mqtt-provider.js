"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},mqtt=require("mqtt"),manuh=require("manuh"),ManuhBridge=require("./manuh-bridge/manuh-bridge").ManuhBridge,debug=require("debug")("mqtt-provider-debug");module.exports={init:function(e,o,i,n,r){var s=this;if(!e)throw console.error("mqttBrokerHost not FOUND!"),"mqttBrokerHost parameter is not set. Please provide a MQTT broker host to connect";var a=this;if(0!=this.bootstrapStatus)return r(a);this.bootstrapStatus=1;var u=void 0;o&&(u={username:o,password:i}),debug("Connecting to MQTT with: \nMQTT_BROKER_HOST="+e,"\nMQTT_USERNAME="+o,"\nMQTT_PASSWORD="+i,"\nMQTT_BASE_TOPIC="+n),this.baseTopic=n||"chimpassist/demo",debug("baseTopic:",this.baseTopic);var c=e.split("://"),d="mqtt",p=null,b=c[1],h="";if(-1!=c[0].indexOf("https")?d="wss":-1!=c[0].indexOf("http")&&(d="ws"),-1!=c[1].indexOf(":")){var l=c[1].split(":");b=l[0],p=-1!=l[1].indexOf("/")?l[1].split("/")[0]:l[1]}if(-1!=c[1].indexOf("/")){var m=c[1].split("/");b=-1!=m[0].indexOf(":")?m[0].split(":")[0]:m[0],h=m[1]}var f={protocol:d,host:b,port:p,context:h},g=f.protocol+"://"+f.host+":"+f.port+"/"+f.context;debug("mqttConnectionConfig=",f),this.manuhBridge=new ManuhBridge(manuh,f,function(){debug("ManuhBridge connections completed."),s.manuhBridge.subscribeRemote2LocalTopics([s.baseTopic+"/#"]),debug("Connecting directly to MQTT. brokerURL:",g),s.mqttClient=mqtt.connect(g,u),s.mqttClient.on("connect",function(e){e?a.bootstrapStatus<2?(a.bootstrapStatus=2,debug("connection succeed. Details:",e),r(a)):debug("connected again. Details:",e):console.error(t("Error connecting to interaction bus"))})})},publish:function(t,e){if(!this.isReady())throw"mqttProvider not yet initiated. Call `init` method with correspondent parameters";var o=this.baseTopic+"/"+t;if("object"!==(void 0===e?"undefined":_typeof(e)))throw"Could not publish non-objects to the chat mqtt provider";this.mqttClient.publish(o,JSON.stringify(e))},subscribe:function(t,o){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"mqtt-provider";if(!this.isReady())throw"mqttProvider not yet initiated. Call `init` method with correspondent parameters";var i=this.baseTopic+"/"+t;manuh.subscribe(i,e,function(t,e){"string"==typeof t&&(t=JSON.parse(t)),o(t)})},unsubscribe:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"mqtt-provider",o=this.baseTopic+"/"+t;manuh.unsubscribe(o,e)},isReady:function(){return 2==this.bootstrapStatus},baseTopic:null,mqttClient:null,manuhBridge:null,bootstrapStatus:0};