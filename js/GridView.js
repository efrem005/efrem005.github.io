class GridView {
    constructor() {
        this.header = '';
        this.headerClass = [];
        this.tableClass = [];
        this.element = 'body';
        this.attribute = [];
    }
    set header(header) {
        if (typeof header === 'string' && header.trim() != '') {
            this._header = header.trim();
            return true;
        }
        return false;
    }
    set headerClass(headerClass) {
        if (typeof headerClass === 'object') {
            this._headerClass = headerClass;
            return true;
        }
        return false;
    }
    set element(element) {
        if (document.querySelector(element)) {
            this._element = document.querySelector(element);
            return true;
        }
        return false;
    }

    render {

    }
}