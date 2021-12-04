document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.querySelector('#addProduct');
    let data = new FormData(form);
    fetch('http://localhost:8080/api/productos', {
        method:'POST',
        body: data
    }).then(result=>{
        return result.json();
    }).then(json=>{
        Swal.fire({
            title: 'Exito',
            texto: json.message,
            icon: 'success',
            timer: 2000
        }).then(result=>{
            location.href='/'
        })
    })
})