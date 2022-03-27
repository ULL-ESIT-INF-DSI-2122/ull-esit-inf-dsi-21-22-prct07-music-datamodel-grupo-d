import { Album } from "../album";
import { Artist } from "../artist";
import { Group } from "../group";
import { Playlist } from "../playlist";
import { Song } from "../song";

import { loadAlbumesFromDB } from "./albumDBManager";
import { loadArtistsFromDB } from "./artistDBManager";
import { loadGroupsFromDB } from "./groupDBManager";
import { loadPlaylistsFromDB } from "./playlistDBManager";
import { loadSongsFromDB } from "./songDBManager";

const songs: Song[] = loadSongsFromDB();
const playlists: Playlist[] = loadPlaylistsFromDB(songs);
const artists: Artist[] = loadArtistsFromDB(songs);
const groups: Group[] = loadGroupsFromDB(artists);
const albumes: Album[] = loadAlbumesFromDB(songs, artists, groups);

console.log("----- Songs -----");
console.log(songs);
console.log("----- PlayLists -----");
console.log(playlists);
console.log("----- Artists -----");
console.log(artists);
console.log("----- Groups -----");
console.log(groups);
console.log("----- Albumes -----");
console.log(albumes);
