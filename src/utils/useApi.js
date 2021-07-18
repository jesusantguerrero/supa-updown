export function useSiteApi() {

    const add = (site) => {
        return indexedDB.open('sites', 1).then(db => {
            return db.transaction('sites', 'readwrite').then(txn => {
                return txn.objectStore('sites').add({
                    ...site,
                    created: new Date()
                });
            });
        });
    };

    const get = (siteId) => {
        indexedDB.open('sites', 1).then(db => {
            return db.transaction('sites', 'readonly').then(txn => {
                return txn.objectStore('sites').get(siteId);
            });
        });
    }

    const getAll = () => {
        indexedDB.open('sites', 1).then(db => {
            return db.transaction('sites', 'readonly').then(txn => {
                return txn.objectStore('sites').getAll();
            });
        });
    }

    const remove = (siteId) => {
        indexedDB.open('sites', 1).then(db => {
            return db.transaction('sites', 'readwrite').then(txn => {
                return txn.objectStore('sites').delete(siteId);
            });
        });
    }

    return {
        add,
        get,
        getAll,
        remove
    };
}