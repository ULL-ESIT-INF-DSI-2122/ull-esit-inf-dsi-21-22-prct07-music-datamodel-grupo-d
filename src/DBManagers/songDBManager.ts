const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

import { genres } from "../musicGenre";
import { Song } from "../song";

/**
 * Guarda lo que recibe como parametro borrando lo que estaba
 * @param songs Vector de canciones a guardar
 */
export function saveSongsOnDB(songs: Song[]): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Songs.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Songs: []})
      .write();

  // Borra todo lo que tiene dentro
  db.get('Songs')
      .remove()
      .write();

  // Añade todo el vector de musica
  songs.forEach((song: Song) => {
    db.get('Songs')
        .remove({name: song.getName()})
        .write();

    db.get('Songs')
        .push({
          name: song.getName(),
          author: song.getAutor(),
          duration: song.getDuration(),
          genres: [],
          single: song.getSingle(),
          numReproTotal: song.getNumReproTotal(),
        })
        .write();

    song.getGenres().forEach((genre: string) => {
      db.get('Songs')
          .find({name: song.getName()})
          .get('genres')
          .push(genre)
          .write();
    });
  });
}

/**
 * Añade lo que recibe como parametro
 * @param song Cancion a guardar
 */
export function addSongInDB(song: Song): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Songs.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Songs: []})
      .write();

  // Borra la musica que esta, para añadir la nueva
  // en caso que sea la mimsa musica
  db.get('Songs')
      .remove({name: song.getName()})
      .write();

  // Añade la musica
  db.get('Songs')
      .push({
        name: song.getName(),
        author: song.getAutor(),
        duration: song.getDuration(),
        genres: [],
        single: song.getSingle(),
        numReproTotal: song.getNumReproTotal(),
      })
      .write();

  song.getGenres().forEach((genre: genres) => {
    db.get('Songs')
        .find({name: song.getName()})
        .get('genres')
        .push(genre)
        .write();
  });
}

/**
 * Tipo de dato que representa la Cancion
 * en la base de datos
 */
type songJSON = {
  name: string,
  author: string,
  duration: number,
  genres: genres[],
  single: boolean,
  numReproTotal: number
}

/**
 * Carga las canciones guardadas
 * @returns Vector con las canciones
 */
export function loadSongsFromDB(): Song[] {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Songs.json');
  const db = low(adapter);

  // Metes toda la informacion dentro
  const songsJSON: songJSON[] = db.get('Songs').write();
  const songsResult: Song[] = [];

  songsJSON.forEach((song: songJSON) => {
    songsResult.push(new Song(song.name, song.author, song.duration, song.genres, song.single, song.numReproTotal));
  });

  return songsResult;
}


// const songsToSave: Song[] = [
//   new Song("Mami", "Becky G & Karol G", 227, ["country", "funk"], false, 112725546),
//   new Song("Virtual Diva", "Don Omar", 312, ["pop", "reguae"], true, 401191778)];
// saveSongsOnDB(songsToSave);

// addSongsInDB(new Song("Ella y Yo", "Aventura", 274, ["musica clasica"], false, 307982478));
// addSongsInDB(new Song("Ella y Yo", "Aventura", 274, ["musica clasica"], false, 307982478));

// const songsToLoad: Song[] = loadSongsFromDB();
// console.log(songsToLoad);
