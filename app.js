// Importar Firebase y Firestore desde configdb.js y módulos específicos
import { db } from './configdb.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Función para cargar productos y mostrarlos en el index
async function loadProducts() {
  const productosSection = document.getElementById("productos");
  productosSection.innerHTML = ''; // Limpiar contenido previo

  try {
    // Obtener documentos de la colección "productos"
    const querySnapshot = await getDocs(collection(db, "productos"));
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
        <h3>${product.nombre}</h3>
        <p>Precio: $${product.precio}</p>
        <img src="${product.imagen}" alt="${product.nombre}" width="100">
      `;
      productosSection.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error al cargar productos: ", error);
  }
}

// Función para cargar entradas del blog y mostrarlas en el index
async function loadBlog() {
  const blogSection = document.getElementById("blog");
  blogSection.innerHTML = ''; // Limpiar contenido previo

  try {
    // Obtener documentos de la colección "blog"
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postDiv = document.createElement("div");
      postDiv.innerHTML = `
        <h3>${post.titulo}</h3>
        <p>${post.contenido}</p>
      `;
      blogSection.appendChild(postDiv);
    });
  } catch (error) {
    console.error("Error al cargar entradas del blog: ", error);
  }
}

// Función para cargar el título de la sección de productos
async function loadSectionTitle() {
    const titleElement = document.getElementById("productos-titulo");
    
    try {
      const docRef = doc(db, "config", "titulo");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        titleElement.textContent = docSnap.data().valor;
      } else {
        console.log("No se encontró el documento del título");
      }
    } catch (error) {
      console.error("Error al cargar el título: ", error);
    }
  }

// Cargar datos al cargar la página
window.onload = function() {
    loadSectionTitle();
    loadProducts();
  loadBlog();
};
