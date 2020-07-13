import {app} from "../../app";
import {getAuthCookie} from "../../test/TestAuthHelper";
import request from 'supertest';

it('Responds with details about the current user', async () => {

    const cookie = await getAuthCookie();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it("Responds with null if not authenticated", async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send({})
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});