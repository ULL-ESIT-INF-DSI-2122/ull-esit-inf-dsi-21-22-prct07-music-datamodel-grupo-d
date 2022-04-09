const inquire = require('inquirer');

import { Album } from "./album";
import { Artist } from "./artist";
import { loadAlbumesFromDB } from "./DBManagers/albumDBManager";
import { loadArtistsFromDB } from "./DBManagers/artistDBManager";
import { loadGroupsFromDB } from "./DBManagers/groupDBManager";
import { loadMusicGenresFromDB } from "./DBManagers/musicGenreDBManager";
import { loadPlaylistsFromDB } from "./DBManagers/playlistDBManager";
import { loadSongsFromDB } from "./DBManagers/songDBManager";
import { Gestor } from "./gestor";
import { Group } from "./group";
import { MusicGenre } from "./musicGenre";
import { Playlist } from "./playlist";
import { Song } from "./song";


export class AdvancedGestor {
  private allSongs: Song[] = [];
  private allPlaylists: Playlist[] = [];
  private allArtists: Artist[] = [];
  private allGroups: Group[] = [];
  private allAlbumes: Album[] = [];
  private allMusicGenres: MusicGenre[] = [];
  constructor(private gestor: Gestor) {
    this.allSongs = loadSongsFromDB();
    this.allPlaylists = loadPlaylistsFromDB(this.allSongs);
    this.allArtists = loadArtistsFromDB(this.allSongs);
    this.allGroups = loadGroupsFromDB(this.allArtists);
    this.allAlbumes = loadAlbumesFromDB(this.allSongs, this.allArtists, this.allGroups);
    this.allMusicGenres = loadMusicGenresFromDB(this.allSongs, this.allArtists, this.allGroups, this.allAlbumes);
  }

