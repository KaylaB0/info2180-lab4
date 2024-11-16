document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchField = document.getElementById("searchField");
    const resultDiv = document.getElementById("result");

    searchBtn.addEventListener("click", () => {
        fetch('superheroes.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(data => {
                const query = searchField.value.trim().toLowerCase();
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const superheroes = Array.from(doc.querySelectorAll('li')).map(li => li.textContent);

                if (query === '') {
                    // Display the full list if no query is provided
                    resultDiv.innerHTML = '<ul>' + superheroes.map(hero => `<li>${hero}</li>`).join('') + '</ul>';
                } else {
                    // Find matching superhero
                    const matches = superheroes.filter(hero => hero.toLowerCase().includes(query));
                    if (matches.length > 0) {
                        resultDiv.innerHTML = '<ul>' + matches.map(hero => `<li>${hero}</li>`).join('') + '</ul>';
                    } else {
                        resultDiv.innerHTML = '<p>Superhero not found</p>';
                    }
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
                resultDiv.innerHTML = "<p>There was an error fetching the data.</p>";
            });
    });
});