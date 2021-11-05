import * as express from 'express';
import { Request, Response, Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

const app: Application = express();
const PORT: number = 3000;

const DIST_PATH: string = path.resolve(__dirname, '../dist');
const HTML_FILE: string = path.resolve(DIST_PATH, 'index.html');
const DB_PATH: string = path.resolve(__dirname, './db');
const CARDS_FILE: string = path.resolve(DB_PATH, 'cards.json');

app.use(express.static(DIST_PATH));
app.use(bodyParser.json());
const urlencodedParser = express.urlencoded({ extended: false });

app.get('/api/cards', (req: Request, res: Response): void => {
  res.sendFile(CARDS_FILE);
});

app.put('/api/cards', urlencodedParser, (req: Request, res: Response): void => {
  const stringCards = JSON.stringify(req.body, null, '\n');
  fs.writeFile(CARDS_FILE, stringCards, (err) => {
    if (err) throw err;
  });
  res.send(req.statusCode);
});

app.get('*', (req: Request, res: Response): void => {
  res.sendFile(HTML_FILE);
});

app.listen(PORT, (): void => {
  console.log(`Server started on PORT: ${PORT}`);
});
