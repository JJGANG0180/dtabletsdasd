document.querySelectorAll('button[html-onclick]').forEach(el => el.onclick = () => {
  //console.log(el.getAttribute('gayonclick'))
  eval(el.getAttribute('html-onclick'))
})

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

var addObj = {};

var added = []
var drugs = []

var prisonAmount = 0;
var ticketAmount = 0;
var klipAmount = 0;

var status = "";
var comment = "";

function addToPenalty(id, prison, ticket, klip, sigtet, paragaraf) {
  added.push(id);

  const div = document.createElement('div');
  div.className = 'case';

  if (paragaraf == null) {
    paragaraf = '';
  } else {
    paragaraf = paragaraf + ' - ';
  }

  div.innerHTML = `
    <h2>` + paragaraf + sigtet + `</h2>
    <div class="info">
      <p>Fængsel: ` + prison + ` Måneder</p>
      <p>Bøde: ` + ticket + `,- DKK</p>
      <p>Klip: ` + klip + `</p>
      <button class="btn btn-success btn-sm" onclick="removeFromPenalty('` + id + `', ` + prison + `, ` + ticket + `, ` + klip + `, this)">Fjern sigtelse</button>
    </div>
  `;

  document.getElementById('cases').appendChild(div);

  prisonAmount = prisonAmount + prison;
  ticketAmount = ticketAmount + ticket;
  klipAmount = klipAmount + klip;

  let formattedPrice = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(ticketAmount)

  document.getElementById("prison").innerHTML = prisonAmount;
  document.getElementById("ticket").innerHTML = formattedPrice;
  document.getElementById("klip").innerHTML = klipAmount;
}

function removeFromPenalty(id, prison, ticket, klip, input) {
  const index = added.indexOf(id);
  if (index > -1) {
    added.splice(index, 1);
  }

  document.getElementById('cases').removeChild(input.parentNode.parentNode);

  prisonAmount = prisonAmount - prison;
  ticketAmount = ticketAmount - ticket;
  klipAmount = klipAmount - klip;

  let formattedPrice = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(ticketAmount)

  document.getElementById("prison").innerHTML = prisonAmount;
  document.getElementById("ticket").innerHTML = formattedPrice;
  document.getElementById("klip").innerHTML = klipAmount;
}

function addDrugs(id, ticket, prison, sigtet) {
  var prisonFinal;
  var ticketFinal;

  (async () => {
    const { value: drugAmount } = await Swal.fire({
      title: 'Indtast antal',
      input: 'number',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })

    if (drugAmount) {
      prisonFinal = 0
      if (prison != 0) {
        prisonFinal = Math.floor(drugAmount / prison);
      }

      ticketFinal = ticket * drugAmount;
      sigtet = drugAmount +"x "+ sigtet;

      drugs.push(drugAmount);
      addToPenalty(sigtet, prisonFinal, ticketFinal, 0, sigtet)
    }
  })()
}

function addMisc(id) {
  var prisonFinal = 0;
  var ticketFinal = 0;
  var klipFinal = 0;

  var sigtet;

  if (id == -1) {
    (async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Indtast Fart strafferamme',
        html:
          '<input id="swal-input1" placeholder="Bøde" class="swal2-input">' +
          '<input id="swal-input2" placeholder="Klip" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value || 0,
            document.getElementById('swal-input2').value || 0
          ]
        }
      })

      if (formValues) {
        ticketFinal = parseInt(formValues[0]);
        klipFinal = parseInt(formValues[1]);

        sigtet = "Fartbøde: Bøde: " + ticketFinal + " Klip: " + klipFinal;

        addToPenalty(id, prisonFinal, ticketFinal, klipFinal, sigtet)
      }

    })()
  }

  if (id == -2) {
    (async () => {
      const { value: ticket } = await Swal.fire({
        title: 'Indtast antal',
        input: 'number',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })

      if (ticket) {
        ticketFinal = parseInt(ticket);
        ticketFinal = -Math.abs(ticketFinal);

        sigtet = "Nedsætning af bøde: " + ticketFinal;

        addToPenalty(id, prisonFinal, ticketFinal, klipFinal, sigtet)
      }
    })()
  }

  if (id == -3) {
    (async () => {
      const { value: prison } = await Swal.fire({
        title: 'Indtast antal',
        input: 'number',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })

      if (prison) {
        prisonFinal = parseInt(prison);
        prisonFinal = -Math.abs(prisonFinal);

        sigtet = "Nedsætning af fængselsstraf: " + prisonFinal;

        addToPenalty(id, prisonFinal, ticketFinal, klipFinal, sigtet)
      }
    })()
  }
}

function addStatus() {
  (async () => {

    const { value: fruit } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        betingetbil: 'Betinget frakendelse bil',
        betingetmc: 'Betinget frakendelse MC',
        betingetlastbil: 'Betinget frakendelse Lastbil',
        ubetinget: 'Ubetinget Frakendelse',
        none: 'Ingen aktiv frakendelse'
      },
      inputPlaceholder: 'Vælg en frakendelse',
      showCancelButton: true,
    })

    if (fruit) {
      var id;
      var sigtet;

      if (fruit == 'betingetbil') {
        id = -4;
        status = "Betinget frakendelse af Bil";
      } else if (fruit == 'betingetmc') {
        id = -5;
        status = "Betinget frakendelse af Motorcykel";
      } else if (fruit == 'betingetlastbil') {
        id = -6;
        status = "Betinget frakendelse af Lastbil";
      } else if (fruit == 'ubetinget') {
        id = -7;
        status = "Ubetinget frakendelse";
      } else if (fruit == 'none') {
        id = -8;
        status = "Ingen aktiv frakendelse";
      }

      sigtet = status;

      addToPenalty(id, 0, 0, 0, sigtet)
    }

  })()
}

function addComment() {
  (async () => {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Skriv en kommentar...',
      inputAttributes: {
        'aria-label': 'Skriv en kommentar'
      },
      showCancelButton: true
    })

    if (text) {
      comment = text;
    }
  })()
}

function prepareAdding() {
  //var myJSON = JSON.stringify(added);
  //window.location.href = "https://data.danishrp.dk/police/pages/addKrimi.php?player=" + 1585 + "&type=" + type + "&cases=" + myJSON + "&ticket=" + ticketAmount + "&prison=" + prisonAmount + "&klip=" + klipAmount + "&status=" + status + "&comment=" + comment;
  //window.location.href = "https://localhost/police/pages/addKrimi.php?player=" + 1585 + "&type=" + type + "&cases=" + myJSON + "&ticket=" + ticketAmount + "&prison=" + prisonAmount + "&klip=" + klipAmount + "&status=" + status + "&comment=" + comment;

  
  const [ addType ] = window.location.pathname.split('/').slice(-2, -1)


  if (addType === 'record') {
    console.log(added.filter(v => typeof v === 'string').join(' - '))
    console.log(comment)
    fetch(`/api/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crid: CROOK_ID,
        charges: added.filter(v => typeof v === 'string').join(' - '),
        fine: ticketAmount,
        prison: prisonAmount,
        strikes: klipAmount,
        suspension: status,
        comment

      })
    }).then(res => window.location.href = '/crook/' + CROOK_ID)

  } else {
    fetch(`/api/wanted?crude=false`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crid: CROOK_ID,
        sigtet: added.filter(v => typeof v === 'string').join(' - '),
        ticket: ticketAmount,
        prison: prisonAmount,
        frakendelse: status,
        reason: comment

      })
    }).then(res => window.location.href = '/crook/' + CROOK_ID)
  }

}

/* {
  dato,
  target
} */
