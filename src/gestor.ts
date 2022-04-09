const inquire = require('inquirer');

import { AdvancedGestor } from "./advancedGestor";
import { loadPlaylistsFromDB } from "./DBManagers/playlistDBManager";
import { loadSongsFromDB } from "./DBManagers/songDBManager";
import { addUsersPlaylistToDB, loadUsersPlaylistsFromDB, saveUsersPlaylistsOnDB } from "./DBManagers/userPlaylistDBManager";
import { Playlist } from "./playlist";
import { Song } from "./song";

/**
 * Clase que permite la interacion por consola con el usuario
 * @constructor No recive nada, solo carga los datos de la DB
 * @private songs Vector con todas las canciones cargadas de la DB
 * @private playlists Vector con todas las playlists cargadas de la DB
 * @private usersPlaylists Vector con todas las playlists de los usuarios cargadas de la DB
 * @method start Da comienzo al programa
 * @method userPlayList Encargado de listar las playlist del usuario
 * @method actionsPlaylist Permite elegir varias acciones, como mas informacion, editar y borrar si es del usuario
 * @method newOrRenamePlayList Crea o renombra una playlist existente si es del usuario
 * @method manipulatePlaylist Permite modificar las playlist de los usuarios
 * @method manipulateRemoveSongs Elimina canciones de ls playlist de los usuarios
 * @method manipulateAddSongs Añade nuevas musicas a las playlist de los usuarios
 * @method moreInfoPlaylist Permite realizar diferentes Sorts a las musicas
 */
export class Gestor {
  private songs: Song[] = [];
  private playlists: Playlist[] = [];
  private usersPlaylists: Playlist[] = [];
  private advancedGestor: AdvancedGestor = new AdvancedGestor(this);
  constructor() {
    this.songs = loadSongsFromDB();
    this.playlists = loadPlaylistsFromDB(this.songs);
    this.usersPlaylists = loadUsersPlaylistsFromDB(this.songs);
  }

