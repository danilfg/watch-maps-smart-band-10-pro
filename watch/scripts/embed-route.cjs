'use strict';
const fs=require('node:fs'),path=require('node:path');
function validate(code){
  if(typeof code!=='string'||code.length<6||code.length>40000||!/^[A-Za-z0-9_-]+$/.test(code))throw Error('Invalid route code');
  const r=JSON.parse(Buffer.from(code,'base64url').toString('utf8'));
  if(r.schema!=='wristroute-route/1'||!['pedestrian','bicycle'].includes(r.mode))throw Error('Invalid schema/mode');
  if(!Array.isArray(r.points)||r.points.length<2||r.points.length>400)throw Error('Invalid points');
  const points=r.points.map(p=>{if(!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite)||Math.abs(p[0])>90||Math.abs(p[1])>180)throw Error('Invalid coordinates');return p.map(x=>Number(x.toFixed(5)))});
  if(!Number.isFinite(r.distanceMeters)||r.distanceMeters<0||r.distanceMeters>500000)throw Error('Invalid distance');
  if(!Array.isArray(r.turns)||r.turns.length>60)throw Error('Invalid turns');
  const turns=r.turns.map(t=>{
    if(!Number.isInteger(t.p)||t.p< -1||t.p>=points.length||!Number.isFinite(t.d)||t.d<0||t.d>500000||!Number.isInteger(t.c)||t.c<0||t.c>100||typeof t.t!=='string'||t.t.length>90)throw Error('Invalid maneuver');
    return {p:t.p,d:Math.round(t.d),c:t.c,t:t.t};
  });
  return {schema:r.schema,mode:r.mode,distanceMeters:Math.round(r.distanceMeters),points,turns};
}
if(require.main===module){
  if(!process.env.WRISTROUTE_CODE){process.stdout.write('Using demo route.\n');}
  else{
    const route=validate(process.env.WRISTROUTE_CODE);
    const dest=path.resolve(__dirname,'../src/common/route-data.js');
    fs.mkdirSync(path.dirname(dest),{recursive:true});
    fs.writeFileSync(dest,'export default '+JSON.stringify(route)+'\n');
    process.stdout.write('Route embedded: '+route.points.length+' points, '+route.turns.length+' maneuvers\n');
  }
}
module.exports={validate};
