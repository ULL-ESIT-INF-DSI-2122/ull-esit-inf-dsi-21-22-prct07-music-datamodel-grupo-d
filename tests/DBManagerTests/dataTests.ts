import { Album } from "../../src/album";
import { Artist } from "../../src/artist";
import { Group } from "../../src/group";
import { Song } from "../../src/song";

// Songs
export const allSongs: Song[] = [
  // Pop
  new Song("Dirty Diana", "Michael Jackson", 305, ["pop"], true, 155000000),
  new Song("Human nature", "Michael Jackson", 204, ["pop"], true, 135000000),
  new Song("Black or white", "Michael Jackson", 199, ["pop"], true, 85000000),
  new Song("Thriller", "Michael Jackson", 822, ["pop"], true, 500000000),
  new Song("Beat it", "Michael Jackson", 300, ["pop"], true, 235000000),
  // Heavy
  new Song("Angie", "Te Rolling Stones", 279, ["heavy"], false, 56000000),
  new Song("Miss You", "The Rolling Stones", 330, ["heavy"], false, 14000000),
  new Song("Brown Sugar", "The Rolling Stones", 202, ["heavy"], false, 7000000),
  new Song("Wild Horses", "The Rolling Stones", 348, ["heavy"], false, 22000000),
  new Song("Star Star", "The Rolling Stones", 265, ["heavy"], false, 1000000),
  // Rock
  new Song("That’s All Right", "Elvis Presley", 117, ["rock"], true, 150000000),
  new Song("Always On My Mind", "Elvis presley", 319, ["rock"], true, 120000000),
  new Song("Suspicious Minds", "Elvis Presley", 274, ["rock"], true, 190000000),
  new Song("Viva Las Vegas", "Elvis Presley", 189, ["rock"], true, 900000000),
  new Song("Heartbreak Hotel", "Elvis Presley", 129, ["rock"], true, 100000000),
  // Funk
  new Song("I Feel Good", "James Brown", 165, ["funk"], true, 80000000),
  new Song("Try Me", "James Brown", 149, ["funk"], true, 38000000),
  new Song("The Boss", "James Brown", 195, ["funk"], true, 11000000),
  new Song("The Payback", "James Brown", 457, ["funk"], true, 19000000),
  new Song("Soul Power", "James Brown", 494, ["funk"], true, 8000000),
  // Musica disco
  new Song("Treat Her Like A Lady", "The temptations", 282, ["musica disco"], false, 2000000),
  new Song("My Girl", "The temptations", 180, ["musica disco"], false, 9000000),
  new Song("Get Ready", "The temptations", 154, ["musica disco"], false, 7000000),
  new Song("Stay", "The temptations", 287, ["musica disco"], false, 3000000),
  new Song("Lady Soul", "The temptations", 303, ["musica disco"], false, 2000000),
  // Soul
  new Song("Paper Doll", "The Mills Brothers", 170, ["soul"], false, 2000000),
  new Song("Standing On The Corner ", "The Mills Brothers", 136, ["soul"], false, 2000000),
  new Song("Yellow Bird", "The Mills Brothers", 152, ["soul"], false, 2000000),
  new Song("Honeysuckle Rose", "The Mills Brothers", 186, ["soul"], false, 2000000),
  new Song("You Always Hurt The One You Love", "The Mills Brothers", 201, ["soul"], false, 2000000),
  // jazz
  new Song("Hello, Dolly!", "Louis Armstrong", 368, ["jazz"], true, 11000000),
  new Song("We Have All The Time In The World", "Louis Armstrong", 194, ["jazz"], true, 5000000),
  new Song("What A Wonderful World", "Louis Armstrong", 149, ["jazz"], true, 41000000),
  new Song("When It's Sleepy Time Down South", "Louis Armstrong", 215, ["jazz"], true, 1000000),
  new Song("When The Saints Go Marching In", "Louis Armstrong", 286, ["jazz"], true, 27000000),
  // Musica Clásica
  new Song("Elvira Madigan", "Wolfgang Amadeus Mozart", 403, ["musica clasica"], true, 2000000),
  new Song("La Clemenza di Tito", "Wolfgang Amadeus Mozart", 295, ["musica clasica"], true, 1000000),
  new Song("The Marriage of Figaro Overture", "Wolfgang Amadeus Mozart", 267, ["musica clasica"], true, 600000),
  new Song("Réquiem", "Wolfgang Amadeus Mozart", 533, ["musica clasica"], true, 210400000),
  new Song("Turkish March", "Wolfgang Amadeus Mozart", 403, ["musica clasica"], true, 1700000),
  // Country
  new Song("Dogs of war", "Blues Saraceno", 287, ["country"], false, 33000000),
  new Song("Derriver", "Blues Saraceno", 564, ["country"], false, 210000000),
  new Song("Grave digger", "Blues Saraceno", 444, ["country"], false, 12000000),
  new Song("Carry me back home", "Blues Saraceno", 507, ["country"], false, 11000000),
  new Song("The devil you know", "Blues Saraceno", 269, ["country"], false, 25000000),
  // Reguae
  new Song("Here comes the sun", "The Beatles", 192, ["reguae"], false, 70000000),
  new Song("Hey Jude", "The Beatles", 487, ["reguae"], false, 1200000000),
  new Song("Let it be", "The Beatles", 244, ["reguae"], false, 560000000),
  new Song("Something", "The Beatles", 188, ["reguae"], false, 645000000),
  new Song("In My Life", "The Beatles", 147, ["reguae"], false, 234000000),
];

