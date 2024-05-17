const {
    SubjectsCreate,
    SubjectsUpdate,
    validateSubjects,
} = require("../pkg/subjects/validate");


const {
    createSubjects,
    updateSubjects,
    removeSubjects,
    listSortetName,
    getOneSubjectsById,
} = require("../pkg/subjects/index");


const createNewSubjects = async (req, res) => {
    try {
        // await validate(req.body, RecepieCreate);
        const data = {...req.body, user_id: req.auth.id };
        const newSubjects = await createSubjects(data);
        return res.status(200).send(newSubjects);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
};

const updateNewSubjects = async (req, res) => {
    try {
        // await validate(req.body, RecepieUpdate);
        const subjects = await getOneSubjectsById(req.params.id);
        if(req.auth.id.toString() !== subjects.user_id.toString())
        return res.status(400).send("Acces not allowed");
        const updatedSubjects = await updateSubjects(req.params.id, req.body);
        return res.status(200).send(updatedSubjects);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
};

const getSubjectsById = async (req, res) => {
    console.log("I'm in get subjects by id", req);
    try {
        console.log(req.params.id);
        const subjects = await getOneSubjectsById(req.params.id);
        return res.status(200).send(subjects);
    } catch (error) {
        console.error("Error fetching subject:", error);
        return res.status(500).send("internal server error!");
    }
};

// const deleteRecepie = async (req, res) => {
//     try {
//         const recepie = await getOneRecepieById(req.params.id);
//         if(req.auth.id.toString() !== recepie.user_id.toString())
//         return res.status(400).send("Acces not allowed");
//         await removeRecepie(req.params.id);
//         return res.status(200).send(`Recepie with id: ${req.params.id}, was deleted!`);
//     } catch (error) {
//         return res.status(500).send("internal server error!");
//     }
// };

// const getAllRecepiesSortedByName = async (req, res) => {
//     try {
//         // console.log(req.auth.id);
//         const recepie = await listSortetName(req.auth.id.toString());
//         return res.status(200).send(recepie);
//     } catch (error) {
//         return res.status(500).send("internal server error!");
//     }
// };

module.exports = {
    createNewSubjects,
    updateNewSubjects,
    getSubjectsById,
    // deleteSubjects,
    // getAllSubjectssSortedByName,
    };