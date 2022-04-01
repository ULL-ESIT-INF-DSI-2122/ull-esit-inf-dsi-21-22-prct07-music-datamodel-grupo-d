const inquire = require('inquirer');

import { loadPlaylistsFromDB } from "./DBManagers/playlistDBManager";
import { loadSongsFromDB } from "./DBManagers/songDBManager";
import { addUsersPlaylistToDB, loadUsersPlaylistsFromDB, saveUsersPlaylistsOnDB } from "./DBManagers/userPlaylistDBManager";
import { Playlist } from "./playlist";
import { Song } from "./song";

export class Gestor {
  private songs: Song[] = [];
  private playlists: Playlist[] = [];
  private userPlaylist: Playlist[] = [];
  constructor() {
    this.songs = loadSongsFromDB();
    this.playlists = loadPlaylistsFromDB(this.songs);
    this.userPlaylist = loadUsersPlaylistsFromDB(this.songs);
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
    options.push({name: "Quit", value: -2});

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
        this.usersPlayLists();
      } else return 0;
    });
  }

  usersPlayLists() {
    // Tipo de dato para creaar las opciones
    type viewPlaylistJSON = {
      name: string,
      value: number
    }
    // Vectores de opciones
    const options: viewPlaylistJSON[] = [];
    this.userPlaylist.forEach((playlist: Playlist, index: number) => {
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
        this.actionsPlaylist(this.userPlaylist[res.playlist], true);
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
          isDeleteable ? this.usersPlayLists() : this.start();
          break;
        case 0:
          this.moreInfoPlaylist(playlist, 0, false, isDeleteable);
          break;
        case 1:
          isDeleteable ? this.manipulatePlaylist(playlist) : this.newOrRenamePlayList(playlist, true);
          break;
        case 2:
          const pos: number = this.userPlaylist.indexOf(playlist);
          pos >= 0 ? this.userPlaylist.splice(pos, 1): "";
          saveUsersPlaylistsOnDB(this.userPlaylist);
          this.usersPlayLists();
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
        saveUsersPlaylistsOnDB(this.userPlaylist);
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
          this.userPlaylist.includes(playlist) ? "" : this.userPlaylist.push(playlist);
          this.usersPlayLists();
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
        removeSong ? playlist.removeSong(removeSong) : "";
      });
      // Para actualizar los cambios hechos
      saveUsersPlaylistsOnDB(this.userPlaylist);
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
        addSong ? playlist.addSong(addSong) : "";
      });
      // Para actualizar los cambios hechos
      saveUsersPlaylistsOnDB(this.userPlaylist);
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
