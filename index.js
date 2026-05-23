/* ── WA Nurse Delegation Management System — App Logic ── */

// ── Sample Data ──
const DATA = {
  rn: { name: 'Margaret Kamau', initials: 'MK', title: 'RN, BSN', region: 'King County Region' },

  afhs: [
    { id: 1, name: 'Sunrise Adult Family Home', address: '4821 Maple Ave NE, Seattle, WA 98105', phone: '(206) 555-0142', admin: 'Ruth Njoroge', beds: 6, activeCases: 5, caregivers: 4 },
    { id: 2, name: 'Evergreen Care Home', address: '1203 Cedar St, Bellevue, WA 98004', phone: '(425) 555-0198', admin: 'Patrick Wekesa', beds: 6, activeCases: 4, caregivers: 3 },
    { id: 3, name: 'Cedar Ridge AFH', address: '7720 Rainier Ave S, Seattle, WA 98118', phone: '(206) 555-0376', admin: 'Grace Muthoni', beds: 5, activeCases: 6, caregivers: 4 },
    { id: 4, name: 'Maple Crest Home', address: '2390 112th Ave SE, Bellevue, WA 98004', phone: '(425) 555-0221', admin: 'Samuel Otieno', beds: 4, activeCases: 3, caregivers: 2 },
    { id: 5, name: 'Lakewood Family Home', address: '8901 Lake City Way, Seattle, WA 98125', phone: '(206) 555-0511', admin: 'Jane Wambua', beds: 6, activeCases: 3, caregivers: 3 },
    { id: 6, name: 'Harmony House AFH', address: '654 3rd Ave W, Kirkland, WA 98033', phone: '(425) 555-0089', admin: 'Joseph Kamau', beds: 5, activeCases: 2, caregivers: 2 },
    { id: 7, name: 'Pacific View AFH', address: '1105 Pacific Ave, Tacoma, WA 98402', phone: '(253) 555-0334', admin: 'Mary Akinyi', beds: 6, activeCases: 1, caregivers: 2 },
    { id: 8, name: 'Ridgemont Care Home', address: '3412 Auburn Way N, Auburn, WA 98002', phone: '(253) 555-0776', admin: 'Peter Mbugua', beds: 4, activeCases: 0, caregivers: 2 }
  ],

  caregivers: [
    { id: 1, name: 'James Odhiambo', initials: 'JO', color: 'blue', afhId: 1, role: 'HCA', credential: 'HCA-WA-38821', expiry: '2025-06-01', cpr: '2025-08-15', training: true, eligible: true, cases: 3 },
    { id: 2, name: 'Fatuma Wambua', initials: 'FW', color: 'teal', afhId: 2, role: 'NAC', credential: 'NAC-WA-44201', expiry: '2026-03-10', cpr: '2026-01-20', training: true, eligible: true, cases: 2 },
    { id: 3, name: 'George Kariuki', initials: 'GK', color: 'purple', afhId: 3, role: 'HCA', credential: 'HCA-WA-51033', expiry: '2026-01-28', cpr: '2025-11-30', training: true, eligible: true, cases: 3 },
    { id: 4, name: 'Mary Chebet', initials: 'MC', color: 'coral', afhId: 1, role: 'HCA', credential: 'HCA-WA-29847', expiry: '2026-08-15', cpr: '2026-05-01', training: true, eligible: true, cases: 2 },
    { id: 5, name: 'Andrew Otieno', initials: 'AO', color: 'green', afhId: 4, role: 'HCA', credential: 'HCA-WA-60112', expiry: '2026-11-22', cpr: '2026-09-10', training: false, eligible: false, cases: 1 },
    { id: 6, name: 'Beatrice Muthoni', initials: 'BM', color: 'teal', afhId: 3, role: 'CNA', credential: 'CNA-WA-17654', expiry: '2026-04-30', cpr: '2026-03-15', training: true, eligible: true, cases: 2 }
  ],

  patients: [
    { id: 1, name: 'Walter Njoroge', initials: 'WN', color: 'blue', dob: '04/12/1941', gender: 'Male', afhId: 1, diagnoses: ['Type 2 Diabetes', 'Hypertension', 'Chronic Wound'], physician: 'Dr. Sarah Chen', pharmacy: 'Walgreens #1204', activeCases: 1 },
    { id: 2, name: 'Beatrice Mutiso', initials: 'BM', color: 'teal', dob: '08/30/1935', gender: 'Female', afhId: 2, diagnoses: ['Dementia', 'Atrial Fibrillation'], physician: 'Dr. James Park', pharmacy: 'CVS Pharmacy #3344', activeCases: 1 },
    { id: 3, name: 'Herbert Owuor', initials: 'HO', color: 'purple', dob: '11/02/1948', gender: 'Male', afhId: 3, diagnoses: ['ALS', 'Dysphagia', 'COPD'], physician: 'Dr. Linda Torres', pharmacy: 'Rite Aid #2201', activeCases: 1 },
    { id: 4, name: 'Sophia Abdi', initials: 'SA', color: 'coral', dob: '03/17/1950', gender: 'Female', afhId: 1, diagnoses: ['Type 1 Diabetes', 'Chronic Venous Ulcer'], physician: 'Dr. Robert Kim', pharmacy: 'Walgreens #1204', activeCases: 1 },
    { id: 5, name: 'Rose Kimani', initials: 'RK', color: 'green', dob: '07/22/1939', gender: 'Female', afhId: 4, diagnoses: ['Type 2 Diabetes', 'Hypertension'], physician: 'Dr. Maria Gonzalez', pharmacy: 'CVS Pharmacy #5512', activeCases: 1 },
    { id: 6, name: 'Thomas Waweru', initials: 'TW', color: 'blue', dob: '01/09/1943', gender: 'Male', afhId: 2, diagnoses: ['Parkinson\'s', 'Dysphagia'], physician: 'Dr. James Park', pharmacy: 'CVS Pharmacy #3344', activeCases: 1 }
  ],

  cases: [
    { id: 'ND-2024-001', patientId: 1, caregiverId: 1, afhId: 1, status: 'active', created: '2024-02-15', nextReassess: '2024-06-01', tasks: ['Insulin administration', 'Blood glucose monitoring', 'Wound care'], forms: ['13-678', '13-678 Instructions', '14-484'] },
    { id: 'ND-2024-002', patientId: 2, caregiverId: 2, afhId: 2, status: 'pending', created: '2024-05-01', nextReassess: null, tasks: ['PRN medication', 'Blood glucose monitoring'], forms: ['13-678'] },
    { id: 'ND-2024-003', patientId: 3, caregiverId: 3, afhId: 3, status: 'reassess', created: '2023-11-10', nextReassess: '2024-05-28', tasks: ['Tube feeding', 'PRN medication'], forms: ['13-678', '13-678 Instructions', '13-678A', '14-484'] },
    { id: 'ND-2024-004', patientId: 4, caregiverId: 4, afhId: 1, status: 'active', created: '2024-01-20', nextReassess: '2024-06-10', tasks: ['Insulin administration', 'Wound care'], forms: ['13-678', '13-678 Instructions', '14-484'] },
    { id: 'ND-2024-005', patientId: 5, caregiverId: 5, afhId: 4, status: 'draft', created: '2024-05-20', nextReassess: null, tasks: ['Blood glucose monitoring', 'PRN medication'], forms: [] },
    { id: 'ND-2024-006', patientId: 6, caregiverId: 6, afhId: 2, status: 'active', created: '2024-03-05', nextReassess: '2024-07-05', tasks: ['Tube feeding', 'Oral care'], forms: ['13-678', '13-678 Instructions', '14-484'] }
  ],

  visits: [
    { id: 1, caseId: 'ND-2024-001', date: '2024-05-20', type: 'Supervision', status: 'Completed', notes: 'Caregiver competency reviewed. Insulin technique adequate. Wound healing progress noted.' },
    { id: 2, caseId: 'ND-2024-004', date: '2024-05-23', type: 'Initial', status: 'Completed', notes: 'Initial delegation visit. All tasks reviewed with caregiver. Instructions provided.' },
    { id: 3, caseId: 'ND-2024-003', date: '2024-05-28', type: 'Reassessment', status: 'Scheduled', notes: '' },
    { id: 4, caseId: 'ND-2024-001', date: '2024-06-01', type: 'Supervision', status: 'Scheduled', notes: '' }
  ],

  alerts: [
    { id: 1, type: 'danger', icon: 'ti-id-badge-2', title: 'Credential expiring in 8 days', desc: 'James Odhiambo · HCA-WA-38821 · Sunrise AFH', time: 'Jun 1, 2025' },
    { id: 2, type: 'warning', icon: 'ti-pen', title: 'Consent form unsigned', desc: 'Beatrice Mutiso · Form 13-678 · Evergreen AFH', time: 'Awaiting caregiver' },
    { id: 3, type: 'warning', icon: 'ti-calendar-exclamation', title: 'Reassessment overdue', desc: 'Herbert Owuor · Cedar Ridge AFH · Due May 20', time: '3 days overdue' },
    { id: 4, type: 'info', icon: 'ti-stethoscope', title: 'Nursing visit due in 4 days', desc: 'Rose Kimani · Maple Crest AFH', time: 'May 27, 2024' },
    { id: 5, type: 'warning', icon: 'ti-file-x', title: 'Incomplete delegation packet', desc: 'Rose Kimani · Case ND-2024-005 · Draft status', time: 'Created May 20' }
  ],

  activity: [
    { icon: 'ti-stethoscope', cls: 'tl-green', title: 'Nursing visit completed — Sophia Abdi', sub: 'Sunrise AFH · Wound care assessed · Form 14-484 generated', date: 'Today, 9:41 AM' },
    { icon: 'ti-file-text', cls: 'tl-blue', title: 'Form 13-678 generated — Beatrice Mutiso', sub: 'Evergreen AFH · Pending caregiver signature', date: 'Today, 8:15 AM' },
    { icon: 'ti-notes-medical', cls: 'tl-amber', title: 'Medical orders updated — Herbert Owuor', sub: 'Cedar Ridge AFH · Tube feeding frequency changed', date: 'Yesterday, 3:22 PM' },
    { icon: 'ti-upload', cls: 'tl-blue', title: 'Signed consent uploaded — Walter Njoroge', sub: 'Sunrise AFH · Form 13-678 archived', date: 'May 21, 11:07 AM' },
    { icon: 'ti-x', cls: 'tl-red', title: 'Delegation rescinded — Philip Wekesa', sub: 'Evergreen AFH · Caregiver non-compliance documented', date: 'May 19, 2:00 PM' },
    { icon: 'ti-plus', cls: 'tl-green', title: 'New delegation case created — Rose Kimani', sub: 'Maple Crest AFH · ND-2024-005 · Draft status', date: 'May 20, 10:30 AM' }
  ],

  dshsForms: [
    { code: '01-212', name: 'Nurse Delegation Referral', stage: 'Intake', desc: 'Initial referral for nurse delegation process' },
    { code: '10-217', name: 'Credentials & Training Verification', stage: 'Caregiver', desc: 'Verify caregiver training and credentials' },
    { code: '13-678', name: 'Consent for Delegation Process', stage: 'Consent', desc: 'Patient/guardian consent for nurse delegation' },
    { code: '13-678 Inst', name: 'Instructions for Nursing Tasks', stage: 'Tasks', desc: 'Written instructions for each delegated task' },
    { code: '13-678A', name: 'PRN Medication Delegation', stage: 'Tasks', desc: 'Delegation of PRN (as-needed) medications' },
    { code: '13-678B', name: 'Assumption of Delegation (RN Transfer)', stage: 'Transfer', desc: 'Transfer of delegation to another RN' },
    { code: '13-680', name: 'Rescinding Delegation', stage: 'Rescind', desc: 'Formal documentation of delegation rescission' },
    { code: '13-681', name: 'Change in Medical Orders', stage: 'Changes', desc: 'Document changes to physician orders' },
    { code: '13-893', name: 'Request for Additional Unit', stage: 'Admin', desc: 'Request for billing of additional nursing units' },
    { code: '06-200', name: 'Billing Form', stage: 'Admin', desc: 'Billing documentation for nurse delegation services' },
    { code: '14-484', name: 'Nursing Visit Record', stage: 'Supervision', desc: 'Documentation of supervision nursing visits' }
  ]
};

