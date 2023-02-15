
const dolgozoTorzs = document.querySelector("#dolgozoTorzs");  // lérehozunk változókat amikhez ...
const nameInput = document.querySelector("#name");             // ...hozzárendeljük az index.html-ben levő...
const cityInput = document.querySelector("#city");             // ...elemeket, az id-jük alapján.
const salaryInput = document.querySelector("#salary");         // a #salary pl. ez: id="salary"
const addButton = document.querySelector("#addButton");        // ezek az új dolgozók hozzáadásáshoz vannak

const modIdInput = document.querySelector("#modifyId");        // ugyanaz csak a módosító gombokra
const modNameInput = document.querySelector("#modifyName");
const modCityInput = document.querySelector("#modifyCity");
const modSalaryInput = document.querySelector("#modifySalary");
const modButton = document.querySelector("#modButton");

const dolgozoLista = [
    { id: 1, name: "Pali", city: "Szolnok", salary: 385 },// ahhoz, hogy működjön a törlés gomb, id-kal kell adni
    { id: 2, name: "Kati", city: "Szolnok", salary: 320 },
    { id: 3, name: "Mari", city: "Szeged", salary: 395 },
    { id: 4, name: "Dani", city: "Szeged", salary: 401 },
    { id: 5, name: "Atti", city: "Miskolc", salary: 372 },
    { id: 6, name: "Pisti", city: "Szolnok", salary: 357 },
    { id: 7, name: "Géza", city: "Pécs", salary: 325 }
];

function loadEmployees() {                              // csinálunk egy függvéyt ami létrehozza a dolgozók tábláját
    dolgozoLista.forEach((dolgozo) => {                 // 'foreach' ciklussal végigmegyünk a tömb elemein
                                                        // ez annyiban különbözik a sima for-tól hogy nem kell megadni kezdeti és végső...
                                                        // ...értéket neki. Sorban végigmegy a tömb sorain, és sosronként eltárolja ...
                                                        // ... a 'dolgozo' változóba
        let tr = document.createElement('tr');          // a tr változóban létrehozzuk a táblázat egy sorát
        let tdName = document.createElement('td');      // a tdName-ben egy oszlopot a neveknek
        let tdCity = document.createElement('td');      // a városnak
        let tdSalary = document.createElement('td');    // és a fizunak
        tdName.textContent = dolgozo.name;              // a nevet tartalmazó változónak szövegként átadjuk a tömb aktuális sorát...
                                                        // ... ami a 'dolgozo' változóban van. Itt most a nevet adjuk át amit a .name -vel
        tdCity.textContent = dolgozo.city;              // ua. csak város és fizu
        tdSalary.textContent = dolgozo.salary;
        dolgozoTorzs.append(tr);                        // a dolgozoTorzs elemhez /index.html-ben/ hozzáadjuk az előbb legenerált...
                                                        // ... táblázat sort
        tr.append(tdName);                              // ebbe a sorba rakjuk a név, város, fizut tartalmazó oszlopokat
        tr.append(tdCity);
        tr.append(tdSalary);
        tr.append(generateDeleteButton(dolgozo.id));    // meghívjuk a függvényt ami generál törlés gombot és átadjuk neki az aktuális 
                                                        // ... dolgozó 'id'-jét. Ez alapján azonosítjuk majd hogy melyiket töröljük
        tr.append(generateModifyButton(dolgozo));       // ua. csak ez a módosító gombokat hozza létre, ide az egész 'dolgozo' -t kell...
                                                        // ...átadni mert minden adatára szükség van hogy tudjuk módosítani.
    });
}

loadEmployees();                                        // itt meghívjuk a fenti függvényt (a függvények maguktól nem futnak le, csak akkor ha meghívjuk)

