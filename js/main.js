let productoPrecio = document.getElementById('productoPrecio');
let productoSabores = document.getElementById('productoSabores');
let productoEnvase = document.getElementById('productoEnvase');
let envases = document.querySelectorAll('.envase');
let sabor = document.querySelectorAll('.sabor');
let carritoNavBtn = document.getElementById('carritoNavBtn');
let carritoLista = document.getElementById('carritoLista');
let helados = 0;
let total = 0;
let btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
let totalCarrito = document.getElementById('carritoTotal');

class Helado {
    constructor(envase, sabores){
        this.envase = envase;
        this.sabores = sabores;
        this.precio = 0;
    };

    colocarPrecio() {
        switch (this.envase) {
            case '1-4kg':
                this.precio = 10;
                break;
            case '1-2kg':
                this.precio = 20;
                break;
            case '1kg':
                this.precio = 30;
                break;
        }
    };

    colocarValoresEnVistaPrevia() {
        if(this.envase != '-') {
            productoEnvase.innerHTML = this.envase.replace('-', '/');
        } else {
            productoEnvase.innerHTML = this.envase
        }

        let arraySaboresVistaPrevia = [];

        function addSabor (sabor) {
            arraySaboresVistaPrevia.push(sabor)
        };

        for (let s of this.sabores) {
            switch (s) {
                case 'chocolate':
                    addSabor('Chocolate');
                    break;
                case 'cremaAmericana':
                    addSabor('Crema americana');
                    break;
                case 'dulceDeLeche':
                    addSabor('Dulce de leche');
                    break;
                case 'frutilla':
                    addSabor('Frutilla');
                    break;
                case 'granizado':
                    addSabor('Granizado');
                    break;
                case 'vainilla':
                    addSabor('Vainilla');
                    break;
                default:
                    addSabor('')
                    break;
            };
        };

        productoSabores.innerHTML = `<li>-${arraySaboresVistaPrevia[0]}</li>\n<li>-${arraySaboresVistaPrevia[1]}</li>\n<li>-${arraySaboresVistaPrevia[2]}</li>`;
        productoPrecio.innerHTML = '$' + this.precio;
    };

    resetear() {
        this.envase = '-';
        this.sabores = ['', '', ''];
        this.precio = 0;
        envases.forEach(e => {
            e.classList.remove('active')
        });
        sabor.forEach(s => {
            s.checked = false;
        });
        heladoVistaPrevia.colocarValoresEnVistaPrevia();
    };
};

heladoVistaPrevia = new Helado('-', ['', '', '']);


// Esta función sirve para colocar los sabores del helado
function checkLimit() {
    let i = 0;

    sabor.forEach(s => {
        if (s.checked) {
            i++
        }     
    });

    if (i < 3) {
        heladoVistaPrevia.sabores = ['', '', ''];
        heladoVistaPrevia.colocarValoresEnVistaPrevia();
    }

    if (i == 3) {
        arraySabores = [];

        sabor.forEach(s => {
            if (s.checked) {
                arraySabores.push(s.id);
            };
        });

        heladoVistaPrevia.sabores = arraySabores;
        heladoVistaPrevia.colocarValoresEnVistaPrevia();
    };

    if (i > 3) {
        return false;
    };
}


// Para colocar el envase del helado
envases.forEach(env => {
    env.addEventListener('click', () => {

        if (env.classList.contains('active')) {
            heladoVistaPrevia.precio = 0;
            heladoVistaPrevia.envase = '-';
            heladoVistaPrevia.colocarValoresEnVistaPrevia();
            return env.classList.remove('active');
        } else {
            envases.forEach(env => {
                env.classList.remove('active');
            });
        };

        env.classList.add('active');
        heladoVistaPrevia.envase = env.id;
        heladoVistaPrevia.colocarPrecio();
        heladoVistaPrevia.colocarValoresEnVistaPrevia();

    })
});

// Para actualizar el contador de helados
function contadorCarrito () {
    let heladosConteo = document.getElementById('heladosConteo')
    if (helados == 0) {
        heladosConteo.style.opacity = 0;
    } else {
        if (heladosConteo.style.opacity == 0) {
            heladosConteo.style.opacity = 1;
        };
        heladosConteo.innerHTML = `${helados}`;
    }
}

