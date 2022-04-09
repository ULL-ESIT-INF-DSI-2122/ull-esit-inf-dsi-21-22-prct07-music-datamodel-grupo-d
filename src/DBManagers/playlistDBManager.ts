const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/database/Playlists.json');
const db = low(adapter);

import { Playlist } from "../playlist";
import { Song } from "../song";

/**
 * Guarda lo que recibe como parametro
 * @param playlists Vector de playlists a guardar
 */
export function savePlaylistsOnDB(playlists: Playlist[]): void {
  // Añade todo el vector de playlists
  playlists.forEach((playlist: Playlist) => {
    addPlaylistToDB(playlist);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param playlist Playlist a guardar
 */
export function addPlaylistToDB(playlist: Playlist): void {
  // Inicializa el fichero
  db.defaults({Playlists: []})
      .write();

  // Evita que se guarden datos duplicados
  db.get('Playlists')
      .remove({name: playlist.getName()})
      .write();

  // Añade la playlist
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
        .push(song.getName())
        .write();
  });
}

/**
 * Tipo de dato que representa la Playlist
 * en la base de datos
 */
export type PlaylistJSON = {
  name: string,
  songs: string[]
}

/**
 * Carga las playlists guardadas
 * @param allSongs Todas las Canciones
 * @returns Vector de Playlists
 */
export function loadPlaylistsFromDB(allSongs: Song[]): Playlist[] {
  // Inicializa el fichero
  db.defaults({Playlists: []})
      .write();

  // Cargo los datos del fichero
  const playlistsJSON: PlaylistJSON[] = db.get('Playlists').write();

  const playlistsResult: Playlist[] = [];

  playlistsJSON.forEach((playlist: PlaylistJSON) => {
    // Populate Songs
    const songs: Song[] = [];
    playlist.songs.forEach((songInPlaylist: string) => {
      allSongs.forEach((song: Song) => {
        if (songInPlaylist === song.getName()) {
          songs.push(song);
          return 0;
        }
      });
    });

    playlistsResult.push(new Playlist(playlist.name, songs));
  });

  return playlistsResult;
}
