import React from 'react';
import { Recycle, Droplet, Leaf, ShieldCheck } from 'lucide-react';
import './Features.css';

const featuresData = [
  {
    id: 1,
    icon: <Recycle size={32} strokeWidth={1.5} />,
    title: '100% Upcycled',
    description: 'Every piece is crafted from premium recycled denim, saving water and reducing landfill waste.'
  },
  {
    id: 2,
    icon: <Droplet size={32} strokeWidth={1.5} />,
    title: 'Zero Water Waste',
    description: 'Our innovative cleaning process uses 95% less water than traditional denim manufacturing.'
  },
  {
    id: 3,
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    title: 'Built to Last',
    description: 'We reinforce our recycled fabrics to ensure durability that matches virgin denim.'
  },
  {
    id: 4,
    icon: <Leaf size={32} strokeWidth={1.5} />,
    title: 'Ethical Production',
    description: 'Manufactured locally in Tunisia, ensuring fair wages and excellent working conditions.'
  }
];

const Features = () => {
  return (
    <section id="features" className="section features">
      <div className="container">
        <div className="features-header text-center">
          <h2 className="section-title">The DENYX Standard</h2>
          <p className="section-subtitle">Why our sustainable approach doesn't compromise on quality or style.</p>
        </div>
        
        <div className="features-grid">
          {featuresData.map((feature) => (
            <div key={feature.id} className="feature-card glass-panel">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
