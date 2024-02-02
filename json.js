async function fetchJSON(url){
    const response = await fetch(url,{"cache-control":"no-cache"});
    if(!response.ok)throw new Error(`Fech error: HTTP code: ${response.status} ${response.statusText}`);
    return await response.json();
}