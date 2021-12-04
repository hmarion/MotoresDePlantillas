document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.querySelector('#addProduct');
    let data = new FormData(form);
    let prod = {title: data.get('title'), price: data.get('price'), thumbnail: data.get('thumbnail')}
    fetch('http://localhost:8080/api/productos', {
        method:'POST',
        body: JSON.stringify(prod)
    }).then(result=>{
        return result.json();
    }).then(json=>{
        Swal.fire({
            title: 'Exito',
            texto: 'Producto Registrado',
            timer: 2000
        }).then(result=>{
            location.href='/'
        })
    })
})