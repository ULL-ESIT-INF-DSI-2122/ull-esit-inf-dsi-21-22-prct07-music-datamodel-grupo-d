const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/database/MusicGenres.json');
const db = low(adapter);

import { genres, MusicGenre } from "../musicGenre";
import { Album } from "../album";
import { Artist } from "../artist";
import { Group } from "../group";
import { Song } from "../song";

/**
 * Guarda lo que recibe como parametro
 * @param musicGenres Vector de Generos Musicales a guardar
 */
export function saveMusicGenresOnDB(musicGenres: MusicGenre[]): void {
  // Añade todo el vector de Generos Musicales
  musicGenres.forEach((musicGenre: MusicGenre) => {
    addMusicGenreToDB(musicGenre);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param musicGenre Genero Musical a guardar
 */
export function addMusicGenreToDB(musicGenre: MusicGenre): void {
  // Inicializa el fichero
  db.defaults({MusicGenres: []})
      .write();

  // Evita que se guarden datos duplicados
  db.get('MusicGenres')
      .remove({genre: musicGenre.getGenre()})
      .write();

  // Añade el Genero Musical
  db.get('MusicGenres')
      .push({
        genre: musicGenre.getGenre(),
      })
      .write();
}

/**
 * Tipo de dato que representa el Genero Musical
 * en la base de datos
 */
type MusicGenreJSON = {
  genre: genres,
}

/**
 * Carga los Generos Musicales guardados
 * @param allSongs Todas las Canciones
 * @param allArtists Todos los Artistas
 * @param allGroups Todos los Grupos
 * @param allAlbumes Todos los Albumes
 * @returns Vector de Generos Musicales
 */
export function loadMusicGenresFromDB(allSongs: Song[], allArtists: Artist[], allGroups: Group[], allAlbumes: Album[]): MusicGenre[] {
  // Inicializa el fichero
  db.defaults({MusicGenres: []})
      .write();

  // Cargo los datos del fichero
  const musicGenresJSON: MusicGenreJSON[] = db.get('MusicGenres').write();
  const musicGenresResult: MusicGenre[] = [];

  musicGenresJSON.forEach((musicGenre: MusicGenreJSON) => {
    musicGenresResult.push(new MusicGenre(musicGenre.genre, allSongs, allArtists, allGroups, allAlbumes));
  });

  return musicGenresResult;
}
