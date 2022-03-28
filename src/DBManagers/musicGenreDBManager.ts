const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

import { Album } from "../album";
import { Artist } from "../artist";
import { Group } from "../group";
import { genres, MusicGenre } from "../musicGenre";
import { Song } from "../song";

/**
 * Guarda lo que recibe como parametro borrando lo que estaba
 * @param musicGenres Vector de playlists a guardar
 */
export function savePlaylistsOnDB(musicGenres: MusicGenre[]): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/MusicGenres.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({MusicGenres: []})
      .write();

  // Borra todo lo que tiene dentro
  db.get('MusicGenres')
      .remove()
      .write();

  // Añade todo el vector de albumes
  musicGenres.forEach((musicGenre: MusicGenre) => {
    addPlaylistInDB(musicGenre);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param musicGenre Album a guardar
 */
export function addPlaylistInDB(musicGenre: MusicGenre): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/MusicGenres.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({MusicGenres: []})
      .write();

  // Borra todo lo que tiene dentro
  db.get('MusicGenres')
      .remove({genre: musicGenre.getGenre()})
      .write();

  // Añade el album
  db.get('MusicGenres')
      .remove({genre: musicGenre.getGenre()})
      .write();

  db.get('MusicGenres')
      .push({
        genre: musicGenre.getGenre(),
      })
      .write();
}

/**
 * Tipo de dato que representa la Playlist
 * en la base de datos
 */
type musicGenreJSON = {
  genre: genres,
}

/**
 * Carga las playlists guardadas
 * @returns Vector de playlist
 */
export function loadMusicGenresFromDB(allSongs: Song[], allArtists: Artist[], allGroups: Group[], allAlbumes: Album[]): MusicGenre[] {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Playlists.json');
  const db = low(adapter);

  // Metes toda la informacion dentro
  const musicGenresJSON = db.get('MusicGenres').write();
  const musicGenresResult: MusicGenre[] = [];

  musicGenresJSON.forEach((musicGenre: musicGenreJSON) => {
    musicGenresResult.push(new MusicGenre(musicGenre.genre, allSongs, allArtists, allGroups, allAlbumes));
  });

  return musicGenresResult;
}


