export const CAPABILITIES = [
  {
    n: '01',
    key: 'IT ADVISORY',
    title: 'IT Advisory Services',
    desc: 'Align technology decisions with business priorities, governance, and long-term growth.',
    tags: ['Enterprise Architecture', 'IT Governance', 'Cost Optimization', 'Technology Roadmaps'],
    viz: 'advisory',
    photoAlt: 'Consultant walking a client team through a technology roadmap',
  },
  {
    n: '02',
    key: 'DATA',
    title: 'Data Analytics & Integration',
    desc: 'Connect fragmented data and turn operational information into clearer decisions.',
    tags: ['Data Pipelines', 'Data Integration', 'Dashboards', 'Decision Intelligence'],
    viz: 'data',
    photoAlt: 'Analyst reviewing an operational dataset on a laptop',
  },
  {
    n: '03',
    key: 'CLOUD + ERP',
    title: 'Cloud & ERP Solutions',
    desc: 'Modernize infrastructure and business platforms with scalable cloud and ERP environments.',
    tags: ['Cloud Migration', 'ERP Implementation', 'Cloud Rollout', 'AWS / Azure / GCP / Oracle'],
    viz: 'cloud', photo: 'tech-rack',
    photoAlt: 'Engineer testing equipment in a data-centre rack',
  },
  {
    n: '04',
    key: 'MANAGED IT',
    title: 'Managed IT Services',
    desc: 'Keep infrastructure reliable, monitored, maintained, and ready for business.',
    tags: ['Infrastructure Monitoring', 'Patching', 'Helpdesk', 'IT Maintenance'],
    viz: 'managed',
    photoAlt: 'Support engineer on a call, working tickets across several monitors',
  },
  {
    n: '05',
    key: 'SECURITY',
    title: 'Compliance & Security',
    desc: 'Strengthen technology environments through risk management, security controls, and audit readiness.',
    tags: ['Risk Assessments', 'Security Hardening', 'Regulatory Compliance', 'Audit Readiness'],
    viz: 'security',
    photoAlt: 'Operators at a monitoring desk in a control room',
  },
]

export const LAYERS = [
  {
    n: '01',
    name: 'Business',
    summary: 'Goals, processes and governance set the direction every other layer serves.',
    links: ['Applications', 'Security / Governance'],
    owner: 'IT Advisory',
  },
  {
    n: '02',
    name: 'Applications',
    summary: 'The tools people use each day, integrated instead of stitched together by hand.',
    links: ['Business', 'ERP / Cloud', 'Data'],
    owner: 'Cloud & ERP',
  },
  {
    n: '03',
    name: 'ERP / Cloud',
    summary: 'The enterprise core: finance, supply chain and operations on scalable cloud platforms.',
    links: ['Applications', 'Data', 'Infrastructure'],
    owner: 'Cloud & ERP',
  },
  {
    n: '04',
    name: 'Data',
    summary: 'Pipelines and models that move information between systems and into decisions.',
    links: ['ERP / Cloud', 'Applications', 'Business'],
    owner: 'Data Analytics',
  },
  {
    n: '05',
    name: 'Infrastructure',
    summary: 'Networks, servers and endpoints, monitored and maintained so the layers above stay up.',
    links: ['ERP / Cloud', 'Data', 'Security / Governance'],
    owner: 'Managed IT',
  },
  {
    n: '06',
    name: 'Security / Governance',
    summary: 'Identity, controls and compliance wrapped around every layer, ready for audit.',
    links: ['Infrastructure', 'Data', 'Business'],
    owner: 'Compliance & Security',
  },
]

export const DOMAINS = ['Cloud', 'Data', 'ERP', 'Infrastructure', 'Security', 'Applications', 'Operations']

export const CLOUDS = [
  { k: 'aws', name: 'AWS', note: 'Compute · storage · migration' },
  { k: 'azure', name: 'Microsoft Azure', note: 'Identity · workloads · ERP' },
  { k: 'gcp', name: 'Google Cloud', note: 'Data · analytics · scale' },
  { k: 'oracle', name: 'Oracle', note: 'Oracle Cloud · ERP · databases' },
]

export const INDUSTRIES = [
  { n: '01', name: 'Financial Services', img: 'finance', desc: 'Secure, resilient technology environments for financial operations.' },
  { n: '02', name: 'Healthcare', img: 'health', desc: 'Technology foundations designed around reliability, security, and data.' },
  { n: '03', name: 'Retail & E-commerce', img: 'retail', desc: 'Connected platforms supporting digital commerce and operations.' },
  { n: '04', name: 'Manufacturing', img: 'manufacturing', desc: 'Technology systems supporting production, infrastructure, and visibility.' },
  { n: '05', name: 'Logistics', img: 'logistics', desc: 'Connected data and systems for operational coordination.' },
  { n: '06', name: 'Public Sector', img: 'public', desc: 'Structured technology environments supporting dependable services.' },
]

