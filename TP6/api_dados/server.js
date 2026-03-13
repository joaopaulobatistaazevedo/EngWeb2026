const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Logger
app.use((req, res, next) => {
    const d = new Date().toISOString().substring(0, 16);
    console.log(`${req.method} ${req.url} ${d}`);
    next();
});

// Conexão ao MongoDB
const nomeBD = "cinema";
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`;
mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

// Schemas flexíveis para as 3 coleções
const filmeSchema  = new mongoose.Schema({}, { strict: false, collection: 'filmes',  versionKey: false });
const atorSchema   = new mongoose.Schema({}, { strict: false, collection: 'atores',  versionKey: false });
const generoSchema = new mongoose.Schema({}, { strict: false, collection: 'generos', versionKey: false });

const Filme  = mongoose.model('Filme',  filmeSchema);
const Ator   = mongoose.model('Ator',   atorSchema);
const Genero = mongoose.model('Genero', generoSchema);

// ─── Função auxiliar para montar a query ──────────────
function buildQuery(Model, reqQuery) {
    let queryObj = { ...reqQuery };

    const searchTerm = queryObj.q;
    const fields     = queryObj._select;
    const sortField  = queryObj._sort;
    const order      = queryObj._order === 'desc' ? -1 : 1;

    delete queryObj.q;
    delete queryObj._select;
    delete queryObj._sort;
    delete queryObj._order;

    let mongoQuery = {};
    let projection = {};
    let mongoSort  = {};

    if (searchTerm) {
        mongoQuery = { $text: { $search: searchTerm } };
        projection.score = { $meta: "textScore" };
        mongoSort = { score: { $meta: "textScore" } };
    } else {
        mongoQuery = queryObj;
    }

    if (fields) {
        fields.split(',').forEach(f => projection[f.trim()] = 1);
    }

    let execQuery = Model.find(mongoQuery, projection);

    if (sortField)       execQuery = execQuery.sort({ [sortField]: order });
    else if (searchTerm) execQuery = execQuery.sort(mongoSort);

    return execQuery;
}

// ─── FILMES ──────────────────────────────────────────────────────────────────

app.get('/filmes', async (req, res) => {
    try {
        const docs = await buildQuery(Filme, req.query).exec();
        res.json(docs);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/filmes/:id', async (req, res) => {
    try {
        const doc = await Filme.findById(req.params.id);
        if (!doc) return res.status(404).json({ error: "Não encontrado" });
        res.json(doc);
    } catch (err) { res.status(400).json({ error: "ID inválido ou erro de sistema" }); }
});

app.post('/filmes', async (req, res) => {
    try {
        const saved = await new Filme(req.body).save();
        res.status(201).json(saved);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/filmes/:id', async (req, res) => {
    try {
        const updated = await Filme.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Não encontrado" });
        res.json(updated);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/filmes/:id', async (req, res) => {
    try {
        const deleted = await Filme.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Não encontrado" });
        res.json({ message: "Eliminado com sucesso", id: req.params.id });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── ATORES ──────────────────────────────────────────────────────────────────

app.get('/atores', async (req, res) => {
    try {
        const docs = await buildQuery(Ator, req.query).exec();
        res.json(docs);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/atores/:id', async (req, res) => {
    try {
        const doc = await Ator.findById(req.params.id);
        if (!doc) return res.status(404).json({ error: "Não encontrado" });
        res.json(doc);
    } catch (err) { res.status(400).json({ error: "ID inválido ou erro de sistema" }); }
});

app.post('/atores', async (req, res) => {
    try {
        const saved = await new Ator(req.body).save();
        res.status(201).json(saved);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/atores/:id', async (req, res) => {
    try {
        const updated = await Ator.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Não encontrado" });
        res.json(updated);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/atores/:id', async (req, res) => {
    try {
        const deleted = await Ator.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Não encontrado" });
        res.json({ message: "Eliminado com sucesso", id: req.params.id });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── GÉNEROS ─────────────────────────────────────────────────────────────────

app.get('/generos', async (req, res) => {
    try {
        const docs = await buildQuery(Genero, req.query).exec();
        res.json(docs);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/generos/:id', async (req, res) => {
    try {
        const doc = await Genero.findById(req.params.id);
        if (!doc) return res.status(404).json({ error: "Não encontrado" });
        res.json(doc);
    } catch (err) { res.status(400).json({ error: "ID inválido ou erro de sistema" }); }
});

app.post('/generos', async (req, res) => {
    try {
        const saved = await new Genero(req.body).save();
        res.status(201).json(saved);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/generos/:id', async (req, res) => {
    try {
        const updated = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Não encontrado" });
        res.json(updated);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/generos/:id', async (req, res) => {
    try {
        const deleted = await Genero.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Não encontrado" });
        res.json({ message: "Eliminado com sucesso", id: req.params.id });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─────────────────────────────────────────────────────────────────────────────

app.listen(7789, () => {
    console.log('API Cinema em http://localhost:7789');
    console.log('  GET /filmes   GET /atores   GET /generos');
});