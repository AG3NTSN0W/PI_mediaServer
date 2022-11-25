const IP = window.location.hostname
const URL = `http://${IP}:4200`

const redirect = (path) => {
    window.location.href = `/${path}`;
}

const showState = () => {
    document.getElementById('states').style.display = "flex";
}

const set_info = (name, data) => {
    document.getElementById(`${name}Active`).textContent = data['count'];
    document.getElementById(`${name}Unknown`).textContent = data['unknownCount'];
    if(data.error || data.unknownErrors) {
        document.getElementById(`server-${name}`).classList.add("server-error");
        return
    }
    if(data.warnings || data.unknownWarnings) {
        document.getElementById(`server-${name}`).classList.add("server-warning");
        return
    }
    document.getElementById(name).style.display = "block";
}

const set_server_info = (data) => {
    showState()
    const temp = data['temp']
    const tempValue = document.getElementById("tempValue")
    document.getElementById("fanValue").checked = data['fan'] === "ON" ? true : false;
    tempValue.textContent = temp;
    tempValue.style.color = "#13c713";
    if (temp >= 50) {
        tempValue.style.color = "red";
    } else if (temp >= 40) {
        tempValue.style.color = "yellow";
    }

}

const getServerState = async () => {
    try {
        const response = await fetch(`${URL}/info`);
        // waits until the request completes...
        if (response && response.status === 200) {
            let stateData = await response.json();
            if (stateData) {
                set_server_info(stateData)
            }
            return
        } else {
            console.error("Error in getting server state data");
        }
    } catch (error) {
        console.error("Unable to get server state data");
    }
}

const get_sonarr_info = async () => {
    const response = await fetch(`${URL}/queue/sonarr`);
    if (response && response.status === 200) {
        let jsonResponse = await response.json();
        if (jsonResponse) {
            set_info('sonarr', jsonResponse)
        }
        return
    } else {
        console.error("Error in getting sonarr info");
        document.getElementById('sonarr').style.display = "none";
    }
}

const get_radarr_info = async () => {
    const response = await fetch(`${URL}/queue/radarr`);
    if (response && response.status === 200) {
        let jsonResponse = await response.json();
        if (jsonResponse) {
            set_info('radarr', jsonResponse)
        }
        return
    } else {
        console.error("Error in getting radarr info");
        document.getElementById('radarr').style.display = "none";
    }
}

const change_fan_state = async () => {
    let fanState = document.getElementById("fanValue").checked ? 'ON' : "OFF";
    const response = await fetch(`${URL}/fan/${fanState}`);
    if (response && response.status === 200) {
        let jsonResponse = await response.text();
        console.info(jsonResponse);
        return
    } else {
        console.error("Error changing fan state");
    }
}

const build_queue = (serverName, jsonResponse) => {
    // <tr>
    //     <td class="title">Title</td>
    //     <td>Size</td>
    //     <td>TimeLeft</td>
    // </tr>
    const id = `${serverName}Queue`
    for (const item of jsonResponse) {
        const tr = document.createElement('tr');

        let td = document.createElement('td');
        td.className = "title"
        td.textContent = item["title"]
        tr.appendChild(td)

        td = document.createElement('td');
        td.textContent = item["size"]
        tr.appendChild(td)

        td = document.createElement('td');
        td.textContent = item["timeleft"]
        tr.appendChild(td)
   
        document.getElementById(id).getElementsByTagName("tbody")[0].appendChild(tr)
    }

}

const get_sonarr_queue = async () => {
    const response = await fetch(`${URL}/queue/details/sonarr`);
    if (response && response.status === 200) {
        let jsonResponse = await response.json();
        // console.info(jsonResponse);
        build_queue("sonarr", jsonResponse)
        return
    } else {
        console.error("Error changing fan state");
    }
}

const get_radarr_queue = async () => {
    const response = await fetch(`${URL}/queue/details/radarr`);
    if (response && response.status === 200) {
        let jsonResponse = await response.json();
        build_queue("radarr", jsonResponse)
        return
    } else {
        console.error("Error changing fan state");
    }
}

const setImageUrl = () => {
    const imageContainers = document.getElementsByClassName("server-img");
    for (const img of imageContainers) {
        img.src = img.src.replace("%5Eip%5E", IP)
        console.log(img.src)
    }
}

setImageUrl();
if (false) {
    getServerState();
    get_sonarr_info();
    get_radarr_info();
    get_sonarr_queue();
    get_radarr_queue();
}
