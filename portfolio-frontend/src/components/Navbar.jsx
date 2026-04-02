function Navbar() {
    return (
        <nav className="w-full bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-cyan-400 text-xl font-bold tracking-widest uppercase">
                    Tamson Quang
                </h1>
                <ul className="flex gap-8">
                    <li>
                        <a href="#about"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm tracking-wide uppercase">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#techstack"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm tracking-wide uppercase">
                            Tech Stack
                        </a>
                    </li>
                    <li>
                        <a href="#projects"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm tracking-wide uppercase">
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="#contact"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm tracking-wide uppercase">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar