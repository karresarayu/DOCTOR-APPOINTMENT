import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminroute.js';
import doctorRouter from './routes/doctorroute.js';
import userModel from './models/usermodel.js';
import userRouter from './routes/userroute.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectcloudinary();

app.use(express.json());

// Configure CORS to allow requests from both frontend and admin UI
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175',
        'https://doctor-appointment-client-u1l4.onrender.com',
        'https://doctor-appointment-admin-c4x5.onrender.com'
    ], // <--- ADD 5175 HERE!
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'dToken','admintoken'],
}));

app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("API working fine ");
});

app.listen(port,'0.0.0.0', () => console.log("Server started", port));
