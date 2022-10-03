const cloudinary = {
  v2: {
    uploader: {
      upload() {
        return Promise.resolve({
          secure_url: 'https://someurl.com/path/image.png',
        });
      },
    },
  },
};

module.exports = cloudinary;
