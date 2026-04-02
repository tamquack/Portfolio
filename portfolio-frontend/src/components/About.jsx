function About() {
    return (
        <section id="about" className="min-h-screen flex flex-col justify-center py-24 border-b border-gray-800">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-4">Introduction</p>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                Hi, I am Tamson
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mb-6 leading-relaxed">
                A Java full stack developer focused on building clean, scalable applications.
                Currently working with Spring Boot, React, Docker, and AWS.
            </p>
            <p className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed">
                Passionate about solving real problems through thoughtful engineering,
                and actively looking for opportunities to contribute to meaningful projects.
            </p>
            <div className="flex gap-4">
                
                <a
                    href="/resume.pdf"
                    target="_blank"
                    className="px-6 py-3 bg-cyan-400 text-gray-950 font-semibold rounded hover:bg-cyan-300 transition-colors duration-200"
                >
                    View Resume
                </a>
                
                <a
                    href="#contact"
                    className="px-6 py-3 border border-cyan-400 text-cyan-400 font-semibold rounded hover:bg-cyan-400 hover:text-gray-950 transition-colors duration-200"
                >
                    Get In Touch
                </a>
            </div>
        </section>
    )
}

export default About