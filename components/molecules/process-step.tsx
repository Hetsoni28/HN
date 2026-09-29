interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="card flex gap-5 p-7">
      <div className="shrink-0 text-lg font-bold text-[#0051FF]">{number}</div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 leading-7 text-slate-600">{description}</p>
      </div>
    </div>
  );
}
