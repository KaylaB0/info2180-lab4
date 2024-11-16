document.getElementById("searchButton").addEventListener("click", function () {
    // Use the Fetch API to retrieve superhero data
    fetch("superheroes.php")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Parse as text since the PHP file returns HTML
        })
        .then(data => {
            // Display the superhero list in an alert box
            alert(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});