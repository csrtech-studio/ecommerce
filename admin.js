// Importar las funciones necesarias de Firebase v9
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Obtener instancia de Firestore y Auth
const db = getFirestore();
const auth = getAuth(); // Instancia de autenticación

// Autenticación y verificación del estado de sesión
const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login-section");
const adminContent = document.getElementById("admin-content");
const logoutButton = document.getElementById("logout-button");
const loginError = document.getElementById("login-error");

// Función para verificar el estado de autenticación
auth.onAuthStateChanged(user => {
  if (user) {
    loginSection.style.display = "none";
    adminContent.style.display = "block";
    loadProducts();
    loadBlogPosts();
  } else {
    loginSection.style.display = "block";
    adminContent.style.display = "none";
  }
});

// Iniciar sesión
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginError.textContent = "";
    })
    .catch(error => {
      loginError.textContent = "Error de inicio de sesión: " + error.message;
    });
});

// Cerrar sesión
logoutButton.addEventListener("click", () => {
  signOut(auth);
});

// Añadir nuevo producto
const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const image = document.getElementById("product-image").value;

  // Añadir producto a Firestore
  addDoc(collection(db, "productos"), { nombre: name, precio: price, imagen: image })
    .then(() => {
      productForm.reset();
      loadProducts();
    })
    .catch(error => console.error("Error al agregar producto: ", error));
});

// Editar el título de la página
const titleForm = document.getElementById("title-form");

titleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const newTitle = document.getElementById("page-title").value;
  
  setDoc(doc(db, "config", "titulo"), { valor: newTitle })
    .then(() => {
      titleForm.reset();
      alert("Título actualizado");
    })
    .catch(error => console.error("Error al actualizar el título: ", error));
});


// Añadir entrada al blog
const blogForm = document.getElementById("blog-form");
blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const title = document.getElementById("blog-title").value;
  const content = document.getElementById("blog-content").value;

  // Añadir entrada al blog
  addDoc(collection(db, "blog"), { titulo: title, contenido: content })
    .then(() => {
      blogForm.reset();
      loadBlogPosts();
    })
    .catch(error => console.error("Error al agregar entrada al blog: ", error));
});

// Cargar y mostrar productos
function loadProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  getDocs(collection(db, "productos")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
        <h3>${product.nombre}</h3>
        <p>Precio: $${product.precio}</p>
        <img src="${product.imagen}" alt="${product.nombre}" width="100">
        <button onclick="deleteProduct('${doc.id}')">Eliminar</button>
      `;
      productList.appendChild(productDiv);
    });
  });
}

// Cargar y mostrar entradas del blog
function loadBlogPosts() {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = "";

  getDocs(collection(db, "blog")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postDiv = document.createElement("div");
      postDiv.innerHTML = `
        <h3>${post.titulo}</h3>
        <p>${post.contenido}</p>
        <button onclick="deleteBlogPost('${doc.id}')">Eliminar</button>
      `;
      blogList.appendChild(postDiv);
    });
  });
}

// Eliminar producto
window.deleteProduct = (id) => {
  deleteDoc(doc(db, "productos", id)).then(() => {
    loadProducts();
  });
}

// Eliminar entrada del blog
window.deleteBlogPost = (id) => {
  deleteDoc(doc(db, "blog", id)).then(() => {
    loadBlogPosts();
  });
}
