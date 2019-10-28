const User = require('../models/User');
const Expense = require('../models/Expense');
const error = require('../utils/error');

module.exports = {
    get: {
        add: (req, res, next) => {
            const user = req.user;

            res.render('new-expense.hbs', {user});
        },

        report: (req, res, next) => {
            const user = req.user;
            const expenseId = req.params.id;

            Expense.findById(expenseId).populate('user')
                .then((expense) => {
                    res.render('report.hbs', {user, expense});
                })
                .catch(err => {
                    next(err);
                })
        },

        delete: (req, res, next) => {
            const user = req.user;
            const expenseId = req.params.id;

            // try {
            //     await User.updateOne({_id: user._id}, {$pull: {expenses: expenseId}});
            //     await Expense.findByIdAndDelete(expenseId);

            //     res.redirect('/expense/home');
            // } catch (e) {
            //     next(e);
            // }
        },

        all: (req, res, next) => {
            const user = req.user;
            const query = {user: user._id};
            models.Expense.find(query)
                .then(expenses => {
                    res.render('expenses.hbs', {user, expenses})
                })
                .catch(err => {
                    next(err);
                })
        }
    },

    post: {
        add: (req, res, next) => {
            const user = req.user;
            const {merchant, total, category, description} = req.body;
            let {report} = req.body;
            report = report === "on";

        }
    }
};