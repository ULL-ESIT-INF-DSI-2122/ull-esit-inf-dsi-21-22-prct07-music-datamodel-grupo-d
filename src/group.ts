import { Album } from "./album";
import { Artist } from "./artist";

/**
 * Clase para representar los grupos de autores.a
 * @param groupName Nombre del grupo.
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
 */
export class Group {
  constructor(private groupName: string, private artists: Artist [], private creationYear: Date, private albums:[Album, string][], private listeners: number) {
    artists.forEach((artist: Artist) => {
      artist.addGroup(this);
    });
  }
  // ----------------------------------------------------------
  // getters
  getGroupName() {
    return this.groupName;
  }
  getArtist() {
    return this.artists;
  }
  getCreationYear() {
    return this.creationYear;
  }
  getAlbum() {
    return this.albums;
  }
  getListeners() {
    return this.listeners;
  }
  // ----------------------------------------------------------
  // Setters
  setGroupName(newGroupName:string) {
    this.groupName = newGroupName;
  }
  setArtist(newArtist:Artist[]) {
    this.artists = newArtist;
  }
  setCreationYear(newCreationYear:Date) {
    this.creationYear = newCreationYear;
  }
  setAlbum(newAlbum:[Album, string][]) {
    this.albums = newAlbum;
  }
  setListeners(listeners:number) {
    this.listeners = listeners;
  }
  // ----------------------------------------------------------
  // Metodos
}
