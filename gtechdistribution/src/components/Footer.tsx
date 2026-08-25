import { Dictionary } from "@/lib/dictionaries";

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="bg-deep text-deepInkSoft border-t border-deepLine">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between flex-wrap gap-3 px-6 py-7 text-[12.5px] text-deepInkSoft">
        <span className="font-mono">© {new Date().getFullYear()} GTechDistribution. {dict.footer.rights}</span>
        <span className="font-mono text-ember">{dict.footer.tagline}</span>
      </div>
    </footer>
  );
}
