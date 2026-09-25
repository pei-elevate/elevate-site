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
  academicYear: '[ACADEMIC YEAR]',
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
  /** Decorative illustration on the right: src/assets/hero.svg/1.png (light mode) and 2.png (dark mode). */
  illustration: 'src/assets/hero.svg/1.png · 2.png',
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
    title: 'Request Intake',
    description:
      'Online form for condominiums and owners to submit inspection requests, with validation, automatic linking to the elevator record, and multi-criteria search and filtering.',
  },
  {
    title: 'Inspection Scheduling & Sharing',
    description:
      'Automatic generation of the request list for the inspection company, with a shared portal or export where the company confirms dates, assigns technicians and uploads reports.',
  },
  {
    title: 'Periodicity & Notices',
    description:
      'Due-date calculation per elevator, reminders, automatic generation of the official notice (ofício) when an inspection is due or overdue, and a prompt for the fee payment.',
  },
  {
    title: 'Non-conformity Handling',
    description:
      'Workflow for failed inspections (re-inspection deadline, interdiction notice) and for on-site complaints reported at the elevator, linked to the elevator record.',
  },
  {
    title: 'Dashboard & Indicators',
    description:
      'Elevators by status, overdue inspections, requests per period, approval rate and average time from request to report, for municipal staff and management.',
  },
]

