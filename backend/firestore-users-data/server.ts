import app from './src/app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.info(`🚀 Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello from Cloud Run!');
});
