const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <i className="fas fa-seedling text-3xl text-farm-light"></i>
              <span className="text-2xl font-bold font-roboto-slab">AgroAdvisor</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-farm-green rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-farm-green rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-farm-green rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-farm-green rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Crop Advisor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Market Prices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Weather Forecast</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Farming Tips</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Government Schemes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <i className="fas fa-phone text-farm-light"></i>
                <span>Toll Free: 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <i className="fas fa-envelope text-farm-light"></i>
                <span>support@agroadvisor.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <i className="fas fa-map-marker-alt text-farm-light"></i>
                <span>New Delhi, India</span>
              </li>
            </ul>
            <div className="mt-8">
              <h4 className="font-bold mb-3">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-l-lg outline-none"
                />
                <button className="bg-farm-green hover:bg-green-600 px-4 py-2 rounded-r-lg">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AgroAdvisor. All rights reserved. | Designed for Indian Farmers</p>
          <p className="mt-2 text-sm">Partnered with ICAR, Ministry of Agriculture, Government of India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;