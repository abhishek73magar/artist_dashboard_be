const fs = require('fs')
const folderList = [
  "public/csv"
]

if(!fs.existsSync('public')) fs.mkdirSync('public')
folderList.forEach((pathname) => {
  if(fs.existsSync(pathname)) return console.log(pathname, 'found !!');
  console.log('folder created:', pathname)
  fs.mkdirSync(pathname)
})

process.exit(0)
