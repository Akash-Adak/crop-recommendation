import './styles/About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About CropLogic</h1>
        <p>Intelligent Crop Recommendation System</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2>Our Mission</h2>
          <p>
            To empower farmers with AI-driven insights for optimal crop selection, 
            maximizing yields while promoting sustainable agriculture.
          </p>
        </section>

        <section className="about-section">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h2>How It Works</h2>
          <p>
            Our advanced AI algorithms analyze soil composition, climate data, 
            humidity levels, and temperature patterns to recommend the most suitable crops 
            for your land, ensuring better productivity and profitability.
          </p>
        </section>

        <section className="about-section">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h2>Key Features</h2>
          <ul>
            <li>Real-time soil analysis</li>
            <li>Weather prediction integration</li>
            <li>Personalized crop recommendations</li>
            <li>Yield optimization insights</li>
            <li>Historical crop data tracking</li>
          </ul>
        </section>

        <section className="about-section">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2>Our Team</h2>
          <p>
            Our team consists of agricultural experts, data scientists, and 
            environmental specialists dedicated to revolutionizing farming practices 
            through technology and innovation.
          </p>
        </section>
      </div>

      <div className="benefits">
        <h2>Why Choose CropAI?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m7-5a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
            </div>
            <h3>Accuracy</h3>
            <p>99% accurate recommendations based on comprehensive data analysis</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Fast</h3>
            <p>Get instant recommendations in seconds, not days</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Affordable</h3>
            <p>Cost-effective solutions for farmers of all scales</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18.364 5.636l-3.536 3.536m9.172-9.172a9 9 0 11-12.728 0m0 0l-3.536 3.536m13.072-13.072l-3.536 3.536" />
              </svg>
            </div>
            <h3>Sustainable</h3>
            <p>Promote eco-friendly farming practices and conservation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
