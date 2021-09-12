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

var lido=function(e){"use strict";var t="Game not properly initialised!",n="addUser",o="keyUp",r="selectMode",i={avatars:[],host:null,opponents:null,opponentsState:null,roleState:null,socket:null,socketState:null};function a(e){if(null===i.socketState)throw new Error("HTML broken");i.socketState.textContent=e}function c(){a("Connected and waiting for opponent…")}function s(){a("Connection lost!")}function u(e){var t,n,o=new URL(window.location.href);o.hash="#scene-"+e,window.history.pushState({},"",o.href),window.location.hash=o.hash,Array.from(document.querySelectorAll("section")).forEach((function(e){e.style.display="none"})),t=o.hash,(n=document.querySelector(t))&&(n.style.display=""),i.socket.emit("navigate",{scene:e})}function l(){u("fin")}function f(){a("Connection error!")}var d={downTime:0,isPressed:!1,upTime:0};function p(){d.isPressed||(d.downTime=(new Date).valueOf(),d.upTime=0,d.isPressed=!0)}function w(){d.upTime=(new Date).valueOf();var e=(d.upTime-d.downTime)/1e3;Number.isNaN(e)||i.socket.emit(o,{delta:e}),d.isPressed=!1,d.downTime=0}function m(e){var n=e.role,o=e.host,r=e.opponents;if(document.body.dataset.role=n,n===ROLE_HOST){if(function(e){var n=e.role,o=e.host,r=e.opponents;if(!i.opponentsState||!i.roleState)throw new Error(t);i.roleState.innerHTML='<span class="tile" style="--user-color: '+o.color+';">\n    '+o.name+" ("+n+")\n  </span>",i.opponentsState.innerHTML="",r.forEach((function(e){var t='<span class="tile" style="--user-color: '+e.color+';">\n      '+e.name+"\n    </span>";i.opponentsState.innerHTML+=t}))}({role:n,host:o,opponents:r}),document.body.addEventListener("keydown",(function(e){"Space"===e.code&&(e.preventDefault(),p())}),!1),document.body.addEventListener("keyup",(function(e){"Space"===e.code&&(e.preventDefault(),w())}),!1),!i.host||!i.opponents)throw new Error(t);i.host.style.stroke=o.color;var c=i.opponents;r.forEach((function(e,n){var o=c.children[2*n],r=c.children[2*n+1];if(!o||!r)throw new Error(t);o.style.fill=e.color,r.style.fill=e.color}))}n===ROLE_OPPONENT&&document.body.addEventListener("keyup",(function(e){switch(e.code){case"ArrowUp":e.preventDefault(),h(),k();break;case"ArrowRight":e.preventDefault(),v(),k();break;case"ArrowDown":e.preventDefault(),E(),k();break;case"ArrowLeft":e.preventDefault(),y(),k()}}),!1),Array.from(document.querySelectorAll("#scene-game form")).forEach((function(e){e.addEventListener("submit",(function(t){switch(t.preventDefault(),new FormData(e).get("key")){case"space":p(),w();break;case"TOP":h(),k();break;case"LEFT":y(),k();break;case"BOTTOM":E(),k();break;case"RIGHT":v(),k()}}))})),a("Playing")}function h(){i.socket.emit(o,{direction:0})}function v(){i.socket.emit(o,{direction:1})}function E(){i.socket.emit(o,{direction:2})}function y(){i.socket.emit(o,{direction:3})}function k(){window.zzfx.apply(window,[,,350,,,.09,4,1.13,,6.9,,,,.9,,.5,,.93,.01,.18])}function g(e){var n=e.points,o=e.role;if(o===ROLE_HOST){if(null===i.host)throw new Error(t);var r=n.map((function(e){return e.join(",")})).join(" ");i.host.setAttribute("points",r)}if(o===ROLE_OPPONENT){if(!i.opponents)throw new Error(t);var a=i.opponents;n.forEach((function(e,n){var o=a.children[2*n],r=a.children[2*n+1],i=e[e.length-1];if(!o||!r)throw new Error(t);var c=i[0],s=i[1];o.setAttribute("cx",c),o.setAttribute("cy",s);var u=e.join(",");r.setAttribute("points",u)}))}}function S(){i.socket=window.io({upgrade:!1,transports:["websocket"]}),function(e){e.host=function(){var e=document.getElementById("host");if(!e)throw new Error(t);return e}(),e.opponents=function(){var e=document.getElementById("opponents");if(!e)throw new Error(t);return e}(),e.socketState=function(){var e=document.getElementById("socketState");if(!e)throw new Error(t);return e}(),e.roleState=function(){var e=document.getElementById("role");if(!e)throw new Error(t);return e}(),e.opponentsState=function(){var e=document.getElementById("opponent-list");if(!e)throw new Error(t);return e}()}(i),function(){if(null===i.socket)throw new Error(t);i.socket.on("start",m),i.socket.on("sync",g),i.socket.on("gameOver",l),i.socket.on("connect",c),i.socket.on("disconnect",s),i.socket.on("error",f)}(),function(){var e=document.getElementById("user-form");if(!e)throw new Error(t);e.addEventListener("submit",(function(e){if(e.preventDefault(),!e.target)throw new Error(t);var o=new FormData(e.target).get("name");o?(i.socket.emit(n,{name:o}),u("match-form")):console.error("Show validation error")}))}(),function(){var e=document.getElementById("match-form");if(!e)throw new Error(t);e.addEventListener("submit",(function(e){if(e.preventDefault(),!e.target)throw new Error(t);var n=new FormData(e.target).get("mode");n?(i.socket.emit(r,{mode:n}),u("game")):console.error("Show validation error")}))}(),Array.from(document.querySelectorAll("a")).forEach((function(e){e.addEventListener("click",(function(t){var n=e.getAttribute("href");n&&(t.preventDefault(),u(n.slice("#scene-".length)))}),!1)})),u("title")}return e.app=function(){window.addEventListener("load",S,!1)},Object.defineProperty(e,"__esModule",{value:!0}),e}({});
