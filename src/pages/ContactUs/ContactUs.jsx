import { Button, Input, Textarea } from "@heroui/react";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Contact FreshCart</h2>
      
      <p className="text-center text-gray-600 mb-8">
        Have a question or need support? Contact us, and our team will be happy to assist you!
      </p>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
        <form action="https://formspree.io/f/xyzkbyga" method="POST">
          <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4">
              <Input name="name" label="Name" placeholder="Enter your name" type="text" required/>
              <Input name="email" label="Email" placeholder="Enter your email" type="email" required/>
              <Textarea name="message" className="max-h-50" label="Message" placeholder="Enter your message" required/>
              <Button type="submit" color="success" className="text-white font-semibold text-lg">Send <i className="fa-regular fa-paper-plane ps-2"></i></Button>
          </div>
        </form>
      </div>
    </div>
  );
}
