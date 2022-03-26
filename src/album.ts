import { genres } from "./musicGenre";
import { Song } from "./song";

/**
 * Clase Album
 * @param name Nombre del Album
 * @param nameGroupAndArtist Nombre del grupo y/o artista
 * @param year Año de publicación
 * @param genre El genero
 * @param songs Todas las cansiones del album
 * @method getName Retorna el nombre del album
 * @method getNameGroupAndArtist Retorna nombre del grupo y/o artista
 * @method getYear Retorna año de publicación
 * @method getGenre Retorna el genero
 * @method getSongs Retorna todas las cansiones del album
 * @method setName Actualiza el nombre del album
 * @method setNameGroupAndArtist Actualiza nombre del grupo y/o artista
 * @method setYear Actualiza año de publicación
 * @method setGenre Actualiza el genero
 * @method setSongs Actualiza todas las cansiones del album
 */
export class Album {
  constructor(private name: string, private nameGroupAndArtist: string, private year: Date, private genre: genres, private songs: Song []) { }

  // ---------------------------------------------------------------------------
  // Getters
  getName() {
    return this.name;
  }

  getNameGroupAndArtist() {
    return this.nameGroupAndArtist;
  }

  getYear() {
    return this.year;
  }

  getGenre() {
    return this.genre;
  }

  getSongs() {
    return this.songs;
  }

  // ---------------------------------------------------------------------------
  // Seters
  setName(newName: string) {
    this.name = newName;
  }

  setNameGroupAndArtist(newNameGroupAndArtist: string) {
    this.nameGroupAndArtist = newNameGroupAndArtist;
  }

  setYear(newYear: Date) {
    this.year = newYear;
  }

  setGenre(newGenre: genres) {
    this.genre = newGenre;
  }

  setSongs(newSongs: Song[]) {
    this.songs = newSongs;
  }
  // ---------------------------------------------------------------------------
  // Metodos
}
