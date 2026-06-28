'use client';

export function FAQSection() {
  const faqs = [
    {
      q: 'Is this actually free?',
      a: 'Yes. No credit card, no trial, no hidden limit. Open it and start building.'
    },
    {
      q: 'Does it run real Arduino code, or is it a simplified version?',
      a: 'Real. You write standard Arduino C++. It compiles using the same toolchain as the real IDE and runs on a virtual ATmega328P. If it\'s valid Arduino code, it runs.'
    },
    {
      q: 'Do I need to create an account?',
      a: 'Not to use it. You can simulate right now without signing up. An account (free) lets you save circuits to your profile.'
    },
    {
      q: 'Which components are supported?',
      a: 'Our library includes Microcontrollers (Arduino Uno), Passives (Resistors, LEDs, Buttons, Potentiometers), Sensors (Ultrasonic, Temperature, LDR), and Output devices (LCDs, OLEDs, Servos). We\'re adding more monthly — check our changelog.'
    },
    {
      q: 'Can my teacher share a circuit for the whole class?',
      a: 'Yes. Every circuit gets a shareable link. Students open it and get their own copy to modify.'
    },
    {
      q: 'Is this better than the college lab?',
      a: 'Different, not better. The lab gives you hands-on hardware experience you can\'t replace. This gives you unlimited practice time so you walk into that lab prepared.'
    },
    {
      q: 'Does it work on mobile?',
      a: 'The simulator is best on a laptop or desktop. The canvas and code editor work on tablets, but we recommend a keyboard for serious circuit building.'
    }
  ];

  return (
    <section className="py-32 bg-surface relative z-10 border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        <div className="text-center mb-20">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background tracking-tight mb-4">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 soft-shadow">
              <h3 className="font-headline-md text-lg text-on-surface mb-2">{faq.q}</h3>
              <p className="font-body-base text-on-surface-variant">{faq.a}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
