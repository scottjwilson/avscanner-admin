export default function MedSectionWithTitle({ children, title }) {
  return (
    <div className="max-w-md mx-auto px-4 mb-4">
      <div className="rounded-md p-4 bg-base-300">
        <h1 className="text-center text-xl">{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
