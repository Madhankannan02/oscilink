'use client';

export function ComparisonSection() {
  const comparisonData = [
    { feature: 'Real AVR emulation', oscilink: true, other: 'Partial', kit: true },
    { feature: 'No account required', oscilink: true, other: false, kit: null },
    { feature: 'Modern drag-drop UI', oscilink: true, other: false, kit: null },
    { feature: 'Runs at midnight', oscilink: true, other: true, kit: false },
    { feature: 'Zero risk of damage', oscilink: true, other: true, kit: false },
    { feature: 'Costs ₹0', oscilink: true, other: '₹0–$$$$', kit: '₹3000+' },
    { feature: 'Share with one link', oscilink: true, other: 'Partial', kit: false },
  ];

  const renderValue = (val: any) => {
    if (val === true) {
      return <span className="material-symbols-outlined text-primary font-bold">check_circle</span>;
    } else if (val === false) {
      return <span className="material-symbols-outlined text-error">cancel</span>;
    } else if (val === null) {
      return <span className="text-on-surface-variant/30">N/A</span>;
    }
    return <span className="text-on-surface-variant/60">{val}</span>;
  };

  return (
    <section className="py-32 bg-surface relative z-10 border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        <div className="text-center mb-20">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background tracking-tight mb-4">Oscilink vs. The Alternatives</h2>
          <p className="font-body-base text-on-surface-variant text-lg">Built for your workflow. See how Oscilink compares to other learning methods.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden soft-shadow bg-surface-bright">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-6 text-left font-headline-md text-on-surface">Feature</th>
                <th className="p-6 text-center font-headline-md text-primary bg-primary/5">Oscilink</th>
                <th className="p-6 text-center font-headline-md text-on-surface-variant">Other Simulators</th>
                <th className="p-6 text-center font-headline-md text-on-surface-variant">Physical Kit</th>
              </tr>
            </thead>
            <tbody className="font-body-base text-on-surface">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-outline-variant/10">
                  <td className="p-6 font-medium">{row.feature}</td>
                  <td className="p-6 text-center bg-primary/5 font-bold text-primary">
                    {renderValue(row.oscilink)}
                  </td>
                  <td className="p-6 text-center">
                    {renderValue(row.other)}
                  </td>
                  <td className="p-6 text-center">
                    {renderValue(row.kit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
