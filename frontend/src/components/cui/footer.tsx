const Footer = () => {
  return (
    <div>
      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} FleetLink by{" "}
        <a href="https://github.com/pdmahendra" className="underline">
          Pratik Mahendra
        </a>
        . All rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
