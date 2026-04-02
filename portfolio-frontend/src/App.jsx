import Navbar from './components/Navbar'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen font-sans">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App