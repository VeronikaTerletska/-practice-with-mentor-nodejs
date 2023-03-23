const { yellow } = require("colors");
const express = require("express");
const path = require("path");
configPath = path.join(__dirname, "..", "config", ".env");
// console.log(require("dotenv").config({ path: configPath }));
// console.log(process.env.PORT);
// console.log(process.env.veronika);
// console.log(process.env.andriy);
require("dotenv").config({ path: configPath });
const connectDB = require("../config/db");
require("colors");
const asyncHandler = require("express-async-handler");

// auth - аутентифікація
const UserModel = require("./models/userModel");
const RoleModel = require("./models/roleModel");
const auth = require("./midellewares/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", require("./routers/filmsRoutes"));

// реєстрація - збереження нового користувача в БД
// аутентифікація - перевірка данних, що надав користувач з тим, що зберігається в БД
// авторизація - перевірка прав доступа до сайту, виконувати певні дії на сайті
// логаут (logout) - вихід із сайту, забирання прав доступу

app.post(
  "/register",
  (req, res, next) => {
    console.log("Worked Joi");
    next();
  },
  asyncHandler(async (req, res) => {
    // отримати дані від користувача та робим їх валідацію
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    // перевірка користувача на наявність в БД
    const candidate = await UserModel.findOne({ email });
    // якщо знайшли користувача - повертаємо відповідь, що користувач уже є
    if (candidate) {
      res.status(400);
      throw new Error("User already exist");
    }
    // якщо користувача немає - хешируємо пароль
    const hashPassword = bcrypt.hashSync(password, 5);

    // зберігаємо користувача в БД
    const userRole = await RoleModel.findOne({ value: "USER" });
    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [userRole.value],
    });

    res.status(201).json({
      code: 201,
      status: "success signUp",
      data: {
        user,
      },
    });
  })
);

app.post(
  "/login",
  (req, res, next) => {
    console.log("Спрацював Joi");
    next();
  },
  asyncHandler(async (req, res) => {
    // отримати дані від користувача та робим їх валідацію
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    // шукаємо користувача в БД і розшифровуємо пароль.
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("Invalid login or password");
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);

    // якщо не знаходимо чи не можемо розшифрувати пароль -
    // кажемо невірний логін або пароль
    if (!isValidPassword) {
      res.status(404);
      throw new Error("Invalid login or password");
    }

    // якщо все ОК - генеруємо токен
    // завжди перевіряти токен через сайт jwt.io

    const token = generateToken({
      friends: ["bohdan", "andriy", "anna"],
      id: user._id,
      email: user.email,
    });

    // зберігаємо токен в БД
    user.token = token;
    console.log(UserModel);
    const userWithToken = await user.save();
    if (!userWithToken) {
      res.status(404);
      throw new Error("Cannot set token");
    }

    res.status(201).json({
      code: 201,
      status: "success login",
      data: {
        token: user.token,
        email: user.email,
      },
    });
  })
);

app.get(
  "/logout",
  auth,
  asyncHandler(async (req, res) => {
    await UserModel.findByIdAndUpdate(req.user.id, { token: null });

    res.status(201).json({
      code: 201,
      status: "logout success",
    });
  })
);

function generateToken(data) {
  return jwt.sign(data, "pizza", { expiresIn: "8h" });
}

app.use("*", (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not found",
  });

  next();
});

app.use(require("./midellewares/errorHandler"));

connectDB();
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}`.yellow.bold.italic
  );
});
