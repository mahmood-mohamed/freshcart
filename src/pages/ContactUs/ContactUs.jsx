import { Button, Input, Textarea } from "@heroui/react";

export default function ContactUs() {
  return (
    <div className="py-2 bg-gray-50/30">
      <div className="container mx-auto px-4">
        {/* 🏢 Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">How can we help you today?</h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Have a question about an order? Need help with our services? Our dedicated support team is here to ensure your FreshCart experience is perfect.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Phone Support</h4>
                <p className="text-gray-500 text-sm mt-1">Available 24/7</p>
                <p className="text-green-600 font-semibold mt-1">
                  <a href="tel:+201210428009" target="_blank">
                    +20 121 042 8009
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">WhatsApp</h4>
                <p className="text-gray-500 text-sm mt-1">Instant Chat</p>
                <a href="https://wa.me/+201210428009" target="_blank" className="text-green-600 font-semibold mt-1 block">Chat Now</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Email Us</h4>
                <p className="text-gray-500 text-sm mt-1">Response within 24h</p>
                <p className="text-green-600 font-semibold mt-1">
                  <a href="mailto:mahmood35@gmail.com" target="_blank">
                    mahmood35@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
                <i className="fas fa-location-dot"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Our Location</h4>
                <p className="text-gray-500 text-sm mt-1">Visit us at our office</p>
                <p className="text-green-600 font-semibold mt-1">Ashmoun, Menoufia, Egypt</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Send Us a Message</h3>
            <form action="https://formspree.io/f/xyzkbyga" method="POST" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <Input 
                  name="name" 
                  label="Full Name" 
                  placeholder="John Doe" 
                  variant="flat"
                  labelPlacement="outside"
                  className="max-w-full"
                  required
                />
                <Input 
                  name="email" 
                  label="Email Address" 
                  placeholder="john@example.com" 
                  type="email" 
                  variant="flat"
                  labelPlacement="outside"
                  required
                />
              </div>
              <Input 
                name="subject" 
                label="Subject" 
                placeholder="How can we help?" 
                variant="flat"
                labelPlacement="outside"
                required
              />
              <Textarea 
                name="message" 
                label="Message" 
                placeholder="Tell us more about your inquiry..." 
                variant="flat"
                labelPlacement="outside"
                minRows={4}
                required
              />
              <Button 
                type="submit" 
                color="success" 
                size="lg"
                className="w-full md:w-auto px-12 font-bold text-lg shadow-lg shadow-green-100 mt-4"
                endContent={<i className="fas fa-paper-plane ml-2"></i>}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* 🗺️ Map Section */}
        <div className="mt-20 overflow-hidden rounded-[2.5rem] shadow-sm border border-gray-100">
          <iframe 
            title="FreshCart Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0304015657284!2d31.194827944094406!3d30.035985654542635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145846c9306e97af%3A0x5315ebf6378470c0!2sRoute!5e0!3m2!1sen!2sus!4v1739744731163!5m2!1sen!2sus"
            className="w-full h-[450px]" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
