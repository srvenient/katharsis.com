import { useAuthSync } from '../hooks/useAuthSync';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthSync();
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  );
}
