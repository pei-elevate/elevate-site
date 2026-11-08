/**
 * All site content lives here. Edit text, links and people in this file;
 * components only read from it.
 *
 * Any value wrapped in square brackets (e.g. "[GITHUB LINK]") is a placeholder
 * that still needs to be filled in. Links that are placeholders are rendered
 * as disabled on the site.
 */

export const PLACEHOLDER = /^\[.*\]$/

export function isPlaceholder(value: string | undefined): boolean {
  return !value || PLACEHOLDER.test(value.trim())
}

// ---------------------------------------------------------------------------
// General
// ---------------------------------------------------------------------------

export const project = {
  name: 'elevate',
  fullTitle: 'elevate – elevator inspection management for the municipality',
  tagline:
    "Develop a system to manage the municipality's elevators, from their registration to inspection requests and follow-up.",
  nameOrigin:
    'The name joins elevator and validate: every elevator in the municipality is known and every inspection is validated on time.',
  course: 'Projeto em Engenharia Informática',
  university: 'Universidade de Aveiro',
  client: 'Câmara Municipal de Aveiro',
  academicYear: '2026/2027',
  copyright: '© Copyright 2026 elevate. All rights reserved.',
}

// ---------------------------------------------------------------------------
// Home hero
// ---------------------------------------------------------------------------

export const hero = {
  /** Two-line headline: `struck` is crossed out (the problem), `highlight` is marked (the result). */
  line1: { text: 'From', struck: 'Paperwork' },
  line2: { text: 'To', highlight: 'Full Control' },
  subtitle: 'Information System for the Management and Inspection of Municipal Elevators',
  cta: 'Learn more',
}

export const links = {
  github: 'https://github.com/pei-elevate',
  jira: 'https://peielevate.atlassian.net/jira/software/projects/SCRUM/boards/1',
  proposalPdf: './docs/elevate-proposal.pdf',
}

export const resources = [
  { key: 'github', label: 'GitHub', href: links.github },
  { key: 'jira', label: 'Jira', href: links.jira },
] as const

// ---------------------------------------------------------------------------
// Features (from the project proposal, "Main Functionalities")
// ---------------------------------------------------------------------------

export interface Feature {
  title: string
  description: string
}

export const features: Feature[] = [
  {
    title: 'Elevator Register',
    description:
      'Identification, location, building and owner, installation licence, inspection history and current status, imported from urban planning licences and the daily request intake.',
  },
  {
    title: 'Inspection Request Management',
    description:
      'Online form for condominiums and owners to submit inspection requests, with validation, automatic linking to the elevator record, and multi-criteria search and filtering.',
  },
  {
    title: 'Inspection Scheduling and Sharing',
    description:
      'Automatic generation of the request list for the inspection company, with a shared portal or export where the company confirms dates, assigns technicians and uploads reports.',
  },
  {
    title: 'Inspection Periodicity and Notices',
    description:
      'Due-date calculation per elevator, reminders, automatic generation of the official notice (ofício) when an inspection is due or overdue, and a prompt for the fee payment.',
  },
  {
    title: 'Non-Conformity Management',
    description:
      'Workflow for failed inspections (re-inspection deadline, interdiction notice) and for on-site complaints reported at the elevator, linked to the elevator record.',
  },
  {
    title: 'Dashboard and Performance Indicators',
    description:
      'Elevators by status, overdue inspections, requests per period, approval rate and average time from request to report, for municipal staff and management.',
  },
]

// ---------------------------------------------------------------------------
// People
// ---------------------------------------------------------------------------

export interface Person {
  name: string
  role?: string
  /** Path under /public (e.g. "./team/claudino.jpg") or a placeholder. */
  photo: string
  github?: string
  linkedin?: string
  /** Personal/institutional page (used for advisors). */
  profile?: string
  email?: string
}

export const team: Person[] = [
  {
    name: 'Claudino Martins',
    photo: './team/claudino.webp',
    github: 'https://github.com/dino3111',
    linkedin: 'https://www.linkedin.com/in/claudinomartins/',
  },
  {
    name: 'Gonçalo Vila',
    photo: './team/goncalo.webp',
    github: 'https://github.com/goncalovila',
    linkedin: 'https://www.linkedin.com/in/gon%C3%A7alo-figueiredo-212347410/',
  },
  {
    name: 'Martim Dias',
    photo: './team/martim.webp',
    github: 'https://github.com/mtravesso',
    linkedin: 'https://www.linkedin.com/in/martimtravessodias/',
  },
  {
    name: 'Rodrigo Simões',
    photo: './team/rodrigo.webp',
    github: 'https://github.com/xutaa',
    linkedin: 'https://www.linkedin.com/in/rodrigosimoes1/',
  },
  {
    name: 'Simão Pinto',
    photo: './team/simao.webp',
    github: 'https://github.com/SimaoPinto999',
    linkedin: 'https://www.linkedin.com/in/simaopinto06/',
  },
]

export const advisors: Person[] = [
  {
    name: 'Prof. Osvaldo Pacheco',
    role: 'Advisor',
    photo: '[PHOTO]',
    profile: 'https://www.ua.pt/pt/p/10313442',
    email: 'orp@ua.pt',
  },
  {
    name: 'Daniel Ferreira',
    role: 'Advisor',
    photo: '[PHOTO]',
    profile: 'https://www.ua.pt/pt/p/80653922',
    email: 'danielmartinsferreira@ua.pt',
  },
]

export const collaborators: Person[] = [
  {
    name: 'Vereador Pedro Almeida',
    role: 'Collaborator · Câmara Municipal de Aveiro',
    photo: '[PHOTO]',
    email: 'ver.pedroalmeida@cm-aveiro.pt',
  },
]

