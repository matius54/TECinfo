const base = document.querySelector(".data");
const names = {
    youtube:"Canales de YouTube",
    links:"links"
}

fetchJSON("./data.json").then((json)=>{
    for(const category in json){
        const divEx = document.createElement("div");
        divEx.setAttribute("class",category);
        const title = document.createElement("h1");
        title.innerText = names[category];
        divEx.appendChild(title);
        const ul = document.createElement("ul");
        
        json[category].forEach(element => {
            
            const container = document.createElement("li");
            if(element.banner){
                container.setAttribute("style",
                    `background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${element.banner}");
                    background-position: center; /* Center the image */
                    background-repeat: no-repeat; /* Do not repeat the image */
                    background-size: cover; /* Resize the background image to cover the entire container */`
                );
            }
            container.setAttribute("class","cnt");
            
            if(category==="youtube"){
                const img = document.createElement("img");
                if(element.image){
                    img.setAttribute("src",element.image);
                }else{
                    img.setAttribute("src","./youtube.svg")
                }
                container.appendChild(img);
            }
    
            const link = document.createElement("a");
            link.setAttribute("href",element.link);
            link.setAttribute("target","_blank");
            link.innerText = element.name;
            container.appendChild(link);
    
            if(element.tags){
                const tags = document.createElement("ul");
                tags.setAttribute("class","tags");
    
                element.tags.forEach(element => {
                    const tag = document.createElement("li");
                    tag.innerText = element;
                    tags.appendChild(tag);
                });
                container.appendChild(tags);
            }
            ul.appendChild(container);
        });
        divEx.appendChild(ul);
        base.appendChild(divEx);
    }
});