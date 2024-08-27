const {Router} = require("express")

const authorsRouter = Router()

authorsRouter.get("/", (req,res) => res.json("All authors"))
authorsRouter.get("/:authorId", (req,res) => {
    const {authorId} = req.params
    res.json(`Author ID: ${authorId}`)
})

module.exports = authorsRouter