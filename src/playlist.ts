import { genres } from "./musicGenre";
import { Song } from "./song";

/**
 * @param name Nombre de la playlist
 * @param songs Canciones que incluye
 * @param duration Duracion de la playlist
 * @param genres Generos que incluye
 * @method getName Retorna el nombre de la playlist
 * @method getSongs Retorna las consiones
 * @method getDuration Retorna la duracion
 * @method getGenres Retorna los generos
 * @method setName Actualiza el nombre
 * @method setSongs Actualiza las canciones
 * @method setDuration Actualiza la duracion
 * @method setGenres Actualiza los generos
 */
export class playlist {
  constructor(private name: string, private songs: Song[], private duration: number, private genres: genres[]) {}

  // ----------------------------------
  // getters.
  getName() {
    return this.name;
  }
  getSongs() {
    return this.songs;
  }
  getDuration() {
    return this.duration;
  }
  getGenres() {
    return this.genres;
  }
  // ----------------------------------
  // setters.
  setName(newName: string) {
    this.name = newName;
  }
  setSongs(newSong: Song[]) {
    this.songs = newSong;
  }
  setDuration(newDuration: number) {
    this.duration = newDuration;
  }
  setGenres(newGenres: genres[]) {
    this.genres = newGenres;
  }
  // -----------------------------------
  // Métodos.
  // Funcion que suma la duraciond e cada cancion y es la duracion de la playlist
}
