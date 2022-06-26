const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
let a = "hello wrold";
let b = bcrypt.hashSync(a, salt);
console.log(a, b);