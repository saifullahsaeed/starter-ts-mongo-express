//configration filr for the application
export const config = {
    database: 'mongodb://localhost:27017/meanstack',
    port: process.env.PORT || 3000,
    secret: 'meanstacksecret'
}