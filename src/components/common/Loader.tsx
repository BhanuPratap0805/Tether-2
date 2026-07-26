interface LoaderProps {
  label?: string;
  size?: number;
}

export default function Loader({ label, size = 22 }: LoaderProps) {
  return (
    <div className="flex items-center gap-3 text-sky-200">
      <span
        className="rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin"
        style={{ width: size, height: size }}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
