const news_model = require("../models/NewsItem");

const remove_News = async(req, res) => {
    try {
        let { _id } = req.body;
        let newsId = { _id };
        let newsRemoved = await news_model.findByIdAndUpdate(
            newsId,
            { $set: { removed: true } },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            status: 200,
            data: newsRemoved
        });
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            status: 404,
            Message: error
        });
    }
};

const archive_News = async (req, res) => {
    try {
        const { _id } = req.body;
        const currentDate = Date.now()
        const newsArchived = await news_model.findByIdAndUpdate(
            _id,
            { $set: { archiveDate: currentDate} }, // Utilizar new Date() en lugar de Date.now()
            { new: true }
        );
        return res.status(200).send({
            success: true,
            status: 200,
            data: currentDate
        });
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            status: 404,
            Message: error
        });
    }
};

const get_news = async(req, res) => {
    try {
        let newsRes = await news_model.find({ removed: false }).sort({ date: -1 });
        return res.status(200).send({
            success: true,
            status: 200,
            data: newsRes
        });
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            status: 404,
            Message: error
        });
    }
};
const get_archived = async(req, res) => {
    try {
        let newsRes = await news_model.find({ removed: false }).sort({ date: -1 });
        // archiveDate: { $ne: null }
        return res.status(200).send({
            success: true,
            status: 200,
            data: newsRes
        });
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            status: 404,
            Message: error
        });
    }
};
const get_unarchived = async ( res) => {
    try {
        let newsRes = await news_model.find({ removed: false, archiveDate: null }).sort({ date: -1 });
        return res.status(200).send({
            success: true,
            status: 200,
            data: newsRes
        });
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            status: 404,
            Message: error
        });
    }
};

const create_news = async (req, res) => {
    try {
        const { title, description, content, author } = req.body;
        const newNews = new news_model({
            title: title,
            description: description,
            content: content,
            author: author
        });
        const savedNews = await newNews.save();
        return res.status(201).send({
            success: true,
            status: 201,
            data: savedNews,
            message: 'News created successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            status: 500,
            Message: error
        });
    }
};

module.exports = {
    remove_News,
    archive_News,
    get_news,
    create_news,
    get_archived,
    get_unarchived
};