  start() {
    console.clear();
    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'advancedGestor',
      message: 'Select actions',
      choices: [
        "Artists",
        "Groups",
        "Back",
      ],
    }).then((res: {advancedGestor: string}) => {
      switch (res.advancedGestor) {
        case 'Artists':
          this.selectArtists();
          break;
        case 'Groups':
          this.selectGroups();
          break;
        default:
          this.gestor.start();
          break;
      }
    });
  }

  private selectArtists(){
    const options: {name: string, value: number}[] = [];
    this.allArtists.forEach((artist: Artist, index: number) => {
      options.push({name: artist.getName(), value: index});
    });

    options.push({name: "Back", value: -1});

    console.clear();

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'selectArtists',
      message: 'Select Artsits',
      choices: options,
    }).then((res: {selectArtists: number}) => {
      if (res.selectArtists > -1) {
        this.actionsWithArtist(this.allArtists[res.selectArtists]);
      } else this.start();
    });
  }

  private actionsWithArtist(artist: Artist) {
    console.clear();

    const myPlaylist: Playlist[] = [];
    artist.getSongs().forEach((song: Song) => {
      this.allPlaylists.forEach((playlist: Playlist) => {
        if (playlist.getSongs().includes(song) && !myPlaylist.includes(playlist)) myPlaylist.push(playlist);
      });
    });

    const options: {name: string, value: number}[] = [];

    if (artist.getSongs().length > 0) options.push({name: "Songs", value: 0});
    if (myPlaylist.length > 0) options.push({name: "Playlists", value: 1});
    if (artist.getAlbumes().length > 0) options.push({name: "Albumes", value: 2});
    options.push({name: "Back", value: -1});

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'actionsWithArtist',
      message: 'Select action to ' + artist.getName(),
      choices: options,
    }).then((res: {actionsWithArtist: number}) => {
      switch (res.actionsWithArtist) {
        case 0:
          this.infoObject(artist.getSongs(), 0, false, artist);
          break;
        case 1:
          this.infoObject(myPlaylist, 0, false, artist);
          break;
        case 2:
          this.infoObject(artist.getAlbumes(), 0, false, artist);
          break;
        default:
          this.selectArtists();
          break;
      }
    });
  }

  private selectGroups(){
    const options: {name: string, value: number}[] = [];
    this.allGroups.forEach((group: Group, index: number) => {
      options.push({name: group.getName(), value: index});
    });

    options.push({name: "Back", value: -1});

    console.clear();

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'selectGroups',
      message: 'Select Groups',
      choices: options,
    }).then((res: {selectGroups: number}) => {
      if (res.selectGroups > -1) {
        this.actionsWithGroup(this.allGroups[res.selectGroups]);
      } else this.start();
    });
  }

  private actionsWithGroup(group: Group) {
    console.clear();

    const options: {name: string, value: number}[] = [];

    if (group.getAlbum().length > 0) options.push({name: "Albumes", value: 0});
    options.push({name: "Back", value: -1});

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'actionsWithGroup',
      message: 'Select action to ' + group.getName(),
      choices: options,
    }).then((res: {actionsWithGroup: number}) => {
      if (res.actionsWithGroup === 0) {
        this.infoObject(group.getAlbum(), 0, false, group);
      } else this.selectGroups();
    });
  }

  private infoObject(object: Song[] | Playlist[] | Album[], sort: number, reverse: boolean, objectFather: Group | Artist) {
    console.clear();

    const options: {name: string, value: number}[] = [];

    if (object.length > 1) {
      // Opciones dependiendo del tipo de dato
      options.push({name: "Name Up", value: 0});
      options.push({name: "Name Down", value: 1});
      if (object[0] instanceof Song) {
        options.push({name: "Total views Up", value: 2});
        options.push({name: "Total views Down", value: 3});
        options.push({name: "Singels", value: 4});
      } else if (object[0] instanceof Album) {
        options.push({name: "Date Up", value: 2});
        options.push({name: "Date Down", value: 3});
      }
    }

    // Sorts
    if (sort === 0) { // Ordenar por nombre
      object.sort((a, b) => {
        if (a.getName() < b.getName()) return -1;
        if (b.getName() < a.getName()) return 1;
        return 0;
      });
    } else if (sort === 2) { // Ordenar por ...
      object.sort((a, b) => {
        if (a instanceof Song && b instanceof Song) { // Total de reproduciones
          if (a.getNumReproTotal() < b.getNumReproTotal()) return -1;
          if (b.getNumReproTotal() < a.getNumReproTotal()) return 1;
          return 0;
        } else if (a instanceof Album && b instanceof Album) { // Fecha de publicacion
          if (a.getYear() < b.getYear()) return -1;
          if (b.getYear() < a.getYear()) return 1;
          return 0;
        } else return 0;
      });
    }

    // Al revez
    if (reverse) object.reverse();

    // Mostramos los datos
    object.forEach((element: Song | Playlist | Album) => {
      if (sort === 4 && element instanceof Song && element.getSingle()) { // En caso del sort ser por single, solo se muestran los single
        console.log(element.getName());
      } else if (sort !== 4) { // E.O.C se muestra todo
        console.log(element.getName());
      }
    });

    options.push({name: "Back", value: -1});

    inquire.prompt({
      type: 'list',
      pageSize: 12,
      name: 'sortAction',
      message: 'Select sort action',
      choices: options,
    }).then((res: {sortAction: number}) => {
      switch (res.sortAction) {
        case 0:
          this.infoObject(object, 0, false, objectFather);
          break;
        case 1:
          this.infoObject(object, 0, true, objectFather);
          break;
        case 2:
          this.infoObject(object, 2, false, objectFather);
          break;
        case 3:
          this.infoObject(object, 2, true, objectFather);
          break;
        case 4:
          this.infoObject(object, 4, false, objectFather);
          break;
        default:
          objectFather instanceof Artist ? this.actionsWithArtist(objectFather) : this.actionsWithGroup(objectFather);
          break;
      }
    });
  }
}
