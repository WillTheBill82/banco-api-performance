import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    iterations: 10,
}; 

export default function () {
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify({
        username: 'julio.lima',
        senha: '123456',
    });

    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response body contains token': (r) => r.body.includes('token'),
        'Validar que o token é string': (r) => typeof JSON.parse(r.body).token === 'string',
    });

    sleep(1);
    }
    