/* ── Detail content for the Services, Industries and About pages ── */
export const SERVICE_DETAIL = {
  advisory: {
    slug: 'advisory', photo: 'arch', photo2: 'advisory',
    lead: 'Independent, business-first guidance for leadership teams that need to make technology decisions they can defend.',
    body: 'We start with how your organisation actually works today: the systems, the contracts, the costs and the people who depend on them. From there we design a target architecture and a sequenced roadmap that your board, finance team and IT team can all sign off.',
    deliver: [
      ['Enterprise architecture review', 'A clear map of your applications, data flows and integrations, with the risks and redundancies marked.'],
      ['IT governance framework', 'Decision rights, policies and review cadences that keep technology spend accountable.'],
      ['Cost optimisation', 'Licence, cloud and contract analysis that shows where money is leaking and how to recover it.'],
      ['Technology roadmap', 'A phased, costed plan tied to business priorities, with milestones you can track.'],
      ['Platform and vendor selection', 'Structured evaluations so you choose tools on fit, not on sales pitches.'],
    ],
    outcomes: ['One agreed view of your technology estate', 'Investment decisions linked to business goals', 'A roadmap the whole leadership team owns'],
  },
  data: {
    slug: 'data', photo: 'dash', photo2: 'data',
    lead: 'Turn data scattered across ERP, CRM and operational systems into reporting people trust and decisions they can act on.',
    body: 'We design and build the pipelines that move data reliably between systems, model it around the questions your teams ask every week, and deliver dashboards that stay accurate as the business changes.',
    deliver: [
      ['Data pipelines', 'Automated, monitored pipelines that replace manual exports and spreadsheet copying.'],
      ['System integration', 'Connections between ERP, CRM, finance and operational tools so records match everywhere.'],
      ['Dashboards and reporting', 'Role-based dashboards for leadership, finance and operations, built on one source of truth.'],
      ['Data quality and governance', 'Ownership, definitions and checks so the numbers mean the same thing to everyone.'],
      ['Decision intelligence', 'Forecasting and analysis that turns history into planning, not just reporting.'],
    ],
    outcomes: ['Fewer hours spent reconciling spreadsheets', 'Reports that agree across departments', 'Faster, evidence-based decisions'],
  },
  cloud: {
    slug: 'cloud', photo: 'cloud', photo2: 'tech-rack',
    lead: 'Modernise infrastructure and core business platforms on AWS, Microsoft Azure, Google Cloud or Oracle Cloud without disrupting daily operations.',
    body: 'We plan migrations workload by workload, build secure landing zones, and implement or upgrade ERP platforms so finance, supply chain and operations run on a scalable, supported foundation.',
    deliver: [
      ['Cloud readiness assessment', 'Workload discovery, dependency mapping and a migration business case.'],
      ['Migration planning and execution', 'Phased cut-overs with rollback plans, testing and minimal downtime.'],
      ['ERP implementation', 'Configuration, data migration, integration and training for your ERP platform.'],
      ['Cloud rollout and landing zones', 'Secure, well-architected foundations for identity, networking and billing.'],
      ['Cost and performance tuning', 'Right-sizing and monitoring so cloud bills stay predictable.'],
    ],
    outcomes: ['Infrastructure that scales with demand', 'Core processes on a modern ERP', 'Predictable, visible cloud costs'],
  },
  managed: {
    slug: 'managed', photo: 'managed', photo2: 'fiber',
    lead: 'Proactive support that keeps networks, servers and end-user devices healthy, so your team can focus on the business.',
    body: 'We monitor your infrastructure, patch and maintain it on a schedule, and give your staff a responsive helpdesk. Regular service reviews show what was fixed, what is at risk and what to plan for next.',
    deliver: [
      ['Infrastructure monitoring', 'Continuous visibility of networks, servers and endpoints with alerting on real issues.'],
      ['Patch management', 'Scheduled, tested updates for operating systems and key applications.'],
      ['Helpdesk and user support', 'A single point of contact for staff, with tickets tracked to resolution.'],
      ['Preventive maintenance', 'Health checks, backups and capacity planning before problems appear.'],
      ['Service reviews and reporting', 'Clear reports on tickets, uptime and recommended improvements.'],
    ],
    outcomes: ['Fewer outages and surprises', 'Staff issues resolved quickly', 'A clear view of IT health every month'],
  },
  security: {
    slug: 'security', photo: 'security', photo2: 'ind-finance',
    lead: 'Reduce risk and walk into audits prepared, with security controls designed around how your business really operates.',
    body: 'We assess your exposure, harden infrastructure and identity, map controls to the regulations that apply to you, and build the documentation and evidence auditors expect to see.',
    deliver: [
      ['Risk assessments', 'Prioritised findings across infrastructure, applications, identity and data.'],
      ['Security hardening', 'Configuration baselines, network segmentation and endpoint protection.'],
      ['Identity and access management', 'Least-privilege access, MFA and joiner-mover-leaver processes.'],
      ['Regulatory compliance', 'Control mapping and gap analysis against the frameworks you must meet.'],
      ['Audit readiness', 'Policies, evidence packs and remediation tracking ahead of every audit.'],
    ],
    outcomes: ['Known, prioritised risks', 'Controls that match regulation', 'Audits without last-minute scrambles'],
  },
}

