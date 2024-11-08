// Importar funciones específicas de Firebase v9
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvEvE9OX1rLpiHsRdbhDeAgSUCZolN_S4",
    authDomain: "e-commerce-f1820.firebaseapp.com",
    databaseURL: "https://e-commerce-f1820-default-rtdb.firebaseio.com",
    projectId: "e-commerce-f1820",
    storageBucket: "e-commerce-f1820.appspot.com",
    messagingSenderId: "511457956407",
    appId: "1:511457956407:web:9fa6133678282ee99225b2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exportar las instancias de Firestore y Auth para usarlas en otros archivos
export { db, auth };
