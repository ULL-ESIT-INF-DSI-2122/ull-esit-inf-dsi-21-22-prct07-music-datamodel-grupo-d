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
 * @param groupAndArtist  Nombre de el grupo(s) y/o artista(s) que  el genero
 * @param albums Albumes dentro de la biblioteca relacionados a este genero.
 * @param songs Canciones relacionadas a este genero.
 * @method getGenre Retorna el nombre del genero.
 * @method getGroupAndArtist Retorna el nombre del grupo(s) y/o artista(s).
 * @method getAlbums Retorna los albumes.
 * @method getSongs Retorna las canciones.
 * @method setGenre Establece el nombre del genero entre los tipos genre.
 * @method setGroupAndArtist Establece los grupos y/o artistas pertenecientes al genero.
 * @method setAlbum Establece los albumes pertenecientes al genero.
 * @method setSongs Establece las canciones pertenecientes al genero.
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

  // ----------------------------------------------------------
  // Metodos
}
