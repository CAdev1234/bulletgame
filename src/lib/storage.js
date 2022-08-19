import Cookies from 'js-cookie'

export const StorageType = {
    local: 'local',
    session: 'session',
    cookie: 'cookie'
}

class RStorage {
    static shared() {
        if (!this.instance) {
            this.instance = new RStorage();
        }
        return this.instance;
    }
    rcSetItem(type = StorageType.local, key, value) {
        const valueJson = JSON.stringify(value)
        if (type === StorageType.local) {
            localStorage.setItem(key, valueJson);
        } else if (type === StorageType.session) {
            sessionStorage.setItem(key, valueJson);
        } else {
            Cookies.set(key, valueJson);
        }
    }

    rcGetItem(type = StorageType.local, key) {
        if (type === StorageType.local) {
            let val = localStorage.getItem(key);
            return JSON.parse(val)
        } else if (type === StorageType.session) {
            let val = sessionStorage.getItem(key);
            return JSON.parse(val)
        } else {
            let val = Cookies.get(key) ? Cookies.get(key) : null;
            return JSON.parse(val)
        }
    }

    rcRemoveItem(type = StorageType.local, key) {
        if (type === StorageType.local) {
            localStorage.removeItem(key)
        } else if (type === StorageType.session) {
            sessionStorage.removeItem(key)
        } else {
            Cookies.remove(key)
        }
    }
}

export default RStorage.shared()