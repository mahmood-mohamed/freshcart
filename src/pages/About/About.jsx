import imgSrc from '../../assets/images/about.png'
import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'

const stats = [
    { value: '50K+', label: 'Happy Customers', icon: 'fas fa-users' },
    { value: '15K+', label: 'Products Listed', icon: 'fas fa-box-open' },
    { value: '99%', label: 'Satisfaction Rate', icon: 'fas fa-star' },
    { value: '24/7', label: 'Customer Support', icon: 'fas fa-headset' },
]

const values = [
    {
        icon: 'fas fa-bullseye',
        title: 'Our Mission',
        desc: 'To empower our community by providing a bridge to the freshest products and the latest trends, delivered with integrity and exceptional service.',
        color: 'from-emerald-400 to-green-600',
    },
    {
        icon: 'fas fa-heart',
        title: 'Our Values',
        desc: 'We prioritize quality, sustainability, and transparency in everything we do. Our customers are the heart of our journey.',
        color: 'from-teal-400 to-emerald-600',
    },
    {
        icon: 'fas fa-leaf',
        title: 'Sustainability',
        desc: 'We source responsibly and package mindfully, working toward a greener future with every order placed on FreshCart.',
        color: 'from-green-400 to-teal-600',
    },
    {
        icon: 'fas fa-shield-alt',
        title: 'Trust & Safety',
        desc: 'Every product on our platform is vetted for authenticity. Your security and peace of mind are non-negotiable for us.',
        color: 'from-cyan-400 to-green-600',
    },
]

export default function About() {
    return (
        <div className="overflow-x-hidden">

            {/* ── Hero Banner ── */}
            <section className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container relative z-10 py-20">
                    <div className="flex flex-col lg:flex-row items-center gap-14">
                        {/* Text */}
                        <div className="lg:w-1/2 space-y-6 animate-fade-in-down">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white/90 rounded-full text-sm font-semibold tracking-widest uppercase">
                                <i className="fas fa-seedling text-green-200" />
                                Our Story
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                Elevating Your <br />
                                <span className="text-green-200">Shopping Experience</span>
                            </h1>
                            <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                                FreshCart started with a simple vision: to make high-quality groceries and daily
                                essentials accessible to everyone, everywhere. We've grown into a trusted marketplace
                                where quality meets convenience.
                            </p>
                            <p className="text-white/70 leading-relaxed max-w-lg">
                                We believe shopping should be more than just a transaction — it should be an
                                experience that's simple, enjoyable, and tailored to your needs.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button
                                    as={Link}
                                    to="/products"
                                    size="lg"
                                    className="bg-white text-green-700 font-bold shadow-xl hover:bg-green-50 transition-all duration-300 hover:scale-105"
                                >
                                    Explore Products
                                </Button>
                                <Button
                                    as={Link}
                                    to="/contact"
                                    size="lg"
                                    variant="bordered"
                                    className="border-white/60 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                                >
                                    Contact Us
                                </Button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="lg:w-1/2 animate-fade-in-up">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-green-400/30 to-transparent rounded-3xl blur-2xl scale-105" />
                                <img
                                    src={imgSrc}
                                    alt="About FreshCart"
                                    className="relative w-full h-auto max-h-[420px] rounded-3xl object-cover shadow-2xl ring-4 ring-white/20 transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Row ── */}
            <section className="bg-white border-b border-gray-100">
                <div className="container py-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
                        {stats.map((s, i) => (
                            <div
                                key={i}
                                className="group flex flex-col items-center justify-center gap-2 py-10 px-6 text-center hover:bg-green-50 transition-colors duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <i className={s.icon} />
                                </div>
                                <span className="text-3xl font-extrabold text-gray-800">{s.value}</span>
                                <span className="text-sm text-gray-500 font-medium">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Values / Pillars ── */}
            <section className="bg-gray-50 py-20">
                <div className="container">
                    <div className="text-center mb-12 space-y-3">
                        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase tracking-widest">
                            What We Stand For
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                            Built on <span className="text-green-600">Principles</span> That Matter
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Every decision we make is guided by a core set of values that keeps us honest,
                            innovative, and customer-first.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <i className={v.icon} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-white py-20">
                <div className="container">
                    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 rounded-[2rem] p-12 text-center text-white shadow-2xl">
                        {/* Decorative */}
                        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10 space-y-4 max-w-xl mx-auto">
                            <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
                                <i className="fas fa-comment-dots" />
                            </div>
                            <h3 className="text-3xl font-extrabold">Have questions or feedback?</h3>
                            <p className="text-white/80 leading-relaxed">
                                We're always here to listen and help. Visit our dedicated contact page to reach our
                                support team directly.
                            </p>
                            <Button
                                as={Link}
                                to="/contact"
                                size="lg"
                                className="bg-white text-green-700 font-bold px-10 shadow-xl hover:bg-green-50 hover:scale-105 transition-all duration-300 mt-2"
                                endContent={<i className="fas fa-arrow-right ml-2" />}
                            >
                                Get In Touch
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
