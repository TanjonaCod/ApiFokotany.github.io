       // Function to fetch the data
       const ApiFokontany2 = async () => {
        try {
            const dataFokontany = await fetch("js/liste_fokontany_par_commune_data.json")
            return (dataFokontany.json())
        } catch (error) {
            console.log(error);
        }
    }

    // Function to handle search and display data
    const getData = async () => {
        const dataFokontany1 = await ApiFokontany2()
        let str = JSON.stringify(dataFokontany1)
        
        const rexExp = new RegExp(`\{"commune":"[\w '-_]+","region":"[\w '-_]+","fokontany":"[\w '-_]*${document.querySelector('.clt-foko').value}[\w '-_]*","district":"[\w '-_]+"\}`, "ig")
        const stringifyData = JSON.stringify(dataFokontany1)
        const matchesValues = stringifyData.match(rexExp)
        
        let table = document.querySelector(".tbody")
        console.log(matchesValues);
        htmlContent = ''
        
        if (matchesValues && matchesValues.length > 0) {
            matchesValues.forEach(e => {
                let data = JSON.parse(e);

                htmlContent +=
                `
                    <tr>
                        <td>${data.fokontany}</td>
                        <td>${data.commune}</td>
                        <td>${data.region}</td>
                        <td>${data.district}</td>
                    </tr>
                `
            });
            table.innerHTML = htmlContent;
        } else {
            // If no results are found, show the Bootstrap modal
            table.innerHTML = '<tr><td colspan="4">Tsy misy io fokotany jerenao io</td></tr>';

        }
    }

    // Event listener to trigger search on pressing Enter
    setTimeout(() => {
        document.body.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                getData()
            }
        })
    }, 100);