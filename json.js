class fetchJSON{
    static get(url,callback,error=()=>console.error("Error Getting the JSON")){
        fetch(url)
        .then(response => response.json())
        .then(json => {
            callback(json);
        })
        .catch(err => {
            error();
            throw err;
        });
    }
}