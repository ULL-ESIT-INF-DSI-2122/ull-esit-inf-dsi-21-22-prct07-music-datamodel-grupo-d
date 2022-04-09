import "mocha";
import { expect } from "chai";
import { loadMusicGenresFromDB, saveMusicGenresOnDB } from "../../src/DBManagers/musicGenreDBManager";
import { allSongs, allArtists, allGroups, allAlbumes } from "./dataTests";

describe("Pruebas de la clase Artist DB Manager.", () => {
  it("Guardar Artistas", () => {
    saveMusicGenresOnDB(loadMusicGenresFromDB(allSongs, allArtists, allGroups, allAlbumes));
  });
  it("Cargar Artistas.", () => {
    expect(loadMusicGenresFromDB(allSongs, allArtists, allGroups, allAlbumes)).to.eql(loadMusicGenresFromDB(allSongs, allArtists, allGroups, allAlbumes));
  });
});
