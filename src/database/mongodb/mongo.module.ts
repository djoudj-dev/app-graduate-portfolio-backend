import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URL;

/**
 * Fonction pour établir une connexion avec MongoDB.
 */
export const connectMongoDB = async () => {
  try {
    if (!mongoUri) {
      throw new Error(
        "MONGO_URL non définie dans les variables d'environnement",
      );
    }

    console.log('Tentative de connexion à MongoDB...');
    await mongoose.connect(mongoUri, {
      connectTimeoutMS: 30000,
      retryWrites: true,
      w: 'majority',
    });
    console.log('Connexion à MongoDB réussie');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erreur de connexion à MongoDB :', error.message);
    } else {
      console.error('Erreur de connexion à MongoDB :', error);
    }
    process.exit(1);
  }
};
