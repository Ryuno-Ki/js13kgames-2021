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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(t,o){this.user=t,this.opponents=o}start(){const t=this.user,o=this;this.opponents.forEach((s=>{const e=[].concat(this.opponents).concat(t);t.start(o,e.filter((o=>o.socket.id!==t.socket.id))),s.start(o,e.filter((t=>t.socket.id!==s.socket.id)))}))}ended(){return!1}score(){}}class o{constructor(t){this.socket=t,this.game=null,this.opponents=[],this.role=ROLE_UNKNOWN}setRole(t){this.role=t}start(t,o){this.game=t,this.opponents=o,this.socket.emit("start",{role:this.role,opponents:this.opponents.length,spectators:0})}end(){this.game=null,this.opponents=[],this.role=ROLE_UNKNOWN,this.socket.emit("end")}win(){this.opponents.forEach((t=>{this.socket.emit("win")}))}loose(){this.opponents.forEach((t=>{this.socket.emit("loose")}))}draw(){this.opponents.forEach((t=>{this.socket.emit("draw")}))}}const s=[];function e(o){s.forEach((function(s){s.socket.id!==o.socket.id&&0===s.opponents.length&&(o.setRole(ROLE_HOST),s.setRole(ROLE_OPPONENT),new t(o,[s]).start())}))}exports.io=function(t){const n=new o(t);s.push(n),t.on("disconnect",(()=>function(t,o){console.log(`Disconnected: ${t.id}`),function(t){s.splice(s.indexOf(t),1)}(o),o.opponents.length>0&&o.opponents.forEach((function(t){t.end(),e(t)}))}(t,n))),t.on("keyUp",(t=>async function(t,o,s){try{await async function(){const t=storage.get("games",0);await storage.set("games",t+1)}()}catch(t){console.error(t)}o&&Array.isArray(o.opponents)?o.opponents.forEach((t=>{console.log("Sync ",t.socket.id),t.socket.emit("sync",s)})):console.warn("This looks fishy",o)}(0,n,t))),e(n),console.log(`Connected: ${t.id}`)},exports.stat=async function(t,o){const s=await storage.get("games",0);o.send(`<h1>Games played: ${s}</h1>`)};
