const connection = require('../../database/connection');

class SessionControlle {
  async store(req, res) {
    const { id } = req.body;
    const ong = await connection('ongs').select('name').where('id', id).first();

    if (!ong) {
      return res.status(400).json({ error: 'No ONG found with this ID' });
    }

    return res.json(ong);
  }
}

module.exports = new SessionControlle();
