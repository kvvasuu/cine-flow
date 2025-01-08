function Footer() {
  return (
    <footer className="w-full flex flex-col justify-end max-w-5xl px-16 py-4 mx-auto gap-4">
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
      <div className="flex w-full text-sm text-neutral-500">
        <div className="w-1/4">
          <p className="my-1 cursor-pointer">FAQ</p>
          <p className="my-1 cursor-pointer">Investor Relations</p>
          <p className="my-1 cursor-pointer">Privacy</p>
          <p className="my-1 cursor-pointer">Speed Test</p>
        </div>
        <div className="w-1/4">
          <p className="my-1 cursor-pointer">Help Centre</p>
          <p className="my-1 cursor-pointer">Jobs</p>
          <p className="my-1 cursor-pointer">Cookie Preferences</p>
          <p className="my-1 cursor-pointer">Legal Notices</p>
        </div>
        <div className="w-1/4">
          <p className="my-1 cursor-pointer">Account</p>
          <p className="my-1 cursor-pointer">Ways to Watch</p>
          <p className="my-1 cursor-pointer">Corporate Information</p>
          <p className="my-1 cursor-pointer">Only on Cineflow</p>
        </div>
        <div className="w-1/4">
          <p className="my-1 cursor-pointer">Media Centre</p>
          <p className="my-1 cursor-pointer">Terms of Use</p>
          <p className="my-1 cursor-pointer">Contact Us</p>
        </div>
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
