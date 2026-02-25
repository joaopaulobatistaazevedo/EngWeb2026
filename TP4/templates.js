const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.emdListPage = (tlist, d) => renderPug('index', { list: tlist, date: d });
exports.emdDetailsPage = (e,d) => renderPug('details', { emd:e, date:d });
// exports.emdFormEditPage = (t, d) => renderPug('form', { treino: t, date: d });
// exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });