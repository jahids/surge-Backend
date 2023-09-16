import mongoose from 'mongoose';



mongoose.connection
  .on('open', () => console.log('Conneced with database'))
  .on('error', (error: Error) => {
    console.log(error);
  });

export async function connectToDatabase() {

  const _url_ = process.env.MONGO_URL;
  if(!_url_){
    throw new Error(`MONGO_URL not found in env!`);
  }

  await mongoose.connect(_url_, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}