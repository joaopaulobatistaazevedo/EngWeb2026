const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.emdListPage    = (tlist, d) => renderPug('index',   { list: tlist, date: d });
exports.emdDetailsPage = (e, d)     => renderPug('details', { emd: e, date: d });
exports.emdRegistoPage = (d)        => renderPug('registo', { date: d });
exports.emdEditarPage  = (e, d)     => renderPug('editar',  { emd: e, date: d });
exports.emdStatsPage   = (tlist, d) => renderPug('stats',   { list: tlist, date: d });