// Artist
export const allArtists: Artist[] = [
  new Artist("Michael Jackson", [allSongs[0], allSongs[1], allSongs[2], allSongs[3], allSongs[4]], 15645132),
  new Artist("Elvis Presley", [allSongs[10], allSongs[11], allSongs[12], allSongs[13], allSongs[14]], 65465461),
  new Artist("James Brown", [allSongs[15], allSongs[16], allSongs[17], allSongs[18], allSongs[19]], 12893213),
  new Artist("Louis Armstrong", [allSongs[30], allSongs[31], allSongs[32], allSongs[33], allSongs[34]], 57554452),
  new Artist("Wolfgang Amadeus Mozart", [allSongs[35], allSongs[36], allSongs[37], allSongs[38], allSongs[39]], 57786452),
  // Artist in Groups
  // Blues Saraceno
  new Artist("Richie Kotzen", [], 4984651),
  new Artist("Bobby Dall", [], 4984651),
  // The Mills Brothers
  new Artist("Harry Mills", [], 4984651),
  new Artist("John Mills Jr.", [], 4984651),
  // The temptations
  new Artist("Paul Williams", [], 4984651),
  new Artist("David Ruffin", [], 4984651),
  // The Rolling Stones
  new Artist("Mick Jagger", [], 4984651),
  new Artist("Keith Richards", [], 4984651),
  // The Beatles
  new Artist("John Lennon", [], 4984651),
  new Artist("Paul McCartney", [], 4984651),
];

// Groups
export const allGroups: Group[] = [
  new Group("Blues Saraceno", [allArtists[5], allArtists[6]], new Date("2019"), 576452),
  new Group("The Mills Brothers", [allArtists[7], allArtists[8]], new Date("1928"), 927362),
  new Group("The temptations", [allArtists[9], allArtists[10]], new Date("1980"), 828291),
  new Group("Te Rolling Stones", [allArtists[11], allArtists[12]], new Date("1970"), 6456561),
  new Group("The Beatles", [allArtists[13], allArtists[14]], new Date("1960"), 15645132),
];

// Albumes
export const allAlbumes: Album[] = [
  new Album("Thriller", allArtists[0], new Date("1982"), [allSongs[3], allSongs[1]]),
  new Album("Bad", allArtists[0], new Date("1987"), [allSongs[2], allSongs[0], allSongs[4]]),
  new Album("Never look back", allGroups[0], new Date("1999"), [allSongs[40], allSongs[41], allSongs[42], allSongs[43]]),
  new Album("Hey Jude", allGroups[4], new Date("1968"), [allSongs[49], allSongs[48], allSongs[47]]),
  new Album("The Very Best of the Mills Brothers", allGroups[1], new Date("1977"), [allSongs[25], allSongs[26], allSongs[27], allSongs[28], allSongs[29]]),
];
