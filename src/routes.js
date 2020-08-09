const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer')

const Post = require('./models/Post')

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) =>{
    const { originalname: name, size, filename: key } = req.file;

    const post = await Post.create({
        name,
        size,
        key,
        url: '',
    })

    return res.json(post);
});

routes.get('/posts', async(req, res) =>{
    const posts = await Post.find();

    return res.json(posts);
});

routes.delete('/posts/:id', async (req, res) =>{
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send('Post removed');
});

module.exports = routes;