export const ENGAGEMENTS = [
  ['Assessment', 'A focused review of your systems, risks and costs, ending in a prioritised roadmap.', 'Best for: getting clarity before you invest'],
  ['Project delivery', 'A defined scope such as a migration, ERP roll-out or data platform, delivered in phases.', 'Best for: a specific outcome with a fixed plan'],
  ['Managed service', 'Ongoing monitoring, support and improvement under a service agreement.', 'Best for: keeping systems reliable long term'],
]

export const INDUSTRY_DETAIL = {
  finance: { lead: 'Financial operations depend on systems that are secure, available and auditable.', challenges: ['Strict regulatory and audit requirements', 'Legacy core systems that are hard to change', 'Pressure to digitise customer journeys'], help: [['Compliance & Security', 'security'], ['Cloud & ERP', 'cloud'], ['Data Analytics', 'data']] },
  health: { lead: 'Clinical and administrative teams need reliable systems and protected patient data.', challenges: ['Sensitive data and privacy obligations', 'Many disconnected clinical and admin systems', 'Little tolerance for downtime'], help: [['Managed IT', 'managed'], ['Data Analytics', 'data'], ['Compliance & Security', 'security']] },
  retail: { lead: 'Commerce runs across stores, websites, warehouses and finance at once.', challenges: ['Stock and sales data out of sync', 'Seasonal spikes in demand', 'Payment and customer data security'], help: [['Data Analytics', 'data'], ['Cloud & ERP', 'cloud'], ['Compliance & Security', 'security']] },
  manufacturing: { lead: 'Production, maintenance and supply chain need shared, real-time visibility.', challenges: ['Shop-floor systems isolated from ERP', 'Limited visibility of production data', 'Ageing infrastructure on site'], help: [['Cloud & ERP', 'cloud'], ['Data Analytics', 'data'], ['Managed IT', 'managed']] },
  logistics: { lead: 'Coordinating fleets, warehouses and partners depends on connected data.', challenges: ['Tracking data spread across partners', 'Manual planning and reporting', 'Systems that must run around the clock'], help: [['Data Analytics', 'data'], ['Managed IT', 'managed'], ['IT Advisory', 'advisory']] },
  public: { lead: 'Public services need dependable, transparent and well-governed technology.', challenges: ['Governance and procurement requirements', 'Legacy platforms and budget limits', 'Citizen data protection'], help: [['IT Advisory', 'advisory'], ['Compliance & Security', 'security'], ['Managed IT', 'managed']] },
}

export const ROLES = [
  ['Solution architects', 'Design target architectures and keep every project aligned to the roadmap.'],
  ['Data engineers', 'Build pipelines, integrations and models behind trusted reporting.'],
  ['Cloud & ERP consultants', 'Plan migrations and configure the platforms your operations run on.'],
  ['Security specialists', 'Assess risk, harden systems and prepare evidence for audit.'],
  ['Service desk engineers', 'Monitor, maintain and support your infrastructure and users day to day.'],
]

export const APPROACH = [
  ['Assess', 'We review systems, data, contracts, costs and risks, and interview the people who use them.', 'Current-state report and priorities'],
  ['Design', 'We define the target architecture and a phased roadmap with budgets and milestones.', 'Architecture and costed roadmap'],
  ['Deliver', 'We build, migrate and integrate in phases, testing each step before cut-over.', 'Working systems, documented'],
  ['Run', 'We monitor, support and improve the environment, with regular service reviews.', 'Stable operations and reporting'],
]
