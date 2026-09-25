import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ThemeProvider } from './lib/theme'
import { Calendar } from './pages/Calendar'
import { Documentation } from './pages/Documentation'
import { Home } from './pages/Home'
import { Milestone } from './pages/Milestone'
import { MinuteDetail, MinutesList } from './pages/Minutes'
import { NotFound } from './pages/NotFound'
import { Team } from './pages/Team'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

/** Re-mounts the page on every route change so the enter transition plays. */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/minutes" element={<MinutesList />} />
        <Route path="/minutes/:slug" element={<MinuteDetail />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/team" element={<Team />} />
        <Route path="/milestones/:id" element={<Milestone />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <a
          href="#main"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('main')?.focus()
          }}
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-petrol"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  )
}
