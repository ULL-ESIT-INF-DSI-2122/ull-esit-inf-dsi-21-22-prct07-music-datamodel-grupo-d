import "mocha";
import { expect } from "chai";
import { Song } from "../src/song";

describe("Pruebas de la clase Songs.", () => {
  describe("Pruebas básicas de la clase", () => {
    const BigInJapan = new Song("Big In Japan", "Alphaville", 232, ["rock"], true, 27097126);
    it("Pruebas exitencia clase Series", () => {
      expect(BigInJapan).not.be.null;
    });
    it("Prueba de los setters.", () => {
      BigInJapan.setName("Big In Japan");
      BigInJapan.setAutor("Alphaville");
      BigInJapan.setDuration(232);
      BigInJapan.setGenres(["rock"]);
      BigInJapan.setSingle(true);
      BigInJapan.setNumReproTotal(27097126);
    });
    it("Pruebas Getters.", () => {
      expect(BigInJapan.getName()).to.eql("Big In Japan");
      expect(BigInJapan.getAutor()).to.eql("Alphaville");
      expect(BigInJapan.getDuration()).to.eql(232);
      expect(BigInJapan.getGenres()).to.eql(["rock"]);
      expect(BigInJapan.getSingle()).to.eql(true);
      expect(BigInJapan.getNumReproTotal()).to.eql(27097126);
    });
  });
});
