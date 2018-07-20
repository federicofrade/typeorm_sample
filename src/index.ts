import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {User} from "./entities/User";
import { Category } from "./entities/Category";
import { Question } from "./entities/Question";
import { QType } from "./entities/QType";

createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [
        User,
        Category,
        Question,
        QType
    ],
    synchronize: true,
    logging: false
}).then(async connection => {

    // create express app
    var express = require('express');
    var app = express();
    var port = 3000;
    var bodyParser = require('body-parser');
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    // routes will go here
    app.get('/ping', async function (request, response) {
        return response.send('pong');
    });

    app.get('/inserts', async function (request, response) {

        let qtype = new QType();
        qtype.name = 'Preguntas'

        let question1 = new Question();
        question1.text = 'Es joda?';
        question1.title = 'Sos joda?';

        let question2 = new Question();
        question2.text = 'Ser o no ser?';
        question2.title = 'Shakespeare';
        question2.type = Promise.resolve(qtype);

        let category = new Category()
        category.name = 'Frases';
        
        let cat_questions = await Promise.resolve(category.questions);
        if (cat_questions){
            cat_questions.push(question1);
            cat_questions.push(question2);
        }
        else {
            category.questions = Promise.resolve(cat_questions);
        }
        
        await getRepository(Category).save(category);

        response.send(JSON.stringify(category));
    });

    app.get('/selects', async function (request, response) {
        let category = await getRepository(Category).findOne();
        if (category.questions){
            console.log("Vino con las question !");
            let questions = await Promise.resolve(category.questions);
            console.log(questions);
            if ( questions[0].type )
                console.log(await Promise.resolve(questions[0].type));
            if ( questions[1].type )
                console.log(await Promise.resolve(questions[1].type));
        }
        else{
            console.log("No trajo las question");
        }
    });

    app.get('updates', async function(request, response) {
        let question = await getRepository(Question).findOne({id:3});
        let category = await getRepository(Category).findOne({id: 1});

        let questions = await Promise.resolve(category.questions);
        questions.push(question);

        await getRepository(Category).save(category);
            
        response.send(JSON.stringify(category));
    });

    // start the server
    app.listen(port);
    console.log(`Server started at http://localhost:${port}`);
    
}).catch(error => console.log(error));
