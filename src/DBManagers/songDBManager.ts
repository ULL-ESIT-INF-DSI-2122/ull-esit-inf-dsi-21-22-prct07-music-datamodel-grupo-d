const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/database/Songs.json');
const db = low(adapter);

import { genres } from "../musicGenre";
import { Song } from "../song";

/**
 * Guarda lo que recibe como parametro
 * @param songs Vector de Canciones a guardar
 */
export function saveSongsOnDB(songs: Song[]): void {
  // Añade todo el vector de Cancion
  songs.forEach((song: Song) => {
    addSongToDB(song);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param song Cancion a guardar
 */
export function addSongToDB(song: Song): void {
  // Inicializa el fichero
  db.defaults({Songs: []})
      .write();

  // Evita que se guarden datos duplicados
  db.get('Songs')
      .remove({name: song.getName()})
      .write();

  // Añade la Cancion
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
type SongJSON = {
  name: string,
  author: string,
  duration: number,
  genres: genres[],
  single: boolean,
  numReproTotal: number
}

/**
 * Carga las Canciones guardadas
 * @returns Vector de Canciones
 */
export function loadSongsFromDB(): Song[] {
  // Inicializa el fichero
  db.defaults({Songs: []})
      .write();

  // Cargo los datos del fichero
  const songsJSON: SongJSON[] = db.get('Songs').write();
  const songsResult: Song[] = [];

  songsJSON.forEach((song: SongJSON) => {
    songsResult.push(new Song(song.name, song.author, song.duration, song.genres, song.single, song.numReproTotal));
  });

  return songsResult;
}
