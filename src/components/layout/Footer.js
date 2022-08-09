import React from "react";

const Footer = () => {
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  const footerYear = new Date().getFullYear();
  const footerDate = formatDate(new Date());
  return (
    <footer className="px-3 py-2 bg-gray-700">
      <div className="text-yellow-300 inline">
        Copyright &copy; {footerYear}{" "}
      </div>
      <div className="text-gray-800 text-xs date inline ml-3">{footerDate}</div>
    </footer>
  );
};

export default Footer;
