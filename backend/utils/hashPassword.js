import bcrypt from "bcrypt";

const password = "admin678";

const hash = await bcrypt.hash(password, 10);

console.log(hash);