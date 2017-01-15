class Storage {

    static setItem(key, value) {
        localStorage.setItem(key, value);
    }

    static getItem(key) {
        return localStorage.getItem(key);
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }
}

export default Storage;