import { Accordion, AccordionItem } from '@heroui/react';
import React from 'react'
import { Link } from 'react-router-dom';

export default function FAQs() {
  return (
    <div className='my-5'>
        <h1 className='text-2xl font-bold mb-4'>Frequently Asked Questions (FAQs) </h1> 
        <h2 className='text-gray-500 text-lg mt-3 mb-4 font-medium'>Find answers to common questions about our products and services. Can't find what you're looking for? Feel free to contact our
         <Link to='/contact' className='text-blue-600 hover:font-semibold hover:text-blue-700' > customer support</Link> team.</h2>
        <div className='px-3 py-5 bg-zinc-50 shadow-md  rounded-xl'>
          <Accordion defaultSelectedKeys={['0']} variant='splitted'>
          {faqs.map((faqs, index) =>
              <AccordionItem className='my-2' key={index} aria-label={faqs.question} title={`👉 ${faqs.question}`}>
                  <p className='text-gray-500 border-l-2 ml-2 pl-2 border-l-blue-600'>{faqs.answer}</p>
              </AccordionItem>
          )}
          </Accordion>
        </div>
    </div>
  )
}



const faqs = [ { "question": "What is Fresh Cart?", "answer": "Fresh Cart is an online marketplace that offers fresh groceries, organic produce, and everyday essentials delivered straight to your doorstep." },
    { "question": "How does Fresh Cart work?", "answer": "Simply browse our store, add items to your cart, and checkout. We will process your order and deliver it to your selected address." }, 
    { "question": "How do I place an order?", "answer": "You can place an order by signing into your Fresh Cart account, selecting your desired products, and proceeding to checkout." }, 
    { "question": "Can I modify or cancel my order after placing it?", "answer": "Orders can be modified or canceled within 30 minutes of placement. After that, they enter processing and cannot be changed." }, 
    { "question": "What are the delivery options?", "answer": "We offer standard delivery (2-3 days), express delivery (same day), and scheduled delivery. Delivery times vary by location." }, 
    { "question": "How can I track my order?", "answer": "Once your order is dispatched, you will receive a tracking link via email or SMS." }, 
    { "question": "What payment methods do you accept?", "answer": "We accept credit/debit cards, Stripe,and cash on delivery. " }, 
    { "question": "Is my payment information secure?", "answer": "Yes! We use secure encryption methods to protect your payment details." }, 
    { "question": "What is your refund policy?", "answer": "If you receive a damaged or incorrect item, please contact customer support within 24 hours for a refund or replacement." }, 
    { "question": "Are all products always in stock?", "answer": "We strive to keep our inventory updated, but some items may be temporarily out of stock due to demand." }, 
    { "question": "Do you offer organic and gluten-free options?", "answer": "Yes! We have a wide range of organic, gluten-free, and vegan products." }, 
    { "question": "How can I contact customer support?", "answer": "You can reach us via email at firstyear265@gmail.com or through our live chat feature available on our website." },
    { "question": "What are your customer support hours?", "answer": "Our team is available Monday to Saturday, 8 AM – 8 PM (local time)." },
    { "question": "Do you have a loyalty program?", "answer": "Yes! Sign up for our rewards program to earn points on every purchase and redeem them for discounts." }
];
