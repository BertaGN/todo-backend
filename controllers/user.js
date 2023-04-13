const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
    const { user } = req.body;
    const { email, fullName, password, repPassword } = user;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists",
            });
        }
        if (password !== repPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Passwords do not match",
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
            userId: uuidv4(),
        });
        await newUser.save();

        const { userId } = newUser;

        return res.status(201).json({ ok: true, user: { email, fullName, userId } });

    } catch (error) {
        console.log(error);
        res.status(503).json({
            ok: false,
            msg: "Sth happened",
        });

    }
};
const loginUser = async (req, res) => {
    const { user } = req.body;
    const { email, password } = user;
    try {
        const userDb = await User.findOne({ email: email });
        if (!userDb) {
            return res.status(400).json({
                ok: false,
                msg: "Email and password do not match",
            });
        }

        const passwordFromDb = userDb.password;
        // const hash = await getUserHashFromDatabase(req.body.email);
        const isValidPassword = await bcrypt.compare(password, passwordFromDb);

        if (!isValidPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Email and password do not match",
            });
        }

        const { email: userEmail, userId, fullName } = userDb;
        return res.status(200).json({ ok: true, user: { email, fullName, userId } });


    } catch (error) {
        console.log(error);
        res.status(503).json({
            ok: false,
            msg: "Sth happened",
        });

    }
};

module.exports = { createUser, loginUser };