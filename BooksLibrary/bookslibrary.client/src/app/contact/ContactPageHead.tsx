type Props = {
  className?: string;
};

export default function ContactPageHead({ className }: Props) {
  return (
    <div className={`flex justify-between items-center mb-8 pb-8 ${className ?? ''}`}>
      <div>
        <h1 className="text-3xl font-bold">Contact</h1>
      </div>
    </div>
  );
}
