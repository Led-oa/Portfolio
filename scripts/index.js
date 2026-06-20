const username = "Led-oa"; // ← remplace

fetch(`https://api.github.com/users/${username}/repos`)
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("projects");

    // Filtrer (optionnel)
    const repos = data
      .filter((repo) => !repo.fork) // enlève les forks
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    repos.forEach((repo) => {
      const card = document.createElement("div");
      card.classList.add("project_card");

      card.innerHTML = `
                <h5 class="project_name">${repo.name}</h5>
                <p>${repo.description || "No description"}</p>
                <p>🧠 ${repo.language || "Unknown"}</p>
                <p>⭐ ${repo.stargazers_count}</p>
                <a href="${repo.html_url}" target="_blank">Voir</a>
            `;

      container.appendChild(card);
    });
  })
  .catch((err) => console.error(err));

const navLinks = document.querySelectorAll(".nav_link");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const linkText = this.textContent.trim();
    let sectionId = "";

    if (linkText === "Who I Am") sectionId = "whoiam";
    else if (linkText === "My Skills") sectionId = "myskills";
    else if (linkText === "My Projects") sectionId = "myprojects";
    else if (linkText === "Contacts") sectionId = "contacts";

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav_menu");
  const navBar = document.querySelector(".nav_bar");
  const links = document.querySelectorAll(".nav_link");

  // Ouvrir / fermer menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // évite fermeture immédiate
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Fermer quand on clique sur un lien
  links.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // 🔥 Fermer si clic en dehors du menu
  document.addEventListener("click", (e) => {
    const isClickInsideNav = navBar.contains(e.target);

    if (!isClickInsideNav) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});
