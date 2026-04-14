const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 mt-auto">
      <div className="footer-content max-w-7xl mx-auto px-4 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} CardioTrack. All rights reserved.</p>
        <div className="footer-links flex justify-center space-x-6">
          <a href="/privacy" className="hover:text-blue-200 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-200 transition-colors">Terms of Service</a>
          <a href="/about" className="hover:text-blue-200 transition-colors">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;