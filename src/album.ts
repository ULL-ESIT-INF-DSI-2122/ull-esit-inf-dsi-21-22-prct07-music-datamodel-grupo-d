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
 * @method setSongs Actualiza todas las cansiones del album
 * @method refreshData Recalcula los generos que incluye el album
 * @method addSong Añade una cancion al album
 */
export class Album {
  private genres: genres[] = [];
  constructor(private name: string, private nameGroupAndArtist: string, private year: Date, private songs: Song []) {
    this.refreshData();
  }

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

  getGenres() {
    return this.genres;
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

  setSongs(newSongs: Song[]) {
    this.songs = newSongs;
    this.refreshData();
  }
  // ---------------------------------------------------------------------------
  // Metodos

  private refreshData(){
    this.genres = [];
    this.songs.forEach((song: Song) => {
      song.getGenres().forEach((genre: genres) => {
        if (!this.genres.includes(genre)) {
          this.genres.push(genre);
        }
      });
    });
  }

  addSong(newSong: Song) {
    this.songs.push(newSong);
    this.refreshData();
  }
}
