const fs = require('fs');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const avatars = [];
const promises = [];

for (let i = 0; i < 100; i += 1) {
  const avatar = `https://picsum.photos/id/${Math.floor(
    Math.random() * 1000,
  )}/198/198`;
  promises.push(
    cloudinary.uploader
      .upload(avatar, {
        resource_type: 'image',
        folder: 'sample-avatars',
        eager: [
          {
            width: 198,
            height: 198,
            crop: 'fill',
          },
        ],
      })
      .then((image) => {
        avatars.push(image.eager[0].secure_url);
      })
      .catch((err) => err),
  );
}

Promise.all(promises)
  .then(() => {
    fs.writeFile(
      'database/seeding/avatars.json',
      JSON.stringify(avatars),
      (error) => {
        if (error) {
          throw error;
        }
      },
    );
    console.log('Done');
  })
  .catch((err) => {
    console.log(err);
  });
