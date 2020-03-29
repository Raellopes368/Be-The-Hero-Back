const crypto = require('crypto');
const connection = require('../../database/connection');

class OngsController {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  }

  async store(req, res) {
    const {
      name, email, whatsapp, city, uf,
    } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      name,
      email,
      whatsapp,
      city,
      uf,
      id,
    });

    return res.json({ id });
  }
}
module.exports = new OngsController();
