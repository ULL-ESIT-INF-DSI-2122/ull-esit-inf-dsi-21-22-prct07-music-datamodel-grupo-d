import { genres } from "./musicGenre";
import { Group } from "./group";
import { Album } from "./album";
import { Song } from "./song";

/**
 * @param name Nombre del artista.
 * @param genres Generos relacionados.
 * @param songs Canciones publicadas.
 * @param listeners Cantidad de oyentes mensuales.
 * @param groups Grupos a los que pertenece el artista.
 * @param albumes Albumes en los que colabora el artista.
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
  private genres: genres[]= [];
  constructor(private name: string, private songs: Song[], private listeners: number){
    this.refereshData();
  }

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
    let total = 0;
    this.groups.forEach((grupo: Group) =>{
      total += grupo.getListeners();
    });
    return total + this.listeners;
  }
  getGroups() {
    return this.groups;
  }
  // -----------------------------------
  // setters
  setName(newName:string) {
    this.name = newName;
  }
  setSongs(newSongs: Song[]) {
    this.songs = newSongs;
    this.refereshData();
  }
  setListeners(newListeners: number) {
    this.listeners = newListeners;
  }
  // -----------------------------------
  // Métodos.
  private refereshData() {
    this.songs.forEach((song: Song) => {
      song.getGenres().forEach((genre: genres) => {
        if (!this.genres.includes(genre)) {
          this.genres.push(genre);
        }
      });
    });
  }

  addGroup(newGroup: Group) {
    this.groups.push(newGroup);
  }

  removeGroup(delGroup: Group) {
    const posGroup = this.groups.indexOf(delGroup);
    if (posGroup > -1) this.groups.splice(posGroup, 1);
  }

  addAlbum(newAlbum: Album) {
    this.albumes.push(newAlbum);
  }

  removeAlbum(delAlbum: Album) {
    const posAlbum = this.albumes.indexOf(delAlbum);
    if (posAlbum > -1) this.albumes.splice(posAlbum, 1);
  }
}
