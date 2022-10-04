const slugify = (str) => {
  const regex = /(<([^>]+)>)/gi;
  return str
    .toLowerCase()
    .replace(regex, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(&nbsp;|<br>)+/, '')
    .replace(/^(nbsp)+/, '')
    .trim();
};
function stripHtml(text) {
  return text.replace(/^\xa0*([^\xa0])\xa0$/g, '');
}
function replaceNbsps(str) {
  var re = new RegExp(String.fromCharCode(160), 'g');
  return str.replace(re, ' ');
}
const wordCount = (str) => {
  const wordArray = str.split(' ');
  return wordArray.filter((word) => word !== '').length;
};

module.exports = {
  slugify,
  stripHtml,
  replaceNbsps,
  wordCount,
};