// ── Helper functions ──
function getPatient(id) { return DATA.patients.find(p => p.id === id); }
function getCaregiver(id) { return DATA.caregivers.find(c => c.id === id); }
function getAFH(id) { return DATA.afhs.find(a => a.id === id); }

function statusBadge(status) {
  const map = { active: 'badge-active', pending: 'badge-pending', draft: 'badge-draft', rescinded: 'badge-rescinded', reassess: 'badge-reassess', suspended: 'badge-suspended', closed: 'badge-closed' };
  const labels = { active: 'Active', pending: 'Pending Consent', draft: 'Draft', rescinded: 'Rescinded', reassess: 'Requires Reassessment', suspended: 'Suspended', closed: 'Closed' };
  return `<span class="badge ${map[status]||''}">${labels[status]||status}</span>`;
}

function avatarEl(initials, color, size='sm') {
  return `<div class="avatar avatar-${size} avatar-${color}">${initials}</div>`;
}

function credentialStatus(expiry) {
  const exp = new Date(expiry); const now = new Date();
  const days = Math.floor((exp - now) / 86400000);
  if (days < 0) return `<span class="badge badge-rescinded">Expired</span>`;
  if (days < 30) return `<span class="badge badge-reassess">Expires in ${days}d</span>`;
  if (days < 90) return `<span class="badge badge-pending">Expires in ${days}d</span>`;
  return `<span class="badge badge-active">Valid</span>`;
}

