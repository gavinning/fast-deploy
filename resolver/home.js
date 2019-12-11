const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const mkdirp = require('mkdirp')
const config = require('../config')

class Home {
    async home(ctx) {
        ctx.body = "<h1>It's work!</h1>"
    }

    async deploy(ctx) {
        const file = ctx.files.file
        const folder = ctx.query.folder
        const afterRun = ctx.query.afterRun
        try {
            const projectFolder = path.join(config.wwwroot, folder)
            mkdirp(projectFolder)
            const compress = await exec(`tar xvf ${file.path} --strip-components=1 -C ${projectFolder}`)
            const afterRunning = afterRun ? await exec(afterRun, { cwd: projectFolder }) : ''
            return ctx.body = [compress.stderr, compress.stdout, afterRunning.stderr, afterRunning.stdout].join('\n')
        }
        catch(err) {
            fs.unlinkSync(file.path)
            throw err
        }
    }
}

module.exports = new Home
