const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

import { Album } from "../album";
import { genres } from "../musicGenre";
import { Song } from "../song";


import { loadSongsFromDB } from "./songDBManager";

/**
 * Guarda lo que recibe como parametro borrando lo que estaba
 * @param albumes Vector de albumes a guardar
 */
export function saveAlbumsOnDB(albumes: Album[]): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Albumes.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Albumes: []})
      .write();

  // Borra todo lo que tiene dentro
  db.get('Albumes')
      .remove()
      .write();

  // Añade todo el vector de albumes
  albumes.forEach((album: Album) => {
    db.get('Albumes')
        .remove({name: album.getName()})
        .write();

    db.get('Albumes')
        .push({
          name: album.getName(),
          nameGroupAndArtist: album.getNameGroupAndArtist(),
          year: album.getYear(),
          genres: [],
          songs: [],
        })
        .write();

    album.getGenres().forEach((genre: string) => {
      db.get('Albumes')
          .find({name: album.getName()})
          .get('genres')
          .push(genre)
          .write();
    });

    album.getSongs().forEach((song: Song) => {
      db.get('Albumes')
          .find({name: album.getName()})
          .get('songs')
          .push(song.getSongName())
          .write();
    });
  });
}


/**
 * Añade lo que recibe como parametro
 * @param album Album a guardar
 */
export function addAlbumInDB(album: Album): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Albumes.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Albumes: []})
      .write();

  // Borra el album que esta, para añadir el nuevo
  // en caso que sea el mimso album
  db.get('Albumes')
      .remove({name: album.getName()})
      .write();

  // Añade el album
  db.get('Albumes')
      .push({
        name: album.getName(),
        nameGroupAndArtist: album.getNameGroupAndArtist(),
        year: album.getYear(),
        genres: [],
        songs: [],
      })
      .write();

  album.getGenres().forEach((genre: string) => {
    db.get('Albumes')
        .find({name: album.getName()})
        .get('genres')
        .push(genre)
        .write();
  });

  album.getSongs().forEach((song: Song) => {
    db.get('Albumes')
        .find({name: album.getName()})
        .get('songs')
        .push(song.getSongName())
        .write();
  });
}


const songs: Song[] = loadSongsFromDB();
const albumes: Album[] = [new Album("Album 1", "Artista 1", new Date("1999-12-18"), ["funk", "jazz"], [songs[0]]),
  new Album("Album 2", "Artista 2", new Date("2010-05-02"), ["funk"], [songs[1]])];

saveAlbumsOnDB(albumes);
addAlbumInDB(new Album("Album 3", "Grupo 3", new Date("2000-10-24"), ["musica disco"], [songs[2]]));
addAlbumInDB(new Album("Album 3", "Grupo 3", new Date("2000-10-24"), ["musica disco"], [songs[2]]));


/**
 * Tipo de dato que representa la Cancion
 * en la base de datos
 */
type albumJSON = {
  name: string,
  nameGroupAndArtist: string,
  year: Date,
  genres: genres[],
  songs: string[]
}

/**
 * Carga los albumes guardadas
 * @returns Vector de albumes
 */
export function loadAlbumesFromDB(): Album[] {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Albumes.json');
  const db = low(adapter);

  // Todas las canciones existentes
  // para hacer las relaciones
  const allSongs: Song[] = loadSongsFromDB();

  // Metes toda la informacion dentro
  const albumesJSON = db.get('Albumes').write();
  const albumesResult: Album[] = [];

  albumesJSON.forEach((album: albumJSON) => {
    const songs: Song[] = [];
    // Relaciono nombre de cnaciones del album
    // con nombre de canciones de todas las canciones
    // y las guardo para luego añadirlas al album que retorno
    album.songs.forEach((songInAlbum: string) => {
      allSongs.forEach((song: Song) => {
        if (songInAlbum === song.getSongName()) {
          songs.push(song);
          return 0;
        }
      });
    });

    albumesResult.push(new Album(album.name, album.nameGroupAndArtist, new Date(album.year), album.genres, songs));
  });

  return albumesResult;
}

console.log(loadAlbumesFromDB()[0]);
