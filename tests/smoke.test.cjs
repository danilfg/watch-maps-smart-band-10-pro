const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
test('PWA inline JavaScript has valid syntax',()=>{
  const html=fs.readFileSync('docs/index.html','utf8');
  const m=html.match(/<script>\s*("use strict";[\s\S]*?)<\/script>/);
  assert.ok(m,'inline application script exists');
  assert.doesNotThrow(()=>new vm.Script(m[1]));
});
test('PWA explicitly has no watch transfer',()=>{
  const html=fs.readFileSync('docs/index.html','utf8');
  assert.match(html,/не умеет подключаться к Xiaomi/);
  assert.match(html,/function parseYandexLink/);
  assert.match(html,/function decode6/);
  assert.match(html,/GPX/);
});
test('watch manifest matches Vela runner build pattern',()=>{
  const m=JSON.parse(fs.readFileSync('watch/src/manifest.json','utf8'));
  assert.equal(m.deviceTypeList[0],'watch');
  assert.equal(m.config.designWidth,336);
  const ux=fs.readFileSync('watch/src/pages/index/index.ux','utf8');
  assert.match(ux,/app\.terminate\(\)/);
  assert.match(ux,/GPS НЕ ПОДКЛЮЧЁН/);
});
