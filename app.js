document.getElementById("searchButton").addEventListener("click", function () {
    fetch("superheroes.php")
        .then(response => response.text())
        .then(data => {
            // Show the list of superheroes in an alert
            alert(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});