const API_URL = 'https://akabab.github.io/superhero-api/api';

export async function getAllSuperheroes() {
  try {
    const response = await fetch(`${API_URL}/all.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch heroes');
    }

    const shuffled = (await response.json()).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 30)
  } catch (error) {
    console.error('Error fetching heroes:', error);
    return [];
  }
}

export async function getHeroById(id) {
  try {
    const response = await fetch(`${API_URL}/id/${id}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch hero details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hero details:', error);
    return null;
  }
}