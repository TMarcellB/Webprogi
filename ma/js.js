this.window.onload= function(){
    fetch("https://nodejs.sulla.hu/data")
    .then(function(valasz){
        return valasz.json()
    })
    .then(function(valasz2){
        for (const adat of valasz2) {
            console.log(adat)
            document.getElementById("adatok").innerHTML += 
            ` <div class="card " style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${adat.name}</h5>
              <a  target="blank" href="http://www.${adat.hostname}">Weblap</a>
              <p>${adat.location}</p>
              <p>${adat.price} Ft</p>
              <p>Minimum éjszakák száma ${adat.minimum_nights}</p> 
              <button id="torles" onclick="Torles(${adat.id})" class="btn btn-primary"> Törlés</button>
              <button class="btn"  alt="Módosítás" onclick="FetchPUTatvezet(${adat.id})">Módos</button>
            </div>`;
        }
    })}

    function Torles(id){   
        fetch("https://nodejs.sulla.hu/data/"+id,{
            method: "Delete",
        })
        
    }
    document.getElementById("Feltoltes").onclick = function(){
        let feltoltes = JSON.stringify({
            name : document.getElementById("name").value,
            hostname : document.getElementById("hostname").value,
            location : document.getElementById("location").value,
            price : document.getElementById("price").value,
            minimum_nights : document.getElementById("minimum").value,
            
        })
        
        
        
        console.log(feltoltes)
        fetch("https://nodejs.sulla.hu/data",{
            method: "POST",
            body: feltoltes,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(valasz) {
            return valasz.json()
        })
    }
    function FetchPUTatvezet(azon) {
        localStorage.setItem("azon", azon);
        console.log(localStorage.getItem("azon"));
    
        window.open("felvitel.html","_self")
    }
    
    if((localStorage.getItem("azon") > -1) && window.location.href.includes("felvitel.html"))
    {
        fetch("http://nodejs.sulla.hu/data/"+localStorage.getItem("azon"))
        .then(function(valasz){
        return valasz.json();
        })
        .then(function(valasz2){
        console.log(valasz2);
        document.getElementById("name").value = valasz2.name;
        document.getElementById("hostname").value = valasz2.hostname;
        document.getElementById("location").value = valasz2.location;
        document.getElementById("price").value = valasz2.price;
        document.getElementById("minimum").value = valasz2.minimum_nights;
        })
        document.getElementById("Feltoltes").innerText="PUT";
        document.getElementById("Feltoltes").setAttribute('onclick','FetchPUT()')
    }
    
    function FetchPUT() {
        let adatok = JSON.stringify({
            name: document.getElementById("name").value,
            hostname: document.getElementById("hostname").value,
            location: document.getElementById("location").value,
            price: document.getElementById("price").value,
            minimum_nights: document.getElementById("minimum").value
        })
        fetch("http://nodejs.sulla.hu/data/"+localStorage.getItem("azon"),
        {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: adatok,
        })
        .then(
            alert("Sikeres módosítás!"),
            localStorage.setItem("azon", -1),
            console.log(localStorage.getItem("azon")),
            document.getElementById("name").value = "",
            document.getElementById("hostname").value = "",
            document.getElementById("location").value = "",
            document.getElementById("price").value = "",
            document.getElementById("minimum").value = "",
            location.reload()
        )
    }