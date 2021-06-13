const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Qa, Post, User, Hashtag } = require('../models');
const { render } = require('nunjucks');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입' });
});

router.get('/intro',async(req,res)=>{
  res.render('intro',{
    title:'자기소개'
  });
})

router.get('/qa',async (req, res) => {
  try {
    const post = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('qa', {
      title: '질의 응답 페이지',
      twits: post,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const post = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: '자기소개',
      twits: post,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.get('/hashtag', async (req, res, next) => {
//   const query = req.query.hashtag;
//   if (!query) {
//     return res.redirect('/');
//   }
//   try {
//     const hashtag = await Hashtag.findOne({ where: { title: query } });
//     let posts = [];
//     if (hashtag) {
//       posts = await hashtag.getPosts({ include: [{ model: User }] });
//     }

//     return res.render('main', {
//       title: `${query} | NodeBird`,
//       twits: posts,
//     });
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// });

module.exports = router;