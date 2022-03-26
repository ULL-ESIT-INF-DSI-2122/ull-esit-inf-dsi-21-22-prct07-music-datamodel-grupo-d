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
  constructor(private genre: genres, private groupAndArtist: Group | Artist[], private albums: Album[], private songs: Song[]) {}

  // ----------------------------------------------
  // getters
  getGenre() {
    return this.genre;
  }

  getGroupAndArtist() {
    return this.groupAndArtist;
  }

  getAlbums() {
    return this.albums;
  }

  getSongs() {
    return this.songs;
  }

  // ----------------------------------------------------------
  // setters
  setGenre(newGenre: genres) {
    this.genre = newGenre;
  }

  setGroupAndArtist(newGroupAndArtist: Group | Artist[]) {
    this.groupAndArtist = newGroupAndArtist;
  }

  setAlbums(newAlbum: Album[]) {
    this.albums = newAlbum;
  }

  setSongs(newSong: Song[]) {
    this.songs = newSong;
  }

  // ----------------------------------------------------------
  // Metodos
}
