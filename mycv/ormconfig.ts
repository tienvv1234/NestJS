export = {
    type: 'sqlite',
    database: 'db.sqlite',
    entities:
        process.env.NODE_ENV === 'production'
            ? ['**/*.entity.js']
            : ['**/*.entity.ts'],
    synchronize: false,
};
// this will lead to an error
// because the syntax is in typescript and this will be compiled to javascript
// so the code will be wrong
// in dist folder, the code will be wrong
