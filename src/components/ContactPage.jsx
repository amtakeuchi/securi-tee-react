import { useState } from 'react';

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold mb-6 text-center">Contact</h2>
      {error && (
        <div className="max-w-xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <form 
        name="contact"
        method="POST"
        netlify="true"
        netlify-honeypot="bot-field"
        action="/thank-you.html"
        className="max-w-xl mx-auto space-y-6"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </p>
        
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            rows="5"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          className={`w-full bg-teal-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
            submitting 
              ? 'opacity-75 cursor-not-allowed' 
              : 'hover:bg-teal-700'
          }`}
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
  