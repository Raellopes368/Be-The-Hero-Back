const connection = require('../../database/connection');

class IncidentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const [count] = await connection('incidents').count();
    console.log(count);
    const incidents = await connection('incidents').select('incidents.*', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf')
      .join('ongs', 'ongs.id', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5);
    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents);
  }

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  }

  async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .select('ong_id')
      .where('id', id)
      .first();
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted' });
    }
    await connection('incidents').delete().where('id', id);
    return res.status(204).send();
  }
}

module.exports = new IncidentController();
