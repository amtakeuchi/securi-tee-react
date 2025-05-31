const ContactPage = () => {
    return (
      <section className="py-20 px-8">
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true" 
          action="/thank-you" 
          className="max-w-xl mx-auto space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          
          <div>
            <label htmlFor="name" className="block text-lg font-medium">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="w-full mt-1 p-3 border rounded"
            />
          </div>
  
          <div>
            <label htmlFor="email" className="block text-lg font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="w-full mt-1 p-3 border rounded"
            />
          </div>
  
          <div>
            <label htmlFor="message" className="block text-lg font-medium">Message</label>
            <textarea 
              id="message" 
              name="message" 
              required 
              rows="5"
              className="w-full mt-1 p-3 border rounded"
            ></textarea>
          </div>
  
          <button 
            type="submit" 
            className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-700"
          >
            Send Message
          </button>
        </form>
      </section>
    );
  };
  
  export default ContactPage;
  