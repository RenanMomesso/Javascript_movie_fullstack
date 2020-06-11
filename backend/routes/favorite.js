const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/favorite");
const { requireSign } = require("../controllers/auth");

router.post("/favoriteNumber", (req, res) => {
  //mongoDB에서   favorite 숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    console.log(info);
    if (err) return res.status(400).send(err);
    // 그다음에   프론트에  다시   숫자 정보를 보내주기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    console.log(info);
    if (err) return res.status(400).send(err);
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});


router.post('/addToFavorite', (req,res)=>{
    
    const favorite = new Favorite(req.body)
    favorite.save((err,info)=>{
        console.log('addToFAvorite info', info)
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true})
    })

})

router.post('/removeFromFavorite', (req,res)=>{
    

    Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom}).exec((err,doc)=>{
        console.log('remove from favorite', doc)
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, doc})
    })
})

router.post('/getFavorites', (req,res)=>{
    Favorite.find({'userFrom':req.body.userFrom}).exec((err, info)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,info})
    })
})

module.exports = router;