// ---------------------------------------------------------------------------
// Calendar (from calendario_elevate.xlsx)
// ---------------------------------------------------------------------------

/** A task, or a task with sub-items. */
export type Task = string | { title: string; items: string[] }

export type ScheduleRow =
  | { type: 'period'; phase: string; weeks: string; tasks: Task[] }
  | { type: 'milestone'; phase: string; code: string; date: string }
  | { type: 'event'; phase: string; date: string; tasks: Task[] }

export const schedule: ScheduleRow[] = [
  {
    type: 'period',
    phase: 'Inception',
    weeks: '22/09 – 28/09',
    tasks: [
      'Project Website (Claudino)',
      'Github Organization',
      'Jira Project',
      'Project Calendar (All)',
      'Functionalities (Rodrigo)',
      'Actors and Use Cases (Martim & Gonçalo)',
      'Architecture design (Simão & Rodrigo)',
      'State-of-the-art and Context (Martim & Claudino)',
      'Presentation (All)',
    ],
  },
  { type: 'milestone', phase: 'Inception', code: 'M1', date: '29/09' },
  {
    type: 'period',
    phase: 'Elaboration',
    weeks: '30/09 – 06/10',
    tasks: [
      'User Stories (All)',
      'Functional Requirements (All)',
      'Non-Functional Requirements (Simão)',
      'Database Diagram (Claudino & Gonçalo)',
    ],
  },
  {
    type: 'period',
    phase: 'Elaboration',
    weeks: '06/10 – 12/10',
    tasks: [
      'Use Case Diagram (Claudino)',
      'Design Mockups (Claudino & Martim)',
      'Refined State-of-the-art (Martim)',
      'Refined Architecture (Simão & Rodrigo)',
      'Draft Technical Report',
      'Presentation (All)',
    ],
  },
  { type: 'milestone', phase: 'Elaboration', code: 'M2', date: '13/10' },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '14/10 – 20/10',
    tasks: [
      'Heuristic Evaluation (Martim & Simão)',
      'WCAG Accessibility Audit (Simão & Rodrigo)',
      'Color Contrast Review (Claudino)',
      'Keyboard & Screen Reader Check (Gonçalo & Rodrigo)',
    ],
  },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '21/10 – 02/11',
    tasks: [
      'User Feedback Session (CMA) (All)',
      'Accessibility Matrix (Rodrigo)',
      'Mockup Iteration (Claudino & Martim)',
      'Legal Requirements (GDPR, Licensing, Sector Regulation, T&C) (Claudino & Martim)',
      'Technical Risks & Risk Mitigation (Gonçalo & Simão)',
      'Presentation (All)',
    ],
  },
  { type: 'milestone', phase: 'Construction', code: 'M3', date: '03/11' },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '04/11 – 10/11',
    tasks: ['Backend Foundation: Data Model, States and Sample Data (Simão)'],
  },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '11/11 – 17/11',
    tasks: [
      'Log New Elevator Notice (Gonçalo)',
      'Register Elevator (Claudino)',
      'Inspection Requests from MyDoc (Mock) (Simão)',
      'View Assigned Inspections (Martim)',
      'Schedule Inspections (Rodrigo)',
    ],
  },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '18/11 – 24/11',
    tasks: [
      'Review Elevator Registration (Claudino)',
      'View Elevator Information (Gonçalo)',
      'Check Request / Inspection Status (Martim)',
      'Submit Inspection Results and Reports (Rodrigo)',
      'Usability Tests (SUS) (Simão)',
    ],
  },
  { type: 'milestone', phase: 'Construction', code: 'Checkpoint', date: '24/11' },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '25/11 – 01/12',
    tasks: [
      'Manage Failed Inspection (Rodrigo)',
      '60-Day Deadline Reminder & Email Notifications (Simão)',
      'Search and Filter Elevators and Inspections (Gonçalo)',
    ],
  },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '02/12 – 08/12',
    tasks: [
      'Check Failed Inspections and Re-inspections (Martim)',
      'Alert Elevator Notification Without Registration (Simão)',
      'View Indicators and Operational Statistics (Claudino)',
      'Integration & Fixes (Gonçalo & Rodrigo)',
    ],
  },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '08/12 – 15/12',
    tasks: ['Integration Tests, Fixes & Presentation (All)'],
  },
  { type: 'milestone', phase: 'Construction', code: 'M4', date: '15/12' },
  { type: 'period', phase: 'Transition', weeks: '10/02 – 23/02', tasks: ['Map / Geographic Information'] },
  { type: 'period', phase: 'Transition', weeks: '24/02 – 09/03', tasks: ['Complaints and Incidents'] },
  { type: 'period', phase: 'Transition', weeks: '10/03 – 23/03', tasks: ['Elevator License Registration'] },
  { type: 'period', phase: 'Transition', weeks: '07/04 – 20/04', tasks: ['Testing & Bug Fixing'] },
  { type: 'period', phase: 'Transition', weeks: '21/04 – 04/05', tasks: ['User Testing', 'Enhance Features'] },
  { type: 'period', phase: 'Transition', weeks: '04/05 – 18/05', tasks: ['Data Collection & Analytics', 'Stabilize Final Product'] },
  { type: 'period', phase: 'Transition', weeks: '19/05 – 25/05', tasks: ['Project Documentation'] },
  { type: 'period', phase: 'Transition', weeks: '26/05 – 01/06', tasks: ['Final Presentation'] },
  {
    type: 'event',
    phase: 'Transition',
    date: '04/06',
    tasks: [{ title: 'STUDENTS@DETI', items: ['Demo', 'Poster', 'Video', 'Technical Report'] }],
  },
]

// ---------------------------------------------------------------------------
// Milestones
// ---------------------------------------------------------------------------

export interface MilestoneImage {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
}

