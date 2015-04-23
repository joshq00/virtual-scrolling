import express from 'express';
import mongoose from 'mongoose';
import alerts from './alerts/controller';

mongoose.connect( 'mongodb://localhost/cpe' );

const app = express();
app.set( 'port', process.env.PORT || 3000 );
app.set( 'json spaces', '   ' );
app.disable( 'x-powered-by' );

app.use( '/', express.static( 'public' ) );
app.use( '/node_modules', express.static( 'node_modules' ) );
app.use( '/rs', [ alerts ] );
export default app;
