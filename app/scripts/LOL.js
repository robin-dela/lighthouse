/*
* Class LOL
* With developer mode and Konami
*/
import url from 'fast-url-parser';
url.queryString = require('querystringparser');
import Konami from 'konami-js';

class LOL {
  constructor() {
    new Konami(this.konami.bind(this));
    this.parseQuery();
    window.DEVMODE = false;
  }
  parseQuery() {
    const parsed = url.parse(window.location.search, true);
    if (parsed.query.devMode) {
      window.DEVMODE = true;
    }
  }
  konami() {
    console.log('konami');
  }
}
export default new LOL();
