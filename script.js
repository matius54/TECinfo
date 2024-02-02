const el = document.querySelector(".youtube");
fetchJSON.get("./data.json",(json)=>{
    const title = document.createElement("h1");
    title.innerText = "Canales de YouTube";
    el.appendChild(title);

    const youtube = json.channels;

    youtube.forEach(element => {
        const container = document.createElement("div");
        container.setAttribute("class","cnt");
        
        if(element.image){
            const img = document.createElement("img");
            //img.setAttribute("width","40px");
            img.setAttribute("src",element.image);
            container.appendChild(img);
        }

        const link = document.createElement("a");
        link.setAttribute("href",element.link);
        link.setAttribute("target","_blank");
        link.innerText = element.name;
        container.appendChild(link);

        if(element.tags){
            const tags = document.createElement("div");
            tags.setAttribute("class","tags");

            element.tags.forEach(element => {
                const tag = document.createElement("span");
                tag.innerText = element;
                tags.appendChild(tag);
            });
            container.appendChild(tags);
        }

        el.appendChild(container);
    });
});