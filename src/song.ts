import { Genres } from "./musicGenre";
/**
 * Class to representate Songs.
 * @param name Nombre de la cancion.
 * @param autor Autor de la cancion.
 * @param duration Duracion de la cancion en segundos.
 * @param genres Generos a los que pertenece la cancion.
 * @param single Booleano que determina si la canción es un solo o no.
 * @param numReproTotal Numero de reproducciones total de la cancion.
 * @method getName Retorna el nombre de la cancion.
 * @method getAutor Retorna el nombre del autor.
 * @method getDuration Retorna la duracion de la cancion.
 * @method getGenres Retorna el genero al que pertenece la cancion.
 * @method getSingle Retorna true si la canción es un solo y false en caso de no serlo.
 * @method getNumReproTotal Retorna el numero total de reproducciones de la cancion.
 * @method setName Establece el nombre de la canción.
 * @method setAutor Establece el nombre del autor de la canción.
 * @method setDuration Establece la duracion de la canción.
 * @method setGenres Establece el genero o generos al que pertenece la canción.
 * @method setSingle Establece si una canción es un solo o no.
 * @method setNumReproTotal Establece el numero total de reproducciones.
 */
export class Song {
  constructor(private name: string, private autor: string, private duration: number, private genres: Genres[], private single: boolean, private numReproTotal: number) { }
  // -----------------------------------------------
  // getters
  getName() {
    return this.name;
  }
  getAutor() {
    return this.autor;
  }
  getDuration() {
    return this.duration;
  }
  getGenres() {
    return this.genres;
  }
  getSingle() {
    return this.single;
  }
  getNumReproTotal() {
    return this.numReproTotal;
  }
  // --------------------------------------------------
  // seters
  setName(newName:string) {
    this.name = newName;
  }
  setAutor(newAutor:string) {
    this.autor = newAutor;
  }
  setDuration(newDuration:number) {
    this.duration = newDuration;
  }
  setGenres(newGenre:Genres[]) {
    this.genres = newGenre;
  }
  setSingle(newSingle:boolean) {
    this.single = newSingle;
  }
  setNumReproTotal(newNumReproTotal:number) {
    this.numReproTotal = newNumReproTotal;
  }
}
