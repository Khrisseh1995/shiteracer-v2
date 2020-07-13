import request from 'supertest';
import {app} from '../../app';

it('Returns a 201 on successful sign up', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('It returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalid',
            password: 'password'
        })
        .expect(400, {
            errors: [
                {message: 'Email must be valid', field: 'email'}
            ]
        })
});

it('It returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'asd'
        })
        .expect(400, {
            errors: [
                {message: 'Password must be between 4 and 20', field: 'password'}
            ]
        })
});

it('Returns a 400 when missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);

});

it('Disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('Sets cookie after succesful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});