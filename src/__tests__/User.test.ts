import request from 'supertest';
import { getConnection } from 'typeorm';
import {app} from '../app';
import createConnection from '../database'
describe("Users",async ()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async ()=>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create  a new User", async ()=>{
        const response = await request(app).post('/user').send({
            email: 'user@example.com',
            name:  'User example',
        }) ; 

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new User with exists  email", async ()=>{
        const response = await request(app).post('/user').send({
            email: 'user@example.com',
            name:  'User example',
        }) ; 

        expect(response.status).toBe(400);
    } );
             
});