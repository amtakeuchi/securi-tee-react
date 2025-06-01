const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center">
      <div className="flex justify-center space-x-4 mb-2">
        <a href="https://github.com/amtakeuchi" target="_blank" rel="noopener noreferrer">
          <img src="/icons/github.svg" alt="GitHub" className="h-6 w-6" />
        </a>
        <a href="https://linkedin.com/in/adam-takeuchi" target="_blank" rel="noopener noreferrer">
          <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Securi-Tee. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
