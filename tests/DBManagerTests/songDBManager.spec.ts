import "mocha";
import { expect } from "chai";
import { loadSongsFromDB, saveSongsOnDB } from "../../src/DBManagers/songDBManager";
import { allSongs } from "./dataTests";

describe("Pruebas de la clase Song DB Manager.", () => {
  it("Guardar Canciones", () => {
    saveSongsOnDB(allSongs);
  });
  it("Cargar Canciones.", () => {
    expect(loadSongsFromDB()).to.eql(allSongs);
  });
});
