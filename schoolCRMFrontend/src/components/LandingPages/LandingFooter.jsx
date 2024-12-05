import React from "react";

function LandingFooter() {
  return (
    <footer className="w-full bg-gray-800 text-white text-center py-6 shadow-inner">
      <p>&copy; {new Date().getFullYear()} MySchool. All Rights Reserved.</p>
    </footer>
  );
}

export default LandingFooter;
