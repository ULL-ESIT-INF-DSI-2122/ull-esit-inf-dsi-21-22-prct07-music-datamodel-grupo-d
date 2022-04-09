import "mocha";
import { expect } from "chai";
import { loadPlaylistsFromDB, savePlaylistsOnDB } from "../../src/DBManagers/playlistDBManager";
import { allSongs } from "./dataTests";
import { Playlist } from "../../src/playlist";

describe("Pruebas de la clase Playlist DB Manager.", () => {
  const allPlaylists: Playlist[] = [
    new Playlist("Playlist1", []),
    new Playlist("Playlist2", []),
    new Playlist("Playlist3", []),
  ];
  for (let i = 0; i <= 2; i++) {
    for (let j = i * 16; j <= i * 16 + 15; j++) {
      allPlaylists[i].addSong(allSongs[j]);
    }
  }
  it("Guardar Listas de musicas", () => {
    savePlaylistsOnDB(allPlaylists);
  });
  it("Cargar Listas de musicas.", () => {
    expect(loadPlaylistsFromDB(allSongs)).to.eql(allPlaylists);
  });
});