export interface MilestoneSubsection {
  title: string
  body?: string[]
  items?: string[]
  cards?: { title: string; description?: string }[]
  groups?: { title: string; items: string[] }[]
  image?: MilestoneImage
  images?: MilestoneImage[]
  pdf?: { src: string; label: string }
}

export interface MilestoneSection {
  title: string
  /** Paragraphs of text. */
  body?: string[]
  /** Bullet list. */
  items?: string[]
  /** Titled cards (used for actors). */
  cards?: { title: string; description?: string }[]
  /** Grouped lists by category (used for use cases by actor). */
  groups?: { title: string; items: string[] }[]
  /** Optional image (e.g. for State of the Art diagram or chart). */
  image?: MilestoneImage
  /** Optional multiple images. */
  images?: MilestoneImage[]
  /** Optional subsections. */
  subsections?: MilestoneSubsection[]
  /** Optional interactive embed (e.g. Figma). */
  embed?: { url: string; title?: string; height?: number; externalUrl?: string; externalLabel?: string }
  /** Optional download or external PDF link. */
  pdf?: { src: string; label: string }
}

export interface Milestone {
  id: 'm1' | 'm2' | 'm3' | 'm4'
  /** Short code, e.g. "M1". */
  code: string
  /** Full label, e.g. "Milestone 1". */
  label: string
  /** Milestone title (its topic). */
  name: string
  /** RUP phase the milestone belongs to. */
  phase: 'Inception' | 'Elaboration' | 'Construction' | 'Transition'
  summary: string
  date: string
  /** Canva "Embed" URL (Share → More → Embed → copy the src). Leave as a placeholder to show an empty frame. */
  canvaEmbedUrl: string
  sections: MilestoneSection[]
  /** Hide from the site while the milestone is still in progress. */
  hidden?: boolean
}

