const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('node:fs'),assert=require('node:assert/strict');
const errors=[], vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{runScripts:'dangerously',url:'https://example.test/',virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.structuredClone=structuredClone;}});
const w=dom.window,d=w.document,run=s=>w.eval(s);
function click(q){assert.ok(d.querySelector(q),q);d.querySelector(q).click();}
function field(q,v,event='input'){let el=d.querySelector(q);assert.ok(el,q);el.value=v;el.dispatchEvent(new w.Event(event,{bubbles:true}));}
click('[data-act="new-request"]');
assert.equal(d.querySelectorAll('.qcard:not([hidden])').length,1);
field('[data-f="objective"]','Research service test');
click('[data-act="step-next"]');click('[data-act="step-back"]');
assert.equal(d.querySelector('[data-f="objective"]').value,'Research service test');
field('#requestStep','3','change');
field('[data-f="deliverable"]','Managed hosting for 12 months');field('[data-f="provider"]','Unknown');field('[data-f="budget"]','EUR 12000');
let cb=d.querySelector('[data-fs="hosting"]');cb.checked=true;cb.dispatchEvent(new w.Event('change',{bubbles:true}));
assert.match(run('caseMarkdown(CASE)'),/Managed hosting for 12 months/);
run('location.hash="#review";route()');
field('[name="a-need"][value="followup"]','followup','change');
assert.match(d.querySelector('#reviewProgress').textContent,/^1\//);
run('location.hash="#home";route()');click('[data-act="example-request"]');
for(let i=0;i<9;i++){field('#requestStep',String(i),'change');assert.equal(d.querySelectorAll('.qcard:not([hidden])').length,1);assert.match(d.querySelector('.qcard:not([hidden])').textContent,/Why we ask/);}
assert.match(run('caseMarkdown(CASE)'),/EUR 12,000/);
assert.match(run('caseMarkdown(CASE)'),/fictional provider/);
assert.equal(run('evidenceLabel([],null)'),'No information available');
assert.equal(run('evidenceLabel([{ok:true}],{ok:true,errors:[]})'),'Information retrieved');
assert.equal(run('evidenceLabel([{ok:true}],{ok:true,example:true})'),'Needs review');
assert.equal(run('evidenceLabel([{ok:true}],{ok:true,errors:["Failed"]})'),'Needs review');
run('location.hash="#report";route()');assert.match(d.querySelector('#reportDoc').textContent,/EUR 12,000/);
assert.match(d.querySelector('#reportDoc').textContent,/Illustrative example/);
run('CASE.signals={ok:false,errors:["API unavailable"]};CASE.evidence={};location.hash="#form";route()');assert.match(d.body.textContent,/Could not read/);
run('location.hash="#review";route()');assert.match(d.body.textContent,/No information available/);
assert.equal(run('licenseClass("MIT")'),'Permissive / no copyleft');
assert.equal(run('dependentCount({packages:[],edges:[{from:"a",to:"b"},{from:"b",to:"c"}]},"c")'),2);
assert.deepEqual(errors,[]);dom.window.close();console.log('PASS: nine-step navigation, field retention, request/export parity, review counter, example provenance, evidence states, API failure fallback, license and dependency helpers.');
