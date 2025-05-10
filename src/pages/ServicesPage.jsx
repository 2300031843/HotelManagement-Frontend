import '../styles/ServicesPage.css';

function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "24/7 Room Service",
      description: "Our dedicated staff is available round the clock to cater to your needs",
      icon: "🛎️"
    },
    {
      id: 2,
      title: "Spa & Wellness",
      description: "Rejuvenate yourself with our premium spa treatments and wellness programs",
      icon: "💆"
    },
    {
      id: 3,
      title: "Fine Dining",
      description: "Experience exquisite cuisine prepared by our master chefs",
      icon: "🍽️"
    },
    {
      id: 4,
      title: "Concierge Services",
      description: "Let our experienced concierge help you plan your perfect stay",
      icon: "👨‍💼"
    },
    {
      id: 5,
      title: "Fitness Center",
      description: "Stay fit with our state-of-the-art fitness equipment and trainers",
      icon: "💪"
    },
    {
      id: 6,
      title: "Business Center",
      description: "Full-service business center for all your professional needs",
      icon: "💼"
    }
  ];

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Experience luxury and comfort with our premium services</p>
      </div>
      
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
      
      <div className="service-commitment">
        <h2>Our Commitment to Excellence</h2>
        <p>
          At Hotel Grand, we believe in providing exceptional service that exceeds
          your expectations. Our trained staff is dedicated to ensuring your
          comfort and satisfaction throughout your stay.
        </p>
      </div>
    </div>
  );
}

export default ServicesPage;