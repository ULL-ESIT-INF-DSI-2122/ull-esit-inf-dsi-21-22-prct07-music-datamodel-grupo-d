import { Group } from './group';
import { Artist } from './artist';
import { Album } from './album';
import { Song } from './song';

/**
 * Tipo de generos musicales.
 */
export type genres = "rock" | "pop" | "musica clasica" | "jazz" | "reguae" | "musica disco" | "heavy" | "soul" | 'country' | 'funk'
/**
 * Clase para representar los generos de música.
 * @param genre Nombre del genero
 * @param allSongs Todas las canciones que tenemos en nuestra base de datos.
 * @param allArtists Todos los artistas que tenemos en nuestra base de datos.
 * @param allGroups Todos los grupos que tenemos en nuestra base de datos.
 * @param allAlbumes Todos los albumes que tenemos en nuestra base de datos.
 * @param mySongs Todas las canciones pertenecientes al genero.
 * @param myArtists Todos los artistas pertenecientes al genero.
 * @param myGroups Todos los grupos pertenecientes al genero.
 * @param myAlbumes Todos los albumes pertenecientes al genero.
 * @method getGenre() Retorna el genero que representa la clase.
 * @method getGroups() Retorna los grupos pertenecientes al genero.
 * @method getArtist() Retorna los artistas pertenecientes al genero.
 * @method getAlbums() Retorna los albumes  pertenecientes al genero.
 * @method getSongs() Retorna las canciones pertenecientes al genero.
 * @method setGenre() Actualiza el genero.
 * @method setArtists() Actualiza los artistas del genero.
 * @method setGroups() Actualiza los grupos del genero.
 * @method setAlbumes() Actualiza los albumes del genero.
 * @method setSongs() Actualiza las canciones del genero.
*/
export class MusicGenre {
  private myArtists: Artist[] = [];
  private myGroups: Group[] = [];
  private myAlbumes: Album[] = [];
  private mySongs: Song[] = [];
  constructor(private genre: genres, allSongs: Song[], allArtists: Artist[], allGroups: Group[], allAlbumes: Album[]) {
    allArtists.forEach((Artist: Artist) => {
      Artist.getGenres().forEach((genre_: genres) => {
        if (genre_ === genre && !this.myArtists.includes(Artist)) {
          this.myArtists.push(Artist);
        }
      });
    });
    allGroups.forEach((Grupo: Group) => {
      Grupo.getGenres().forEach((genre_: genres) => {
        if (genre_ === genre && !this.myGroups.includes(Grupo)) {
          this.myGroups.push(Grupo);
        }
      });
    });
    allAlbumes.forEach((Album: Album) => {
      Album.getGenres().forEach((genre_: genres) => {
        if (genre_ === genre && !this.myAlbumes.includes(Album)) {
          this.myAlbumes.push(Album);
        }
      });
    });
    allSongs.forEach((Song: Song) => {
      Song.getGenres().forEach((genre_: genres) => {
        if (genre_ === genre && !this.mySongs.includes(Song)) {
          this.mySongs.push(Song);
        }
      });
    });
  }

  // ----------------------------------------------
  // getters
  getGenre() {
    return this.genre;
  }

  getGroups() {
    return this.myGroups;
  }

  getArtists() {
    return this.myArtists;
  }

  getAlbums() {
    return this.myAlbumes;
  }

  getSongs() {
    return this.mySongs;
  }

  // ----------------------------------------------------------
  // setters
  setGenre(newGenre: genres) {
    this.myAlbumes = [];
    this.myArtists = [];
    this.myGroups = [];
    this.mySongs = [];
    this.genre = newGenre;
  }

  setArtists(newArtists: Artist[]) {
    newArtists.forEach((Artist: Artist) => {
      Artist.getGenres().forEach((genre_: genres) => {
        if (genre_ === this.genre && !this.myArtists.includes(Artist)) {
          this.myArtists.push(Artist);
        }
      });
    });
  }

  setGroups(newGroups: Group[]){
    newGroups.forEach((Grupo: Group) => {
      Grupo.getGenres().forEach((genre_: genres) => {
        if (genre_ === this.genre && !this.myGroups.includes(Grupo)) {
          this.myGroups.push(Grupo);
        }
      });
    });
  }

  setAlbumes(newAlbumes: Album[]) {
    newAlbumes.forEach((Album: Album) => {
      Album.getGenres().forEach((genre_: genres) => {
        if (genre_ === this.genre && !this.myAlbumes.includes(Album)) {
          this.myAlbumes.push(Album);
        }
      });
    });
  }

  setSongs(newSongs: Song[]) {
    newSongs.forEach((Song: Song) => {
      Song.getGenres().forEach((genre_: genres) => {
        if (genre_ === this.genre && !this.mySongs.includes(Song)) {
          this.mySongs.push(Song);
        }
      });
    });
  }
}
