import React, { useEffect, useRef } from 'react';
import { ModernList, ModernListItem } from './ui/ModernList';
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
  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="features-header text-center">
          <h2 className="section-title">The <span className="text-gradient">Transformation</span></h2>
          <p className="section-subtitle">A transparent look at how we turn waste into premium accessories.</p>
        </div>

        <div className="process-timeline-modern">
          <ModernList className="timeline-container">
            {processSteps.map((step, index) => (
              <ModernListItem key={index} variant="row" className="timeline-item">
                <div className="timeline-number-wrapper">
                  <span className="timeline-number">{step.number}</span>
                </div>
                <div className="timeline-content-wrapper">
                  <h3 className="timeline-title">{step.title}</h3>
                  <p className="timeline-description">{step.description}</p>
                </div>
              </ModernListItem>
            ))}
          </ModernList>
        </div>
      </div>
    </section>
  );
};

export default Process;
