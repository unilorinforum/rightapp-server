const prisma = require('../prisma/connection');
const { stripHtml, replaceNbsps, wordCount } = require('../functions');
const slugify = require('slugify');
const createError = require('http-errors');
//get All topics

const getTopics = async (req, res) => {
  try {
    let allTopics = await prisma.topic.findMany({
      take: 10,
      orderBy: {
        id: 'desc',
      },
    });
    res.json({
      topics: allTopics,
      sucess: 1,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// get topic by id
const getTopicById = async (req, res, next) => {
  let id = req.query.id;
  console.log(id);
  try {
    const topicData = await prisma.topic.findMany({
      where: {
        id: id,
      },
      take: 10,
      orderBy: {
        id: 'desc',
      },
    });
    if (topicData.length > 0) {
      res.status(200).json(topicData);
    } else {
      next(createError.NotFound());
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete  topic by id
const deleteTopicById = async (req, res) => {
  let id = req.query.id;
  try {
    let result = await executeQuery(`DELETE FROM topics WHERE topic_id=${id}`);
    if (result) {
      res.send('Topic Deleted');
    } else {
      res.send('Topic user not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getTopicByCat = async (req, res) => {
  let cat = req.params.cat;
  console.log(cat);
  try {
    const topicData = await prisma.topic.findMany({
      where: {
        category: cat,
      },
      take: 10,
      orderBy: {
        id: 'desc',
      },
    });
    // console.log('topic lenth', topicData.length);
    if (topicData.length > 0) {
      res.status(200).json({
        success: 1,
        topics: topicData,
      });
    } else {
      res.send({
        success: 0,
        message: 'No Post found or invalid cat ',
      });
      // next(new ErrorHandler(`no user found with this id ${id} `, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTopic = async (req, res) => {
  const body = req.body;
  const regex = /(<([^>]+)>)/gi;
  const title = body.title
    .replace(/<\/?p[^>]*>/g, '')
    .replace(regex, '')
    .replace(/^\xa0*([^\xa0])\xa0$/g, '')
    .replace(/\xA0/g, ' ')
    .replace(/&nbsp;/g, ' ');
  let topicSlug = slugify(title);
  if (wordCount(title) < 4) {
    return res.json({
      success: 0,
      message: 'title is too short, make it more discriptive ',
    });
  } else if (wordCount(body.topicContent) < 10) {
    return res.json({
      success: 0,
      message: 'your content is too short, make it more discriptive ',
    });
  } else if (!body.topicCategory) {
    return res.json({
      success: 0,
      message: 'please select a category',
    });
  }
  let categorySlug = slugify(body.topicCategory);

  const getTopicSlugs = await prisma.topic.findUnique({
    where: {
      slug: topicSlug,
    },
  });
  if (getTopicSlugs) {
    res.json({
      success: 0,
      message:
        'this title has already been used, you need to make your title unique',
    });
  } else {
    try {
      const createTopic = await prisma.topic.create({
        data: {
          title: title,
          content: body.topicContent,
          slug: topicSlug,
          category: body.topicCategory,
          categotySlug: categorySlug,
          coverImageUrl: body.coverImageUrl,
          author: {
            connect: {
              id: body.user_id,
            },
          },
        },
      });
      console.log(createTopic.id);
      if (createTopic.id) {
        res.json({
          success: 1,
          message: 'Topic created sucesfully',
        });
      } else {
        res.json({
          success: 0,
          message: 'something went wrong',
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: 0,
        message: error,
      });
    }
  }
};

module.exports = {
  getTopics,
  getTopicById,
  deleteTopicById,
  createTopic,
  getTopicByCat,
};
