document.addEventListener("DOMContentLoaded", () => {
  // Toggle Menu (with safety check)
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Function to create a project card
  function createProjectCard(project) {
    return `
            <div class="project-card" data-category="${project.category}" id="${
      project.id
    }">
                <div class="card-img" style="background-image: url('${
                  project.image
                }')"></div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${
                  project.githubLink
                    ? `<a href="${project.githubLink}" target="_blank" class="project-link"><button>View Project</button></a>`
                    : "<button>View Project</button>"
                }
            </div>
        `;
  }

  const featuredContainer = document.getElementById("featured-projects");
  if (featuredContainer) {
    const latestProjects = projects.slice(0, 3);
    featuredContainer.innerHTML = latestProjects
      .map(createProjectCard)
      .join("");
  }

  const allProjectsContainer = document.getElementById("all-projects");
  if (allProjectsContainer) {
    allProjectsContainer.innerHTML = projects.map(createProjectCard).join("");
    const filterButtons = document.querySelectorAll(".filter button");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const projectCards =
          allProjectsContainer.querySelectorAll(".project-card");
        projectCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          card.style.display =
            filter === "all" || category === filter ? "block" : "none";
        });
      });
    });
  }
});
