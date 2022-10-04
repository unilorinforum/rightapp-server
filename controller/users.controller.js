const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const prisma = require('../prisma/connection');

const createUser = async (req, res, next) => {
  const body = req.body;
  console.log(body);
  //   res.send('error');
  const date = Date.now();
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  const password = body.password;
  try {
    const emailResult = await prisma.user.findMany({
      where: { email: body.email },
    });
    console.log('ffff', emailResult);
    if (emailResult.length >= 1) {
      res.send({
        success: 0,
        message: 'this email is already exist',
      });
    } else {
      const usernameResult = await prisma.user.findMany({
        where: { username: body.username },
      });
      if (usernameResult.length >= 1) {
        res.send({
          success: 0,
          message: 'this username is alread taken ',
        });
      } else {
        const { email, username, password } = req.body;
        const user = await prisma.user.create({
          data: {
            email: email,
            username: username,
            password: password,
          },
        });
        if (user) {
          res.status(200).json({
            success: 1,
            message: 'registration sucessfull, systerm will redirect you',
          });
        } else {
          res.status(200).json({
            success: 0,
            message: 'something went wrong',
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    // res.send(error);
  }
};

const userLogin = async (req, res) => {
  const body = req.body;
  let results = await prisma.user.findMany({
    where: { email: body.email },
  });
  // console.log(results);
  if (results.length === 0) {
    res.json({
      success: 0,
      message: 'email is not registered',
    });
  } else {
    const resultData = results[0];
    const result = compareSync(body.password, resultData.password);
    if (result) {
      resultData.password = undefined;
      //   const jsontoken = sign({ userData: resultData }, process.env.JWT_SECRET, {
      //     expiresIn: '1h',
      //   });
      console.log(resultData.email);

      //   setCookie('UNILORINFORUM_JWT', jsontoken, {
      //     req,
      //     res,
      //     httpOnly: true,
      //     maxAge: 60 * 60 * 24 * 90, //90 days
      //     path: '/',
      //     sameSite: 'strict',
      //   });
      const { id, username, email } = resultData;
      const user_id = id;
      return res.json({
        success: 1,
        message: 'logged in successfully',
        // token: jsontoken,
        user_id,
        username,
        email,
      });
    } else {
      res.json({
        success: 0,
        message: 'password is not correct',
      });
    }
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    let allUsers = await prisma.user.findMany();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
};
