const mongoose = require('mongoose');

exports.fakeUsers = [
  {
    _id: new mongoose.Types.ObjectId('6311384d39fcee4794f5678c'),
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('63114a15ee51f867417b3d8a'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa725'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa723'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa722'),
        status: 'friends',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('63114a15ee51f867417b3d8a'),
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('6311384d39fcee4794f5678c'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa728'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa726'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa723'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa725'),
        status: 'pending',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa722'),
    firstName: 'Reynold',
    lastName: 'Spinka',
    gender: 'Male',
    avatar: 'https://picsum.photos/id/676/480/480',
    username: 'reynoldspinka',
    email: 'reynoldspinka@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('6311384d39fcee4794f5678c'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa727'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa724'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa725'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa726'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa729'),
        status: 'pending',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa723'),
    firstName: 'Elnora',
    lastName: 'Steuber',
    gender: 'Female',
    avatar: 'https://picsum.photos/id/146/480/480',
    username: 'elnorasteuber',
    email: 'elnorasteuber@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('6311384d39fcee4794f5678c'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('63114a15ee51f867417b3d8a'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa729'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa728'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa726'),
        status: 'pending',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa724'),
    firstName: 'Tiffany',
    lastName: 'Simonis',
    gender: 'Male',
    avatar: 'https://picsum.photos/id/382/480/480',
    username: 'tiffanysimonis',
    email: 'tiffanysimonis@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa722'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa729'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa728'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa725'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa726'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa727'),
        status: 'pending',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa725'),
    firstName: 'Madalyn',
    lastName: 'Dickinson',
    gender: 'Male',
    avatar: 'https://picsum.photos/id/271/480/480',
    username: 'madalyndickinson',
    email: 'madalyndickinson@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('6311384d39fcee4794f5678c'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('63114a15ee51f867417b3d8a'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa724'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa722'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa727'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa728'),
        status: 'pending',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa726'),
    firstName: 'Christop',
    lastName: 'Casper',
    gender: 'Male',
    avatar: 'https://picsum.photos/id/578/480/480',
    username: 'christopcasper',
    email: 'christopcasper@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('63114a15ee51f867417b3d8a'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa728'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa722'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa724'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa723'),
        status: 'sent',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa727'),
    firstName: 'Alvis',
    lastName: 'Volkman',
    gender: 'Male',
    avatar: 'https://picsum.photos/id/188/480/480',
    username: 'alvisvolkman',
    email: 'alvisvolkman@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa722'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa728'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa724'),
        status: 'sent',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa725'),
        status: 'sent',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa728'),
    firstName: 'Kacie',
    lastName: 'Hilll',
    gender: 'Female',
    avatar: 'https://picsum.photos/id/799/480/480',
    username: 'kaciehilll',
    email: 'kaciehilll@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('63114a15ee51f867417b3d8a'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa723'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa724'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa726'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa727'),
        status: 'pending',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa729'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa725'),
        status: 'sent',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
  {
    _id: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa729'),
    firstName: 'Autumn',
    lastName: 'Jast',
    gender: 'Male',
    avatar: 'https://picsum.photos/id/306/480/480',
    username: 'autumnjast',
    email: 'autumnjast@fancybook.com',
    password: '$2a$10$M3Py5ZGOQ8E/2CLXMhFTL.LDgJrbb6JcP87yvTV6qCwY8OswDMese',
    friendList: [
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa723'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa724'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa728'),
        status: 'friends',
      },
      {
        user: new mongoose.Types.ObjectId('6306d7ae5a4d17eafd1fa722'),
        status: 'sent',
      },
    ],
    plainTextPassword: 'pAssWord&4r(3*',
  },
];
