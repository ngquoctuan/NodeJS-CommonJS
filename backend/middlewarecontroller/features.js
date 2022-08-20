// const Product = require('../models/product');
const User = require('../models/user');
const userController = require('../controllers/userController');
const DEFAULT_MAX_SIZE = 100;

const feature = {
    //PAGINATION
    pagingFunc: async (req, res) => {
        const page = req.query.number;
        const PAGE_SIZE = req.query.size;
        if (page) {
            // page = parseInt(page);
            const numberSkip = (page - 1) * PAGE_SIZE;
            try {
                const data = await User.find().skip(numberSkip).limit(PAGE_SIZE);
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        } else {
            userController.getAllUsers();
        }
    },
    //SORT
    sortingFunc: async (req, res) => {
        const sort = req.query.sort || '-createdAt' ;
        try{
            const user = User.find().sort(sort);
            res.status(200).json(user);
        } catch(e){
            res.status(500).json("CAUSED ERROR SORTING_FUNCTION")
        }
       
    },
    //SEARCH
    searhingFunc: async (req, res, next) => {
        
    }
}

module.exports = feature;