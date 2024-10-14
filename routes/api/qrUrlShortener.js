const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const UrlShortner = require('../../models/UrlShortner');
const generateId = require('../../utils/uuidGenerator');

// @route   GET api/url-shortener/test
// @desc    Tests url-shortener route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Url Shortener Works' }));

// @route   GET api/url-shortener/all
// @desc    Get all url-shortener
// @access  Public
router.get('/all', async (req, res) => {
    try {
        const urlShortener = await UrlShortner.find()

        if (urlShortener.length == 0) {
            return res.status(400).json({ msg: 'No urls Available' });
        }

        res.json(urlShortener);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/url-shortener/add
// @desc     Add for url shortner url-shortener
// @access   Public
router.post(
    '/createShortUrl',
    check('url', 'url is required').notEmpty(),
    // check('lessonCategory', 'lessonCategory is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const urlShortenerBody = req.body;
        const url = urlShortenerBody.url;

        try {
            let urlShortener = await UrlShortner.findOne({ url });

            if (urlShortener) {
                urlShortener.urlFrequency = urlShortener.urlFrequency + 1;
                urlShortener.save();
                return res.json({ msg: 'Url Updated Successfully!', urlData: urlShortener });
            }

            let newShortUrl = generateId();

            urlShortener = new UrlShortner({
                ...urlShortenerBody,
                redirectUrl: newShortUrl
            });

            await urlShortener.save();
            res.json({ msg: 'Url Added Successfully!', urlData: urlShortener });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
