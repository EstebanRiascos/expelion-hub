export default function BackgroundGlow() {
  return (
    <>
      {/* Glow superior */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[140px]" />

      {/* Glow inferior */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-[140px]" />

      {/* Glow central */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/5 blur-[120px]" />
    </>
  );
}