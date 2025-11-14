export default function Header() {
  return (
    <header className="w-full py-4 px-6 sm:px-10 flex items-center justify-between glass">
      <a className="font-bold text-xl tracking-wider text-primary">
        Robo&lt;Eng&gt;
      </a>
      <nav className="hidden md:flex gap-6 text-slate-300">
        <a href="#about" className="hover:text-white">
          About
        </a>
        <a href="#projects" className="hover:text-white">
          Projects
        </a>
        <a href="#skills" className="hover:text-white">
          Skills
        </a>
        <a href="#contact" className="hover:text-white">
          Contact
        </a>
      </nav>
      <div className="md:hidden">
        <button aria-label="open menu" className="p-2 rounded-md glass">
          ☰
        </button>
      </div>
    </header>
  );
}
