const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

import { Album } from "../album";
import { Artist } from "../artist";
import { Group } from "../group";
import { Song } from "../song";

import { loadSongsFromDB } from "./songDBManager";
import { loadArtistsFromDB } from "./artistDBManager";
import { loadGroupsFromDB } from "./groupDBManager";

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
          GroupOrArtist: album.getGroupOrArtist().getName(),
          year: album.getYear(),
          songs: [],
        })
        .write();

    album.getSongs().forEach((song: Song) => {
      db.get('Albumes')
          .find({name: album.getName()})
          .get('songs')
          .push(song.getName())
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
        GroupOrArtist: album.getGroupOrArtist().getName(),
        year: album.getYear(),
        songs: [],
      })
      .write();

  album.getSongs().forEach((song: Song) => {
    db.get('Albumes')
        .find({name: album.getName()})
        .get('songs')
        .push(song.getName())
        .write();
  });
}

/**
 * Tipo de dato que representa la Cancion
 * en la base de datos
 */
type albumJSON = {
  name: string,
  GroupOrArtist: string,
  year: Date,
  songs: string[]
}

/**
 * Carga los albumes guardadas
 * @returns Vector de albumes
 */
export function loadAlbumesFromDB(allSongs: Song[], allArtist: Artist[], allGroup: Group[]): Album[] {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Albumes.json');
  const db = low(adapter);

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
        if (songInAlbum === song.getName()) {
          songs.push(song);
          return 0;
        }
      });
    });

    let GroupOrArtist: Group | Artist = allArtist[0];
    let flagFind = false;
    allGroup.forEach((group: Group) => {
      if (group.getName() === album.GroupOrArtist) {
        GroupOrArtist = group;
        flagFind = true;
      }
    });

    if (!flagFind) {
      allArtist.forEach((artist: Artist) => {
        if (artist.getName() === album.GroupOrArtist) {
          GroupOrArtist = artist;
        }
      });
    }

    albumesResult.push(new Album(album.name, GroupOrArtist, new Date(album.year), songs));
  });

  return albumesResult;
}

// const songs: Song[] = loadSongsFromDB();
// const artists: Artist[] = loadArtistsFromDB();
// const groups: Group[] = loadGroupsFromDB();

// const albumes: Album[] = [new Album("Album 1", artists[0], new Date("1999-12-18"), [songs[0], songs[1]]),
//   new Album("Album 2", artists[1], new Date("2010-05-02"), [songs[1]])];

// saveAlbumsOnDB(albumes);
// addAlbumInDB(new Album("Album 3", groups[0], new Date("2000-10-24"), [songs[2]]));
// addAlbumInDB(new Album("Album 3", groups[0], new Date("2000-10-24"), [songs[2]]));

// console.log(loadAlbumesFromDB()[0]);
