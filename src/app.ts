import express, { Application,Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/database';
import userRoutes from './modules/auth/auth.route';
import landingForm from "./modules/landingPage/landingForm.route"
import productRoute from './modules/product/product.route';
import galleryRoute from './modules/gallery/gallery.route';
import setupSwagger from './swagger';

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use("/api/landing-page",landingForm)
app.use('/api/products', productRoute);
app.use('/api/gallery', galleryRoute);

// Swagger
setupSwagger(app as any);

// Database connection
connectDB();


app.use('*', async (_req : Request , res : Response) => {
  return res.status(404).json({message:" route not found"})
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;