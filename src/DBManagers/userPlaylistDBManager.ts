const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/database/UsersPlaylists.json');
const db = low(adapter);

import { Playlist } from "../playlist";
import { Song } from "../song";
import { PlaylistJSON } from "./playlistDBManager";

/**
 * Guarda lo que recibe como parametro
 * @param playlists Vector de playlists a guardar
 */
export function saveUsersPlaylistsOnDB(playlists: Playlist[]): void {
  // Inicia
  db.defaults({Playlists: []})
      .write();

  // Borra todo lo anterior
  db.get('Playlists')
      .remove()
      .write();
  // Añade todo el vector de playlists
  playlists.forEach((playlist: Playlist) => {
    addUsersPlaylistToDB(playlist);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param playlist Playlist a guardar
 */
export function addUsersPlaylistToDB(playlist: Playlist): void {
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
 * Carga las playlists guardadas
 * @param allSongs Todas las Canciones
 * @returns Vector de Playlists
 */
export function loadUsersPlaylistsFromDB(allSongs: Song[]): Playlist[] {
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
