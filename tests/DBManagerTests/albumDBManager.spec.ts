import "mocha";
import { expect } from "chai";
import { loadAlbumesFromDB, saveAlbumesOnDB } from "../../src/DBManagers/albumDBManager";
import { allSongs, allArtists, allGroups, allAlbumes } from "./dataTests";

describe("Pruebas de la clase Album DB Manager.", () => {
  it("Guardar Albumes", () => {
    saveAlbumesOnDB(allAlbumes);
  });
  it("Cargar Albumes.", () => {
    expect(loadAlbumesFromDB(allSongs, allArtists, allGroups)).to.eql(allAlbumes);
  });
});
