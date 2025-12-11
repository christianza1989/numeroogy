export function Footer() {
  return (
    <footer className="bg-dark-bg-300 border-t border-white/5 py-12 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Numerology.lt. Visos teisės saugomos.
          <br />
          Sukurta su meile ir AI magija.
        </p>
      </div>
    </footer>
  );
}
