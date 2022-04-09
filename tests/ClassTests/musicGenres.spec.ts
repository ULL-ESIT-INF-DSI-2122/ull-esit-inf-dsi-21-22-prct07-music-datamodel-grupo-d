import "mocha";
import { expect } from "chai";
import { Song } from "../../src/song";
import { Artist } from "../../src/artist";
import { Group } from "../../src/group";
import { Album } from "../../src/album";
import { MusicGenre } from "../../src/musicGenre";

describe("Pruebas de la clase MusicGenres.", () => {
  const HeyJude = new Song("Hey Jude", "The Beatles", 487, ["reguae"], false, 1200000000);
  const JohnLennon = new Artist("John Lennon", [HeyJude], 15645132);
  const TheBeatles: Group = new Group("The Beatles", [JohnLennon], new Date("1998"), 1);
  const Thriller: Album = new Album("Thriller", TheBeatles, new Date("1998"), [HeyJude]);
  const Reguae: MusicGenre = new MusicGenre("reguae", [HeyJude], [JohnLennon], [TheBeatles], [Thriller]);
  it("Pruebas exitencia clase Generos Musicales", () => {
    expect(Reguae).not.be.null;
  });
  it("Prueba de los setters.", () => {
    Reguae.setGenre("reguae");
    Reguae.setArtists([JohnLennon]);
    Reguae.setGroups([TheBeatles, new Group("", [], new Date("1999"), 1)]);
    Reguae.setAlbumes([Thriller]);
    Reguae.setSongs([HeyJude]);
  });
  it("Pruebas Getters.", () => {
    expect(Reguae.getGenre()).to.eql("reguae");
    expect(Reguae.getGroups()).to.eql([TheBeatles]);
    expect(Reguae.getArtists()).to.eql([JohnLennon]);
    expect(Reguae.getAlbums()).to.eql([Thriller]);
    expect(Reguae.getSongs()).to.eql([HeyJude]);
  });
});
