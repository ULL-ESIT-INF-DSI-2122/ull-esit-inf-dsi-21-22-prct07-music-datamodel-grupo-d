import { Artist } from "./artist";
import { Group } from "./group";
import { Genres } from "./musicGenre";
import { Song } from "./song";
/**
 * Clase Album
 * @param name Nombre del Album.
 * @param GroupAndArtist Nombre del grupo y/o artista.
 * @param year Año de publicación.
 * @param genre El genero de la canción almacenado en un vector.
 * @param songs Todas las cansiones del album.
 * @method getName Retorna el nombre del album.
 * @method getNameGroupAndArtist Retorna nombre del grupo y/o artista.
 * @method getYear Retorna año de publicación.
 * @method getGenre Retorna el genero.
 * @method getSongs Retorna todas las cansiones del album.
 * @method setName Actualiza el nombre del album.
 * @method setNameGroupAndArtist Actualiza nombre del grupo y/o artista.
 * @method setYear Actualiza año de publicación.
 * @method setSongs Actualiza todas las cansiones del album.
 * @method refreshData Recalcula los generos que incluye el album.
 * @method addSong Añade una cancion al album.
 */
export class Album {
  private genres: Genres[] = [];
  constructor(private name: string, private GroupOrArtist: Group | Artist, private year: Date, private songs: Song []) {
    GroupOrArtist.addAlbum(this);

    this.refreshData();
  }

  // ---------------------------------------------------------------------------
  // Getters
  getName() {
    return this.name;
  }

  getGroupOrArtist() {
    return this.GroupOrArtist;
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

  setGroupAndArtist(newGroupOrArtist: Group | Artist) {
    this.GroupOrArtist.removeAlbum(this);
    this.GroupOrArtist = newGroupOrArtist;
    this.GroupOrArtist.addAlbum(this);
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
      song.getGenres().forEach((genre: Genres) => {
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
