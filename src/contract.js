const Web3 = require('web3');
const contract = require('@truffle/contract');
const axios = require('axios');
const contractJson = require('./smart-contract/build/contracts/MusicStreamingContract.json');

const provider = new Web3.providers.HttpProvider(
  'https://ancient-holy-friday.matic-testnet.discover.quiknode.pro/d0486e7c3fd728f0cbf467ee383e31f10225e97b/',
);
const web3 = new Web3(provider);

const MusicStreamingContract = contract(contractJson);
MusicStreamingContract.setProvider(provider);

const contractAddress = '<CONTRACT_ADDRESS>';

async function fetchArtistSongs(artistId) {
  try {
    // Fetch artist songs from the backend API
    const response = await axios.get(
      `http://localhost:3333/songs/getSongsUser/${artistId}`,
    );
    const songs = response.data;
    console.log('songs', songs);
    // Transform the song data for contract interaction
    const songIds = songs.map((song) => song.id);
    const songPlays = songs.map((song) => song.plays);

    // Instantiate the contract and call the updateArtistSongs function
    const instance = await MusicStreamingContract.at(contractAddress);
    await instance.updateArtistSongs(artistId, songIds, songPlays);

    console.log('Artist songs updated successfully.');
  } catch (error) {
    console.error('Error updating artist songs:', error);
  }
}

// Example usage:
fetchArtistSongs(1);
