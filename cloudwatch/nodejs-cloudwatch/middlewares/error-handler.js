const {createLog} = require('../logger')

module.exports =  {
    middleware: async function(err, req, res, next) {
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err: {}
        await createLog(err.message)
        res.status(err.status || 500)
        res.render('error')
    }
}