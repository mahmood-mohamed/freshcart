import { Button, Input, Textarea } from "@heroui/react";
import React, { useState } from "react";

export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     setSubmitted(true);
//     setFormData({ name: "", email: "", message: "" });
//   };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Contact FreshCart</h2>
      
      <p className="text-center text-gray-600 mb-8">
        Have a question or need support? Contact us, and our team will be happy to assist you!
      </p>

      <div className="">
        {/* Contact Form */}
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
    </div>
  );
}


// {submitted && (
//     <p className="text-green-600 font-semibold mb-4">
//       Thank you! Your message has been sent.
//     </p>
//   )}
//   <form onSubmit={handleSubmit}>
//     <div className="mb-4">
//       <label className="block font-medium mb-2">Name</label>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded-md"
//       />
//     </div>
//     <div className="mb-4">
//       <label className="block font-medium mb-2">Email</label>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded-md"
//       />
//     </div>
//     <div className="mb-4">
//       <label className="block font-medium mb-2">Message</label>
//       <textarea
//         name="message"
//         value={formData.message}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded-md"
//       ></textarea>
//     </div>
//     <button
//       type="submit"
//       className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//     >
//       Send
//     </button>
//   </form>


