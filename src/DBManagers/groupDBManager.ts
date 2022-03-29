const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/database/Groups.json');
const db = low(adapter);

import { Artist } from "../artist";
import { Group } from "../group";

/**
 * Guarda lo que recibe como parametro
 * @param groups Vector de Grupos a guardar
 */
export function saveGroupsOnDB(groups: Group[]): void {
  // Añade todo el vector de Grupos
  groups.forEach((group: Group) => {
    addGroupToDB(group);
  });
}

/**
 * Añade lo que recibe como parametro
 * @param group Grupo a guardar
 */
export function addGroupToDB(group: Group): void {
  // Inicializa el fichero
  db.defaults({Groups: []})
      .write();

  // Evita que se guarden datos duplicados
  db.get('Groups')
      .remove({name: group.getName()})
      .write();

  // Añade el Grupo
  db.get('Groups')
      .push({
        name: group.getName(),
        artists: [],
        year: group.getYear(),
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
 * Tipo de dato que representa el Grupo
 * en la base de datos
 */
type GroupJSON = {
  name: string,
  artists: string[],
  year: Date,
  listeners: number
}

/**
 * Carga los Grupos guardados
 * @param allArtist Todos los Artistas
 * @returns Vector de Grupos
 */
export function loadGroupsFromDB(allArtist: Artist[]): Group[] {
  // Cargo los datos del fichero
  const groupsJSON: GroupJSON[] = db.get('Groups').write();
  const groupsResult: Group[] = [];

  groupsJSON.forEach((group: GroupJSON) => {
    // Populate Artists
    const artists: Artist[] = [];
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
