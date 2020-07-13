import request from 'supertest';
import {app} from "../../app";

it('Fails when non-existent email', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(400);
});

it("Fails with incorrect password", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '123'
        })
        .expect(400);
});

it('Test successful sign in', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});