function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        Copyright ⓒ {year} by{" "}
        <a
          href="https://github.com/muntaxir4"
          target="_blank"
          rel="noopener noreferrer"
        >
          @muntaxir4
        </a>
      </p>
    </footer>
  );
}

export default Footer;
