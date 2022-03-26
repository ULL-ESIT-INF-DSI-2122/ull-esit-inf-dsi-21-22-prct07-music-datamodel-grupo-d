import { genres } from "./musicGenre";
import { Group } from "./group";
import { Album } from "./album";
import { Song } from "./song";

/**
 * @param name Nombre del artista
 * @param genres Generos relacionados
 * @param albums Albumes en los que ha participado
 * @param songs Canciones publicadas
 * @param listeners Cantidad de oyentes mensuales
 * @param groups Grupos a los que pertenece
 * @method getName Retorna el nombre del artista
 * @method getGenres Retorna los generos relacionados
 * @method getAlbums Retorna los albumes en los que ha participado
 * @method getSongs Retorna canciones publicadas
 * @method getListeners Retorna cantidad de oyentes mensuales
 * @method getGroups Retorna los grupos a los que pertenece
 * @method setName Actualiza el nombre del artista
 * @method setGenres Actualiza los generos relacionados
 * @method setAlbums Actualiza los albumes en los que ha participado
 * @method setSongs Actualiza canciones publicadas
 * @method setListeners Actualiza cantidad de oyentes mensuales
 * @method setGroups Actualiza los grupos a los que pertenece
 * @method addGroup Añade un grupo
 */
export class Artist {
  constructor(private name: string, private genres: genres[], private albums: Album[], private songs: Song[], private listeners: number, private groups: Group[] = []){}

  // ----------------------------------
  // getters
  getName() {
    return this.name;
  }
  getGenres() {
    return this.genres;
  }
  getAlbums() {
    return this.albums;
  }
  getSongs() {
    return this.songs;
  }
  getListeners() {
    return this.listeners;
  }
  getGroups() {
    return this.groups;
  }
  // -----------------------------------
  // setters
  setName(newName:string) {
    this.name = newName;
  }
  setGenres(newGenre: genres[]) {
    this.genres = newGenre;
  }
  setAlbums(newAlbum: Album[]) {
    this.albums = newAlbum;
  }
  setSongs(newSongs: Song[]) {
    this.songs = newSongs;
  }
  setListeners(newListeners: number) {
    this.listeners = newListeners;
  }
  setGroups(newGroups: Group[]) {
    this.groups = newGroups;
  }
  // -----------------------------------
  // Métodos.
  addGroup(newGroup: Group) {
    this.groups.push(newGroup);
  }
}

/*
const tmp: Artist = new Artist("asd", ["pop", "rock"], [], [], 65);
const group1: Group = new Group("ASd", [tmp], new Date("1995-12-17"), [], 64);
console.log(tmp);
tmp.addGroup(group1);
console.log(tmp);
*/
