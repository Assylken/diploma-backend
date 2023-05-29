import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPlays, UploadSongDto } from './dto';
import { ipfs_client } from 'utils/ipfs';
import { MusicContractAddress, MusicContractABI } from 'utils/constants';
import { ethers } from 'ethers';
const Web3 = require('web3');

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}
  async uploadSong(
    userId: number,
    dto: UploadSongDto,
    files: Array<Express.Multer.File>,
  ) {
    console.log(dto);
    console.log(files);

    const cid_image = await ipfs_client().add(files[1].buffer);
    const cid_audio = await ipfs_client().add(files[0].buffer);
    const song = await this.prisma.song.create({
      data: {
        name: dto.name,
        genreId: Number(dto.genreId),
        song_cid: cid_audio.path,
        image_cid: cid_image.path,
        userId: userId,
      },
    });
    return song;
  }

  async getCurrentPlays(songId: number) {
    const plays = await this.prisma.song.findMany({
      where: {
        id: Number(songId),
      },
      select: {
        currentPlays: true,
      },
    });
    var temp = 0;
    plays.map((value: any) => {
      temp = value.currentPlays;
    });
    return temp;
  }

  async getWallet(userId: any) {
    const wallet = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        wallet_address: true,
      },
    });

    const realWalletAddress = wallet['wallet_address'];
    return realWalletAddress;
  }

  async getArtistData(songId: number) {
    const res = await this.prisma.song.findMany({
      where: {
        id: Number(songId),
      },
      select: {
        userId: true,
      },
    });
    const walletRes = await this.getWallet(res[0]['userId']);
    return walletRes;
  }

  async getTotalPlays(songId: number) {
    const plays = await this.prisma.song.findMany({
      where: {
        id: Number(songId),
      },
      select: {
        plays: true,
      },
    });
    var temp = 0;
    plays.map((value: any) => {
      temp = value.plays;
    });
    return temp;
  }

  async addCurrentPlays(dto: AddPlays) {
    const currentPlays = await this.getCurrentPlays(dto.songId);
    if (currentPlays >= 10) {
      const totalPlays = await this.getTotalPlays(dto.songId);
      const currentPlays = await this.getCurrentPlays(dto.songId);
      if (totalPlays >= 100) {
        const artistWallet = await this.getArtistData(dto.songId);
        if (artistWallet !== null) {
          const web3 = new Web3(
            new Web3.providers.WebsocketProvider(
              'wss://ancient-holy-friday.matic-testnet.discover.quiknode.pro/6b012f0ec26e14f51b53f1a581a5205ed597024c/',
            ),
          );
          const options = {
            from: '0x7C2FE7825437b6CcdcE2364A58ADB295323384Ec', // replace with the sender's Ethereum address
            gas: 200000, // adjust the gas limit as per your requirements
            gasPrice: ethers.utils.parseUnits('10', 'gwei'), // adjust the gas price as per your requirements
          };
          const contract = new web3.eth.Contract(
            MusicContractABI,
            MusicContractAddress,
          );
          web3.eth.accounts.wallet.add(
            'f09b05efa6198a5a6a4373fea148bd3c9f79d67b44576ab48f0e34ecbbe97885',
          );
          const valter = contract.methods.calculateAmount(
            totalPlays,
            currentPlays,
            artistWallet,
          );
          contract.events
            .TokensSent()
            .on('data', function (event: any) {
              console.log(
                'Tokens sent to artist wallet:',
                event.returnValues.maticToken,
              );
              console.log('Amount sent:', event.returnValues.amount);
            })
            .on('error', console.error);

          valter
            .estimateGas(options)
            .then((estimatedGasLimit: any) => {
              options.gas = estimatedGasLimit;
              return valter.send(options);
            })
            .then((transaction: any) => {
              console.log('CHUL', transaction);

              console.log('Transaction hash:', transaction.hash);
            })
            .catch((error: any) => {
              console.error('ASIK', error);
            });
        }
      }
      this.addTotalPlays(dto.songId);
    }

    const song = await this.prisma.song.update({
      where: {
        id: Number(dto.songId),
      },
      data: {
        currentPlays: Number(currentPlays) + Number(dto.plays),
      },
    });
    return song;
  }
  async addTotalPlays(id: number) {
    const totalPlays = await this.getTotalPlays(id);
    const currentPlays = await this.getCurrentPlays(id);
    const song = await this.prisma.song.update({
      where: {
        id: Number(id),
      },
      data: {
        plays: Number(totalPlays) + Number(currentPlays),
        currentPlays: 0,
      },
    });
    return song;
  }

  async getAllSongs() {
    const songs = await this.prisma.song.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return songs;
  }

  async getPopularSongs() {
    const songs = await this.prisma.song.findMany({
      orderBy: {
        currentPlays: 'asc',
      },
      take: 4,
    });
    return songs;
  }

  async getSong(userId: number) {
    const song = await this.prisma.song.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return song;
  }

  async getSongsNumber(userId: number) {
    console.log('WASDL');

    const songNumber = await this.prisma.song.aggregate({
      where: {
        userId: Number(userId),
      },
      _count: {
        id: true,
      },
    });
    return songNumber;
  }

  async getSongsUser(userId: number) {
    const song = await this.prisma.song.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        id: 'desc',
      },
    });
    return song;
  }

  async getGenre(id: number) {
    const genre = await this.prisma.genre.findFirst({
      where: {
        id: id,
      },
    });
    return genre.genre_name;
  }
}
