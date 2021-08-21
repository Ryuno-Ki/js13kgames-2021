/**
 * This file is part of JS13kGames - SPACE.
 * Lido Space is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Lido Space is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Lido Space.  If not, see <https://www.gnu.org/licenses/>.
 */

var lido=function(n){"use strict";var o,t,e,i,r,u=!1,a=[];function c(){var n=document.getElementById("host");if(!n)throw new Error("Cannot start game!");t=n,a=[],e=window.io({upgrade:!1,transports:["websocket"]}),document.body.addEventListener("keydown",s,!1),document.body.addEventListener("keyup",f,!1),e.on("start",d),e.on("win",l),e.on("lose",p),e.on("end",v),e.on("connect",w),e.on("disconnect",h),e.on("error",g),i=(new Date).valueOf(),b()}function s(){u||(o=(new Date).valueOf(),u=!0)}function f(){var n=(r=(new Date).valueOf())-o;Number.isNaN(n/1e3)||(a.push((i-r)/1e3),b()),u=!1}function d(){m("Round ")}function l(){y()}function p(){y()}function v(){m("Waiting for opponent…")}function w(){m("Waiting for opponent…")}function h(){m("Connection lost!")}function g(){m("Connection error!")}function m(n){console.log(n)}function y(n){console.log(y)}function b(){var n,o,e,i,r,u=(n=[160,100],o=[].concat([n]),e=130,i=13,r=26,a.forEach((function(t){var r=n[0],u=n[1],a=function(n){var o=n.radius,t=n.angle;return{x:o*Math.cos(t),y:o*Math.sin(t)}}({radius:e*Math.random(),angle:E(360*t/i)}),c=a.x,s=a.y;o.push([r+c,u+s]),o.push([r,u])})),o.slice(-1*r)).map((function(n){return n.join(",")})).join(" ");t.setAttribute("points",u)}function E(n){return n*Math.PI/180}return n.app=function(){window.addEventListener("load",c,!1)},Object.defineProperty(n,"__esModule",{value:!0}),n}({});
