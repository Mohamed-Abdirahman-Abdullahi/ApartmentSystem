const express = require("express");

const Departments = require("../../models/departments/departments");

const getDepartments = async (req, res) => {

    const dept = await Departments.find({});
    res.send(dept);
};

const getDepartment = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    const department = await Departments.find({ _id: removedCol })
    res.status(200).json(department)
};

const createDepartment = async (req, res) => {
    let dept = await Departments.findOne({ name: req.body.name });
    if (dept) return res.status(400).send("department already registered");

    dept = await Departments.create({
        name: req.body.name,
        manager: req.body.manager,
        phone: req.body.phone,
    });

    res.send(dept);
};

const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const dept = await Departments.findByIdAndUpdate(
        removedCol,
        {
           ...req.body
        },
        { new: true }
    );

    res.send(dept);
};

const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const dept = await Departments.findByIdAndRemove(removedCol);
    if (!dept) return res.status(404).send("invalid delete");

    res.send(dept);
};

module.exports = {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};