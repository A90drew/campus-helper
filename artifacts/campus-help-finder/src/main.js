import "./index.css";

const resources = [
  {
    name: "Food Pantry",
    description: "Pick up free groceries and everyday essentials in a welcoming, no-questions-asked space.",
    label: "Everyday essentials",
  },
  {
    name: "Counseling",
    description: "Talk with a counselor for free, confidential support with stress, anxiety, or anything on your mind.",
    label: "Mental wellbeing",
  },
  {
    name: "Tutoring",
    description: "Get free one-on-one help with coursework, study strategies, and exam preparation.",
    label: "Learning support",
  },
  {
    name: "Legal Aid",
    description: "Meet with a free legal advisor for guidance on housing, work, immigration, and more.",
    label: "Know your options",
  },
  {
    name: "Childcare",
    description: "Find free childcare support and family resources while you study or attend class.",
    label: "Family support",
  },
  {
    name: "Emergency Housing",
    description: "Connect with free help finding a safe place to stay tonight.",
    label: "Help right now",
  },
];

const grid = document.querySelector("#resource-grid");
const search = document.querySelector("#resource-search");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

function renderResources(query = "") {
  const term = query.trim().toLocaleLowerCase();
  const matches = resources.filter((resource) =>
    `${resource.name} ${resource.description}`.toLocaleLowerCase().includes(term),
  );

  grid.innerHTML = matches
    .map(
      (resource, index) => `
        <article class="resource-card" style="--card-index: ${index}">
          <div class="card-topline">
            <span class="resource-label">${resource.label}</span>
            <span class="resource-number" aria-hidden="true">${String(resources.indexOf(resource) + 1).padStart(2, "0")}</span>
          </div>
          <h2>${resource.name}</h2>
          <p>${resource.description}</p>
          <a class="learn-more" href="#" aria-label="Learn more about ${resource.name}">Learn more <span aria-hidden="true">↗</span></a>
        </article>
      `,
    )
    .join("");

  resultCount.textContent = `${matches.length} ${matches.length === 1 ? "resource" : "resources"}`;
  emptyState.hidden = matches.length !== 0;
  grid.hidden = matches.length === 0;
}

search.addEventListener("input", (event) => renderResources(event.currentTarget.value));
grid.addEventListener("click", (event) => {
  if (event.target.closest(".learn-more")) event.preventDefault();
});

renderResources();
