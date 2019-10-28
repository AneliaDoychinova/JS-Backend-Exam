  
function error(res, reason, msg) {
    if (typeof reason === 'object') {
        res.locals.globalError = reason.errors;
    } else {
        res.locals.globalError = {
            reason: msg
        }
    }
}

module.exports = error;