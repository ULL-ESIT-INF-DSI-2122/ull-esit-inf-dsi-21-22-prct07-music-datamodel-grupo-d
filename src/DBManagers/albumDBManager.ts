const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/database/Albumes.json');
const db = low(adapter);

import { Album } from "../album";
import { Artist } from "../artist";
import { Group } from "../group";
import { Song } from "../song";

/**
 * Guarda lo que recibe como parametro
 * @param albumes Vector de Albumes a guardar
 */
export function saveAlbumesOnDB(albumes: Album[]): void {
  // Añade todo el vector de Albumes
  albumes.forEach((album: Album) => {
    addAlbumToDB(album);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param album Album a guardar
 */
export function addAlbumToDB(album: Album): void {
  // Inicializa el fichero
  db.defaults({Albumes: []})
      .write();

  // Evita que se guarden datos duplicados
  db.get('Albumes')
      .remove({name: album.getName()})
      .write();

  // Añade el Album
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
 * Tipo de dato que representa el Album
 * en la base de datos
 */
type AlbumJSON = {
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
  // Inicializa el fichero
  db.defaults({Albumes: []})
      .write();

  // Cargo los datos del fichero
  const albumesJSON: AlbumJSON[] = db.get('Albumes').write();
  const albumesResult: Album[] = [];

  albumesJSON.forEach((album: AlbumJSON) => {
    // Populate Songs
    const songs: Song[] = [];
    album.songs.forEach((songInAlbum: string) => {
      allSongs.forEach((song: Song) => {
        if (songInAlbum === song.getName()) {
          songs.push(song);
          return 0;
        }
      });
    });

    // Populate Groups or Artists
    let GroupOrArtist: Group | Artist = allArtist[0];
    let flagFound = false;
    allGroup.forEach((group: Group) => {
      if (group.getName() === album.GroupOrArtist) {
        GroupOrArtist = group;
        flagFound = true;
      }
    });

    if (!flagFound) {
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