/** Features shown on the home page (the first four for now). */
export const homeFeatures = features.slice(0, 4)

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
    role: 'Student',
    photo: '[PHOTO]',
    github: 'https://github.com/dino3111',
    linkedin: 'https://www.linkedin.com/in/claudinomartins/',
  },
  {
    name: 'Simão Pinto',
    role: 'Student',
    photo: '[PHOTO]',
    github: 'https://github.com/SimaoPinto999',
    linkedin: 'https://www.linkedin.com/in/simaopinto06/',
  },
  {
    name: 'Gonçalo Vila',
    role: 'Student',
    photo: '[PHOTO]',
    github: 'https://github.com/goncalovila',
  },
  {
    name: 'Martim Dias',
    role: 'Student',
    photo: '[PHOTO]',
    github: 'https://github.com/mtravesso',
  },
  {
    name: 'Rodrigo Simões',
    role: 'Student',
    photo: '[PHOTO]',
    github: 'https://github.com/xutaa',
    linkedin: 'https://www.linkedin.com/in/rodrigosimoes1/',
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
      'Database Diagram (Gonçalo)',
    ],
  },
  {
    type: 'period',
    phase: 'Elaboration',
    weeks: '06/10 – 12/10',
    tasks: [
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
    tasks: ['Legal Requirements', 'Technical Risks', 'Risk Mitigation'],
  },
  {
    type: 'period',
    phase: 'Construction',
    weeks: '20/10 – 02/11',
    tasks: [
      'SWOT Analyse',
      'TOWS Matrix',
      'PESTEL Analyse',
      { title: 'Core', items: ['Database Models', 'Core Endpoints', 'Frontend'] },
    ],
  },
  { type: 'milestone', phase: 'Construction', code: 'M3', date: '03/11' },
  { type: 'period', phase: 'Transition', weeks: '04/11 – 17/11', tasks: ['MVP A Module'] },
  { type: 'period', phase: 'Transition', weeks: '17/11 – 01/12', tasks: ['MVP B Module'] },
  {
    type: 'period',
    phase: 'Transition',
    weeks: '01/12 – 14/12',
    tasks: ['MVP Testing', 'Project Management Evaluation', 'Presentation'],
  },
  { type: 'milestone', phase: 'Transition', code: 'M4', date: '15/12' },
  { type: 'period', phase: 'Transition', weeks: '10/02 – 23/02', tasks: ['C Module'] },
  { type: 'period', phase: 'Transition', weeks: '24/02 – 09/03', tasks: ['D Module'] },
  { type: 'period', phase: 'Transition', weeks: '10/03 – 23/03', tasks: ['E Module'] },
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

export interface MilestoneSection {
  title: string
  /** Paragraphs of text. */
  body?: string[]
  /** Bullet list. */
  items?: string[]
  /** Titled cards (used for actors). */
  cards?: { title: string; description: string }[]
}

export interface Milestone {
  id: 'm1' | 'm2' | 'm3' | 'm4'
  code: string
  name: string
  summary: string
  date: string
  /** Canva "Embed" URL (Share → More → Embed → copy the src). Leave as a placeholder to show an empty frame. */
  canvaEmbedUrl: string
  sections: MilestoneSection[]
}

export const milestones: Milestone[] = [
  {
    id: 'm1',
    code: 'M1',
    name: 'Inception',
    summary: 'Project vision, problem, actors, use cases and state of the art.',
    date: '[M1 DATE]',
    canvaEmbedUrl: '[CANVA EMBED LINK M1]',
    sections: [
      {
        title: 'Goal',
        body: [
          'Develop a functional prototype of an elevator inspection management platform adapted to the procedures of the Câmara Municipal de Aveiro.',
        ],
        items: [
          'Build and maintain a register of the elevators in the municipality, populated from incoming requests and from urban planning licences.',
          'Digitise the full inspection lifecycle, from the request form to the inspection report, so that the data flows without re-typing between owners, the municipality, and the inspection company.',
          'Enforce the inspection periodicity through automatic deadlines, official notices, and payment prompts, replacing the current informal warnings.',
          'Publish the platform as open source so that other municipalities with the same obligation can adopt it.',
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
          'An open-source platform that keeps a register of elevators, receives requests, tracks the full inspection lifecycle shared with the inspection company, and automatically issues the official notice (ofício) and payment prompt when an inspection falls due, including the handling of failed inspections and on-site complaints.',
        ],
      },
      {
        title: 'Actors',
        cards: [
          {
            title: 'Owner / Condominium',
            description:
              'Submits inspection requests through the online form and receives official notices and payment prompts when an inspection is due.',
          },
          {
            title: 'Municipal Staff',
            description:
              'Manages the elevator register, reviews requests, generates the list for the inspection company, and follows deadlines, notices and non-conformities.',
          },
          {
            title: 'Inspection Company',
            description:
              'Receives the request list, confirms inspection dates, assigns technicians and uploads inspection reports.',
          },
        ],
      },
      {
        title: 'Use Cases',
        body: ['[USE CASES – to be defined. Candidate use cases taken from the proposal:]'],
        items: [
          'Submit an inspection request (Owner / Condominium).',
          'Register and update an elevator record (Municipal Staff).',
          'Search and filter requests by status, location, due date, owner and result (Municipal Staff).',
          'Generate and share the request list with the inspection company (Municipal Staff).',
          'Confirm inspection dates and assign technicians (Inspection Company).',
          'Upload an inspection report (Inspection Company).',
          'Issue the official notice (ofício) and payment prompt when an inspection is due (Municipal Staff).',
          'Handle a failed inspection or an on-site complaint (Municipal Staff).',
          'Consult the dashboard indicators (Municipal Staff).',
        ],
      },
      {
        title: 'State of the Art',
        body: ['[STATE OF THE ART – comparison with existing solutions]'],
      },
    ],
  },
  {
    id: 'm2',
    code: 'M2',
    name: 'Elaboration',
    summary: 'System architecture, data model, requirements and mockups.',
    date: '[M2 DATE]',
    canvaEmbedUrl: '[CANVA EMBED LINK M2]',
    sections: [
      { title: 'Overview', body: ['[M2 CONTENT]'] },
      { title: 'Architecture', body: ['[M2 ARCHITECTURE]'] },
      { title: 'Mockups', body: ['[M2 MOCKUPS]'] },
    ],
  },
  {
    id: 'm3',
    code: 'M3',
    name: 'Construction',
    summary: 'Implementation of the MVP and the extended features.',
    date: '[M3 DATE]',
    canvaEmbedUrl: '[CANVA EMBED LINK M3]',
    sections: [
      { title: 'Overview', body: ['[M3 CONTENT]'] },
      { title: 'Progress', body: ['[M3 PROGRESS]'] },
    ],
  },
  {
    id: 'm4',
    code: 'M4',
    name: 'Transition',
    summary: 'Testing with the CMA, deployment and final documentation.',
    date: '[M4 DATE]',
    canvaEmbedUrl: '[CANVA EMBED LINK M4]',
    sections: [
      { title: 'Overview', body: ['[M4 CONTENT]'] },
      { title: 'Results', body: ['[M4 RESULTS]'] },
    ],
  },
]

// ---------------------------------------------------------------------------
// Documentation
// ---------------------------------------------------------------------------

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
