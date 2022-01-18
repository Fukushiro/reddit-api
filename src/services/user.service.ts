const bcrypt = require('bcrypt');
export async function encript(val: string) {
  return await bcrypt.hash(val, 10);
}
