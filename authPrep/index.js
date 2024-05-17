const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const { getSection } = require("./pkg/config/index");
const {
    refreshToken,
    createNewUser,
    login,
    resetPassword,
    forgotPassword,
    getAllUserEmailsSorted,
} = require("./handlers/auth");

const {
    createNewSubjects,
    updateNewSubjects,
    getSubjectsById,
    // deleteSubjects,
    // getAllSubjectssSortedByName,
} = require("./handlers/subjects");

require("./pkg/db/index");

const app = express();
app.use(express.json());
app.use(
    jwt({
        secret: getSection("development").jwt_secret,
        algorithms: ["HS256"],
    }).unless({
        path: [
// we add the rouths we dont want to be authenticated
"/api/user/register",
"/api/user/login",
"/api/user/reset_password",
"/api/user/forgot_password",
        ],
    })
);
// pass ljochev123
// routs with authentification

app.get("/api/user/refresh-token", refreshToken);
app.post("/api/user/register", createNewUser);
app.post("/api/user/login", login);
app.post("/api/user/reset_password", resetPassword);
app.post("/api/user/forgot_password", forgotPassword);
app.get("/api/user/sortedEmails", getAllUserEmailsSorted);



// routes for grades

app.post("/api/subjects/create", createNewSubjects);
app.put("/api/subjects/update/:id", updateNewSubjects);
app.get("/api/subjects/id/:id", getSubjectsById);
// app.delete("/api/subjects/id/:id", );
// app.get("/api/subjects/name", );



app.listen(getSection("development").PORT, () => {
    console.log(`Server is listening on port ${getSection("development").PORT}`)
});