import imgSrc from '../../assets/images/about.png'
import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className='py-12'>
            <div className="container bg-white p-8 md:p-12 shadow-sm rounded-[2rem] border border-gray-100">
                <div className='flex flex-col lg:flex-row items-center gap-12 mb-16'>
                    <div className="lg:w-1/2">
                        <img 
                            src={imgSrc} 
                            alt="About FreshCart" 
                            className="w-full h-auto max-h-[400px] rounded-3xl object-cover shadow-lg transform hover:scale-[1.02] transition-transform duration-500" 
                        />
                    </div>
                    
                    <div className="lg:w-1/2 space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-sm font-bold tracking-wide uppercase">
                            Our Story
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                            Elevating Your Shopping Experience at <span className="text-green-600">FreshCart</span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            FreshCart started with a simple vision: to make high-quality groceries and daily essentials accessible to everyone, everywhere. We've grown into a trusted marketplace where quality meets convenience.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We believe shopping should be more than just a transaction—it should be an experience that's simple, enjoyable, and tailored to your needs.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-gray-50">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-xl">
                                <i className="fas fa-bullseye"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            To empower our community by providing a bridge to the freshest products and the latest trends, delivered with integrity and exceptional service.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-xl">
                                <i className="fas fa-heart"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Our Values</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We prioritize quality, sustainability, and transparency in everything we do. Our customers are the heart of our journey, and their satisfaction is our true measure of success.
                        </p>
                    </div>
                </div>

                {/* 💬 Call to Action */}
                <div className="mt-20 p-10 bg-gray-50 rounded-[2rem] text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800">Have any questions or feedback?</h3>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        We're always here to listen and help. Visit our dedicated contact page to reach our support team directly.
                    </p>
                    <Button 
                        as={Link}
                        to="/contact"
                        size="lg"
                        color="success"
                        className="font-bold px-10 shadow-lg shadow-green-200"
                        endContent={<i className="fas fa-arrow-right ml-2"></i>}
                    >
                        Get In Touch
                    </Button>
                </div>
            </div>
        </div>
    )
}
