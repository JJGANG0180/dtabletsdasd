async function changestatus(inputid, currentstatus) {
  let r = document.getElementById('wantedveh_' + inputid).textContent;
  let l = await fetch("/api/wantedVehicles", {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        wantedid: inputid,
        status: currentstatus
    })
});
document.location.reload()
// 200 === l.status && n(r)
}



async function changestatus2(inputid, currentstatus) {
    let r = document.getElementById('wantedppl_' + inputid).textContent;
    let l = await fetch("/api/wanted/changestatus", {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          wantedid: inputid,
          status: currentstatus
      })
  });
  document.location.reload()
  // 200 === l.status && n(r)
  }
  
