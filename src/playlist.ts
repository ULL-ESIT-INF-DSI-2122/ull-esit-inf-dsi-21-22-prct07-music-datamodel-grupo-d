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
 * @method refreshData Metodo privado que se encarga de calcular los generos y la duracion
 * @method addSong Añade una cancion
 */
export class Playlist {
  private duration: number = 0;
  private genres: genres[] = [];
  constructor(private name: string, private songs: Song[]) {
    this.refreshData();
  }

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
  setSongs(newSongs: Song[]) {
    this.songs = newSongs;
    this.refreshData();
  }
  // -----------------------------------
  // Métodos.

  // Funcion que suma la duracion de cada cancion y los distintos generos
  private refreshData(){
    this.duration = 0;
    this.genres = [];
    this.songs.forEach((song: Song) => {
      this.duration += song.getDuration();
      song.getGenres().forEach((genre: genres) => {
        if (!this.genres.includes(genre)) {
          this.genres.push(genre);
        }
      });
    });
  }

  // Añadir una cancion a la plylist
  addSong(newSong: Song) {
    this.songs.push(newSong);
    this.refreshData();
  }
}
