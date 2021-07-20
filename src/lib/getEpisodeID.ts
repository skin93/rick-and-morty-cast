export default function getEpisodeId(item: string) {
  return item.split('https://rickandmortyapi.com/api/episode/')[1];
}