function generateDeleteButton(id){                      // a törlés gomb létrehozó függvénye, ami megkapja a fent átadott 'id'-t
    let tdDel = document.createElement('td');           // létrehozunk a gombnak egy táblázat oszlopot ...
    let button = document.createElement('button');      // ...és egy gombot amit majd később belerakunk
    button.textContent = "Törlés";                      // a gomb a 'Törlés' szöveget kapja
    button.classList = "btn btn-danger";                // és adunk neki egy osztályt amiben a Bs formázását rakjuk
    handleDeleteEvent(button, id);                      // meghívjuk az eseménykezelő függvényt ami figyeli a gomb lenyomását, amit az 'id' alapján azonosít
    tdDel.append(button);                               // a létrehozott táblázat oszlopba tesszük a gombot
    return tdDel;                                       // és ezt az egészet visszaküldjük a táblázatot létrehozó függvénynek: "loadEmployees()"
}

function generateModifyButton(dolgozo){                 // kb ugyanaz mint a törlés gombokhoz írt függvény...
    let tdMod = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = "Módosít";
    button.classList = "btn btn-warning";
    button.setAttribute("data-bs-toggle", "modal");     // ... csak itt a megfelelő Bs adatok segítségével felugrik az ablak...
    button.setAttribute("data-bs-target", "#modifyModal");  // ... amiben módosítjuk a dolgozó adatait
    handleModifyEvent(button, dolgozo);                 // hozzáadjuk az eseménykezelő függvényt ami figyeli a gomb lenyomását        
    tdMod.append(button);                               // a létrehozott táblázat oszlopba tesszük a gombot
    return tdMod;                                       // és ezt az egészet visszaküldjük a táblázatot létrehozó függvénynek: "loadEmployees()"

}

function handleDeleteEvent(button, id){                 // a törlés gomb lenyomását figyelő függvény
    button.addEventListener('click', () => {            // a 'click' eseményre egy névtelen függvény hívódik meg...
       let delIndex = 0;
       dolgozoLista.forEach((dolgozo, index) => {       // ... ami végigmegy a dolgozoLista tömbön és megkeresi azt a sorát ...
            if(dolgozo.id == id){                       // ... ami azt az 'id'-t tartalmazza amit megkapott a függvény
                delIndex = index;                       // ennek az index-ét (index: a tömb "sorszáma" mindig 0-val kezdődik)
            }
       })
       dolgozoTorzs.textContent = "";                   // töröljük a létrehozott táblázatot, azért hogy az újat megjelenítsük
       dolgozoLista.splice(delIndex, 1);                // töröljük a tömb sorát
       loadEmployees();                                 // és létrehozzuk az új táblázatot amiben már nincs benne a törölt elem

    });
}

function handleModifyEvent(button, dolgozo){            // ez a módosít gomb megnyomására fut le
    button.addEventListener('click', () => {            // a 'click' eseményre egy névtelen függvény hívódik meg...
        modIdInput.value = dolgozo.id;                  // ... ami átadja a megfelelő <input> elemeknek az értéket
        modNameInput.value = dolgozo.name;              // magyarul megjelennek a felugró ablakban a kitöltött input mezők...
        modCityInput.value = dolgozo.city;              // ...amik epekedve várják hogy módosítsuk őket
        modSalaryInput.value = dolgozo.salary;
    
    });
}




addButton.addEventListener('click', () => {             // ha megmyomjuk a 'hozzáad' gombot akkor meghívja a dolgozó hozzáadása függvényt...
    addEmployee();
});

function addEmployee() {                                // ezt 
    dolgozo = {                                         // csinálunk egy olyan változót ami megfelel a tömbünk egy sorának
        name: nameInput.value,                          // megkapják az input mezők értékeit '.value'
        city: cityInput.value,
        salary: salaryInput.value
    };
    dolgozoLista.push(dolgozo);                         // a 'push'-al adunk hozzá egy tömbhöz új sort
    clearFields();                                      // meghívjuk a függvényt ami törli a bevitt adatokat az input-okból...
    dolgozoTorzs.textContent = "";                      // töröljük a táblázatot...
    loadEmployees();                                    // ...és létrehozzuk újra, ebben már benne lesz a hozzáadott dolgozó
}

function clearFields() {                                // az <input>-ok értékét semmire állítjuk, azaz töröljük
    nameInput.value = "";
    cityInput.value = "";
    salaryInput.value = "";
}