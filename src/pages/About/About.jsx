import imgSrc from '../../assets/images/about.png'

export default function About() {
    return (
        <div>
            {/* About FreshCart */}
            <div className="bg-white p-6 shadow-md rounded-lg">
                <div className='flex flex-col lg:flex-row items-center space-between gap-4'>
                    <img src={imgSrc} alt="Shopping Cart" className="lg:order-1 my-2 h-80 rounded-md w-full object-contain" />
                    
                    <div className="text-gray-600 mb-4">
                        <h3 className="text-2xl font-semibold mb-4">About FreshCart</h3>
                        <p className="mb-4">
                            FreshCart is your go-to online marketplace for fresh groceries, daily essentials, and more!
                            We offer a seamless shopping experience with fast delivery, high-quality products, and great deals.
                        </p>
                        <p className="mb-4">
                            At FreshCart, we believe shopping should be simple, enjoyable, and convenient. Whether you're looking for the latest fashion trends, high-quality electronics, or everyday essentials, we've got you covered—all in one place!
                        </p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                <p className="mb-2"><strong><i className="fa-solid fa-location-dot pe-1 fa-lg"></i> Map: </strong>Manial Arous, Ashmoun, Menoufia, Egypt</p>
                <p className="mb-2"><strong><i className="fa-solid fa-phone pe-1  fa-lg"></i> Phone:</strong> 0121-042-8009</p>
                <p className="mb-4"><strong><i className="fa-regular fa-envelope pe-1 fa-lg"></i> Email:</strong> mahmood35@gmail.com</p>

                {/* Google Map */}
                <iframe title="FreshCart Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0304015657284!2d31.194827944094406!3d30.035985654542635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145846c9306e97af%3A0x5315ebf6378470c0!2sRoute!5e0!3m2!1sen!2sus!4v1739744731163!5m2!1sen!2sus"
                    className="w-full mt-10 min-h-56 h-64 rounded-lg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    )
}
