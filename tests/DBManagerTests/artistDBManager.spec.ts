import "mocha";
import { expect } from "chai";
import { loadArtistsFromDB, saveArtistsOnDB } from "../../src/DBManagers/artistDBManager";
import { allSongs, allArtists, allArtistsEmptys } from "./dataTests";

describe("Pruebas de la clase Artist DB Manager.", () => {
  it("Guardar Artistas", () => {
    saveArtistsOnDB(allArtists);
  });
  it("Cargar Artistas.", () => {
    expect(loadArtistsFromDB(allSongs)).to.eql(allArtistsEmptys);
  });
});
