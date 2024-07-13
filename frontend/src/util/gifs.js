export const funGifs = [
  "https://media.tenor.com/XD0sSu0AfzMAAAAi/your-mom-says-no.gif",
  "https://media.tenor.com/fkPSeWppKdAAAAAi/pikachu-pokemon.gif",
  "https://media.tenor.com/TMM9nphr3B8AAAAi/pikachu-pokemon.gif",
  "https://media.tenor.com/068bPMF4SYIAAAAi/pokemon-pikachu.gif",
  "https://media.tenor.com/ZUfx_Io7Q9QAAAAi/sappy-seals.gif",
  "https://media.tenor.com/CAG4IW9FTNoAAAAi/sappy-seals.gif",
  "https://media.tenor.com/j11P8fur4msAAAAi/sappy-seals.gif",
  "https://media.tenor.com/Ja-wjUL7dqoAAAAi/sappy-seals.gif",
  "https://media.tenor.com/Npixqj3Ek1IAAAAi/sappy-seals.gif",
  "https://media.tenor.com/jhzqjogKpK0AAAAi/sappy-seals.gif",
  "https://media.tenor.com/b1eJ98-euMgAAAAi/sappy-seals.gif",
  "https://media.tenor.com/bFurAqQ9z3EAAAAi/sappy-seals.gif",
  "https://media.tenor.com/x4xqlTYYihQAAAAi/cutie-addicted.gif",
  "https://media.tenor.com/tQCbROIO5cQAAAAi/pikachu-pokemon.gif",
];

export const getRandomGif = () => {
  return funGifs[Math.floor(Math.random() * funGifs.length)];
};
