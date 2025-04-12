const Footer = () => {
    return (
      <footer className="bg-black text-[#42f5e6] py-6 mt-8 border-t border-[#42f5e6]">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Voice-Based Transport Enquiry System</p>
          <p className="mt-1">Powered by Google Speech-to-Text • Built with ❤️ using React</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  