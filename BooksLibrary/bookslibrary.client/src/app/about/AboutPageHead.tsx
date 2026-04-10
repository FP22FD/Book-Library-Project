type Props = {
  className?: string;
};

export default function AboutPageHead({ className }: Props) {
  return (
    <div className={`flex justify-between items-center mb-8 pb-8 ${className ?? ''}`}>
      <div>
        <h1 className="text-3xl font-bold">About This Project</h1>
      </div>
    </div>
  );
}
