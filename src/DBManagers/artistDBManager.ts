const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/database/Artists.json');
const db = low(adapter);

import { Artist } from "../artist";
import { genres } from "../musicGenre";
import { Song } from "../song";

/**
 * Guarda lo que recibe como parametro
 * @param artists Vector de Artistas a guardar
 */
export function saveArtistsOnDB(artists: Artist[]): void {
  // Añade todo el vector de Artistas
  artists.forEach((artist: Artist) => {
    addArtistToDB(artist);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param artist Artista a guardar
 */
export function addArtistToDB(artist: Artist): void {
  // Inicializa el fichero
  db.defaults({Artists: []})
      .write();

  // Evita que se guarden datos duplicados
  db.get('Artists')
      .remove({name: artist.getName()})
      .write();

  // Añade el Artista
  db.get('Artists')
      .push({
        name: artist.getName(),
        genres: [],
        songs: [],
        listeners: artist.getListeners(),
      })
      .write();

  artist.getGenres().forEach((genre: genres) => {
    db.get('Artists')
        .find({name: artist.getName()})
        .get('genres')
        .push(genre)
        .write();
  });

  artist.getSongs().forEach((song: Song) => {
    db.get('Artists')
        .find({name: artist.getName()})
        .get('songs')
        .push(song.getName())
        .write();
  });
}

/**
 * Tipo de dato que representa el Artista
 * en la base de datos
 */
type ArtistJSON = {
  name: string,
  genres: genres[],
  songs: string[],
  listeners: number
}

/**
 * Carga los Artistas guardados
 * @returns Vector de Artistas
 */
export function loadArtistsFromDB(allSongs: Song[]): Artist[] {
  // Cargo los datos del fichero
  const artistsJSON: ArtistJSON[] = db.get('Artists').write();
  const artistsResult: Artist[] = [];

  artistsJSON.forEach((artist: ArtistJSON) => {
    // Populate Songs
    const songs: Song[] = [];
    artist.songs.forEach((songInArtist: string) => {
      allSongs.forEach((song: Song) => {
        if (songInArtist === song.getName()) {
          songs.push(song);
          return 0;
        }
      });
    });

    artistsResult.push(new Artist(artist.name, artist.genres, songs, artist.listeners));
  });

  return artistsResult;
}