// Funcion para guardar en localstorage
function LSadd () {
    localStorage.setItem('carrito', carritoLista.innerHTML);
    localStorage.setItem('total', total);
    localStorage.setItem('helados', helados);
};
function LSget () {
    if (localStorage.getItem('carrito')) {
        let LScarrito = localStorage.getItem('carrito');
        let LStotal = localStorage.getItem('total');
        let LShelados = localStorage.getItem('helados');
    
        carritoLista.innerHTML = LScarrito;

        total = parseInt(LStotal);
        totalCarrito.innerHTML = `Total: $${total}`;

        helados = LShelados;
        contadorCarrito();
    } else return;
};

LSget();


// Para agregar el producto a la lista
btnAgregarCarrito.addEventListener('click', () => {

    if (heladoVistaPrevia.envase != '-') {
        if(heladoVistaPrevia.sabores[0] != '') {
            helados++;
            contadorCarrito();

            let producto = document.createElement('li');
            producto.classList.add('carritoProducto');

            let envase = document.createElement('span');
            envase.classList.add('carritoEnvase');
            envase.textContent = `${heladoVistaPrevia.envase.replace('-', '/')}`

            let sabores = document.createElement('span');
            sabores.classList.add('carritoSabores');

            let listaSabores = () => {
                let listaSabores = [];

                function addSabor (sabor) {
                    listaSabores.push(sabor)
                };

                for (let s of heladoVistaPrevia.sabores) {
                    switch (s) {
                        case 'chocolate':
                            addSabor('Chocolate');
                            break;
                        case 'cremaAmericana':
                            addSabor('Crema americana');
                            break;
                        case 'dulceDeLeche':
                            addSabor('Dulce de leche');
                            break;
                        case 'frutilla':
                            addSabor('Frutilla');
                            break;
                        case 'granizado':
                            addSabor('Granizado');
                            break;
                        case 'vainilla':
                            addSabor('Vainilla');
                            break;
                        default:
                            addSabor('')
                            break;
                    };
                };
                return listaSabores;
            };

            saboresCarrito = listaSabores();
            sabores.textContent = saboresCarrito.toString().replaceAll(',', ', ');

            let precio = document.createElement('span');
            precio.classList.add('carritoPrecio');
            precio.textContent = `$${heladoVistaPrevia.precio}`;

            let deleteBtn = document.createElement('div');
            deleteBtn.classList.add('carritoDelete');
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash delete"></i>';

            carritoLista.appendChild(producto);
            producto.appendChild(envase);
            producto.appendChild(sabores);
            producto.appendChild(precio);
            producto.appendChild(deleteBtn);

            total += heladoVistaPrevia.precio;
            totalCarrito.innerHTML = `Total: $${total}`;

            heladoVistaPrevia.resetear();
            LSadd();

            let carrito = document.querySelector('.carrito');
            carrito.style.right = '0px';

        } else {
            swal('¡Debes seleccionar 3 sabores!');
        };
    } else {
        swal('¡Debes seleccionar un envase!');
    }
});


// Para eliminar productos
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        helados--;
        contadorCarrito();

        let div = e.target.parentNode;
        
        div.parentNode.remove();
        let precio = div.previousSibling.textContent.slice(1, 3);
        total -= precio;
        totalCarrito.innerHTML = `Total: $${total}`;
        LSadd();
    };
});


// Abrir y cerrar ventana del carrito
carritoNavBtn.addEventListener('click', () => {
    let carrito = document.querySelector('.carrito');
    if (carrito.style.right == '-100%') {
        carrito.style.right = '0px';
    } else {
        carrito.style.right = '-100%';
    }
});


// Boton agregar mas y comprar
let agregarMasBtn = document.getElementById('agregarMasBtn');
agregarMasBtn.addEventListener('click', () => {
    let carrito = document.querySelector('.carrito');
    carrito.style.right = '-100%';
})

let comprarBtn = document.getElementById('comprarBtn');
comprarBtn.addEventListener('click', () => {
    swal('¡Compra realizada!');
    heladoVistaPrevia.resetear();
    helados = 0;
    contadorCarrito();
    total = 0;
    totalCarrito.innerHTML = `Total: $${total}`;
    carritoLista.innerHTML = '<li class="carritoTabla"><p>Envase</p><p>Sabores</p><p>Precio</p></li>';
    let carrito = document.querySelector('.carrito');
    carrito.style.right = '-100%';
    LSadd();
});