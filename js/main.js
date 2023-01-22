let envase = document.querySelectorAll('.envase');
let productoEnvase = document.querySelector('#productoEnvase');
let productoPrecio = document.querySelector('#productoPrecio');
let productoSabores = document.querySelector('#productoSabores');

let helado = {
    sabores:[],
    envase:'',
    precio:'',
}

if(localStorage.getItem('helado') && localStorage.getItem('helado') !== undefined) {
    helado = JSON.parse(localStorage.getItem('helado'));
    
    productoEnvase.innerHTML = `${helado.envase}`;
    productoPrecio.innerHTML = `${helado.precio}`;
    productoSabores.innerHTML = `<li>-${helado.sabores[0]}</li>\n<li>-${helado.sabores[1]}</li>\n<li>-${helado.sabores[2]}</li>`;

}

envase.forEach(e => {
    e.addEventListener('click', c => {
        envase.forEach(e => {
            e.classList.remove('active')
        });
        e.classList.toggle('active');

        switch (e.id) {
            case '1-4kg':
                helado.envase = '1/4kg';
                helado.precio = '$10';
                break;
            case '1-2kg':
                helado.envase = '1/2kg';
                helado.precio = '$20';
                break;
            case '1kg':
                helado.envase = '1kg';
                helado.precio = '$30';
                break;
        };

        productoEnvase.innerHTML = `${helado.envase}`;
        productoPrecio.innerHTML = `${helado.precio}`;
        localStorage.setItem('helado', JSON.stringify(helado));
    });
});

let sabores = document.querySelectorAll('.sabor');

function checkLimit() {
    let selected = 0;

    for(let i = 0; i < sabores.length; i++) {
        if(sabores[i].checked == true) {
            selected += 1;
        }
    }
    if(selected > 3) {
        return false;
    };
    if(selected == 3) {
        let arraySabores = [];
        sabores.forEach(s => {
            if (s.checked == true) {
                arraySabores.push(s.id.toString());
            };
        });
        helado.sabores = arraySabores;
        localStorage.setItem('helado', JSON.stringify(helado));
        productoSabores.innerHTML = `<li>-${helado.sabores[0]}</li>\n<li>-${helado.sabores[1]}</li>\n<li>-${helado.sabores[2]}</li>`;
    } else {
        helado.sabores = [];
        localStorage.setItem('helado', JSON.stringify(helado));
        productoSabores.innerHTML = `<li>-</li>\n<li>-</li>\n<li>-</li>`;
    };
};