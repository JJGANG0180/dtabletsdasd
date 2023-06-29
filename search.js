

function DisplayAmount() {
    newtable = document.getElementById("usertable");
trv2 = newtable.getElementsByTagName("tr");
nonevisible = trv2.length
totalDisplay = 0
totalDisplay += 1;
for (i = 0; i < trv2.length; i++) {
    if (trv2[i].style.display == "none") {
        totalDisplay += 1;
    }
}
console.log("TotalDisplay: " + totalDisplay)
    return totalDisplay;
}



        function SearchForEmployeee() {
            console.log("CALLED SEARCH")
                // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            if (document.getElementById("search_text") != null) {
                input = document.getElementById("search_text");

                filter = input.value.toUpperCase();
                table = document.getElementById("usertable");
                tr = table.getElementsByTagName("tr");
                // if (DisplayAmount() === tr.length) {
                //     //DisplayAmount() //hvis den kommer tilbage med antallet af trs så de alle skjult
                //     headlabel.style.display = "none";
                // }
                    // Loop through all table rows, and hide those who don't match the search query
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[0];
                    //th = tr[i].getElementsByTagName("th")[0];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                            //th[i].style.display = "";
                            //headlabel.style.display = "";
                            //nousers.style.display = "none";

                            console.log("IKKE SYNLIG: DISPLAY = '' " + tr[i])
                        } else {
                            tr[i].style.display = "none";
                            //th[i].style.display = "none";
                            console.log("NONE:" + tr[i])
                            //headlabel.style.display = "none;";
                            //nousers.style.display = "";
                            
                            
                        }
                    }
                
                }
                nousers = document.getElementById("nousersfound")
                headlabel = document.getElementById("headlabel")
                console.log("DISPLAY: " + DisplayAmount())
                console.log("LENGTH: " + tr.length)
                if (DisplayAmount()+1 > tr.length) {
                    //DisplayAmount() //hvis den kommer tilbage med antallet af trs så de alle skjult
                    headlabel.style.display = "none";
                    nousers.style.display = "";

                } else {
                    headlabel.style.display = "";
                    nousers.style.display = "none";

                }


            } else {
                return;
            }
        }
document.getElementById("search_text").addEventListener("change", SearchForEmployeee);
document.getElementById("search_text").addEventListener("keydown", SearchForEmployeee);
document.getElementById("search_text").addEventListener("keyup", SearchForEmployeee);

// keydown
// keyup


// onchange="SearchForEmployeee()" onkeydown="SearchForEmployeee()" onkeyup="SearchForEmployeee()"
// onkeydown
// onkeyup
