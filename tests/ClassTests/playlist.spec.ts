import "mocha";
import { expect } from "chai";
import { Song } from "../../src/song";
import { Playlist } from "../../src/playlist";

describe("Pruebas de la clase Playlist.", () => {
  const allSongs: Song[] = [
    new Song("Dirty Diana", "Michael Jackson", 305, ["pop"], true, 155000000),
    new Song("Human nature", "Michael Jackson", 204, ["pop"], true, 135000000),
    new Song("Black or white", "Michael Jackson", 199, ["pop"], true, 85000000),
    new Song("Thriller", "Michael Jackson", 822, ["pop"], true, 500000000),
    new Song("Beat it", "Michael Jackson", 300, ["pop"], true, 235000000),
  ];
  const playlist1: Playlist = new Playlist("Playlist 1", allSongs);
  it("Pruebas exitencia clase Listas de Canciones", () => {
    expect(playlist1).not.be.null;
  });
  it("Prueba de los setters.", () => {
    playlist1.setName("Playlist Pop");
    playlist1.setSongs([allSongs[0], allSongs[1]]);
    playlist1.addSong(allSongs[4]);
    playlist1.removeSong(allSongs[4]);
    playlist1.removeSong(allSongs[3]);
  });
  it("Pruebas Getters.", () => {
    expect(playlist1.getName()).to.eql("Playlist Pop");
    expect(playlist1.getSongs()).to.eql([allSongs[0], allSongs[1]]);
    expect(playlist1.getDuration()).to.eql(509);
    expect(playlist1.getGenres()).to.eql(["pop"]);
  });
});
