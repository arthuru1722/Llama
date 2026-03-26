export const categoryDict = {
  news: 'Notícias',
  opinion: 'Opinião',
  editorial: 'Editorial',
  tech: 'Tecnologia',
  games: 'Jogos',
  politics: 'Política',
  economy: 'Economia',
  culture: 'Cultura',
}

export function formatCategory(cat) {
  if (!cat) return ''

  return cat
    .split('/')
    .map((c) => categoryDict[c] || c)
    .join(' > ')
}
