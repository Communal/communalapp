
export default function Application({ children }: { children: React.ReactNode }) {
  return (
    <div className="application-layout-container">
      {children}
    </div>
  );
}