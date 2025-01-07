function Footer() {
  return (
    <footer className="w-full h-72 flex flex-col justify-end max-w-5xl px-16 py-4 mx-auto gap-4">
      <div className="flex gap-4 text-2xl text-neutral-500">
        <a
          href="https://www.instagram.com/kvvasu/"
          target="_blank"
          className="hover:text-neutral-300"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100001380208836&locale=pl_PL"
          target="_blank"
          className="hover:text-neutral-300"
        >
          <i className="fa-brands fa-square-facebook"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/%C5%82ukasz-kwas-aa985a232/"
          target="_blank"
          className="hover:text-neutral-300"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://github.com/kvvasuu"
          target="_blank"
          className="hover:text-neutral-300"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
      <p className="text-neutral-500 text-xs">
        © 2025 Cineflow, Powered by{" "}
        <a
          href="https://kwasu.pl/"
          target="_blank"
          className="font-bold underline hover:text-neutral-300"
        >
          Kvvasu
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
