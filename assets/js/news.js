const form = document.getElementById("news_erstellen_form_modal");



    // Funktion zum Abrufen der Seiten-IDs
    function getSeitenIds() {
      axios.get("http://192.168.0.159:3001/api/news/seiten")
        .then((response) => {
          const seitenIds = response.data;
         

          seitenIds.forEach((seitenId) => {      
            listItem.textContent = seitenId;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }





// Funktion zum Abrufen aller Nachrichten
function getNachrichten() {
  axios
    .get("http://192.168.0.159:3001/api/news/nachrichten/${nachricht._Id}")
    .then((response) => {
      const nachrichten = response.data;
      

      const nachrichtenListe = document.getElementById("newsList");
      nachrichtenListe.innerHTML = "";

      nachrichten.forEach((nachricht, seitenId) => {
        const listItem = document.createElement("div");
        listItem.innerHTML =   (`
          <div class="col-mb-4">
            <div>
              <a href="#">
                <img class="rounded img-fluid shadow w-100 fit-cover" src="../products/1.jpg" style="height: 250px;" />
              </a>

              <div class="py-4">
                <span class="badge bg-primary mb-2">${nachricht.tag} </span>
                <h4 class="fw-bold">${nachricht.titel}</h4>
                <p class="text-muted">${nachricht.inhalt}</p>
                <div class="row d-flex flex-grow m-auto">
                  <div class="row">
                    <div class="col">
                      <div class="btn-group d-flex" role="group">
                        <button id="news_edit_btn" class="btn btn-info float-start" type="button" "editNachricht('${nachricht._id}')">Bearbeiten</button>

                        <button id="news_show_news_page" class="btn btn-primary" float-start" type="button" onclick="ShowPage('${seitenId}')">Mehr lesen</button>

                        <button id="news_delte_Btn" class="btn btn-danger float-end" type="button" onclick="deleteNachrichten('${nachricht._id}')">Löschens</button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>`);

        nachrichtenListe.appendChild(listItem);
      
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
getNachrichten();


function deleteNachrichten(nachrichtId) {
  axios
    .delete(`http://192.168.0.159:3001/api/news/nachrichten/${nachrichtId}`)
    .then((response) => {
      console.log(response);
      getNachrichten();
    })
    .catch((error) => {
      console.log(error);
    });
}

function ShowPage(seitenId) {
  window.open(`http://192.168.0.159:3001/api/seite/pages/${seitenId}`);
}


function createNachrichten() {
  console.log("bereit für die Erstellung von Nachrichten");
  const mcs = document.getElementById("mcs");
  mcs.addEventListener("click", function (event) {
    event.preventDefault();

    const formData = {
      titel: $("#titel").val(),
      inhalt: $("#inhalt").val(),
    };
    console.log(formData);

    axios
      .post("http://192.168.0.159:3001/api/news/create", formData)
      .then((response) => {
        console.log(response.data);
        getNachrichten();
        closeForm();
        resetForm();
        alert("Nachricht wurde erstellt");
      })
      .catch((error) => {
        console.log(error);
        alert("Nachricht wurde nicht erstellt");
      });
  });
}

  function closeForm() {
  const modal = document.getElementById("NEM");
  if (modal) {
    modal.style.display = "none";
  }
}

function resetForm() {
  const form = document.getElementById("NEM");
  document.getElementById("titel").value = "";
  document.getElementById("inhalt").value = "";
  form.reset();
}

