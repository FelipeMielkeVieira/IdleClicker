const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc
} = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyDDX9nhX6w_dp25XGKhhMqYkiaD1oUX3d0",
    authDomain: "idle-clicker-f0524.firebaseapp.com",
    projectId: "idle-clicker-f0524",
    storageBucket: "idle-clicker-f0524.appspot.com",
    messagingSenderId: "128204391000",
    appId: "1:128204391000:web:33c8a491f49734b020402d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore();

async function save(Tablename, id, dado) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, Tablename, id), dado);
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, Tablename), dado);
        const savedData = {
            ...dado,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(Tablename) {
    const TableRef = collection(db, Tablename);

    const q = query(TableRef);

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

async function getById(Tablename, id) {
    const docRef = doc(db, Tablename, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error("404 - not found");
    }

}

async function remove(Tablename, id) {
    const dado = await deleteDoc(doc(db, Tablename, id));
    return {
        message: `${id} deleted`
    }
}

async function getWithFilter(Tablename, property, operator, value) {
    const TableRef = collection(db, Tablename);

    const q = query(TableRef, where(property, operator, value));

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

module.exports = {
    save,
    get,
    getById,
    remove,
    getWithFilter
}