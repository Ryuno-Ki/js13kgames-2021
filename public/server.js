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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(t,s){this.user=t,this.opponents=s}start(){const t=this.user,s=this;this.opponents.forEach((o=>{const e=[].concat(this.opponents).concat(t);t.start(s,e.filter((s=>s.socket.id!==t.socket.id))),o.start(s,e.filter((t=>t.socket.id!==o.socket.id)))}))}ended(){return!1}score(){}}class s{constructor(t){this.socket=t,this.game=null,this.opponents=[],this.role=ROLE_UNKNOWN}setRole(t){this.role=t}start(t,s){this.game=t,this.opponents=s,this.socket.emit("start",{role:this.role,opponents:this.opponents.length,spectators:0})}end(){this.game=null,this.opponents=[],this.role=ROLE_UNKNOWN,this.socket.emit("end")}win(){this.opponents.forEach((t=>{this.socket.emit("win")}))}loose(){this.opponents.forEach((t=>{this.socket.emit("loose")}))}draw(){this.opponents.forEach((t=>{this.socket.emit("draw")}))}}const o=[];function e(s){o.forEach((function(o){o.socket.id!==s.socket.id&&0===o.opponents.length&&(s.setRole(ROLE_HOST),o.setRole(ROLE_OPPONENT),new t(s,[o]).start())}))}exports.io=function(t){const n=new s(t);o.push(n),t.on("disconnect",(()=>function(t,s){console.log(`Disconnected: ${t.id}`),function(t){o.splice(o.indexOf(t),1)}(s),s.opponents.length>0&&s.opponents.forEach((function(t){t.end(),e(t)}))}(t,n))),t.on("keyUp",(t=>{!async function(t,s,o){try{await async function(){const t=storage.get("games",0);await storage.set("games",t+1)}()}catch(t){console.error(t)}s.opponents.forEach((t=>{t.socket.emit("sync",o)}))}(0,n,t)})),e(n),console.log(`Connected: ${t.id}`)},exports.stat=async function(t,s){const o=await storage.get("games",0);s.send(`<h1>Games played: ${o}</h1>`)};
