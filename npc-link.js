/* Shared demo state linking the admin dashboard (index.html) and the exhibitor
   portal (exhibitor.html) for the linked exhibitor, Kilbride Tractors Ltd.
   Both pages read and write this through localStorage and re-render when the
   other page changes it (the browser fires a "storage" event across tabs). */
const NPC = (() => {
  const KEY = 'npc-demo-link-v1';
  const DOC_META = [
    {id:'ins', name:'Public Liability Insurance', desc:'Minimum €6.5 million cover, with indemnity to the National Ploughing Association, for 18–25 September 2027.', due:'31 Jul 2027'},
    {id:'safety', name:'Safety Statement', desc:'Your company safety statement, signed and dated within the last 12 months.', due:'31 Jul 2027'},
    {id:'rams', name:'RAMS', desc:'Risk Assessment & Method Statement covering stand build, machinery demonstrations and break-down.', due:'31 Jul 2027'},
    {id:'ga3', name:'GA3', desc:'Thorough examination of lifting equipment used on site (teleporters, loaders, cranes).', due:'15 Aug 2027'},
    {id:'ga2', name:'GA2', desc:'Weekly inspection report for excavations and lifting equipment.', due:'15 Aug 2027'},
    {id:'ga1', name:'GA1', desc:'Certificate of test and thorough examination of lifting equipment.', due:'15 Aug 2027'},
    {id:'csc', name:'Safe Pass / CSC Cards', desc:'Valid Safe Pass or CSC cards for all staff operating machinery during set-up and break-down.', due:'1 Sep 2027'},
  ];
  const DEFAULT = {
    docs: {
      ins: {status:'Approved', file:'Kilbride_PL_Certificate_2027.pdf', up:'12 Oct 2026'},
      safety: {status:'Approved', file:'Kilbride_Safety_Statement.pdf', up:'12 Oct 2026'},
      rams: {status:'In review', file:'Kilbride_RAMS_NPC2027.pdf', up:'24 Oct 2026'},
      ga3: {status:'Not submitted'}, ga2: {status:'Not submitted'}, ga1: {status:'Not submitted'}, csc: {status:'Not submitted'},
    },
    orders: [
      {id:'NPC-30412', product:'Electricity', detail:'32A three-phase', qty:1, value:420, date:'14 Oct 2026', iso:'2026-10-14', status:'Confirmed'},
      {id:'NPC-30588', product:'Teleporter Booking', detail:'1 hour — set-up', qty:1, value:150, date:'22 Oct 2026', iso:'2026-10-22', status:'Submitted'},
    ],
    staff: [
      {name:'Seán Murphy', email:'sean@kilbridetractors.ie', role:'Stand manager', status:'Issued'},
      {name:'Aoife Murphy', email:'aoife@kilbridetractors.ie', role:'Sales', status:'Issued'},
      {name:'Declan Walsh', email:'declan@kilbridetractors.ie', role:'Sales', status:'Issued'},
    ],
    messages: [
      {em:'📘', c:'#e5f1fb', t:'Exhibitor manual 2027 published', b:'Set-up times, vehicle access and stand rules for Rathangan are now available to download.', d:'20 Oct 2026'},
      {em:'⚠️', c:'#fde8e6', t:'Insurance deadline reminder', b:'Public liability certificates must be uploaded by 31 July 2027 to keep your stand.', d:'2 Oct 2026'},
      {em:'🌦️', c:'#efe8fb', t:'Site visit moved to Sat 7 Nov', b:'The exhibitor open day at Rathangan was moved due to the weather warning.', d:'28 Sep 2026'},
      {em:'✅', c:'#e6f5ea', t:'Your stand is confirmed', b:'Stand 268 — Block 3, Row 14 has been allocated to Kilbride Tractors Ltd.', d:'15 Sep 2026'},
    ],
    unread: 1, paid: 1260, setup: false,
    profile: {company:'Kilbride Tractors Ltd', web:'https://www.kilbridetractors.ie', phone:'+353 87 412 6650',
      desc:'Family-run tractor and machinery dealer since 1978 — new and used tractors, balers and tillage equipment, with full parts and service backup.'},
  };
  let state = null;
  function load() {
    state = null;
    try { state = JSON.parse(localStorage.getItem(KEY)); } catch (_) {}
    if (!state || !state.docs) state = JSON.parse(JSON.stringify(DEFAULT));
    return state;
  }
  function save() {
    try { const s = JSON.stringify(state); if (s !== localStorage.getItem(KEY)) localStorage.setItem(KEY, s); } catch (_) {}
  }
  function reset() { state = JSON.parse(JSON.stringify(DEFAULT)); save(); }
  function onChange(fn) {
    window.addEventListener('storage', e => { if (e.key === KEY) { const before = JSON.parse(JSON.stringify(state)); load(); fn(before, state); } });
  }
  const today = () => new Date().toLocaleDateString('en-IE', {day: 'numeric', month: 'short', year: 'numeric'});
  return {get: () => state || load(), save, reset, onChange, today, DOC_META};
})();
