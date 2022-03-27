const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

import { Artist } from "../artist";
import { Group } from "../group";

import { loadArtistsFromDB } from "./artistDBManager";

/**
 * Guarda lo que recibe como parametro borrando lo que estaba
 * @param groups Vector de grupos a guardar
 */
export function saveGroupsOnDB(groups: Group[]): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Groups.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Groups: []})
      .write();

  // Borra todo lo que tiene dentro
  db.get('Groups')
      .remove()
      .write();

  // Añade todo el vector de grupos
  groups.forEach((group: Group) => {
    db.get('Groups')
        .remove({name: group.getName()})
        .write();

    db.get('Groups')
        .push({
          name: group.getName(),
          artists: [],
          year: group.getCreationYear(),
          listeners: group.getListeners(),
        })
        .write();

    group.getArtist().forEach((artist: Artist) => {
      db.get('Groups')
          .find({name: group.getName()})
          .get('artists')
          .push(artist.getName())
          .write();
    });
  });
}

/**
 * Añade lo que recibe como parametro
 * @param group Grupo a guardar
 */
export function addGroupInDB(group: Group): void {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Groups.json');
  const db = low(adapter);

  // Inicializa el fichero
  db.defaults({Groups: []})
      .write();

  // Borra el album que esta, para añadir el nuevo
  // en caso que sea el mimso album
  db.get('Groups')
      .remove({name: group.getName()})
      .write();

  db.get('Groups')
      .push({
        name: group.getName(),
        artists: [],
        year: group.getCreationYear(),
        listeners: group.getListeners(),
      })
      .write();

  group.getArtist().forEach((artist: Artist) => {
    db.get('Groups')
        .find({name: group.getName()})
        .get('artists')
        .push(artist.getName())
        .write();
  });
}

/**
 * Tipo de dato que representa la Playlist
 * en la base de datos
 */
type groupJSON = {
  name: string,
  artists: string[],
  year: Date,
  listeners: number
}

/**
 * Carga los artistas guardados
 * @returns Vector de artistas
 */
export function loadGroupsFromDB(allArtist: Artist[]): Group[] {
  // Fichero en el que se trabaja
  const adapter = new FileSync('src/database/Groups.json');
  const db = low(adapter);

  // Metes toda la informacion dentro
  const groupsJSON = db.get('Groups').write();
  const groupsResult: Group[] = [];

  groupsJSON.forEach((group: groupJSON) => {
    const artists: Artist[] = [];
    // Relaciono nombre de canciones de la playlist
    // con nombre de canciones de todas las canciones
    // y las guardo para luego añadirlas al playlist que retorno
    group.artists.forEach((artsitsInGroup: string) => {
      allArtist.forEach((artist: Artist) => {
        if (artsitsInGroup === artist.getName()) {
          artists.push(artist);
          return 0;
        }
      });
    });

    groupsResult.push(new Group(group.name, artists, group.year, group.listeners));
  });

  return groupsResult;
}

// const artists: Artist[] = loadArtistsFromDB();

// const groups: Group[] = [new Group("Grupo 1", [artists[1], artists[2]], new Date("1999"), 1245),
//   new Group("Grupo 2", [artists[0], artists[2]], new Date("1988"), 5454)];

// saveGroupsOnDB(groups);

// addGroupInDB(new Group("Grupo 3", artists, new Date("1950"), 874));

// console.log(loadGroupsFromDB());
// console.log(artists[0]);
