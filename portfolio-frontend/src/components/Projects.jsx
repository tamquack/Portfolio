import { useState } from "react"

const projects = [
    {
        id: 1,
        name: "Portfolio",
        tagline: "Full stack personal portfolio",
        description: "A full stack portfolio built with React and Spring Boot. Features a contact form backed by a REST API, animated tech stack tree, and project carousel. Deployed on AWS with Docker.",
        techStack: ["React", "Spring Boot", "Maven", "PostgreSQL", "Docker", "AWS", "Playwright"],
        github: "https://github.com/tamquack/portfolio",
        demo: "",
        preview: null,
        challenges: "Setting up CORS between the React dev server and Spring Boot, resolving H2 in-memory database configuration, and restructuring the monorepo after initializing git in the wrong directory.",
        snippet: `@PostMapping("/contact")
public ResponseEntity<Contact> contact(@RequestBody Contact contact) {
    return ResponseEntity.ok(contactService.addContact(contact));
}`
    }
]

function ProjectCard({ project, isActive, onClick }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative shrink-0 w-64 h-40 rounded-lg border cursor-pointer transition-all duration-300 overflow-hidden
                ${isActive
                    ? "border-cyan-400 shadow-lg shadow-cyan-400/20"
                    : "border-gray-700 hover:border-gray-500"
                }`}
        >
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                {project.preview ? (
                    <video
                        src={project.preview}
                        autoPlay
                        loop
                        muted
                        className={`w-full h-full object-cover transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
                    />
                ) : (
                    <div className={`flex items-center justify-center w-full h-full transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
                        <p className="text-gray-500 text-xs tracking-widest uppercase">Preview coming soon</p>
                    </div>
                )}
            </div>

            <div className={`absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}>
                <p className="text-white font-semibold text-sm">{project.name}</p>
                <p className="text-gray-400 text-xs mt-1">{project.tagline}</p>
            </div>

            {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400" />
            )}
        </div>
    )
}

function ProjectDetails({ project }) {
    return (
        <div className="mt-10 border border-gray-800 rounded-lg p-8">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{project.name}</h3>
                    <p className="text-gray-400">{project.tagline}</p>
                </div>
                <div className="flex gap-3">
                    {project.demo && (
                     <a   
                            href={project.demo}
                            target="_blank"
                            className="px-4 py-2 bg-cyan-400 text-gray-950 text-sm font-semibold rounded hover:bg-cyan-300 transition-colors duration-200"
                        >
                            Live Demo
                        </a>
                    )}
                    <a
                        href={project.github}
                        target="_blank"
                        className="px-4 py-2 border border-cyan-400 text-cyan-400 text-sm font-semibold rounded hover:bg-cyan-400 hover:text-gray-950 transition-colors duration-200"
                    >
                        GitHub
                    </a>
                </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded tracking-wide">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="mb-6">
                <p className="text-cyan-400 text-xs tracking-widest uppercase mb-2">Challenges</p>
                <p className="text-gray-400 leading-relaxed text-sm">{project.challenges}</p>
            </div>

            <div>
                <p className="text-cyan-400 text-xs tracking-widest uppercase mb-2">Snippet</p>
                <pre className="bg-gray-900 border border-gray-800 rounded p-4 text-sm text-gray-300 overflow-x-auto">
                    <code>{project.snippet}</code>
                </pre>
            </div>
        </div>
    )
}

function Projects() {
    const [activeIndex, setActiveIndex] = useState(0)

    const handlePrev = () => {
        setActiveIndex(i => (i - 1 + projects.length) % projects.length)
    }

    const handleNext = () => {
        setActiveIndex(i => (i + 1) % projects.length)
    }

    return (
        <section id="projects" className="py-24 border-b border-gray-800">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-4">Work</p>
            <h2 className="text-4xl font-bold text-white mb-12">Projects</h2>

            <div className="flex items-center gap-4">
                <button
                    onClick={handlePrev}
                    className="shrink-0 w-10 h-10 rounded-full border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-200 flex items-center justify-center"
                >
                    ←
                </button>

                <div className="flex gap-4 overflow-hidden">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isActive={i === activeIndex}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="shrink-0 w-10 h-10 rounded-full border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-200 flex items-center justify-center"
                >
                    →
                </button>
            </div>

            <div className="flex gap-2 mt-6">
                {projects.map((_, i) => (
                    <div
                        key={i}
                        className={`h-px transition-all duration-300 ${i === activeIndex ? "w-8 bg-cyan-400" : "w-4 bg-gray-700"}`}
                    />
                ))}
            </div>

            <ProjectDetails project={projects[activeIndex]} />
        </section>
    )
}

export default Projects