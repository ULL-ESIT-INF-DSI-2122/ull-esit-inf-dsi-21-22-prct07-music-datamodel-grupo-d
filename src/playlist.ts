import { genres } from "./musicGenre";
import { Song } from "./song";

/**
 * @param name Nombre de la playlist.
 * @param songs Canciones que incluye la playlist.
 * @param duration Duracion de la playlist
 * @param genres Generos que incluye la playlist.
 * @method getName Retorna el nombre de la playlist
 * @method getSongs Retorna las consiones de la playlist.
 * @method getDuration Retorna la duracion de la playlist.
 * @method getGenres Retorna los generos de la playlist.
 * @method setName Actualiza el nombre de la playlist.
 * @method setSongs Actualiza las canciones de la playlist.
 * @method refreshData Metodo privado que se encarga de calcular los generos y la duracion de la playlist.
 * @method addSong Añade una cancion de la playlist.
 * @method removeSong Elimina una cancion de la playlist en caso de existir.
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

  // Añadir una cancion a la playlist
  addSong(newSong: Song) {
    this.songs.push(newSong);
    this.refreshData();
  }

  // Elimina una cancion si existe
  removeSong(removeSong: Song) {
    const posSong = this.songs.indexOf(removeSong);
    if (posSong > -1) this.songs.splice(posSong, 1);
    this.refreshData();
  }
}
