const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/database/UsersPlaylists.json');
const db = low(adapter);

import { Playlist } from "../playlist";
import { Song } from "../song";
import { PlaylistJSON } from "./playlistDBManager";

/**
 * Guarda lo que recibe como parametro
 * @param userPlaylists Vector de playlists a guardar
 */
export function saveUsersPlaylistsOnDB(userPlaylists: Playlist[]): void {
  // Inicia
  db.defaults({UsersPlaylists: []})
      .write();

  // Borra todo lo anterior
  db.get('UsersPlaylists')
      .remove()
      .write();
  // Añade todo el vector de playlists
  userPlaylists.forEach((playlist: Playlist) => {
    addUsersPlaylistToDB(playlist);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param playlist Playlist a guardar
 */
export function addUsersPlaylistToDB(userPlaylist: Playlist): void {
  // Inicializa el fichero
  db.defaults({UsersPlaylists: []})
      .write();

  // Evita que se guarden datos duplicados
  db.get('UsersPlaylists')
      .remove({name: userPlaylist.getName()})
      .write();

  // Añade la playlist
  db.get('UsersPlaylists')
      .push({
        name: userPlaylist.getName(),
        songs: [],
      })
      .write();

  userPlaylist.getSongs().forEach((userSong: Song) => {
    db.get('UsersPlaylists')
        .find({name: userPlaylist.getName()})
        .get('songs')
        .push(userSong.getName())
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
  db.defaults({UsersPlaylists: []})
      .write();

  // Cargo los datos del fichero
  const userPlaylistsJSON: PlaylistJSON[] = db.get('UsersPlaylists').write();

  const userPlaylistsResult: Playlist[] = [];

  userPlaylistsJSON.forEach((userPlaylist: PlaylistJSON) => {
    // Populate Songs
    const songs: Song[] = [];
    userPlaylist.songs.forEach((songInUserPlaylist: string) => {
      allSongs.forEach((song: Song) => {
        if (songInUserPlaylist === song.getName()) {
          songs.push(song);
          return 0;
        }
      });
    });

    userPlaylistsResult.push(new Playlist(userPlaylist.name, songs));
  });

  return userPlaylistsResult;
}