// ── Page rendering ──
function renderPage(pageId) {
  // Update nav
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const active = document.querySelector(`[data-page="${pageId}"]`);
  if (active) active.classList.add('active');

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

  // Update topbar
  const titles = {
    dashboard: ['RN Dashboard', 'King County Region'],
    afhs: ['Adult Family Homes', 'Manage your AFH facilities'],
    caregivers: ['Caregivers', 'Credential and training management'],
    patients: ['Patients', 'Patient profiles and delegation records'],
    cases: ['Delegation Cases', 'All active and historical cases'],
    visits: ['Nursing Visits', 'Supervision visit management'],
    forms: ['DSHS Forms', 'Official Washington State nurse delegation forms'],
    alerts: ['Alerts & Compliance', 'Credential expirations and action items'],
    archive: ['Archive', 'Historical delegation records']
  };
  const [title, sub] = titles[pageId] || ['Dashboard', ''];
  document.getElementById('topbar-title').textContent = title;
  document.getElementById('topbar-sub').textContent = sub;

  // Show page
  const page = document.getElementById('page-' + pageId);
  if (page) { page.classList.remove('hidden'); return; }

  // Render dynamic pages
  const container = document.getElementById('dynamic-page');
  container.innerHTML = '';
  container.classList.remove('hidden');

  if (pageId === 'dashboard') renderDashboard(container);
  else if (pageId === 'afhs') renderAFHs(container);
  else if (pageId === 'caregivers') renderCaregivers(container);
  else if (pageId === 'patients') renderPatients(container);
  else if (pageId === 'cases') renderCases(container);
  else if (pageId === 'visits') renderVisits(container);
  else if (pageId === 'forms') renderForms(container);
  else if (pageId === 'alerts') renderAlerts(container);
  else if (pageId === 'archive') renderArchive(container);
}

