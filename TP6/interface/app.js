const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

const API_BASE = process.env.API_URL || "http://localhost:7789";

// ─── FILMES ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.redirect('/filmes');
});

app.get('/filmes', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE}/filmes`);
        res.render('filmes', { filmes: response.data });
    } catch (err) { res.render('error', { error: err, message: "Erro API - filmes" }); }
});

app.get('/filmes/:id', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE}/filmes/${req.params.id}`);
        res.render('filme', { filme: response.data });
    } catch (err) { res.render('error', { error: err, message: "Erro API - filme" }); }
});

// ─── ATORES ───────────────────────────────────────────────────────────────────

app.get('/atores', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE}/atores`);
        res.render('atores', { atores: response.data });
    } catch (err) { res.render('error', { error: err, message: "Erro API - atores" }); }
});

app.get('/atores/:id', async (req, res) => {
    try {
        const ator = (await axios.get(`${API_BASE}/atores/${req.params.id}`)).data;

        const filmesInfo = await Promise.all(
            (ator.filmes || []).map(id =>
                axios.get(`${API_BASE}/filmes/${id}`).then(r => r.data).catch(() => null)
            )
        );

        res.render('ator', { ator, filmesInfo: filmesInfo.filter(Boolean) });
    } catch (err) { res.render('error', { error: err, message: "Erro API - ator" }); }
});

// ─── GÉNEROS ──────────────────────────────────────────────────────────────────

app.get('/generos', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE}/generos`);
        res.render('generos', { generos: response.data });
    } catch (err) { res.render('error', { error: err, message: "Erro API - generos" }); }
});

// ─────────────────────────────────────────────────────────────────────────────

const PORT = 7790;
app.listen(PORT, () => console.log(`Interface em http://localhost:${PORT}/filmes`));