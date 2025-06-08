import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        navigate('/thank-you');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold mb-6 text-center">Contact</h2>
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="max-w-xl mx-auto space-y-6"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        
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
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
  