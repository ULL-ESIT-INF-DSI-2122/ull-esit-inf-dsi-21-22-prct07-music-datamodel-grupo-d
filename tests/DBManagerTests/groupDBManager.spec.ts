import "mocha";
import { expect } from "chai";
import { loadGroupsFromDB, saveGroupsOnDB } from "../../src/DBManagers/groupDBManager";
import { allArtists, allGroups, allGroupsEmptys } from "./dataTests";

describe("Pruebas de la clase Group DB Manager.", () => {
  it("Guardar Grupos", () => {
    saveGroupsOnDB(allGroups);
  });
  it("Cargar Grupos.", () => {
    expect(loadGroupsFromDB(allArtists)).to.eql(allGroupsEmptys);
  });
});
