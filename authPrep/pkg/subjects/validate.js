const { Validator } = require("node-input-validator");

const SubjectsCreate = {
    math: "required|string",
    coding: "required|string",
    english: "required|string",
}

const SubjectsUpdate = {
    math: "string",
    coding: "string",
    english: "string",
}

const validateSubjects = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();
    if (!e) {
        throw {
            code: 400,
            error: v.errors,
        };
    }
};

module.exports = {
    SubjectsCreate,
    SubjectsUpdate,
    validateSubjects,
};