/** Every milestone, including the hidden ones (shown as "coming soon" on the overview). */
export const allMilestones: Milestone[] = [
  {
    id: 'm1',
    code: 'M1',
    label: 'Milestone 1',
    name: 'Project Vision & Architecture',
    phase: 'Inception',
    summary:
      'Vision, problem, requirements and high-level architecture.',
    date: '29/09/2026',
    canvaEmbedUrl: 'https://www.canva.com/design/DAHWNwlLkFQ/OizVpoIOpeHJMS35WrAGVA/view?embed',
    sections: [
      {
        title: 'Goal',
        body: [
          "Develop a system to manage the municipality's elevators, from their registration to inspection requests and follow-up.",
        ],
      },
      {
        title: 'Context',
        body: [
          'The Câmara Municipal de Aveiro (CMA) is responsible for ensuring that the elevators installed in the municipality are periodically inspected.',
          'Today the process is largely manual: condominiums and private owners submit inspection requests through a form (around one hundred requests per cycle), municipal staff compile a list of the pending requests and send it to the contracted inspection company, technicians carry out the inspections, and the resulting reports are sent back and filed.',
        ],
      },
      {
        title: 'Problem',
        items: [
          'The data entered in the request form is not reused in the document sent to the inspection company, so it is re-typed by hand.',
          'The only way to filter requests is by date.',
          'There is no register of the elevators: the municipality does not know how many exist, where they are, or when each one was last inspected.',
          'Without a register, the legal periodicity of inspections cannot be enforced; when an inspection is three months overdue the current practice is an informal warning.',
          'There is no channel for complaints about elevators found without a valid inspection.',
        ],
      },
      {
        title: 'Expected Results',
        body: [
          'An open-source platform designed to digitise and streamline municipal elevator management, delivering the following core capabilities:',
        ],
        items: [
          'Manage elevator data and inspection history.',
          'Submit and manage inspection requests.',
          'Schedule inspections and coordinate with the inspection company.',
          'Track deadlines and generate notices.',
          'Workflow for failed inspections, re-inspection deadlines, interdiction notices and complaints.',
          'Monitor status, delays, and performance.',
        ],
      },
      {
        title: 'State of the Art',
        image: {
          src: './images/sota.png',
          alt: 'State of the Art comparison',
        },
      },
      {
        title: 'Actors',
        cards: [
          {
            title: 'Elevator Owner',
            description:
              'Private owners and condominium managers responsible for registered elevators.',
          },
          {
            title: 'CMA Staff',
            description:
              'Municipal technical unit in charge of elevator registries, compliance monitoring, and inspection tracking.',
          },
          {
            title: 'Inspection Company',
            description:
              'External certified inspection entities and technicians performing periodic and extraordinary inspections.',
          },
        ],
      },
      {
        title: 'Functional Requirements',
        groups: [
          {
            title: 'Elevator Owner',
            items: [
              'Register Elevator: Register elevators and submit technical specifications/installation licenses.',
              'Submit an inspection request: Request periodic or extraordinary inspections directly through an online form.',
              'Check request / inspection status: Monitor the real-time progress of requests, scheduled inspection dates, and approval results.',
              'Receive notices and payment prompts: Receive automated legal notices before deadlines expire, along with fee payment details.',
            ],
          },
          {
            title: 'CMA Staff',
            items: [
              'Register and manage elevators: Manually add or update elevator profiles and import historical installation licences.',
              'Review and validate elevator registration: Audit and validate new elevator registrations submitted by owners.',
              'Review and validate inspection requests: Validate incoming inspection requests before dispatching them to the inspection company.',
              'Track inspection status and deadlines: Control inspection progress and ensure legal periodicity deadlines are met.',
              'Manage failed inspections and re-inspections: Handle non-conformities, re-inspection deadlines, and interdiction notices when safety requirements are not met.',
              'Search and filter elevators / inspections: Search and filter through records by location, status, owner, or inspection date.',
              'View indicators and operational statistics: Access analytical dashboards showing approval rates, delays, backlog, and performance metrics.',
            ],
          },
          {
            title: 'Inspection Company',
            items: [
              'View assigned inspection requests: Access the digital list of pending requests assigned and validated by the CMA.',
              'Confirm inspection dates: Set and confirm scheduling slots and assign certified technicians for field visits.',
              'Submit inspection results and reports: Upload inspection reports, issue digital certificates, and log non-compliance findings directly into the system.',
            ],
          },
        ],
      },
      {
        title: 'Non Functional Requirements',
        items: [
          'Legal deadlines correctly enforced.',
          'Applicable elevator inspection regulations compliant.',
          'Preserve data integrity by preventing duplicate and lost records.',
        ],
      },
      {
        title: 'High-Level Architecture',
        image: {
          src: './images/arquitetura_ms1.jpg',
          alt: 'High-Level Architecture',
          width: 302,
          height: 512,
        },
      },
    ],
  },
  {
    id: 'm2',
    code: 'M2',
    label: 'Milestone 2',
    name: 'Requirements & Design',
    phase: 'Elaboration',
    summary: 'System architecture, data model, requirements and mockups.',
    date: '13/10/2026',
    canvaEmbedUrl: 'https://www.canva.com/design/DAHW_WUz0vM/Td1x_Hw1ZW-hLByt1Slv3g/view?embed',
    sections: [
      {
        title: 'Goal',
        body: [
          "Develop a system to manage the municipality's elevators, from their registration to inspection requests and follow-up.",
        ],
      },
      {
        title: 'State of the Art',
        images: [
          {
            src: './images/SotaAtualizado.png',
            alt: 'State of the Art Comparison',
            width: 700,
          },
          {
            src: './images/sotaTecnologias.png',
            alt: 'Technological Benchmark',
            width: 700,
          },
        ],
      },
      {
        title: 'Actors',
        cards: [
          { title: 'Elevator Owner' },
          { title: 'CMA Urban Planning Staff' },
          { title: 'CMA Elevator Manager Staff' },
          { title: 'Inspection Company' },
          { title: 'Maintenance Company' },
        ],
      },
      {
        title: 'Use Case Diagram',
        image: {
          src: './images/UseCaseDiagram.png',
          alt: 'Use Case Diagram',
        },
      },
      {
        title: 'Functional Requirements',
        groups: [
          {
            title: 'Shared (Elevator Owner, Maintenance Company & CMA Elevator Manager Staff)',
            items: [
              'Display Request / Inspection Status: The system shall display the current status, scheduled inspection date, and final result, when available, for each inspection request.',
              'Display Elevator Information: The system shall display a list of all elevators according to the authenticated user, including their technical specifications, inspection history, and current legal compliance status.',
            ],
          },
          {
            title: 'Elevator Owner',
            items: [
              'Send inspection notices: The system shall automatically send an inspection reminder notification to the elevator owner and the maintenance company 60 days before the inspection deadline of each registered elevator.',
            ],
          },
          {
            title: 'Maintenance Company',
            items: [
              'Register Elevator: The system shall allow the maintenance company to register new elevators, saving them with the status "Pending validation" until they are reviewed by the CMA.',
              'Manage Failed inspection: The system shall notify the maintenance company of the occurrence of failed inspections and the elevator owner when it’s resolved and ready for a re-inspection.',
              'Complaint Registration: The system shall allow the maintenance company to register elevator anomalies, recording them in the elevator\'s history and notifying both the CMA staff and elevator owner.',
            ],
          },
          {
            title: 'CMA Staff (Urban Planning Sector)',
            items: [
              'Elevator Registration Notice: The system shall allow the CMA urban planning staff to register new elevator notices, and automatically notify the elevator manager staff.',
            ],
          },
          {
            title: 'CMA Staff (CMA Elevator Manager Staff)',
            items: [
              'Alert elevator notification without registration: The system shall allow the CMA elevator manager to send an alert to the owner of an existing elevator without registration and respective maintenance company.',
              'Review Elevator Registration: The system shall allow the elevator manager to review pending registrations, change their associated elevator notice if needed, and approve them (assigning an internal reference) or reject them with a reason.',
              'Display Failed Inspections and Re-inspections: The system shall display a list of failed inspections, their substatus and the corresponding re-inspection status.',
              'Search and Filter Elevators / Inspections: The system shall allow the CMA elevator manager to search and filter elevators and their corresponding inspections.',
              'Display Indicators and Operational Statistics: The system shall display a cumulative information relative to all the elevators in the municipality, for example elevators by inspection status, failed inspections, etc.',
            ],
          },
          {
            title: 'Inspection Company',
            items: [
              'Display Assigned Inspections: The system shall display to the inspection company a list of elevators assigned for inspection.',
              'Schedule Inspections: The system shall allow the inspection company to schedule inspection for pending requests, and inform the CMA staff, maintenance company and the owner of the scheduled date and time.',
              'Submit Inspection Results and Reports: The system shall allow the inspection company to submit the inspection result (Approved or Failed) and the report, setting failed inspections to "Action required" and making the records available to the CMA staff, the maintenance company and the owner.',
            ],
          },
        ],
      },
      {
        title: 'Non Functional Requirements',
        items: [
          'Availability: The system should maintain at least 95% availability over a one-year period, excluding scheduled maintenance.',
          'Security: The system should enforce role-based access control, ensuring that 100% of restricted actions are accessible only to authorized user roles during acceptance testing.',
          'Data Integrity: The system should ensure zero duplicated or lost elevator and inspection records during acceptance testing.',
          'Interoperability: The system should integrate with the municipality’s existing document management system and current request submission process without requiring modifications to those systems.',
          'Compliance: All identified GDPR, municipal bylaw, and elevator inspection regulatory requirements should be validated before deployment.',
        ],
      },
      {
        title: 'System Architecture',
        images: [
          {
            src: './images/arquiteturaSoftwareExtended.drawio.png',
            alt: 'Extended Software Architecture Diagram',
          },
          {
            src: './images/arquiteturaTecnologias.png',
            alt: 'Technology Stack and Architecture Overview',
          },
        ],
      },
      {
        title: 'Domain Model',
        images: [
          {
            src: './images/elevate-db-page-1.png',
            alt: 'Domain Model (Part 1)',
          },
          {
            src: './images/elevate-db-page-2.png',
            alt: 'Domain Model (Part 2)',
          },
          {
            src: './images/elevate-db-page-3.png',
            alt: 'Domain Model (Part 3)',
          },
        ],
        pdf: {
          src: './images/elevate-db (2).pdf',
          label: 'Download Domain Model (PDF)',
        },
      },
      {
        title: 'Elevator Registration – Flowchart',
        image: {
          src: './images/FlowChart.png',
          alt: 'Elevator Registration Flowchart',
        },
      },
      {
        title: 'Elevator Registration – Architecture Workflow',
        images: [
          {
            src: './images/workflow1.png',
            alt: 'Architecture Workflow 1',
          },
          {
            src: './images/workflow2.png',
            alt: 'Architecture Workflow 2',
          },
          {
            src: './images/workflow3.png',
            alt: 'Architecture Workflow 3',
          },
          {
            src: './images/workflow4.png',
            alt: 'Architecture Workflow 4',
          },
        ],
      },
      {
        title: 'Mockups',
        body: [
          'Interactive prototype and interface designs developed in Figma for the elevator management and inspection workflows.',
        ],
        embed: {
          url: 'https://embed.figma.com/design/Hj3576kcAcheAKotksmWKM/Mockups-Elevate?node-id=74-2632&embed-host=share',
          title: 'Elevate Figma Mockups',
          height: 600,
          externalUrl: 'https://www.figma.com/design/Hj3576kcAcheAKotksmWKM/Mockups-Elevate?node-id=74-2632&t=yvJMrVvfXIhs9Y4B-1',
          externalLabel: 'Open in Figma',
        },
      },
    ],
  },
  {
    id: 'm3',
    code: 'M3',
    label: 'Milestone 3',
    name: 'Digital Accessibility & Usability',
    phase: 'Construction',
    summary:
      'Heuristic evaluation, WCAG audit, user feedback with the CMA, legal requirements and technical risks.',
    date: '03/11/2026',
    canvaEmbedUrl: 'https://www.canva.com/design/DAHZkvEH7k4/xziB36Cr9PXM1REH-qBD6Q/view?embed',
    sections: [
      {
        title: 'Overview',
        body: [
          'This milestone checks how usable and accessible the prototype is, and what legal and technical constraints the platform has to respect before it is built for real.',
        ],
        items: [
          'Accessibility: a WCAG 2.2 AA audit of the prototype.',
          'Usability: a heuristic evaluation based on Nielsen’s 10 heuristics.',
          'Legal: terms and conditions, legal requirements and personal data protection (GDPR).',
          'Technical risks: external dependencies, integration with the CMA system, technical debt, brittle components and licenses.',
        ],
        pdf: {
          src: './docs/Milestone3.pdf',
          label: 'Download Milestone 3 document (PDF)',
        },
      },
      {
        title: 'Accessibility Matrix',
        body: [
          'Audit against WCAG 2.2 level AA. Six criteria pass, one is partial and five fail. The failures and the partial result are the barriers we have to fix before the MVP.',
        ],
        image: {
          src: './images/WCAG.png',
          alt: 'WCAG 2.2 AA accessibility matrix: 1.4.1 partial; 2.5.3, 4.1.3, 2.4.2, 3.2.4 and 3.3.1 fail; six criteria pass',
        },
        items: [
          '1.4.1 Use of Color (partial): The same icon is used for every status.',
          '2.5.3 Label in Name (fail): The history button and the calendar days.',
          '4.1.3 Status Messages (fail): Search results are not announced.',
          '2.4.2 Page Titled (fail): The page title does not identify the page.',
          '3.2.4 Consistent Identification (fail): The same label is used for different values.',
          '3.3.1 Error Identification (fail): Field errors are not announced.',
          'Passed: 2.1.1 Keyboard, 2.4.7 Focus Visible, 4.1.2 Name, Role, Value, 1.4.10 Reflow, 2.5.8 Target Size and 1.4.3 Contrast (75 items to review).',
        ],
      },
      {
        title: 'Heuristic Evaluation',
        body: [
          'Evaluation of the React prototype using Nielsen’s 10 usability heuristics, with severity from 0 to 4. It found 9 usability problems: 2 of severity 3, 6 of severity 2 and 1 of severity 1. None is critical.',
          'After the evaluation, P01 to P08 and the mobile menu accessibility risk (R01) were fixed and checked in the browser (23/10). P09 was left as it is, because the help page only exists in the mockups. A follow-up accessibility test with axe-core ran 31 analyses across 26 routes and five extra states (24/10).',
          'The full report is in Portuguese.',
        ],
        groups: [
          {
            title: 'Severity 3',
            items: [
              'P02 – Expired certificate shown as valid: An approved inspection with an expired validity date could still give the status "Valid".',
              'P05 – Old complaints cannot be resolved: The resolve action only existed on the four most recent complaints.',
            ],
          },
          {
            title: 'Severity 2',
            items: [
              'P01 – Wrong platform in a notice: The notice told users to submit the periodic inspection request in Elevate, but it is made on another platform.',
              'P03 – Rejected registration has no way to be corrected: The user had to start a new registration from scratch.',
              'P04 – Complaint identifies the elevator only by its reference: The address was not shown.',
              'P06 – Search and filters lost: Going back to the register from an elevator history reset them.',
              'P07 – Scheduled inspection cannot be corrected: There was no way to reschedule a confirmed date.',
              'P08 – Optional attachment cannot be removed: There was no explicit remove action.',
            ],
          },
          {
            title: 'Severity 1',
            items: [
              'P09 – Help lists features without explaining the steps: Only applies to the mockups, so it was not changed.',
            ],
          },
        ],
        subsections: [
          {
            title: 'Fixes and evidence (23/10)',
            body: [
              'Each fix was checked by running the affected journey in an isolated Chromium and capturing the result.',
            ],
            items: [
              'P01: The notice now points to the external platform and explains what can be followed in Elevate.',
              'P02: The current status takes the certificate validity into account. An approved inspection with an expired certificate shows "Overdue", and the historic result stays "Approved".',
              'P03: "Correct and resubmit" reopens a rejected registration with its previous data and reason, and keeps a single entry.',
              'P04 and P05: The complaint form shows the reference and address. The full list has search and a status filter, and only the responsible maintenance company can resolve a complaint.',
              'P06: Search and filters in the register are kept during the session.',
              'P07: A scheduled inspection can be rescheduled by the inspection company, with the previous date filled in and a confirmation.',
              'P08: A selected attachment can be removed without losing the other fields.',
              'R01: On mobile, the closed menu is no longer reachable with the keyboard.',
            ],
            images: [
              {
                src: './images/m3/fix-01-aviso-plataforma-externa.png',
                alt: 'Notice pointing to the external platform for the inspection request',
                caption: 'P01 – Notice pointing to the external platform.',
              },
              {
                src: './images/m3/fix-05-certificado-caducado-em-atraso.png',
                alt: 'Elevator with an expired certificate shown as overdue',
                caption: 'P02 – Expired certificate shown as "Overdue".',
              },
              {
                src: './images/m3/fix-03-registo-corrigido-sem-duplicacao.png',
                alt: 'Rejected registration corrected and resubmitted without duplication',
                caption: 'P03 – Rejected registration corrected without duplication.',
              },
              {
                src: './images/m3/fix-02-reclamacoes-antigas-resolvidas-ema.png',
                alt: 'Full list of complaints with an old complaint resolved',
                caption: 'P04 and P05 – Full complaint list, with an old complaint resolved.',
              },
              {
                src: './images/m3/fix-04-inspecao-reagendada.png',
                alt: 'Inspection rescheduled by the inspection company',
                caption: 'P07 – Inspection rescheduled.',
              },
              {
                src: './images/m3/fix-06-menu-movel-fechado.png',
                alt: 'Closed mobile menu',
                caption: 'R01 – Closed mobile menu.',
                width: 260,
              },
            ],
          },
          {
            title: 'Accessibility test with axe-core (24/10)',
            body: [
              'Run on the published prototype with axe-core 4.14.0: 31 analyses across 26 routes and five extra states, on desktop (1440 × 1080) and mobile (390 × 844). The 32 elements flagged for A01 are one shared defect, not 32 different ones. A clean automatic result does not prove WCAG conformity.',
            ],
            items: [
              'A01 – Accessible name does not include the visible text (WCAG 2.5.3, serious): Buttons labelled "Detalhes" or "Histórico" have an accessible name starting with "Consultar…". Fix: build the name from the visible text, for example "Details of elevator PRC-0079".',
              'A02 – Table regions with the same name (moderate): The inspection history and complaints tables both use "Tabela de resultados". Fix: name each region after its table.',
              'A03 – Placeholder contrast (WCAG 1.4.3): The placeholder text measures about 4.29:1 against the 4.5:1 minimum. Fix: darken the placeholder color. Found by measurement, not reported by axe.',
              'A04 – Extra horizontal scroll on mobile: On a 390 px screen the page was 747 px wide, caused by the visually hidden text of the actions column. Fix: adjust its positioning.',
              'Confirmed: Error focus on the first invalid field, focus inside the help dialog with Escape to close, the closed mobile menu out of the tab order, and no JavaScript errors.',
            ],
            images: [
              {
                src: './images/m3/a11y-01-proprietario-painel.png',
                alt: 'Owner dashboard, where problem A01 was found in the row buttons',
                caption: 'A01 – Owner dashboard, row buttons.',
              },
              {
                src: './images/m3/a11y-09-regioes-tabelas.png',
                alt: 'Maintenance detail page with two table regions with the same name',
                caption: 'A02 – Two table regions with the same name.',
              },
              {
                src: './images/m3/a11y-06-movel-menu-fechado.png',
                alt: 'Mobile owner dashboard with the menu closed',
                caption: 'A04 – Mobile view, where the page scrolls sideways.',
                width: 260,
              },
            ],
          },
        ],
        pdf: {
          src: './docs/Avaliação heurística.pdf',
          label: 'Download Heuristic Evaluation (PDF, PT)',
        },
      },
      {
        title: 'Terms and Conditions',
        body: [
          'The terms protect the creators of the software and set the limits of their liability. The platform feeds the municipal elevator register and decisions about people’s safety, so each user is responsible for the accuracy of what they submit.',
        ],
        groups: [
          {
            title: 'Terms of use',
            items: [
              'Permitted: Each role (Owner, Maintenance Company, Inspection Company, CMA Staff) uses only the features and elevators linked to its own account.',
              'Prohibited: Entering false data or uploading altered reports, sharing credentials or accessing other users’ data, and getting around access control or overloading the system.',
            ],
          },
          {
            title: 'Liability, cancellation and law',
            items: [
              'Liability: The service is provided "as is". Reminders and alerts are only an aid and do not replace the legal obligations of owners and maintenance companies, or the Municipality’s official notices.',
              'Refunds and cancellation: Not applicable, since the platform is free. Users can ask to close their account, but elevator and inspection records stay in the municipal register for as long as the law requires.',
              'Governing law: Portuguese law applies, in particular Decree-Law no. 320/2002 and the GDPR. The courts of the district of Aveiro have jurisdiction.',
              'Changes to the terms: Users are notified at least 15 days before changes take effect. Significant changes must be accepted again at the next login, and the accepted version and date are recorded.',
            ],
          },
        ],
        pdf: {
          src: './docs/Elevate_Terms_and_Conditions.docx (1).pdf',
          label: 'Download Terms and Conditions (PDF)',
        },
      },
      {
        title: 'Legal Requirements',
        body: [
          'Elevator inspections in Portugal are governed by Decree-Law no. 320/2002, which makes municipalities responsible for inspecting lifts in their area. New buildings also need a use permit under the RJUE (Decree-Law no. 555/99). Elevate supports the CMA in applying these rules, but does not replace the inspection company or the CMA’s decisions.',
        ],
        groups: [
          {
            title: 'Inspections and deadlines',
            items: [
              'Periodic inspection (art. 8): Each elevator keeps the validity date of its last certificate, and its status changes to "due soon" or "overdue" automatically. The 2-year rule lives in one configurable module.',
              'Request before the certificate expires (Annex V): Owners and maintenance companies are notified 60 days before the deadline. The request is made at the CMA desk or online, and Elevate receives it without changing the CMA system.',
              'Fee payment: The payment reference is generated and paid outside Elevate, which does not handle payments.',
              'Inspection within 60 days: The inspection company schedules each request in the platform and every party is notified.',
              'Passed inspection: The inspection company submits the result, the certificate validity date and the report. The owner, the CMA and the maintenance company see it in the elevator history.',
              'Failed inspection: The inspection company records the non-conformities and the 30-day correction deadline. The maintenance company marks the corrections as done and the owner requests the re-inspection.',
            ],
          },
          {
            title: 'Register, oversight and access',
            items: [
              'Maintenance contract (art. 4): Each elevator is registered by its maintenance company, which can attach the contract.',
              'Municipal oversight (art. 7): The CMA only approves a registration that matches a prior notice, and alerts owners of elevators that are still unregistered.',
              'Use permit (RJUE): When a permit is issued, Urban Planning staff log a notice that alerts the elevator division to follow up the registration.',
              'Complaints (art. 8): The maintenance company registers complaints, which are kept in the elevator history and notified to the owner and the CMA.',
              'Citizen authentication: Owners log in with Autenticação.gov (Citizen Card or Digital Mobile Key) through Authentik, and Elevate only receives the attributes they authorize.',
            ],
          },
        ],
      },
      {
        title: 'Personal Data Protection (GDPR)',
        body: [
          'Elevate stores personal data of owners, condominiums and the staff of the CMA and of the maintenance and inspection companies, so it must comply with the GDPR (Regulation (EU) 2016/679) and Law no. 58/2019. The Municipality of Aveiro is the data controller. The data is processed because the CMA is legally required to oversee the lifts in its area, so consent is not needed.',
        ],
        subsections: [
          {
            title: 'Personal data and purpose',
            items: [
              'Name: Identify who performs each action and who is responsible for each elevator.',
              'Email: Automatic notices and account identification.',
              'Phone (optional): Contact in urgent situations or to schedule visits.',
              'Tax number (NIF): Identify the person responsible for the elevator, as the CMA already does.',
              'Address: Only the elevator’s address is stored. The owner’s home address is not.',
              'Password: Only for maintenance companies, inspection companies and CMA staff. It is managed by Authentik and stored as a hash. Owners log in with Autenticação.gov.',
            ],
          },
          {
            title: 'Data minimization and retention',
            body: [
              'Development and staging use test data only, and real records are only loaded on the CMA’s servers. The dashboard shows totals only.',
            ],
            items: [
              'User accounts: Deleted automatically 12 months after deactivation.',
              'Access logs: Deleted automatically after 12 months.',
              'Elevator history and inspection records: Kept permanently, as part of the CMA’s archive. On an erasure request, the user’s name is replaced by "Removed user".',
            ],
          },
          {
            title: 'Sharing with third parties',
            body: [
              'Data is not used for advertising and is not transferred outside the European Union. Authentik runs on the CMA’s own infrastructure.',
            ],
            items: [
              'Maintenance company: Only its own elevators.',
              'Inspection company: Only the inspections assigned to it.',
              'MyDoc WIN (AIRC): Elevate receives the inspection request data and does not write to it.',
              'Autenticação.gov: Authenticates owners and only shares name and tax number.',
            ],
          },
          {
            title: 'Security measures',
            items: [
              'Access control: Role-based and enforced on the server, not only in the interface.',
              'Encryption: In transit (HTTPS) and at rest.',
              'Audit log: Every change to inspection records is logged.',
              'Input validation: User inputs and uploaded files are validated.',
              'Backups: Automatic backups stored outside the server, with the restore process tested regularly.',
              'Data breaches: Reported to the supervisory authority (CNPD) within 72 hours.',
            ],
          },
        ],
      },
      {
        title: 'Technical Risks',
        body: [
          'The platform is meant to run at the municipality for years after this project, so we list the risks of the production environment and how we plan to deal with each one.',
        ],
        groups: [
          {
            title: 'Critical',
            items: [
              'Integration with the CMA System (probability high, impact high): The platform must receive inspection requests from MyDoc WIN without changing it, and the integration method is not yet confirmed.',
              'Security and Personal Data Protection (probability low, impact critical): A breach could expose personal data, tamper with inspection results or take the platform offline.',
            ],
          },
          {
            title: 'High',
            items: [
              'Data and Process Migration (probability high, impact medium): The CMA keeps its records in a hand-maintained Excel file going back to around 2000.',
              'CMA Infrastructure Deploy (probability medium, impact high): The CMA’s infrastructure is still unknown.',
            ],
          },
          {
            title: 'Medium and low',
            items: [
              'Data Loss and Backups (medium): The platform becomes the main register, so a failure or accidental deletion could lose records.',
              'Licenses and Dependencies (low): An incompatible license or a known vulnerability could force a late replacement.',
            ],
          },
        ],
        subsections: [
          {
            title: 'Mitigation',
            items: [
              'CMA System integration: A documented exchange mechanism agreed with AIRC and the CMA, never the MyDoc database. It sits behind an adapter with contract tests, with a file import as fallback.',
              'Security: Server-side access control, encryption in transit and at rest, an audit log, input validation, and test data in development and staging.',
              'Migration: An import feature for the CMA’s Excel records with validation and duplicate detection, and a gradual rollout so the old and new processes coexist.',
              'Infrastructure: Gather the CMA’s constraints early, package everything with Docker Compose and keep a staging environment that mirrors production.',
              'Backups: Automatic backups outside the server and a documented recovery plan.',
              'Licenses: List every license in LICENSE.md, check compatibility before adopting a dependency, and run automated vulnerability checks.',
            ],
          },
          {
            title: 'External Dependencies',
            body: [
              'We have no contract or SLA with any of them. Design rule: no pay-per-use service on the critical path.',
            ],
            items: [
              'MyDoc WIN (AIRC): Updates on its own schedule and no confirmed integration method. We use an agreed export or API behind an adapter.',
              'Authentik: Frequent releases and paid enterprise features. We use open-source features and standard OIDC/SAML so it can be replaced.',
              'Autenticação.gov (ARTE, IP): Registration delays can block go-live. We register early and develop against pre-production.',
              'SeaweedFS: Some data-protection features are paid only. The backend only uses the S3 API, so storage can be swapped.',
              'Hosting: Environment changes outside our control. The system is containerized and provider-neutral.',
              'Email delivery: Failed delivery causes missed deadlines. We use standard SMTP and in-app notices as a second channel.',
              'Open-source stack: Abandoned libraries or breaking changes. Versions are pinned, updated on a schedule and checked for vulnerabilities.',
            ],
          },
          {
            title: 'Technical Debt and Maintainability',
            body: ['Debt we are already taking on, and how we plan to repay it before production.'],
            items: [
              'Business rules in the prototype front end: Move them into one configurable, tested module that the server enforces.',
              'Data model shaped by sample data: Derive the schema from anonymized real records, with versioned migrations.',
              'Tests tied to sample data and fixed dates: Generate fixtures, use relative dates and run tests in CI.',
              'Accessibility fixes postponed: Make them part of the definition of done.',
              'Knowledge concentrated in the team: README, architecture decision records, a runbook and a handover session to the CMA.',
              'LLM-generated code: Review before merge, a linter and tests, and no unreviewed generated code in core logic.',
              'Resilience delegated to the reverse proxy: Timeouts, retries and a circuit breaker inside the integration adapter.',
              'Five containers plus a database: One Docker Compose file, a runbook for upgrades and restores, and health checks.',
            ],
          },
          {
            title: 'Brittle Components',
            items: [
              'Integration with MyDoc WIN: A point-to-point link to a proprietary system. Mitigated with an adapter, contract tests and manual entry or file import as fallback.',
              'Excel import: A hand-maintained file with no fixed format. Mitigated with tests on anonymized samples, duplicate detection, and a dry run with a report of rejected rows.',
              'Deadline and notification engine: Intervals depend on the building type (2, 4 or 6 years) and the law can change. Mitigated with rules as configuration, and email plus in-app notices.',
            ],
          },
          {
            title: 'Licenses',
            body: ['The open-source components use permissive licenses, compatible with an open-source project.'],
            items: [
              'React, Vite, FastAPI: MIT.',
              'TypeScript, Docker Engine: Apache-2.0.',
              'Nginx: BSD-2-Clause.',
              'PostgreSQL: PostgreSQL License.',
              'Authentik: MIT (core). The enterprise features use a separate paid license, which we do not use.',
              'SeaweedFS: Apache-2.0. Some data-protection features are paid only.',
              'MyDoc WIN (AIRC): Proprietary. Use of a local test copy is to be confirmed with AIRC.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'm4',
    hidden: true,
    code: 'M4',
    label: 'Milestone 4',
    name: 'MVP Showcase & Peer Review',
    phase: 'Construction',
    summary: 'First working MVP, presented to the supervisors, followed by peer evaluation.',
    date: '15/12/2026',
    canvaEmbedUrl: '[CANVA EMBED LINK M4]',
    sections: [
      { title: 'Overview', body: ['[M4 CONTENT]'] },
      { title: 'Results', body: ['[M4 RESULTS]'] },
    ],
  },
]

export const milestones = allMilestones.filter((m) => !m.hidden)

// ---------------------------------------------------------------------------
// Documentation
// ---------------------------------------------------------------------------

/** Not shown yet: the Documentation page only lists the proposal until the contents are agreed with the advisors. */
export const documentation = [
  {
    id: 'architecture',
    title: 'Architecture',
    body: '[ARCHITECTURE DOCS – system components, deployment diagram, data model]',
  },
  {
    id: 'api',
    title: 'API',
    body: '[API DOCS – endpoints, authentication, link to OpenAPI/Swagger]',
  },
  {
    id: 'user-docs',
    title: 'User Documentation',
    body: '[USER DOCS – guides for owners, municipal staff and the inspection company]',
  },
]
