import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const dataCountries = require('C:\\Users\\asylk\\Desktop\\muze-backend\\prisma\\countries.json');
  const dataGenres = require('C:\\Users\\asylk\\Desktop\\muze-backend\\prisma\\genre.json');
  for (var i in dataCountries) {
    await prisma.country.upsert({
      create: {
        country_name: dataCountries[i],
      },
      where: {
        id: parseInt(i),
      },
      update: {},
    });
  }
  for (var i in dataGenres) {
    await prisma.genre.upsert({
      create: {
        genre_name: dataGenres[i],
      },
      where: {
        id: parseInt(i),
      },
      update: {},
    });
  }
  const allCountry = await prisma.country.findMany();
  const allGenre = await prisma.genre.findMany();
  console.log(allCountry);
  console.log(
    '---------------------------------------------------------------------------------------------------------------------------------------------------------',
  );
  console.log(allGenre);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