// ── DASHBOARD ──
function renderDashboard(el) {
  const totalActive = DATA.cases.filter(c => c.status === 'active').length;
  const pending = DATA.cases.filter(c => c.status === 'pending').length;
  const reassess = DATA.cases.filter(c => c.status === 'reassess').length;
  const draftCount = DATA.cases.filter(c => c.status === 'draft').length;
  const expiring = DATA.caregivers.filter(c => { const d = Math.floor((new Date(c.expiry)-new Date())/86400000); return d < 30; }).length;

  el.innerHTML = `
  <div class="metrics-grid mb-20">
    <div class="metric-card"><div class="metric-label">Adult Family Homes</div><div class="metric-value blue">${DATA.afhs.length}</div><div class="metric-sub">King County region</div></div>
    <div class="metric-card"><div class="metric-label">Active Cases</div><div class="metric-value green">${totalActive}</div><div class="metric-sub">${pending} pending · ${draftCount} draft</div></div>
    <div class="metric-card"><div class="metric-label">Unsigned Forms</div><div class="metric-value amber">7</div><div class="metric-sub">Awaiting signature</div></div>
    <div class="metric-card"><div class="metric-label">Expiring Credentials</div><div class="metric-value red">${expiring}</div><div class="metric-sub">Within 30 days</div></div>
    <div class="metric-card"><div class="metric-label">Reassessments Due</div><div class="metric-value amber">${reassess}</div><div class="metric-sub">Action required</div></div>
    <div class="metric-card"><div class="metric-label">Visits This Month</div><div class="metric-value teal">11</div><div class="metric-sub">Next: May 27</div></div>
  </div>

  <div class="grid-main-aside mb-16">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="ti ti-clipboard-list"></i>Delegation cases</div>
        <button class="btn btn-sm" onclick="renderPage('cases')"><i class="ti ti-arrow-right"></i>View all</button>
      </div>
      <div class="tab-bar">
        <div class="tab-item active">All (${DATA.cases.length})</div>
        <div class="tab-item">Active (${totalActive})</div>
        <div class="tab-item">Pending (${pending})</div>
        <div class="tab-item">Reassess (${reassess})</div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Patient</th><th>Caregiver</th><th>AFH</th><th>Tasks</th><th>Status</th><th>Next action</th><th></th></tr></thead>
          <tbody>
            ${DATA.cases.slice(0,6).map(c => {
              const pt = getPatient(c.patientId), cg = getCaregiver(c.caregiverId), afh = getAFH(c.afhId);
              return `<tr>
                <td><div class="patient-chip">${avatarEl(pt.initials, pt.color)}<div><div class="patient-name">${pt.name}</div><div class="patient-dob">DOB ${pt.dob}</div></div></div></td>
                <td>${cg.name}</td>
                <td class="td-muted" style="font-size:11.5px">${afh.name.replace(' Adult Family Home','').replace(' AFH','').replace(' Home','')}</td>
                <td class="td-muted">${c.tasks.slice(0,2).join(' · ')}${c.tasks.length>2?' · …':''}</td>
                <td>${statusBadge(c.status)}</td>
                <td class="td-muted">${c.nextReassess||'—'}</td>
                <td><button class="btn btn-sm btn-ghost" onclick="showCaseDetail('${c.id}')"><i class="ti ti-eye"></i></button></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-header"><div class="card-title"><i class="ti ti-alert-triangle"></i>Active alerts</div><span class="badge badge-reassess">${DATA.alerts.length}</span></div>
        ${DATA.alerts.map(a => `
          <div class="timeline-item">
            <div class="tl-icon ${a.type==='danger'?'tl-red':a.type==='info'?'tl-blue':'tl-amber'}"><i class="ti ${a.icon}"></i></div>
            <div class="tl-body"><div class="tl-title">${a.title}</div><div class="tl-meta">${a.desc}</div></div>
          </div>`).join('')}
        <div class="card-footer"><button class="btn btn-sm" onclick="renderPage('alerts')"><i class="ti ti-arrow-right"></i>All alerts</button></div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title"><i class="ti ti-file-text"></i>DSHS quick-generate</div></div>
        <div class="form-pills">
          ${['01-212 Referral','13-678 Consent','13-678 Instructions','13-678A PRN','13-680 Rescind','13-681 Med Orders','14-484 Visit','10-217 Credentials'].map(f=>`<button class="form-pill" onclick="renderPage('forms')"><i class="ti ti-download"></i>${f}</button>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="ti ti-calendar-check"></i>Upcoming nursing visits</div><button class="btn btn-sm" onclick="renderPage('visits')"><i class="ti ti-plus"></i>Schedule</button></div>
      ${DATA.visits.map(v => {
        const c = DATA.cases.find(x=>x.id===v.caseId); const pt = c?getPatient(c.patientId):null;
        return pt ? `<div class="timeline-item">
          ${avatarEl(pt.initials,pt.color)}
          <div class="tl-body"><div class="tl-title">${pt.name}</div><div class="tl-meta">${getAFH(c.afhId).name.split(' ')[0]} AFH · ${v.type}</div></div>
          <div style="font-size:11px;color:var(--text-3);white-space:nowrap">${v.date}</div>
        </div>` : '';
      }).join('')}
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="ti ti-timeline"></i>Recent activity</div></div>
      <div class="timeline">
        ${DATA.activity.map(a=>`<div class="timeline-item"><div class="tl-icon ${a.cls}"><i class="ti ${a.icon}"></i></div><div class="tl-body"><div class="tl-title">${a.title}</div><div class="tl-meta">${a.sub}</div><div class="tl-meta" style="margin-top:3px;font-size:10px">${a.date}</div></div></div>`).join('')}
      </div>
    </div>
  </div>`;
}

// ── AFHs ──
function renderAFHs(el) {
  el.innerHTML = `
  <div class="flex items-center justify-between mb-16">
    <div class="section-title" style="margin-bottom:0"><i class="ti ti-building-hospital"></i>${DATA.afhs.length} Adult Family Homes</div>
    <button class="btn btn-primary"><i class="ti ti-plus"></i>Add AFH</button>
  </div>
  <div class="grid-3" style="gap:14px">
    ${DATA.afhs.map(a=>`
    <div class="card" style="cursor:pointer" onclick="showAFHDetail(${a.id})">
      <div class="card-body">
        <div class="flex items-start justify-between mb-12">
          <div class="avatar avatar-md avatar-blue" style="border-radius:var(--radius-sm)">${a.name.charAt(0)}</div>
          ${a.activeCases>0?`<span class="badge badge-active">${a.activeCases} active</span>`:`<span class="badge badge-closed">No cases</span>`}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:4px">${a.name}</div>
        <div style="font-size:11.5px;color:var(--text-3);margin-bottom:10px">${a.address}</div>
        <div class="divider"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11.5px">
          <div><div class="text-muted">Administrator</div><div class="font-medium">${a.admin}</div></div>
          <div><div class="text-muted">Phone</div><div class="font-medium">${a.phone}</div></div>
          <div><div class="text-muted">Caregivers</div><div class="font-medium">${a.caregivers}</div></div>
          <div><div class="text-muted">Capacity</div><div class="font-medium">${a.beds} beds</div></div>
        </div>
      </div>
      <div class="card-footer">
        <span style="font-size:11.5px;color:var(--text-3)">View workspace</span>
        <i class="ti ti-arrow-right" style="color:var(--text-3);font-size:14px"></i>
      </div>
    </div>`).join('')}
  </div>`;
}

// ── Caregivers ──
function renderCaregivers(el) {
  el.innerHTML = `
  <div class="flex items-center justify-between mb-16">
    <div class="section-title" style="margin-bottom:0"><i class="ti ti-users"></i>${DATA.caregivers.length} Caregivers</div>
    <button class="btn btn-primary"><i class="ti ti-plus"></i>Add Caregiver</button>
  </div>
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="ti ti-list"></i>Caregiver roster</div>
      <div class="flex gap-8">
        <button class="btn btn-sm"><i class="ti ti-filter"></i>Filter</button>
        <button class="btn btn-sm"><i class="ti ti-download"></i>Export</button>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Caregiver</th><th>Role</th><th>AFH</th><th>Credential</th><th>Expiry</th><th>CPR</th><th>Training</th><th>Eligible</th><th>Cases</th><th></th></tr></thead>
        <tbody>
          ${DATA.caregivers.map(c=>`<tr>
            <td><div class="patient-chip">${avatarEl(c.initials,c.color)}<div><div class="patient-name">${c.name}</div></div></div></td>
            <td><span class="badge badge-info">${c.role}</span></td>
            <td class="td-muted">${getAFH(c.afhId).name.split(' ')[0]} AFH</td>
            <td class="text-mono td-muted">${c.credential}</td>
            <td>${credentialStatus(c.expiry)}</td>
            <td>${credentialStatus(c.cpr)}</td>
            <td>${c.training?'<span class="badge badge-active">Verified</span>':'<span class="badge badge-reassess">Pending</span>'}</td>
            <td>${c.eligible?'<span class="badge badge-active">Eligible</span>':'<span class="badge badge-suspended">Ineligible</span>'}</td>
            <td style="font-weight:600">${c.cases}</td>
            <td><button class="btn btn-sm btn-ghost"><i class="ti ti-eye"></i></button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ── Patients ──
function renderPatients(el) {
  el.innerHTML = `
  <div class="flex items-center justify-between mb-16">
    <div class="section-title" style="margin-bottom:0"><i class="ti ti-heart-rate-monitor"></i>${DATA.patients.length} Patients</div>
    <button class="btn btn-primary"><i class="ti ti-plus"></i>Add Patient</button>
  </div>
  <div class="grid-2" style="gap:14px">
    ${DATA.patients.map(p=>{
      const cases = DATA.cases.filter(c=>c.patientId===p.id);
      const afh = getAFH(p.afhId);
      return `<div class="card" style="cursor:pointer">
        <div class="card-body">
          <div class="flex items-start gap-10 mb-12">
            ${avatarEl(p.initials,p.color,'md')}
            <div style="flex:1">
              <div style="font-weight:600;font-size:13.5px">${p.name}</div>
              <div style="font-size:11.5px;color:var(--text-3)">DOB ${p.dob} · ${p.gender}</div>
              <div style="font-size:11.5px;color:var(--text-3)">${afh.name}</div>
            </div>
            ${cases.length>0?statusBadge(cases[0].status):''}
          </div>
          <div style="margin-bottom:10px">
            <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Diagnoses</div>
            <div style="display:flex;flex-wrap:wrap;gap:5px">${p.diagnoses.map(d=>`<span class="badge badge-info">${d}</span>`).join('')}</div>
          </div>
          <div class="divider"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11.5px">
            <div><div class="text-muted">Physician</div><div class="font-medium">${p.physician}</div></div>
            <div><div class="text-muted">Pharmacy</div><div class="font-medium" style="font-size:11px">${p.pharmacy}</div></div>
          </div>
        </div>
        <div class="card-footer">
          <span style="font-size:11.5px;color:var(--text-3)">${cases.length} delegation case${cases.length!==1?'s':''}</span>
          <button class="btn btn-sm" onclick="showCaseDetail('${cases[0]?.id}')"><i class="ti ti-arrow-right"></i>View case</button>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ── Delegation Cases ──
function renderCases(el) {
  el.innerHTML = `
  <div class="flex items-center justify-between mb-16">
    <div class="section-title" style="margin-bottom:0"><i class="ti ti-clipboard-list"></i>${DATA.cases.length} Delegation Cases</div>
    <button class="btn btn-primary" onclick="showNewCaseModal()"><i class="ti ti-plus"></i>New Delegation Case</button>
  </div>
  <div class="card mb-16">
    <div class="tab-bar">
      ${['All','Active','Pending Consent','Draft','Reassessment','Suspended','Rescinded','Closed'].map((t,i)=>`<div class="tab-item${i===0?' active':''}">${t}</div>`).join('')}
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Case ID</th><th>Patient</th><th>Caregiver</th><th>AFH</th><th>Tasks</th><th>Status</th><th>Created</th><th>Next reassess</th><th>Forms</th><th></th></tr></thead>
        <tbody>
          ${DATA.cases.map(c=>{
            const pt=getPatient(c.patientId), cg=getCaregiver(c.caregiverId), afh=getAFH(c.afhId);
            return `<tr>
              <td class="text-mono" style="font-size:11.5px;color:var(--blue-600);cursor:pointer" onclick="showCaseDetail('${c.id}')">${c.id}</td>
              <td><div class="patient-chip">${avatarEl(pt.initials,pt.color)}<div><div class="patient-name">${pt.name}</div><div class="patient-dob">DOB ${pt.dob}</div></div></div></td>
              <td><div class="patient-chip">${avatarEl(cg.initials,cg.color)}<span>${cg.name}</span></div></td>
              <td class="td-muted" style="font-size:11.5px">${afh.name.split(' ').slice(0,2).join(' ')}</td>
              <td class="td-muted">${c.tasks.slice(0,2).join(', ')}${c.tasks.length>2?` +${c.tasks.length-2}`:''}</td>
              <td>${statusBadge(c.status)}</td>
              <td class="td-muted">${c.created}</td>
              <td class="td-muted">${c.nextReassess||'—'}</td>
              <td style="font-size:11.5px;color:var(--text-3)">${c.forms.length} forms</td>
              <td><div class="flex gap-6">
                <button class="btn btn-sm btn-ghost" onclick="showCaseDetail('${c.id}')"><i class="ti ti-eye"></i></button>
                <button class="btn btn-sm btn-ghost"><i class="ti ti-file-download"></i></button>
              </div></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ── Case Detail ──
function showCaseDetail(caseId) {
  const c = DATA.cases.find(x=>x.id===caseId); if(!c) return;
  const pt=getPatient(c.patientId), cg=getCaregiver(c.caregiverId), afh=getAFH(c.afhId);

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
  <div class="modal" style="max-width:780px">
    <div class="modal-header">
      <div>
        <div class="modal-title"><i class="ti ti-clipboard-list" style="font-size:16px;vertical-align:-2px;margin-right:6px"></i>Delegation Case ${c.id}</div>
        <div style="font-size:11px;color:var(--text-3);margin-top:2px">${afh.name}</div>
      </div>
      <div class="flex items-center gap-8">
        ${statusBadge(c.status)}
        <button class="btn btn-ghost btn-icon" onclick="this.closest('.modal-overlay').remove()"><i class="ti ti-x"></i></button>
      </div>
    </div>
    <div class="modal-body">
      <div class="grid-3 mb-16" style="gap:12px">
        <div style="background:var(--gray-50);border-radius:var(--radius);padding:12px">
          <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Patient</div>
          <div class="patient-chip">${avatarEl(pt.initials,pt.color)}<div><div class="patient-name">${pt.name}</div><div class="patient-dob">DOB ${pt.dob}</div></div></div>
        </div>
        <div style="background:var(--gray-50);border-radius:var(--radius);padding:12px">
          <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Caregiver</div>
          <div class="patient-chip">${avatarEl(cg.initials,cg.color)}<div><div class="patient-name">${cg.name}</div><div class="patient-dob">${cg.role} · ${cg.credential}</div></div></div>
        </div>
        <div style="background:var(--gray-50);border-radius:var(--radius);padding:12px">
          <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Timeline</div>
          <div style="font-size:12px"><div>Created: <strong>${c.created}</strong></div><div>Next reassess: <strong>${c.nextReassess||'TBD'}</strong></div></div>
        </div>
      </div>
      <div class="section-title mb-12">Delegated tasks</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        ${c.tasks.map(t=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--gray-50);border-radius:var(--radius);border:1px solid var(--border)">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--green-400);flex-shrink:0"></div>
          <span style="font-weight:500;font-size:12.5px">${t}</span>
          <div class="ml-auto flex gap-6">
            <span class="badge badge-active">Active</span>
            <button class="btn btn-sm btn-ghost"><i class="ti ti-edit"></i></button>
          </div>
        </div>`).join('')}
        <button class="btn btn-sm" style="align-self:flex-start"><i class="ti ti-plus"></i>Add task</button>
      </div>
      <div class="section-title mb-12">DSHS forms</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
        ${c.forms.length>0?c.forms.map(f=>`<div style="display:flex;align-items:center;gap:6px;padding:7px 12px;background:var(--surface);border:1px solid var(--border-md);border-radius:var(--radius-sm);font-size:12px">
          <i class="ti ti-file-text" style="color:var(--blue-600)"></i>
          <span>${f}</span>
          <button class="btn btn-sm btn-ghost btn-icon" style="margin-left:6px;padding:2px 4px"><i class="ti ti-download" style="font-size:13px"></i></button>
        </div>`).join(''):`<div style="font-size:12px;color:var(--text-3)">No forms generated yet.</div>`}
        <button class="btn btn-sm btn-primary"><i class="ti ti-file-plus"></i>Generate form</button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="this.closest('.modal-overlay').remove()">Close</button>
      <button class="btn btn-success"><i class="ti ti-file-download"></i>Download packet</button>
      <button class="btn btn-primary"><i class="ti ti-edit"></i>Edit case</button>
    </div>
  </div>`;
  overlay.addEventListener('click', e => { if(e.target===overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ── Visits ──
function renderVisits(el) {
  el.innerHTML = `
  <div class="flex items-center justify-between mb-16">
    <div class="section-title" style="margin-bottom:0"><i class="ti ti-stethoscope"></i>Nursing Visits</div>
    <button class="btn btn-primary"><i class="ti ti-plus"></i>Log Visit</button>
  </div>
  <div class="grid-main-aside-sm">
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="ti ti-list"></i>All visits</div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Patient</th><th>Type</th><th>AFH</th><th>Status</th><th>Form</th><th></th></tr></thead>
          <tbody>
            ${DATA.visits.map(v=>{
              const c=DATA.cases.find(x=>x.id===v.caseId); const pt=c?getPatient(c.patientId):null; const afh=c?getAFH(c.afhId):null;
              return pt?`<tr>
                <td class="text-mono td-muted">${v.date}</td>
                <td><div class="patient-chip">${avatarEl(pt.initials,pt.color)}<span class="patient-name">${pt.name}</span></div></td>
                <td><span class="badge badge-info">${v.type}</span></td>
                <td class="td-muted">${afh?.name.split(' ')[0]} AFH</td>
                <td>${v.status==='Completed'?'<span class="badge badge-active">Completed</span>':'<span class="badge badge-pending">Scheduled</span>'}</td>
                <td>${v.status==='Completed'?'<button class="btn btn-sm"><i class="ti ti-file-download"></i>14-484</button>':'<span class="td-muted">—</span>'}</td>
                <td><button class="btn btn-sm btn-ghost"><i class="ti ti-eye"></i></button></td>
              </tr>`:'';
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card" style="height:fit-content">
      <div class="card-header"><div class="card-title"><i class="ti ti-calendar"></i>Schedule</div></div>
      <div class="card-body">
        ${DATA.visits.filter(v=>v.status==='Scheduled').map(v=>{
          const c=DATA.cases.find(x=>x.id===v.caseId); const pt=c?getPatient(c.patientId):null;
          return pt?`<div style="padding:10px;background:var(--amber-50);border-radius:var(--radius);border:1px solid var(--amber-100);margin-bottom:10px">
            <div style="font-weight:500;font-size:12.5px">${pt.name}</div>
            <div style="font-size:11.5px;color:var(--amber-800)">${v.date} · ${v.type}</div>
          </div>`:'';
        }).join('')}
        <button class="btn btn-sm w-full" style="margin-top:4px"><i class="ti ti-calendar-plus"></i>Schedule new visit</button>
      </div>
    </div>
  </div>`;
}

// ── DSHS Forms ──
function renderForms(el) {
  const stages = [...new Set(DATA.dshsForms.map(f=>f.stage))];
  el.innerHTML = `
  <div class="flex items-center justify-between mb-16">
    <div class="section-title" style="margin-bottom:0"><i class="ti ti-file-text"></i>Official DSHS Nurse Delegation Forms</div>
    <div class="flex gap-8">
      <button class="btn btn-sm"><i class="ti ti-user"></i>Select patient</button>
      <button class="btn btn-primary"><i class="ti ti-file-download"></i>Generate packet</button>
    </div>
  </div>
  <div class="alert alert-info mb-16"><i class="ti ti-info-circle"></i><div>Forms auto-fill from structured delegation case data. Select a patient and case to pre-populate all fields before generating.</div></div>
  ${stages.map(stage=>{
    const forms = DATA.dshsForms.filter(f=>f.stage===stage);
    return `<div class="card mb-16">
      <div class="card-header"><div class="card-title"><i class="ti ti-folder"></i>${stage}</div><span class="badge badge-info">${forms.length} form${forms.length!==1?'s':''}</span></div>
      <div style="padding:14px 18px;display:flex;flex-direction:column;gap:10px">
        ${forms.map(f=>`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--gray-50);border-radius:var(--radius);border:1px solid var(--border)">
          <div style="width:40px;height:40px;background:var(--blue-50);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="ti ti-file-text" style="color:var(--blue-600);font-size:18px"></i></div>
          <div style="flex:1">
            <div style="font-weight:600;font-size:12.5px">DSHS ${f.code}</div>
            <div style="font-size:12px;color:var(--text-2)">${f.name}</div>
            <div style="font-size:11px;color:var(--text-3);margin-top:2px">${f.desc}</div>
          </div>
          <div class="flex gap-6">
            <button class="btn btn-sm"><i class="ti ti-eye"></i>Preview</button>
            <button class="btn btn-sm btn-primary"><i class="ti ti-download"></i>Generate</button>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('')}`;
}

// ── Alerts ──
function renderAlerts(el) {
  el.innerHTML = `
  <div class="flex items-center justify-between mb-16">
    <div class="section-title" style="margin-bottom:0"><i class="ti ti-bell"></i>Alerts & Compliance</div>
    <button class="btn btn-sm"><i class="ti ti-check"></i>Mark all reviewed</button>
  </div>
  <div class="grid-main-aside-sm">
    <div style="display:flex;flex-direction:column;gap:12px">
      ${DATA.alerts.map(a=>`
      <div class="card">
        <div class="card-body" style="display:flex;align-items:flex-start;gap:12px">
          <div class="tl-icon ${a.type==='danger'?'tl-red':a.type==='info'?'tl-blue':'tl-amber'}" style="flex-shrink:0"><i class="ti ${a.icon}"></i></div>
          <div style="flex:1">
            <div style="font-weight:600;font-size:13px">${a.title}</div>
            <div style="font-size:12px;color:var(--text-2);margin-top:2px">${a.desc}</div>
            <div style="font-size:11px;color:var(--text-3);margin-top:4px">${a.time}</div>
          </div>
          <div class="flex gap-6">
            <button class="btn btn-sm">Resolve</button>
            <button class="btn btn-sm btn-ghost"><i class="ti ti-x"></i></button>
          </div>
        </div>
      </div>`).join('')}
    </div>
    <div class="card" style="height:fit-content">
      <div class="card-header"><div class="card-title"><i class="ti ti-id-badge-2"></i>Expiring credentials</div></div>
      <div style="padding:14px 18px;display:flex;flex-direction:column;gap:8px">
        ${DATA.caregivers.map(c=>{
          const days = Math.floor((new Date(c.expiry)-new Date())/86400000);
          if(days>90) return '';
          return `<div style="padding:10px;background:${days<30?'var(--red-50)':'var(--amber-50)'};border-radius:var(--radius-sm);border:1px solid ${days<30?'var(--red-100)':'var(--amber-100)'}">
            <div style="font-weight:500;font-size:12px">${c.name}</div>
            <div style="font-size:11px;color:var(--text-3)">${c.credential}</div>
            <div style="font-size:11px;color:${days<30?'var(--red-600)':'var(--amber-600)'};margin-top:3px">${days<0?'EXPIRED':'Expires in '+days+' days'}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// ── Archive ──
function renderArchive(el) {
  el.innerHTML = `
  <div class="flex items-center justify-between mb-16">
    <div class="section-title" style="margin-bottom:0"><i class="ti ti-archive"></i>Delegation Archive</div>
    <div class="flex gap-8">
      <button class="btn btn-sm"><i class="ti ti-search"></i>Search archive</button>
      <button class="btn btn-sm"><i class="ti ti-download"></i>Export records</button>
    </div>
  </div>
  <div class="alert alert-info mb-16"><i class="ti ti-info-circle"></i><div>Archived records are read-only and retained for 7 years per DSHS requirements. All DSHS forms are preserved in their signed state.</div></div>
  <div class="card">
    <div class="card-header"><div class="card-title"><i class="ti ti-history"></i>Historical delegation records</div></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Case ID</th><th>Patient</th><th>Caregiver</th><th>AFH</th><th>Created</th><th>Closed</th><th>Reason</th><th>Forms</th><th></th></tr></thead>
        <tbody>
          <tr><td class="text-mono" style="color:var(--blue-600)">ND-2023-018</td><td><div class="patient-chip">${avatarEl('PW','gray')} <span>Philip Wekesa</span></div></td><td>J. Odhiambo</td><td class="td-muted">Evergreen AFH</td><td class="td-muted">2023-08-01</td><td class="td-muted">2024-05-19</td><td><span class="badge badge-rescinded">Rescinded</span></td><td class="td-muted">5 forms</td><td><button class="btn btn-sm btn-ghost"><i class="ti ti-eye"></i></button></td></tr>
          <tr><td class="text-mono" style="color:var(--blue-600)">ND-2023-011</td><td><div class="patient-chip">${avatarEl('EO','teal')} <span>Esther Omondi</span></div></td><td>F. Wambua</td><td class="td-muted">Cedar Ridge AFH</td><td class="td-muted">2023-03-10</td><td class="td-muted">2024-02-28</td><td><span class="badge badge-closed">Closed</span></td><td class="td-muted">8 forms</td><td><button class="btn btn-sm btn-ghost"><i class="ti ti-eye"></i></button></td></tr>
          <tr><td class="text-mono" style="color:var(--blue-600)">ND-2022-034</td><td><div class="patient-chip">${avatarEl('MN','purple')} <span>Moses Ndirangu</span></div></td><td>G. Kariuki</td><td class="td-muted">Sunrise AFH</td><td class="td-muted">2022-11-15</td><td class="td-muted">2023-11-14</td><td><span class="badge badge-closed">Closed</span></td><td class="td-muted">11 forms</td><td><button class="btn btn-sm btn-ghost"><i class="ti ti-eye"></i></button></td></tr>
        </tbody>
      </table>
    </div>
  </div>`;
}

// ── New Case Modal ──
function showNewCaseModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title"><i class="ti ti-plus" style="font-size:16px;vertical-align:-2px;margin-right:6px"></i>New Delegation Case</div>
      <button class="btn btn-ghost btn-icon" onclick="this.closest('.modal-overlay').remove()"><i class="ti ti-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="progress-steps mb-20">
        <div class="step active"><div class="step-dot">1</div><span>Basic info</span></div>
        <div class="step-line"></div>
        <div class="step"><div class="step-dot">2</div><span>Tasks</span></div>
        <div class="step-line"></div>
        <div class="step"><div class="step-dot">3</div><span>Consent</span></div>
        <div class="step-line"></div>
        <div class="step"><div class="step-dot">4</div><span>Review</span></div>
      </div>
      <div class="form-row mb-16">
        <div class="form-group"><label class="form-label">Adult Family Home</label>
          <select class="form-select"><option>Select AFH...</option>${DATA.afhs.map(a=>`<option>${a.name}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Patient</label>
          <select class="form-select"><option>Select patient...</option>${DATA.patients.map(p=>`<option>${p.name}</option>`).join('')}</select></div>
      </div>
      <div class="form-row mb-16">
        <div class="form-group"><label class="form-label">Caregiver</label>
          <select class="form-select"><option>Select caregiver...</option>${DATA.caregivers.map(c=>`<option>${c.name} (${c.role})</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Delegation start date</label>
          <input type="date" class="form-input" value="2024-05-23"></div>
      </div>
      <fieldset>
        <legend>Delegated tasks</legend>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${['Insulin administration','Blood glucose monitoring','Wound care','PRN medication','Tube feeding','Oral medication'].map(t=>`<label style="display:flex;align-items:center;gap:8px;font-size:12.5px;cursor:pointer"><input type="checkbox" style="accent-color:var(--blue-600)"> ${t}</label>`).join('')}
        </div>
      </fieldset>
      <div class="form-group">
        <label class="form-label">Additional notes / special instructions</label>
        <textarea class="form-textarea" placeholder="Enter any special instructions or clinical notes..."></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
      <button class="btn btn-primary"><i class="ti ti-arrow-right"></i>Next: Tasks</button>
    </div>
  </div>`;
  overlay.addEventListener('click', e => { if(e.target===overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ── AFH Detail ──
function showAFHDetail(id) {
  const afh = getAFH(id);
  const caregivers = DATA.caregivers.filter(c=>c.afhId===id);
  const patients = DATA.patients.filter(p=>p.afhId===id);
  const cases = DATA.cases.filter(c=>c.afhId===id);

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
  <div class="modal" style="max-width:720px">
    <div class="modal-header">
      <div>
        <div class="modal-title"><i class="ti ti-building-hospital" style="font-size:16px;vertical-align:-2px;margin-right:6px"></i>${afh.name}</div>
        <div style="font-size:11px;color:var(--text-3)">${afh.address} · ${afh.phone}</div>
      </div>
      <button class="btn btn-ghost btn-icon" onclick="this.closest('.modal-overlay').remove()"><i class="ti ti-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="grid-4 mb-16" style="gap:10px">
        <div class="metric-card"><div class="metric-label">Caregivers</div><div class="metric-value blue">${caregivers.length}</div></div>
        <div class="metric-card"><div class="metric-label">Patients</div><div class="metric-value teal">${patients.length}</div></div>
        <div class="metric-card"><div class="metric-label">Cases</div><div class="metric-value green">${cases.length}</div></div>
        <div class="metric-card"><div class="metric-label">Capacity</div><div class="metric-value">${afh.beds}</div></div>
      </div>
      <div class="section-title mb-12">Caregivers</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        ${caregivers.map(c=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--gray-50);border-radius:var(--radius);border:1px solid var(--border)">
          ${avatarEl(c.initials,c.color)}<div style="flex:1"><span style="font-weight:500">${c.name}</span> · <span style="color:var(--text-3);font-size:12px">${c.role} · ${c.credential}</span></div>
          ${credentialStatus(c.expiry)}
          ${c.eligible?'<span class="badge badge-active">Eligible</span>':'<span class="badge badge-suspended">Ineligible</span>'}
        </div>`).join('')}
      </div>
      <div class="section-title mb-12">Delegation cases</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${cases.map(c=>{const pt=getPatient(c.patientId); return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--gray-50);border-radius:var(--radius);border:1px solid var(--border)">
          ${avatarEl(pt.initials,pt.color)}<div style="flex:1"><span style="font-weight:500">${pt.name}</span> · <span style="font-size:11.5px;color:var(--text-3)">${c.tasks.join(', ')}</span></div>
          ${statusBadge(c.status)}
          <button class="btn btn-sm btn-ghost" onclick="this.closest('.modal-overlay').remove();showCaseDetail('${c.id}')"><i class="ti ti-arrow-right"></i></button>
        </div>`;}).join('')}
      </div>
    </div>
    <div class="modal-footer"><button class="btn" onclick="this.closest('.modal-overlay').remove()">Close</button></div>
  </div>`;
  overlay.addEventListener('click', e => { if(e.target===overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  renderPage('dashboard');

  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', () => renderPage(link.dataset.page));
  });
});
