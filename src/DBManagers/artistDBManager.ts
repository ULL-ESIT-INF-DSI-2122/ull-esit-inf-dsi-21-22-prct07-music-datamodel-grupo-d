const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

import { Artist } from "../artist";
import { genres } from "../musicGenre";
import { Song } from "../song";

import { loadSongsFromDB } from "./songDBManager";

/**
 * Guarda lo que recibe como parametro borrando lo que estaba
 * @param artists Vector de artistas a guardar
 */
export function saveArtistsOnDB(artists: Artist[]): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Artists.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Artists: []})
      .write();

  // Borra todo lo que tiene dentro
  db.get('Artists')
      .remove()
      .write();

  // Añade todo el vector de artists
  artists.forEach((artist: Artist) => {
    db.get('Artists')
        .remove({name: artist.getName()})
        .write();

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
  });
}

/**
 * Añade lo que recibe como parametro
 * @param artist Album a guardar
 */
export function addArtistInDB(artist: Artist): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Artists.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Artists: []})
      .write();

  // Borra el album que esta, para añadir el nuevo
  // en caso que sea el mimso album
  db.get('Artists')
      .remove({name: artist.getName()})
      .write();

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
 * Tipo de dato que representa la Playlist
 * en la base de datos
 */
type artistJSON = {
  name: string,
  genres: genres[],
  songs: string[],
  listeners: number
}

/**
 * Carga los artistas guardados
 * @returns Vector de artistas
 */
export function loadArtistsFromDB(allSongs: Song[]): Artist[] {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Artists.json');
  const db = low(adapter);

  // Metes toda la informacion dentro
  const artistsJSON = db.get('Artists').write();
  const artistsResult: Artist[] = [];

  artistsJSON.forEach((artist: artistJSON) => {
    const songs: Song[] = [];
    // Relaciono nombre de canciones de la playlist
    // con nombre de canciones de todas las canciones
    // y las guardo para luego añadirlas al playlist que retorno
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

// const songs: Song[] = loadSongsFromDB();

// const artists: Artist[] = [new Artist("Artista 1", ["jazz", "pop"], [songs[1], songs[2]], 25), new Artist("Artista 2", ["pop", "funk"], [songs[0], songs[2]], 250)];

// saveArtistsOnDB(artists);

// addArtistInDB(new Artist("Artista 3", ["rock", "reguae"], songs, 25));

// console.log(loadArtistsFromDB());
