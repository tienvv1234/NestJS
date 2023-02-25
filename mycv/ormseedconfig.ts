import { DataSource, DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: false,
    // migrationsRun: true,
    // migrations: [__dirname + '/src/migrations/*.{ts,js}'],
    // entities: [__dirname + '**/*.entity.{ts,js}'],
    entities: [__dirname + '**/*.entity.ts', __dirname + '**/*.entity.js'],
    migrations: [__dirname + '/seeds/**/*.ts', __dirname + '/seeds/**/*.js'],

    logging: ['query', 'error'],
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            database: 'db.sqlite',
            type: 'sqlite',
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            database: 'test.sqlite',
            type: 'sqlite',
        });
    case 'production':
        break;
    default:
        throw new Error('NODE_ENV is not set');
}

const dataSource = new DataSource(dbConfig);
export default dataSource;
