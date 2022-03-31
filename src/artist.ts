import { genres } from "./musicGenre";
import { Group } from "./group";
import { Album } from "./album";
import { Song } from "./song";

/**
 * @param name Nombre del artista
 * @param genres Generos relacionados
 * @param songs Canciones publicadas
 * @param listeners Cantidad de oyentes mensuales
 * @method getName Retorna el nombre del artista
 * @method getGenres Retorna los generos relacionados
 * @method getAlbumes Retorna los albumes en los que ha participado
 * @method getSongs Retorna canciones publicadas
 * @method getListeners Retorna cantidad de oyentes mensuales
 * @method getGroups Retorna los grupos a los que pertenece
 * @method setName Actualiza el nombre del artista
 * @method setGenres Actualiza los generos relacionados
 * @method setSongs Actualiza canciones publicadas
 * @method setListeners Actualiza cantidad de oyentes mensuales
 * @method addGroup Añade un grupo
 * @method removeGroup Elimina un grupo
 * @method addAlbum Añade un album
 * @method removeAlbum Elimina un album
 */
export class Artist {
  private groups: Group[] = [];
  private albumes: Album[] = [];
  constructor(private name: string, private genres: genres[], private songs: Song[], private listeners: number){}

  // ----------------------------------
  // getters
  getName() {
    return this.name;
  }
  getGenres() {
    return this.genres;
  }
  getAlbumes() {
    return this.albumes;
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
  setSongs(newSongs: Song[]) {
    this.songs = newSongs;
  }
  setListeners(newListeners: number) {
    this.listeners = newListeners;
  }
  // -----------------------------------
  // Métodos.
  addGroup(newGroup: Group) {
    this.groups.push(newGroup);
  }

  removeGroup(delGroup: Group) {
    const posGroup = this.groups.indexOf(delGroup);
    posGroup > -1 ? this.albumes.splice(posGroup, 1) : '';
  }

  addAlbum(newAlbum: Album) {
    this.albumes.push(newAlbum);
  }

  removeAlbum(delAlbum: Album) {
    const posAlbum = this.albumes.indexOf(delAlbum);
    posAlbum > -1 ? this.albumes.splice(posAlbum, 1) : '';
  }
}
