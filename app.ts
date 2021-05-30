import Express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

import attendanceRoute from './routes/attendance';
import attendanceTokenRoute from './routes/attendanceToken';
import loginRoute from './routes/login';
import registerRoute from './routes/register';

import authenticateSession from './middleware/authenticateSession';

declare module 'express-session' {
  interface Session {
    tentativeClient: object | string;
  }
}

const app = Express();

dotenv.config({ path: path.join(__dirname, './env', '.env') });

const clientP = mongoose
  .connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((m) => {
    console.log('Database Connection Established');
    return m.connection.getClient();
  });
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.CLIENT_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: clientP,
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 1,
      ttl: 60 * 24 * 60 * 60,
    }),
  })
);

app.get('/', (req, res, next) => {
  res.send('test');
});

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/attendance', attendanceRoute);
app.use('/attendance-token', attendanceTokenRoute);

app.use('/', authenticateSession);

export default app;
