"use strict";var _createClass=function(){function e(n,t){for(var i=0;i<t.length;i++){var e=t[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}();function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var mqtt=require("mqtt"),manuhLocal=require("manuh"),debug=require("debug")("debug"),info=require("debug")("mqttClient"),MqttClient=function(){function t(n){_classCallCheck(this,t),this.config=n,this.topics=[],this.subscriptions=[],this.connected=!1,this.config.clientId="mqtt2manuh_"+Math.random().toString(16).substr(2,8),this.id=0}return _createClass(t,[{key:"connect",value:function(n){var e=this;info("==> Connecting to "+this.config.protocol+"://"+this.config.host+":"+this.config.port+" (client ID "+this.config.clientId+")");var t=this.client=mqtt.connect(this.config);t.on("connect",function(){return debug("Connected. Now subscribing to topics"),e.topics.forEach(function(n){-1!==e.subscriptions.indexOf(n)&&debug("Topic "+n+" already subscribed. Ignoring..."),info("Subscribe to "+n),t.subscribe(n),e.subscriptions.push(n)}),e.connected?info("Connected ==> "):(e.connected=!0,info("Connected ==> "),n())}),t.on("reconnect",function(n){debug("Try to reconnect",n)}),t.on("offline",function(n){info("Broker is offline",n)}),t.on("error",function(n){info("error",n)}),t.on("message",function(n,t){e.id++,info("Message "+e.id+" '"+n+"'",t.toString());var i={topic:n,message:t.toString()};manuhLocal.publish("__message/mqtt/manuh",i,{retained:!1})})}},{key:"publish",value:function(n,t){0!=this.connected&&(info("Publish message "+n+" '"+t+"'"),this.client.publish(n.toString(),t.toString(),{qos:0,retain:!1}))}},{key:"subscribe",value:function(n){this.topics.push(n),this.connected&&(this.client.subscribe(n),this.subscriptions.push(n))}}]),t}();exports.MqttClient=MqttClient;