const LOGO_SRC =
  "https://nsisolution.com/wp-content/themes/nsisolution22/assets/images/logo-nsi.svg";

export function BrandLogo() {
  return (
    <a
      href="https://nsisolution.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-3 top-3 z-40 block outline-offset-2 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400"
      aria-label="NSI Solution"
    >
      <img
        src={LOGO_SRC}
        alt=""
        width={100}
        height={28}
        className="h-7 w-auto max-w-[100px] object-contain object-left sm:h-8"
      />
    </a>
  );
}
