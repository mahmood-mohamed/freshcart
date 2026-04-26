import { Accordion, AccordionItem } from '@heroui/react';
import { Link } from 'react-router-dom';

export default function FAQs() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <div className="text-center mb-8 space-y-3">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 font-semibold text-sm tracking-wider uppercase mb-2">
            Help Center
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4">
            Find answers to common questions about our products, delivery, and services. 
            Can't find what you're looking for? Our team is here to help.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="mb-16">
          <Accordion variant="splitted" className="gap-4 px-0">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                aria-label={faq.question} 
                title={<span className="font-semibold text-gray-800 text-base md:text-lg ps-2">{faq.question}</span>}
                className="bg-white shadow-sm border border-gray-100 rounded-2xl px-2 py-1 data-[open=true]:shadow-md data-[open=true]:border-green-100 transition-all duration-300"
              >
                <div className="pb-4 pt-2 px-2">
                  <p className="text-gray-600 leading-relaxed pl-4 border-l-4 border-green-500 rounded-sm">
                    {faq.answer}
                  </p>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-gray-100 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
           
           <div className="relative z-10 flex flex-col items-center space-y-6">
             <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-2xl shadow-inner">
               <i className="far fa-comments"></i>
             </div>
             
             <div className="space-y-2">
               <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Still have questions?</h2>
               <p className="text-gray-500 max-w-lg mx-auto">
                 Can't find the answer you're looking for? Please chat to our friendly team, we're always happy to help.
               </p>
             </div>
             
             <Link 
               to="/contact" 
               className="inline-block mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
             >
               Contact Customer Support
             </Link>
           </div>
        </div>

      </div>
    </div>
  )
}

const faqs = [ 
    { "question": "What is Fresh Cart?", "answer": "Fresh Cart is an online marketplace that offers fresh groceries, organic produce, and everyday essentials delivered straight to your doorstep." },
    { "question": "How does Fresh Cart work?", "answer": "Simply browse our store, add items to your cart, and checkout. We will process your order and deliver it to your selected address." }, 
    { "question": "How do I place an order?", "answer": "You can place an order by signing into your Fresh Cart account, selecting your desired products, and proceeding to checkout." }, 
    { "question": "Can I modify or cancel my order after placing it?", "answer": "Orders can be modified or canceled within 30 minutes of placement. After that, they enter processing and cannot be changed." }, 
    { "question": "What are the delivery options?", "answer": "We offer standard delivery (2-3 days), express delivery (same day), and scheduled delivery. Delivery times vary by location." }, 
    { "question": "How can I track my order?", "answer": "Once your order is dispatched, you will receive a tracking link via email or SMS." }, 
    { "question": "What payment methods do you accept?", "answer": "We accept credit/debit cards, Stripe, and cash on delivery." }, 
    { "question": "Is my payment information secure?", "answer": "Yes! We use secure encryption methods to protect your payment details." }, 
    { "question": "What is your refund policy?", "answer": "If you receive a damaged or incorrect item, please contact customer support within 24 hours for a refund or replacement." }, 
    { "question": "Are all products always in stock?", "answer": "We strive to keep our inventory updated, but some items may be temporarily out of stock due to demand." }, 
    { "question": "Do you offer organic and gluten-free options?", "answer": "Yes! We have a wide range of organic, gluten-free, and vegan products." }, 
    { "question": "How can I contact customer support?", "answer": "You can reach us via email at firstyear265@gmail.com or through our live chat feature available on our website." },
    { "question": "What are your customer support hours?", "answer": "Our team is available Monday to Saturday, 8 AM – 8 PM (local time)." },
    { "question": "Do you have a loyalty program?", "answer": "Yes! Sign up for our rewards program to earn points on every purchase and redeem them for discounts." }
];
