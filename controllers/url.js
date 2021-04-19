const path = require('path')
const { nanoid } = require('nanoid');
const { validationResult } = require('express-validator');

const Url = require('../models/Url');

exports.getIndex = (req, res, next) => {
    res.render('index', {
        urlError: null,
        shortUrl: null,
        shortError: null
    })
}

exports.postUrl = (req, res, next) => {
    const originalUrl = req.body.url;
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        Url.findOne({ originalUrl: originalUrl })
            .then(doc => {
                if (!doc) {
                    const url = new Url({ originalUrl, shortId: nanoid(7) });
                    return url.save()
                }
                return doc
            })
            .then(result => {
                res.render('index', {
                    urlError: null,
                    shortUrl: result.shortId,
                    shortError: null
                })
            })
            .catch(err => {
                next(err)
            })
    } else {

        res.render('index', {
            urlError: errors.array()[0].msg,
            shortUrl: null,
            shortError: null
        })
        console.log('error')
    }

}

exports.postShort = (req, res, next) => {
    const short = req.body.short;
    Url.findOne({shortId: short})
    .then(doc=>{
        if(doc==null){
            res.render('index',{
                urlError: null,
                shortUrl:null,
                shortError: 'Does not exist. Try shortening first'
            })
        }else {
            const url = doc.originalUrl;
            if(url.includes('http://') || url.includes('https://')){
                res.redirect(url)
            }else {
                res.redirect("https://"+doc.originalUrl)
            }
        }
    })
    .catch(err=>{
        next(err)
    })
}