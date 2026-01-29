import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: 'fa-leaf',
      title: 'Crop Recommendations',
      description: 'Get AI-powered crop suggestions based on soil, weather, and market conditions',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: 'fa-cloud-sun',
      title: 'Weather Forecast',
      description: 'Accurate weather predictions for better farming decisions',
      color: 'from-blue-400 to-sky-blue'
    },
    {
      icon: 'fa-chart-line',
      title: 'Market Prices',
      description: 'Real-time crop prices from local and national markets',
      color: 'from-orange-400 to-sun-yellow'
    },
    {
      icon: 'fa-tint',
      title: 'Irrigation Advice',
      description: 'Smart water management recommendations',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Wheat Farmer, Punjab',
      text: 'AgroAdvisor helped me increase my yield by 30%!',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Sharma',
      role: 'Organic Farmer, Maharashtra',
      text: 'The crop recommendations are spot on!',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-farm-green via-green-600 to-emerald-700 text-white py-20">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-roboto-slab mb-6">
              Smart Farming, <span className="text-sun-yellow">Brighter Future</span>
            </h1>
            <p className="text-xl mb-10 text-white/90">
              Empowering Indian farmers with AI-powered crop guidance and data-driven farming insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/recommendation" 
                className="btn-secondary text-lg px-8 py-4 rounded-xl flex items-center justify-center space-x-2"
              >
                <i className="fas fa-seedling"></i>
                <span>Get Crop Recommendations</span>
              </Link>
              <Link 
                to="/register" 
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl text-lg font-medium transition-all"
              >
                Join Free Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-roboto-slab text-farm-dark mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-gray-600 text-lg">
              Our platform combines technology with traditional farming wisdom
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card card-hover group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <i className={`fas ${feature.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-roboto-slab text-center text-farm-dark mb-12">
            How It Works
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Input Details', desc: 'Enter soil type, location, and preferences' },
                { step: '02', title: 'AI Analysis', desc: 'Our system analyzes multiple factors' },
                { step: '03', title: 'Get Results', desc: 'Receive personalized crop recommendations' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-farm-green to-farm-dark rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-farm-dark/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-roboto-slab text-center text-farm-dark mb-12">
            What Farmers Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card card-hover">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-farm-green">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-farm-green to-farm-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-roboto-slab text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of successful farmers using AgroAdvisor
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-white text-farm-green hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-2xl hover:shadow-3xl"
          >
            Get Started Free <i className="fas fa-arrow-right ml-2"></i>
          </Link>
          <p className="text-white/80 mt-6">No credit card required • Free forever</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
