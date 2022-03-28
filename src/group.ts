import { Album } from "./album";
import { Artist } from "./artist";
import { genres } from "./musicGenre";

/**
 * Clase para representar los grupos de autores.a
 * @param name Nombre del grupo.
 * @param artists Artistas pertenecientes al grupo.
 * @param creationYear Año de creación del grupo.
 * @param listeners Numero de personas que escuchan el grupo.
 * @method getGroupName Retorna el nombre del grupo.
 * @method getArtist Retornael nombre de los artistas del grupo.
 * @method getCreationYear Retorna el año de creacion del grupo.
 * @method getAlbum Retorna los albumes del grupo con una descripcion.
 * @method getListeners Retorna el numero de oyentes del grupo.
 * @method setGroupName Establece el nombre del grupo.
 * @method setArtist Establece el nombre del artista.
 * @method setCreationYear Establece el año de creación del grupo.
 * @method setAlbum Establece el album y las descripciones asociadas.
 * @method setListeners Establece el numero de oyentes del grupo.
 * @method addAlbum Añade un album
 * @method removeAlbum Elimina un album
 */
export class Group {
  private albumes: Album[] = [];
  private genres: genres[] = [];
  constructor(private name: string, private artists: Artist [], private creationYear: Date, private listeners: number) {
    artists.forEach((artist: Artist) => {
      artist.addGroup(this);
      artist.getGenres().forEach((genre: genres) => {
        if (!this.genres.includes(genre)) {
          this.genres.push(genre);
        }
      });
    });
  }
  // ----------------------------------------------------------
  // getters
  getName() {
    return this.name;
  }
  getArtist() {
    return this.artists;
  }
  getCreationYear() {
    return this.creationYear;
  }
  getAlbum() {
    return this.albumes;
  }
  getListeners() {
    return this.listeners;
  }
  getGenres() {
    return this.genres;
  }
  // ----------------------------------------------------------
  // Setters
  setGroupName(newName:string) {
    this.name = newName;
  }
  setArtist(newArtist:Artist[]) {
    this.artists.forEach((artist: Artist) => {
      artist.removeGroup(this);
    });
    this.artists = newArtist;
    this.artists.forEach((artist: Artist) => {
      artist.addGroup(this);
    });
  }
  setCreationYear(newCreationYear:Date) {
    this.creationYear = newCreationYear;
  }
  setAlbum(newAlbumes: Album[]) {
    this.albumes = newAlbumes;
  }
  setListeners(listeners:number) {
    this.listeners = listeners;
  }
  // ----------------------------------------------------------
  // Metodos
  addAlbum(newAlbum: Album) {
    this.albumes.push(newAlbum);
  }
  removeAlbum(delAlbum: Album) {
    const posAlbum = this.albumes.indexOf(delAlbum);
    posAlbum > -1 ? this.albumes.slice(posAlbum) : '';
  }
}
