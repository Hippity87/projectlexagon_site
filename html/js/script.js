// document.addEventListener("DOMContentLoaded", () => {
//   // Toggle Menu (with safety check)
//   const menuToggle = document.querySelector(".menu-toggle");
//   const navLinks = document.querySelector(".nav-links");
//   if (menuToggle && navLinks) {
//     menuToggle.addEventListener("click", () => {
//       navLinks.classList.toggle("active");
//     });
//   }

//   // Function to create a project card
//   function createProjectCard(project) {
//     return `
//             <div class="project-card" data-category="${project.category}" id="${
//       project.id
//     }">
//                 <div class="card-img" style="background-image: url('${
//                   project.image
//                 }')"></div>
//                 <h3>${project.title}</h3>
//                 <p>${project.description}</p>
//                 ${
//                   project.githubLink
//                     ? `<a href="${project.githubLink}" target="_blank" class="project-link"><button>View Project</button></a>`
//                     : "<button>View Project</button>"
//                 }
//             </div>
//         `;
//   }

//   const featuredContainer = document.getElementById("featured-projects");
//   if (featuredContainer) {
//     const latestProjects = projects.slice(0, 3);
//     featuredContainer.innerHTML = latestProjects
//       .map(createProjectCard)
//       .join("");
//   }

//   const allProjectsContainer = document.getElementById("all-projects");
//   if (allProjectsContainer) {
//     allProjectsContainer.innerHTML = projects.map(createProjectCard).join("");
//     const filterButtons = document.querySelectorAll(".filter button");
//     filterButtons.forEach((button) => {
//       button.addEventListener("click", () => {
//         const filter = button.getAttribute("data-filter");
//         filterButtons.forEach((btn) => btn.classList.remove("active"));
//         button.classList.add("active");
//         const projectCards =
//           allProjectsContainer.querySelectorAll(".project-card");
//         projectCards.forEach((card) => {
//           const category = card.getAttribute("data-category");
//           card.style.display =
//             filter === "all" || category === filter ? "block" : "none";
//         });
//       });
//     });
//   }
// });

// // Get elements
// const modal = document.getElementById("myModal");
// const modalBtn = document.querySelector(".modal-btn");
// const closeBtn = document.querySelector(".modal-close");

// // Open modal on button click
// modalBtn.addEventListener("click", () => {
//   modal.style.display = "block";
// });

// // Close modal on close button click
// closeBtn.addEventListener("click", () => {
//   modal.style.display = "none";
// });

// // Close modal when clicking outside the modal content
// window.addEventListener("click", (event) => {
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// });

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
          <div class="project-card" data-category="${project.category}" id="${project.id}">
              <div class="card-img" style="background-image: url('${project.image}')"></div>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <button class="view-project-btn" data-id="${project.id}">View Project</button>
          </div>
      `;
  }

  // Function to open modal with project info
  function openModal(content, modalBody, modal) {
    if (modalBody && modal) {
      console.log("Setting modal content and displaying...");
      modalBody.innerHTML = content;
      modal.style.display = "block";
      console.log("Modal display style after setting:", modal.style.display);
    } else {
      console.error("Modal or modalBody not found:", { modal, modalBody });
    }
  }

  // Function to handle View Project button clicks
  function handleViewProjectClick(event, modalBody, modal) {
    const button = event.target;
    const projectId = button.getAttribute("data-id");
    const project = projects.find((p) => p.id === projectId);
    console.log("Clicked project:", projectId, project);

    if (project.viewProjectInfo) {
      console.log("Opening modal with content:", project.viewProjectInfo);
      openModal(project.viewProjectInfo, modalBody, modal);
    } else if (project.githubLink) {
      console.log("Redirecting to:", project.githubLink);
      window.location.href = project.githubLink;
    } else {
      console.log(
        "No viewProjectInfo or githubLink found for project:",
        projectId
      );
    }
  }

  // Function to load and inject the modal
  function loadModal(callback) {
    console.log("Attempting to fetch modal.html...");
    fetch("/html/modal.html") // Changed from "../html/modal.html"
      .then((response) => {
        console.log("Fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Modal HTML fetched successfully:", data);
        // Inject modal HTML into the body
        document.body.insertAdjacentHTML("beforeend", data);
        console.log("Modal HTML injected into DOM");

        // Get modal elements after injection
        const modal = document.getElementById("myModal");
        const modalBody = modal ? modal.querySelector(".modal-body") : null;
        const closeBtn = modal ? modal.querySelector(".modal-close") : null;

        if (!modal || !modalBody) {
          console.error("Modal or modalBody not found after injection");
          return;
        }

        // Close modal on close button click
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
          });
        }

        // Close modal when clicking outside the modal content
        if (modal) {
          window.addEventListener("click", (event) => {
            if (event.target === modal) {
              modal.style.display = "none";
            }
          });
        }

        // Execute callback with modal elements
        callback(modal, modalBody);
      })
      .catch((error) => {
        console.error("Error loading modal:", error);
      });
  }

  // Generate featured projects (index.html)
  const featuredContainer = document.getElementById("featured-projects");
  if (featuredContainer) {
    const latestProjects = projects.slice(0, 3);
    featuredContainer.innerHTML = latestProjects
      .map(createProjectCard)
      .join("");
  }

  // Generate all projects (projects.html)
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

  // Load modal only on pages with project cards
  if (featuredContainer || allProjectsContainer) {
    loadModal((modal, modalBody) => {
      // Add event listeners to all View Project buttons after modal is loaded
      const viewProjectButtons = document.querySelectorAll(".view-project-btn");
      console.log("Found view-project-btn buttons:", viewProjectButtons.length);
      viewProjectButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          handleViewProjectClick(event, modalBody, modal);
        });
      });
    });
  }
});
