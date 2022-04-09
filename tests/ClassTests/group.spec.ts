import "mocha";
import { expect } from "chai";
import { Song } from "../../src/song";
import { Artist } from "../../src/artist";
import { Group } from "../../src/group";
import { Album } from "../../src/album";

describe("Pruebas de la clase Group.", () => {
  const HeyJude = new Song("Hey Jude", "The Beatles", 487, ["reguae"], false, 1200000000);
  const JohnLennon = new Artist("John Lennon", [HeyJude], 15645132);
  const TheBeatles: Group = new Group("The Beatles", [JohnLennon], new Date("1998"), 1);
  const tmpAlbum: Album = new Album("Album Prueba", TheBeatles, new Date("1998"), [HeyJude]);
  it("Pruebas exitencia clase Grupo", () => {
    expect(TheBeatles).not.be.null;
  });
  it("Prueba de los setters.", () => {
    TheBeatles.setName("The Beatles");
    TheBeatles.setArtist([JohnLennon]);
    TheBeatles.setYear(new Date("1997"));
    TheBeatles.setListeners(100);
  });
  it("Pruebas Getters.", () => {
    expect(TheBeatles.getName()).to.eql("The Beatles");
    expect(TheBeatles.getArtist()).to.eql([JohnLennon]);
    expect(TheBeatles.getYear()).to.eql(new Date("1997"));
    expect(TheBeatles.getAlbum()).to.eql([tmpAlbum]);
    expect(TheBeatles.getListeners()).to.eql(100);
    expect(TheBeatles.getGenres()).to.eql(["reguae"]);
  });
  it("Otros Metodos", () => {
    TheBeatles.setArtist([]);
  });
});
