const Header = () => {
    return (
      <header className="bg-gray-900 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Securi-Tee</h1>
          <nav>
            <a href="#about" className="px-4 hover:text-gray-400">About</a>
            <a href="#projects" className="px-4 hover:text-gray-400">Projects</a>
            <a href="#contact" className="px-4 hover:text-gray-400">Contact</a>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  