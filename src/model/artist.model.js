const DbModel = require("classes/DbModel");
const HttpError = require("classes/HttpError");
const { removeFile } = require("libs/fileUpload");
// const { artist } = require("middleware/permission");
const fs = require('fs')

class Artist extends DbModel {
  constructor(tablename){
    super(tablename)
    this.tablename = tablename
  }

  readCsvFile = (filename) => {
    return new Promise((resolve, reject) => {
      let str = ''
      const readstream = fs.createReadStream("public/" + filename, 'utf-8')
      readstream.on('data', (chunk) => str += chunk)
      readstream.on('end', () => resolve(str.replace(/\n+$/, "").replace(/\r/g, '')))
      readstream.on('error', reject)
      
    })
  }

  importCsv = async(file) => {
    const pathname = `csv/${file.filename}`
    try {
      const csvString = await this.readCsvFile(pathname)
      const arr = csvString.split('\n')
      const keys = arr[0].split(',')
      const payload = arr.slice(1).map(dd => {
        return dd.split(',').reduce((acc, value, indx) => {
          const keyname = keys[indx]
          if((keyname === 'created_at' || keyname === 'updated_at') && value === '') acc[keyname] = null
          else acc[keyname] = value

          return acc;
        }, {})
      })
    
      console.log(payload)
      const result = this.insertMultiple(payload)
      removeFile(pathname) // remove file 
      return result;
      // throw new HttpError(500, "Not Impliment")
    } catch (error) {
      removeFile(pathname)
      return Promise.reject(error)
    }
  }
}

const artist = new Artist('artist')
module.exports = {
  create: artist.insert,
  update: artist.update,
  get: artist.pagination,
  getById: artist.getByCol,
  remove: artist.remove,
  importCsv: artist.importCsv
}