import "mocha";
import { expect } from "chai";
import { Song } from "../../src/song";
import { Artist } from "../../src/artist";
import { Group } from "../../src/group";
import { Album } from "../../src/album";

describe("Pruebas de la clase Album.", () => {
  const HeyJude = new Song("Hey Jude", "The Beatles", 487, ["reguae"], false, 1200000000);
  const JohnLennon = new Artist("John Lennon", [HeyJude], 15645132);
  const TheBeatles: Group = new Group("The Beatles", [JohnLennon], new Date("1998"), 1);
  const Thriller: Album = new Album("Thriller", TheBeatles, new Date("1998"), [HeyJude]);
  it("Pruebas exitencia clase Album", () => {
    expect(Thriller).not.be.null;
  });
  it("Prueba de los setters.", () => {
    Thriller.setName("Thriller");
    Thriller.setGroupAndArtist(JohnLennon);
    Thriller.setYear(new Date("1998"));
    Thriller.setSongs([HeyJude]);
    Thriller.addSong(HeyJude);
  });
  it("Pruebas Getters.", () => {
    expect(Thriller.getName()).to.eql("Thriller");
    expect(Thriller.getGroupOrArtist()).to.eql(JohnLennon);
    Thriller.setGroupAndArtist(TheBeatles);
    expect(Thriller.getGroupOrArtist()).to.eql(TheBeatles);
    expect(Thriller.getYear()).to.eql(new Date("1998"));
    expect(Thriller.getGenres()).to.eql(["reguae"]);
    expect(Thriller.getSongs()).to.eql([HeyJude, HeyJude]);
  });
});
