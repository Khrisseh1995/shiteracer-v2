import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import {generateWords} from './WordsService';

const app = express();

app.use(bodyParser.json());

app.get('/generatewords', (req: Request, res: Response) => {
    return res.send(generateWords());    
});


app.listen(8080, () => console.log("Listening on port 3000"));

