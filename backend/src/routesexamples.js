

/* Ex 1 Using Query Params*/

app.get('/users', (request, response) => {
    const params = request.query;

    console.log(params);
    
    return response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Daniel Rocha'
    });
});

/* No Imsonia*/
Método GET
http://localhost:3333/users?Daniel




/*Ex 2 Using GET Params*/

app.get('/users/:id', (request, response) => {
    const params = request.params;

    console.log(params);

    return Response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Daniel Rocha'
    });
});

No Imsonia
Método GET
http://localhost:3333/users/1

/* Ex 3 Using POST Method*/
routes.post('/users', (request, response) => {
    const body = request.body;

    console.log(body);

    return Response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Daniel Rocha'
    });
});

/*No Imsomnia*/
POST http://localhost:3333/users
JSON
{
	"name": "Daniel Rocha",
	"idade": 25
}


