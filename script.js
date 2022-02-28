function onLoadOfBody(){
    let defaultkeyword = "Agents of S.H.I.E.L.D.";
    fetch(`https://www.omdbapi.com/?apikey=34601708&s=${defaultkeyword}&plot=full&page=1`)
    .then(response=>response.json())
    .then(moviesData =>{
        let searchLength = moviesData.Search.length;
        let totalSearchResults = moviesData.totalResults;

        function pagination(){
            let totalPages = totalSearchResults/searchLength;
            totalPages = Math.ceil(totalPages);
            return totalPages;
        }
        let totalNoOfPages = pagination();

        for(let i = 1 ; i<=totalNoOfPages; i++){   

            fetch(`https://www.omdbapi.com/?apikey=34601708&s=${defaultkeyword}&plot=full&page=${i}`)
            .then(response=>response.json())
            .then(moviesData =>{
            
                for(let j=0; j<searchLength; j++){
                    let movieTitle = moviesData.Search[j].Title;
                    let movieYear = moviesData.Search[j].Year;
                    let moviePoster = moviesData.Search[j].Poster;
                    let typeOfVideo = moviesData.Search[j].Type;
                    let imDbId = moviesData.Search[j].imdbID;

                    let card = document.createElement("div");
                  

                 

                    let dataCard = `
                    <div class="card p-2 bg-light" m-3 style="width:250px">
                        <p class="badge bg-danger text-wrap">${typeOfVideo}</p>
                        <img src="${moviePoster}" alt="${movieTitle}" class="card-img-top  border border-dark rounded-2"
                                    height="333" width="250">
                        <div class="card-body">
                            <p class="card-title">${movieTitle} (${movieYear})</p>                            
                        </div>
                    </div>                    
                       `
                       document.getElementById("shelf").innerHTML += dataCard;
                
                }

                let pageRedirect = `
                <div class="row">
                    <div class="col-md-0 col-sm-0"></div>
                    <div class="col-md-12 col-sm-12">
                        <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                                <li class="page-item"><a class="page-link" href="">&#10083;</a></li>
                                <li class="page-item"><a class="page-link" href="">Total Results : ${totalSearchResults}</a></li>
                                <li class="page-item"><a class="page-link" href="">&#10083;</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                `
                document.getElementById("pagiNation").innerHTML = pageRedirect;
            })                        
        }

        
            
    })
}
