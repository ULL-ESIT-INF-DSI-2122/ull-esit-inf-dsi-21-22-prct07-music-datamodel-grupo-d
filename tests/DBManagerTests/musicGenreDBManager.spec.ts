import "mocha";
import { expect } from "chai";
import { loadMusicGenresFromDB, saveMusicGenresOnDB } from "../../src/DBManagers/musicGenreDBManager";
import { allSongs, allArtists, allGroups, allAlbumes } from "./dataTests";

describe("Pruebas de la clase MusicGenres DB Manager.", () => {
  it("Guardar Generos Musicales", () => {
    saveMusicGenresOnDB(loadMusicGenresFromDB(allSongs, allArtists, allGroups, allAlbumes));
  });
  it("Cargar Generos Musicales.", () => {
    expect(loadMusicGenresFromDB(allSongs, allArtists, allGroups, allAlbumes)).to.eql(loadMusicGenresFromDB(allSongs, allArtists, allGroups, allAlbumes));
  });
});