  start() {
    // Tipo de dato para creaar las opciones
    type viewPlaylistJSON = {
      name: string,
      value: number
    }
    // Vectores de opciones
    const options: viewPlaylistJSON[] = [];
    this.playlists.forEach((playlist: Playlist, index: number) => {
      // Calculamos la duracion en horas minutos y segundos
      let hour: number | string = parseInt((playlist.getDuration() / 3600).toFixed(0));
      let min: number | string = parseInt((playlist.getDuration() / 60).toFixed(0));
      let seg: number | string = playlist.getDuration() % 60;
      if (hour < 10 && hour > 0) hour = "0" + hour;
      if (min < 10 && min > 0) min = "0" + min;
      if (seg < 10 && seg > 0) seg = "0" + seg;

      options.push({name: playlist.getName() +
        "\n  * Genres: " + playlist.getGenres().join(", ") +
        "\n  * Durations: " + hour + ":" + min + ":" + seg, value: index});
    });

    // Opciones para salir y ver las playlist del usuario
    options.push({name: "User Playlist", value: -1});
    options.push({name: "Advanced Gestor", value: -2});
    options.push({name: "Quit", value: -3});

    // Limpiamos consola
    console.clear();

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'playlist',
      message: 'Select Playlist for more informations',
      choices: options,
    }).then((res: {playlist: number}) => {
      if (res.playlist >= 0) {
        // Informacion de la Playlist seleccionada
        this.actionsPlaylist(this.playlists[res.playlist], false);
      } else if (res.playlist === -1) {
        this.userPlayList();
      } else if (res.playlist === -2) {
        // Advanced Gestor
        this.advancedGestor.start();
      } else return 0;
    });
  }

  userPlayList() {
    // Tipo de dato para creaar las opciones
    type viewPlaylistJSON = {
      name: string,
      value: number
    }
    // Vectores de opciones
    const options: viewPlaylistJSON[] = [];
    this.usersPlaylists.forEach((playlist: Playlist, index: number) => {
      // Calculamos la duracion en horas minutos y segundos
      let hour: number | string = parseInt((playlist.getDuration() / 3600).toFixed(0));
      let min: number | string = parseInt((playlist.getDuration() / 60).toFixed(0));
      let seg: number | string = playlist.getDuration() % 60;
      if (hour < 10 && hour > 0) hour = "0" + hour;
      if (min < 10 && min > 0) min = "0" + min;
      if (seg < 10 && seg > 0) seg = "0" + seg;

      options.push({name: playlist.getName() +
        "\n  * Genres: " + playlist.getGenres().join(", ") +
        "\n  * Durations: " + hour + ":" + min + ":" + seg, value: index});
    });

    // Opciones para salir y ver las playlist del usuario
    options.push({name: "Create", value: -2});
    options.push({name: "Back", value: -1});

    // Limpiamos consola
    console.clear();

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'playlist',
      message: 'Select Playlist for more informations',
      choices: options,
    }).then((res: {playlist: number}) => {
      if (res.playlist >= 0) {
        // Informacion de la Playlist seleccionada
        this.actionsPlaylist(this.usersPlaylists[res.playlist], true);
      } else if (res.playlist === -1) {
        this.start();
      } else if (res.playlist === -2) {
        this.newOrRenamePlayList(new Playlist("New Playlist", []), true);
      }
    });
  }


  actionsPlaylist(playlist: Playlist, isDeleteable: boolean) {
    console.clear();

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'infoPlaylist',
      message: 'Actions with ' + playlist.getName(),
      choices: isDeleteable ? [
        {name: "More Info", value: 0},
        {name: "Edit", value: 1},
        {name: "Delete", value: 2},
        {name: "Back", value: -1},
      ]:[
        {name: "More Info", value: 0},
        {name: "Edit", value: 1},
        {name: "Back", value: -1},
      ],
    }).then((res: {infoPlaylist: number}) => {
      switch (res.infoPlaylist) {
        case -1:
          isDeleteable ? this.userPlayList() : this.start();
          break;
        case 0:
          this.moreInfoPlaylist(playlist, 0, false, isDeleteable);
          break;
        case 1:
          isDeleteable ? this.manipulatePlaylist(playlist) : this.newOrRenamePlayList(playlist, true);
          break;
        case 2:
          const pos: number = this.usersPlaylists.indexOf(playlist);
          if (pos >= 0) this.usersPlaylists.splice(pos, 1);
          saveUsersPlaylistsOnDB(this.usersPlaylists);
          this.userPlayList();
          break;

        default:
          break;
      }
    });
  }

  newOrRenamePlayList(playlist: Playlist, isNew: boolean) {
    inquire.prompt({
      name: 'namePlaylist',
      message: 'New name playlist',
    }).then((res: {namePlaylist: string}) => {
      if (!isNew) {
        playlist.setName(res.namePlaylist);
        saveUsersPlaylistsOnDB(this.usersPlaylists);
        this.manipulatePlaylist(playlist);
      } else {
        const newPlaylist: Playlist = new Playlist(res.namePlaylist, playlist.getSongs());
        this.manipulatePlaylist(newPlaylist);
      }
    });
  }

  manipulatePlaylist(playlist: Playlist) {
    console.clear();

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'manipulatePlaylist',
      message: 'Actions with ' + playlist.getName(),
      choices: playlist.getSongs().length > 0 ? [
        {name: "Rename", value: 0},
        {name: "Add Song(s)", value: 1},
        {name: "Remove Song(s)", value: 2},
        {name: "Save", value: 3},
        {name: "Cancel", value: -1},
      ]:
      [
        {name: "Rename", value: 0},
        {name: "Add Song(s)", value: 1},
        {name: "Save", value: 3},
        {name: "Cancel", value: -1},
      ],
    }).then((res: {manipulatePlaylist: number}) => {
      switch (res.manipulatePlaylist) {
        case -1:
          this.start();
          break;
        case 0:
          this.newOrRenamePlayList(playlist, false);
          break;
        case 1:
          this.manipulateAddSongs(playlist);
          break;
        case 2:
          this.manipulateRemoveSongs(playlist);
          break;
        case 3:
          addUsersPlaylistToDB(playlist);
          if (!this.usersPlaylists.includes(playlist)) this.usersPlaylists.push(playlist);
          this.userPlayList();
          break;

        default:
          break;
      }
    });
  }

  manipulateRemoveSongs(playlist: Playlist) {
    console.clear();

    inquire.prompt({
      pageSize: 10,
      type: 'checkbox',
      name: 'manipulateRemoveSongs',
      message: 'Actions with ' + playlist.getName(),
      choices: playlist.getSongs().map((song: Song) => song.getName()),
    }).then((res: {manipulateRemoveSongs: string[]}) => {
      console.log(res.manipulateRemoveSongs);
      res.manipulateRemoveSongs.forEach((nameSong: string) => {
        const removeSong = this.songs.find((song: Song) => {
          return song.getName() === nameSong;
        });
        if (removeSong) playlist.removeSong(removeSong);
      });
      // Para actualizar los cambios hechos
      saveUsersPlaylistsOnDB(this.usersPlaylists);
      this.manipulatePlaylist(playlist);
    });
  }

  manipulateAddSongs(playlist: Playlist) {
    console.clear();

    inquire.prompt({
      pageSize: 10,
      type: 'checkbox',
      name: 'manipulateAddSongs',
      message: 'Actions with ' + playlist.getName(),
      choices: this.songs.map((song: Song) => song.getName()),
    }).then((res: {manipulateAddSongs: string[]}) => {
      console.log(res.manipulateAddSongs);
      res.manipulateAddSongs.forEach((nameSong: string) => {
        const addSong = this.songs.find((song: Song) => {
          return song.getName() === nameSong;
        });
        if (addSong) playlist.addSong(addSong);
      });
      // Para actualizar los cambios hechos
      saveUsersPlaylistsOnDB(this.usersPlaylists);
      this.manipulatePlaylist(playlist);
    });
  }

  // Muestra mas informacion de la playlist pasada
  moreInfoPlaylist(playlist: Playlist, orden: number, rever: boolean, isDeleteable: boolean): void {
    const songs: Song[] = playlist.getSongs();
    // Sort By *
    if (orden === 0) {
      songs.sort((a, b) => {
        if (a.getName() < b.getName()) return -1;
        if (b.getName() < a.getName()) return 1;
        return 0;
      });
    } else if (orden === 2) {
      songs.sort((a, b) => {
        if (a.getAutor() < b.getAutor()) return -1;
        if (b.getAutor() < a.getAutor()) return 1;
        return 0;
      });
    } else if (orden === 4) {
      songs.sort((a, b) => {
        if (a.getDuration() < b.getDuration()) return -1;
        if (b.getDuration() < a.getDuration()) return 1;
        return 0;
      });
    } else if (orden === 6) {
      songs.sort((a, b) => {
        if (a.getGenres() < b.getGenres()) return -1;
        if (b.getGenres() < a.getGenres()) return 1;
        return 0;
      });
    } else if (orden === 8) {
      songs.sort((a, b) => {
        if (a.getNumReproTotal() < b.getNumReproTotal()) return -1;
        if (b.getNumReproTotal() < a.getNumReproTotal()) return 1;
        return 0;
      });
    }

    // Reverse
    if (rever) songs.reverse();

    console.clear();

    songs.forEach((song: Song) => {
      console.log(song.getName());
    });

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'songsInPlaylist',
      message: 'Sorts',
      choices: [
        {name: "Title Up", value: 0},
        {name: "Title Down", value: 1},
        {name: "Name Artist Up", value: 2},
        {name: "Name Artist Down", value: 3},
        {name: "Duration Up", value: 4},
        {name: "Duration Down", value: 5},
        {name: "Genre Up", value: 6},
        {name: "Genre Down", value: 7},
        {name: "Total Views Up", value: 8},
        {name: "Total Views Down", value: 9},
        {name: "Back", value: -1},
      ],
    }).then((res: {songsInPlaylist: number}) => {
      switch (res.songsInPlaylist) {
        case -1:
          this.actionsPlaylist(playlist, isDeleteable);
          break;
        case 0:
          this.moreInfoPlaylist(playlist, 0, false, isDeleteable);
          break;
        case 1:
          this.moreInfoPlaylist(playlist, 0, true, isDeleteable);
          break;
        case 2:
          this.moreInfoPlaylist(playlist, 2, false, isDeleteable);
          break;
        case 3:
          this.moreInfoPlaylist(playlist, 2, true, isDeleteable);
          break;
        case 4:
          this.moreInfoPlaylist(playlist, 4, false, isDeleteable);
          break;
        case 5:
          this.moreInfoPlaylist(playlist, 4, true, isDeleteable);
          break;
        case 6:
          this.moreInfoPlaylist(playlist, 6, false, isDeleteable);
          break;
        case 7:
          this.moreInfoPlaylist(playlist, 6, true, isDeleteable);
          break;
        case 8:
          this.moreInfoPlaylist(playlist, 8, false, isDeleteable);
          break;
        case 9:
          this.moreInfoPlaylist(playlist, 8, true, isDeleteable);
          break;
        default:
          break;
      }
    });
  }
}

new Gestor().start();
