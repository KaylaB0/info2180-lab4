document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("search-btn").addEventListener("click", function() {
        const searchInput = document.getElementById("search-input").value.trim();
        const sanitizedQuery = encodeURIComponent(searchInput);

        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = ''; // Clear previous results

            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                if (response.length === 0) {
                    resultDiv.innerHTML = '<p class="error">SUPERHERO NOT FOUND</p>';
                } else if (typeof response[0] === "string") {
                    // If the response is a list of names (no query input)
                    let listHtml = '<h2>RESULT</h2><hr><ul>';
                    response.forEach(alias => {
                        listHtml += `<li>${alias}</li>`;
                    });
                    listHtml += '</ul>';
                    resultDiv.innerHTML = listHtml;
                } else {
                    // If specific heroes are returned (with query input)
                    const hero = response[0];
                    resultDiv.innerHTML = `
                        <h2>RESULT</h2><hr>
                        <h3>${hero.alias.toUpperCase()}</h3>
                        <h4>A.K.A ${hero.name}</h4>
                        <p>${hero.biography}</p>
                    `;
                }
            } else {
                resultDiv.innerHTML = '<p class="error">An error occurred while trying to fetch the data.</p>';
            }
        };

        // Send AJAX request with or without a query
        xhr.open("GET", `superheroes.php?query=${sanitizedQuery}`, true);
        xhr.send();
    });
});
