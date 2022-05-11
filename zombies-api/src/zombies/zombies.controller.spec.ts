import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { ZombiesController } from 'src/zombies/zombies.controller';
import { ZombiesService } from 'src/zombies/zombies.service';

const zombies = [
  {
    id: '1',
    zombieName: 'TestZombie1',
    creationDate: '2000-01-01',
  },
  {
    id: '2',
    zombieName: 'TestZombie2',
    creationDate: '2000-01-02',
  },
  {
    id: '3',
    zombieName: 'TestZombie3',
    creationDate: '2000-01-03',
  },
];

describe('ZombiesController', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const zombiesTestModule: TestingModule = await Test.createTestingModule({
      controllers: [ZombiesController],
      providers: [
        {
          provide: ZombiesService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(zombies),
            getById: jest.fn().mockResolvedValue((id: string) => Promise.resolve({ id, zombieName: 'TestZombie1', creationDate: '2000-01-03'})),
            getItemsById: jest.fn().mockResolvedValue((id: string) => Promise.resolve({ id, itemName: 'TestZombie1', price: 10})),
            getZombieItemsTotalValue : jest.fn().mockResolvedValue(5)
          },
        },
      ],
    }).compile();

    app = zombiesTestModule.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('getZombies', () => {
    it('should be 200 OK', async () => {
      await app
        .inject({
          method: 'GET',
          url: '/zombies',
        })
        .then((result) => {
          expect(result.statusCode).toEqual(200);
        });
    });
  });

  describe('getZombieById', () => {
    it('should be 200 OK', async () => {
      await app
        .inject({
          method: 'GET',
          url: '/zombies/1',
        })
        .then((result) => {
          expect(result.statusCode).toEqual(200);
        });
    });
  });

  describe('getZombgetItemsFromZombieieById', () => {
    it('should be 200 OK', async () => {
      await app
        .inject({
          method: 'GET',
          url: '/zombies/getItems/1',
        })
        .then((result) => {
          expect(result.statusCode).toEqual(200);
        });
    });
  });

  describe('getZombieItemsTotalValue', () => {
    it('should be 200 OK', async () => {
      await app
        .inject({
          method: 'GET',
          url: '/zombies/getItemsTotalValue/1',
        })
        .then((result) => {
          expect(result.statusCode).toEqual(200);
        });
    });
  });
});
