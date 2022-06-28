export default function FormContainer({ children }) {
  return (
    <div className="max-w-md mx-auto px-4 mb-4">
      <div className="rounded-md p-4 bg-base-300">
        <div>{children}</div>
      </div>
    </div>
  );
}
