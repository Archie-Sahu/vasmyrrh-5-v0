
  // Toggle navigation
  navToggle.addEventListener("click", function(e) {
    e.stopPropagation(); // Prevent the document click from closing immediately
    this.classList.toggle("active");
    radialNav.classList.toggle("active");
  });

  // Close navigation when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-container") && radialNav.classList.contains("active")) {
      navToggle.classList.remove("active");
      radialNav.classList.remove("active");
    }
  });

  // Highlight active nav item based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      // Normalize comparison by removing any query strings/hashes
      const linkPage = link.getAttribute("href").split(/[?#]/)[0];
      const currentPageBase = currentPage.split(/[?#]/)[0];
      
      if (linkPage === currentPageBase) {
        link.classList.add("active");
      }
      
      // Ensure links work normally
      link.addEventListener("click", function(e) {
        // Only prevent default if it's an anchor link to same page
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          // Handle smooth scrolling here if needed
        }
        // All other links will behave normally
      });
    }
  });
});

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}
