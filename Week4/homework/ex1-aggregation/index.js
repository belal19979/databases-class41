const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const csvtojson = require('csvtojson');

dotenv.config();
const db = 'databaseWeek4';
const collection = 'Population';
const client = new MongoClient(process.env.MONGODB_URL);

async function main() {
  try {
    await client.connect();
    console.log('Connected');
    await importData(client);
    await getTotalPopulationByYear(client, 'Netherlands');
    await getContinentInformation(client, '100+', '2020');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

const importData = async (client) => {
  const populationJsonData = await csvtojson().fromFile(
    'population_pyramid_1950-2022.csv',
  );
  await client.db(db).collection(collection).deleteMany();
  const result = await client
    .db(db)
    .collection(collection)
    .insertMany(populationJsonData);
};

//Write a function that will return the array of the total population (M + F over all age groups) for a given Country per year.

async function getTotalPopulationByYear(client, country) {
  const pipeline = [
    {
      $match: { Country: country },
    },
    {
      $group: {
        _id: '$Year',
        countPopulation: {
          $sum: { $add: [{ $toInt: '$M' }, { $toInt: '$F' }] },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];

  const cursor = await client.db(db).collection(collection).aggregate(pipeline);

  await cursor.forEach((result) => {
    console.log(result);
  });
}

//Write a function that will return all of the information of each continent for a given Year and Age field but add a new field TotalPopulation that will be the addition of M and F.

async function getContinentInformation(client, age, year) {
  const pipeline = [
    {
      $match: {
        Country: {
          $in: [
            'AFRICA',
            'ASIA',
            'EUROPE',
            'LATIN AMERICA AND THE CARIBBEAN',
            'NORTHERN AMERICA',
            'OCEANIA',
          ],
        },
        Year: year,
        Age: age,
      },
    },

    {
      $addFields: {
        TotalPopulation: {
          $add: [{ $toInt: '$M' }, { $toInt: '$F' }],
        },
      },
    },
  ];
  const cursor = await client.db(db).collection(collection).aggregate(pipeline);

  await cursor.forEach((result) => {
    console.log(result);
  });
}

main();
