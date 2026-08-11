export default function GlobalLoading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center w-12 h-12">
        <div className="absolute inset-0 rounded-full border-[5px] border-zinc-800" />
        <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-yellow-400 border-r-yellow-400/40 animate-spin [animation-duration:0.8s]" />
      </div>
      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 animate-pulse"></p>
    </div>
  );
}
