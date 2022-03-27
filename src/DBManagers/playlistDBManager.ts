const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

import { Playlist } from "../playlist";
import { Song } from "../song";


import { loadSongsFromDB } from "./songDBManager";

/**
 * Guarda lo que recibe como parametro borrando lo que estaba
 * @param playlists Vector de playlists a guardar
 */
export function savePlaylistsOnDB(playlists: Playlist[]): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Playlists.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Playlists: []})
      .write();

  // Borra todo lo que tiene dentro
  db.get('Playlists')
      .remove()
      .write();

  // Añade todo el vector de albumes
  playlists.forEach((playlist: Playlist) => {
    db.get('Playlists')
        .remove({name: playlist.getName()})
        .write();

    db.get('Playlists')
        .push({
          name: playlist.getName(),
          songs: [],
        })
        .write();

    playlist.getSongs().forEach((song: Song) => {
      db.get('Playlists')
          .find({name: playlist.getName()})
          .get('songs')
          .push(song.getSongName())
          .write();
    });
  });
}


/**
 * Añade lo que recibe como parametro
 * @param playlist Album a guardar
 */
export function addPlaylistInDB(playlist: Playlist): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Playlists.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Playlists: []})
      .write();

  // Borra el album que esta, para añadir el nuevo
  // en caso que sea el mimso album
  db.get('Playlists')
      .remove({name: playlist.getName()})
      .write();

  // Añade el album
  db.get('Playlists')
      .push({
        name: playlist.getName(),
        songs: [],
      })
      .write();

  playlist.getSongs().forEach((song: Song) => {
    db.get('Playlists')
        .find({name: playlist.getName()})
        .get('songs')
        .push(song.getSongName())
        .write();
  });
}


// const songs: Song[] = loadSongsFromDB();
// const playlists: Playlist[] = [new Playlist("Playlist 1", songs), new Playlist("Playlist 2", songs)];

// savePlaylistsOnDB(playlists);

// console.log(playlists[1].getDuration());
// playlists[1].addSong(songs[1]);
// console.log(playlists[1].getDuration());

// addPlaylistInDB(playlists[1]);


/**
 * Tipo de dato que representa la Playlist
 * en la base de datos
 */
type playlistJSON = {
  name: string,
  songs: string[]
}

/**
 * Carga las playlists guardadas
 * @returns Vector de playlist
 */
export function loadPlaylistsFromDB(): Playlist[] {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Playlists.json');
  const db = low(adapter);

  // Todas las canciones existentes
  // para hacer las relaciones
  const allSongs: Song[] = loadSongsFromDB();

  // Metes toda la informacion dentro
  const playlistsJSON = db.get('Playlists').write();
  const playlistsResult: Playlist[] = [];

  playlistsJSON.forEach((playlist: playlistJSON) => {
    const songs: Song[] = [];
    // Relaciono nombre de canciones de la playlist
    // con nombre de canciones de todas las canciones
    // y las guardo para luego añadirlas al playlist que retorno
    playlist.songs.forEach((songInPlaylist: string) => {
      allSongs.forEach((song: Song) => {
        if (songInPlaylist === song.getSongName()) {
          songs.push(song);
          return 0;
        }
      });
    });

    playlistsResult.push(new Playlist(playlist.name, songs));
  });

  return playlistsResult;
}

// console.log(loadPlaylistsFromDB()[0]);
