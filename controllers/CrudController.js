const express = require("express");
const knex = require("../config/db");
const saltRounds = 10;
const bcrypt = require("bcrypt");

module.exports.index = async (req, res) => {
    try {
        // const data = await knex.select().table("users");
        const data = await knex("users");
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: "error",
        });
    }
};

module.exports.store = (req, res) => {
    // Returns [1] in "mysql", "sqlite", "oracle"; [] in "postgresql" unless the 'returning' parameter is set.
    // knex("books").insert({ title: "Slaughterhouse Five" });
    // res.send(req.body);
    try {
        const { name, email, password } = req.body;
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            await knex("users").insert({
                name,
                email,
                password: hash,
            });
        });

        res.status(201).json({
            message: "user created",
        });
    } catch (error) {
        res.status(500).json({
            message: "server error",
        });
    }
};

module.exports.show = async (req, res) => {
    try {
        const data = await knex("users").where("id", req.params.id);

        res.status(201).json({
            message: "success",
            data: data[0],
        });
    } catch (error) {
        res.status(404).json({
            message: "not found",
        });
    }
};

module.exports.update = async (req, res) => {
    const { name, email } = req.body;
    const data = await knex("users")
        .where("id", req.params.id)
        .update({ name, email });

    res.status(201).json({
        message: "success",
        data: data,
    });
};

module.exports.delete = async (req, res) => {
    const data = await knex("users").where("id", req.params.id).del();

    res.status(201).json({
        message: "success",
        data: data,
    });
};
