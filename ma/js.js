this.window.onload= function(){
    fetch("https://nodejs.sulla.hu/data")
    .then(function(valasz){
        return valasz.json()
    })
    .then(function(valasz2){
        for (const adat of valasz2) {
            console.log(adat)
            document.getElementById("adatok").innerHTML += 
            ` <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${adat.name}</h5>
              <a  target="blank" href="www.${adat.hostname}">Weblap</a>
              <p>${adat.location}</p>
              <p>${adat.price} Ft</p>
              <p>Minimum éjszakák száma ${adat.minimum_nights}</p> 
              <button id="torles" onclick="Torles(${adat.id})" class="btn btn-primary"> Törlés</button>
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