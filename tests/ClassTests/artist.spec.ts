import "mocha";
import { expect } from "chai";
import { Song } from "../../src/song";
import { Artist } from "../../src/artist";
import { Group } from "../../src/group";
import { Album } from "../../src/album";

describe("Pruebas de la clase Artist.", () => {
  const BigInJapan = new Song("Big In Japan", "Alphaville", 232, ["rock"], true, 27097126);
  const MichaelJackson = new Artist("Michael Jackson", [BigInJapan], 15645132);
  const tmpGroup: Group = new Group("Grupo Prueba", [MichaelJackson], new Date("1998"), 1);
  const tmpAlbum: Album = new Album("Album Prueba", MichaelJackson, new Date("1998"), [BigInJapan]);
  it("Pruebas exitencia clase Artista", () => {
    expect(MichaelJackson).not.be.null;
  });
  it("Prueba de los setters.", () => {
    MichaelJackson.setName("Big In Japan");
    MichaelJackson.setSongs([BigInJapan]);
    MichaelJackson.setListeners(27097126);
  });
  it("Pruebas Getters.", () => {
    expect(MichaelJackson.getName()).to.eql("Big In Japan");
    expect(MichaelJackson.getGenres()).to.eql(["rock"]);
    expect(MichaelJackson.getAlbumes()).to.eql([tmpAlbum]);
    expect(MichaelJackson.getSongs()).to.eql([BigInJapan]);
    expect(MichaelJackson.getListeners()).to.eql(27097126);
    expect(MichaelJackson.totalListeners()).to.eql(27097127);
    expect(MichaelJackson.getGroups()).to.eql([tmpGroup]);
  });
  it("Otros Metodos", () => {
    MichaelJackson.removeGroup(new Group("", [], new Date("1999"), 1));
    MichaelJackson.removeAlbum(new Album("", tmpGroup, new Date("1999"), []));
  });
});
