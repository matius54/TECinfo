const base = document.querySelector(".data");
const names = {
    youtube:"Canales de YouTube",
    links:"Enlaces variados"
}

fetchJSON("./data.json").then((json)=>{
    base.querySelectorAll("*").forEach(e=>e.remove());
    const animationExecuted = !sessionStorage.getItem("animationExecuted");
    for(const category in json){
        const divEx = document.createElement("div");
        divEx.setAttribute("class",category);
        const title = document.createElement("h1");
        title.innerText = names[category];
        title.setAttribute("name",category);
        divEx.appendChild(title);
        const ul = document.createElement("ul");
        
        json[category].forEach((element,indx) => {
            let containerStyle = "";
            const container = document.createElement("li");
            if(element.banner){
                containerStyle += `
                    background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${element.banner}");
                    background-position: center; /* Center the image */
                    background-repeat: no-repeat; /* Do not repeat the image */
                    background-size: cover; /* Resize the background image to cover the entire container */
                `;
            }
            if(animationExecuted){
                containerStyle += `animation-delay: ${indx * 100}ms;`
            }else{
                containerStyle += "animation-duration: 0ms;"
            }
            container.setAttribute("style",containerStyle);
            container.setAttribute("class","cnt");

            const img = document.createElement("img");
            if(element.icon){
                img.setAttribute("src",element.icon);
            }else{
                img.setAttribute("src","./X.svg")
            }
            container.appendChild(img);
    
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
            const lang = document.createElement("span");
            lang.setAttribute("class","lang");
            const langStr = element.lang? element.lang.startsWith("es")? "Español": "Inglés" : undefined;
            lang.innerText=`Idioma: ${langStr}`;
            container.appendChild(lang);

            ul.appendChild(container);
        });
        divEx.appendChild(ul);
        base.appendChild(divEx);
    }
    if(animationExecuted)sessionStorage.setItem("animationExecuted","true");
}).catch((e)=>{
    const err = document.createElement("div");
    err.setAttribute("class","cnt");
    const mess = document.createElement("span");
    mess.innerText = `Ha ocurrido un error: ${e}`;
    err.appendChild(mess);
    const reload = document.createElement("button");
    reload.innerText = "reintentar";
    reload.setAttribute("onclick","location.reload()");
    err.append(reload);
    base.appendChild(err);
    throw e;
});