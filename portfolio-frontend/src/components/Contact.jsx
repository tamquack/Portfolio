import { useState } from "react"

const socials = [
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/tamson-quang",
        icon: "in"
    },
    {
        label: "GitHub",
        href: "https://github.com/tamquack",
        icon: "gh"
    },
    {
        label: "Email",
        href: "mailto:tamsonquang@gmail.com",
        icon: "@"
    }
]

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateEmail(formData.email)) {
            setStatus("error:Please enter a valid email address.")
            return
        }

        if (formData.message.split(" ").length > 200) {
            setStatus("error:Message exceeds 200 word limit.")
            return
        }

        setLoading(true)
        setStatus("")

        try {
           const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setStatus("success:Message sent! I will get back to you soon.")
                setFormData({ name: "", email: "", message: "" })
            } else {
                setStatus("error:Something went wrong. Please try again.")
            }
        } catch (error) {
            setStatus("error:Unable to reach the server. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    const isError = status.startsWith("error:")
    const isSuccess = status.startsWith("success:")
    const statusMessage = status.replace(/^(error:|success:)/, "")

    return (
        <section id="contact" className="py-24">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-4">Contact</p>
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-400 mb-12 max-w-lg">
                Have a question, opportunity, or just want to connect? Send me a message and I will get back to you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-xs tracking-widest uppercase">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                            className="bg-gray-900 border border-gray-700 rounded px-4 py-3 text-gray-100 text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-xs tracking-widest uppercase">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="bg-gray-900 border border-gray-700 rounded px-4 py-3 text-gray-100 text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-xs tracking-widest uppercase">
                            Message
                            <span className="ml-2 normal-case text-gray-600">
                                ({formData.message.split(" ").filter(w => w).length}/200 words)
                            </span>
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Your message..."
                            className="bg-gray-900 border border-gray-700 rounded px-4 py-3 text-gray-100 text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors duration-200 resize-none"
                        />
                    </div>

                    {statusMessage && (
                        <p className={`text-sm px-4 py-3 rounded border ${
                            isSuccess
                                ? "text-emerald-400 border-emerald-400 bg-emerald-400/10"
                                : "text-red-400 border-red-400 bg-red-400/10"
                        }`}>
                            {statusMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-cyan-400 text-gray-950 font-semibold rounded hover:bg-cyan-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>

                <div className="flex flex-col justify-center gap-4">
                    <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">Find Me On</p>
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            className="flex items-center gap-4 px-5 py-4 border border-gray-700 rounded-lg hover:border-cyan-400 hover:text-cyan-400 text-gray-300 transition-colors duration-200 group"
                        >
                            <span className="w-8 h-8 rounded border border-gray-600 group-hover:border-cyan-400 flex items-center justify-center text-xs font-bold transition-colors duration-200">
                                {social.icon}
                            </span>
                            <span className="text-sm font-medium tracking-wide">{social.label}</span>
                            <span className="ml-auto text-gray-600 group-hover:text-cyan-400 transition-colors duration-200">→</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Contact