import React, { useEffect, useRef } from 'react';
import './Process.css';

const processSteps = [
  {
    number: '01',
    title: 'Collection',
    description: 'We source high-quality vintage and discarded denim from local suppliers.'
  },
  {
    number: '02',
    title: 'Deconstruction',
    description: 'Each pair is carefully unstitched, washed using eco-friendly methods, and prepared.'
  },
  {
    number: '03',
    title: 'Design & Cut',
    description: 'Patterns are meticulously laid out to minimize waste, creating unique designs.'
  },
  {
    number: '04',
    title: 'New Life',
    description: 'Expert artisans sew the pieces into premium bags and accessories.'
  }
];

const Process = () => {
  const processRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const steps = processRef.current.querySelectorAll('.process-step');
    steps.forEach((step) => observer.observe(step));

    return () => {
      steps.forEach((step) => observer.unobserve(step));
    };
  }, []);

  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="features-header text-center">
          <h2 className="section-title">The Transformation</h2>
          <p className="section-subtitle">A transparent look at how we turn waste into premium accessories.</p>
        </div>

        <div className="process-timeline" ref={processRef}>
          {processSteps.map((step, index) => (
            <div key={index} className={`process-step ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="process-content glass-panel">
                <span className="process-number">{step.number}</span>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
              <div className="process-dot"></div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Process;
