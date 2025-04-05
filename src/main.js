import { getAllSuperheroes, getHeroById } from './api.js';

const heroesListEl = document.getElementById('heroes-list');
const heroDetailsEl = document.getElementById('hero-details');

async function initApp() {
  const heroes = await getAllSuperheroes();

  renderHeroesList(heroes);

  if (heroes.length > 0) {
    const firstHero = await getHeroById(heroes[0].id);
    renderHeroDetails(firstHero);
  }
}

function renderHeroesList(heroes) {
  heroesListEl.innerHTML = heroes
    .map(hero => `
      <div class="hero-card" data-id="${hero.id}">
        <h3>${hero.name}</h3>
      </div>
    `)
    .join('');

  document.querySelectorAll('.hero-card').forEach(card => {
    card.addEventListener('click', async () => {
      const heroId = card.getAttribute('data-id');
      const hero = await getHeroById(heroId);
      renderHeroDetails(hero);
    });
  });
}

function renderHeroDetails(hero) {
  if (!hero) {
    heroDetailsEl.innerHTML = '<p>Hero details not available</p>';
    return;
  }

  heroDetailsEl.innerHTML = `
    <h2>${hero.name}</h2>
    <div class="hero-details-container">
      <img src="${hero.images.md}" alt="Hero photo of ${hero.name}" class="hero-photo">

      <div class="hero-stats">

        <div class="hero-stats-section">
          <h3>Appearance:</h3>

          <div class="detail-item">
            <span class="detail-label">Gender:</span> ${hero.appearance.gender ?? 'Unknown'}
          </div>
          <div class="detail-item">
            <span class="detail-label">Race:</span> ${hero.appearance.race ?? 'Unknown'}
          </div>
          <div class="detail-item">
            <span class="detail-label">Height:</span> ${hero.appearance.height[1] ?? 'Unknown'}
          </div>
          <div class="detail-item">
            <span class="detail-label">Weight:</span> ${hero.appearance.weight[1] ?? 'Unknown'}
          </div>
        </div>

        <div class="hero-stats-section">
          <h3>Powerstats:</h3>

          <div class="detail-item">
            <span class="detail-label">Intelligence:</span> ${hero.powerstats.intelligence}
          </div>
          <div class="detail-item">
            <span class="detail-label">Strength:</span> ${hero.powerstats.strength}
          </div>
          <div class="detail-item">
            <span class="detail-label">Speed:</span> ${hero.powerstats.speed}
          </div>
          <div class="detail-item">
            <span class="detail-label">Durability:</span> ${hero.powerstats.durability}
          </div>
          <div class="detail-item">
            <span class="detail-label">Power:</span> ${hero.powerstats.power}
          </div>
        </div>

      </div>

    </div>
  `;
}

initApp();