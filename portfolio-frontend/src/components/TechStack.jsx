import { useEffect, useRef, useState } from "react"

const tree = [
    {
        role: "Java Full Stack Dev",
        color: "cyan",
        skills: ["Java", "Spring Boot", "Maven", "React", "PostgreSQL", "REST APIs"]
    },
    {
        role: "Frontend Dev",
        color: "violet",
        skills: ["React", "Vite", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
        role: "DevOps & Cloud",
        color: "emerald",
        skills: ["Docker", "AWS", "Git", "CI/CD"]
    },
    {
        role: "Testing",
        color: "amber",
        skills: ["Playwright", "E2E Testing"]
    }
]

const colorMap = {
    cyan: {
        role: "border-cyan-400 text-cyan-400",
        skill: "border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-gray-950",
        line: "bg-cyan-400"
    },
    violet: {
        role: "border-violet-400 text-violet-400",
        skill: "border-violet-400 text-violet-300 hover:bg-violet-400 hover:text-gray-950",
        line: "bg-violet-400"
    },
    emerald: {
        role: "border-emerald-400 text-emerald-400",
        skill: "border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-gray-950",
        line: "bg-emerald-400"
    },
    amber: {
        role: "border-amber-400 text-amber-400",
        skill: "border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-gray-950",
        line: "bg-amber-400"
    }
}

function TreeRow({ role, skills, color, index }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    const colors = colorMap[color]

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.2 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`flex items-center gap-4 transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className={`shrink-0 w-44 px-4 py-2 rounded border ${colors.role} text-sm font-bold tracking-wide text-center`}>
                {role}
            </div>
            <div className={`h-px w-6 ${colors.line}`} />
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                    <span
                        key={skill}
                        className={`px-3 py-1 rounded border text-xs font-medium tracking-wide transition-colors duration-200 cursor-default ${colors.skill}`}
                        style={{
                            transitionDelay: `${index * 150 + i * 60}ms`,
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateX(0)" : "translateX(-10px)",
                            transition: `opacity 600ms ease ${index * 150 + i * 60}ms, transform 600ms ease ${index * 150 + i * 60}ms, background-color 200ms, color 200ms`
                        }}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}

function TechStack() {
    return (
        <section id="techstack" className="py-24 border-b border-gray-800">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-4">Expertise</p>
            <h2 className="text-4xl font-bold text-white mb-16">Tech Stack</h2>
            <div className="flex flex-col gap-10">
                {tree.map((branch, i) => (
                    <TreeRow
                        key={branch.role}
                        index={i}
                        role={branch.role}
                        skills={branch.skills}
                        color={branch.color}
                    />
                ))}
            </div>
        </section>
    )
}

export default TechStack