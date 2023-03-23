# Setup media server via ansible.

- ## Install Pip
    `sudo apt-get install python3-pip`

- ## Install ansible via PIP
    `python -m pip install ansible`

- ## Install ansible requirements
    `ansible-galaxy install -r requirements.yml`  

    if you get the following error `Command 'ansible' not found, but can be installed with ...` <br>
    Add ansible to Path work around `export PATH="~/.local/bin:$PATH"`
    <br>
  

- ## Update path variable
    Variables are located in the `groupe_vars` folder and update the `all` file <br>
    #### Set `default_base_path` to `"N/A"` if you want set the custom paths for `config_path`, `downoads_base_path`, `series_base_path`, `movies_base_path`

- ## Run site playbook    
    To set up the media server run the following <br>
    `ansible-playbook -i inventory.yml site.yml --tags="install"` <br>    

- ## Done

    Access homepage `http://<your-ip>`

    Access Sonarr `http://<your-ip>/sonarr`

    Access Radarr `http://<your-ip>/radarr`

    Access Jackett `http://<your-ip>/jackett`
     
    Access Hydra `http://<your-ip>/hydra`

    Access qBit `http://<your-ip>/torrent`

    Access Plex `http://<your-ip>/plex`

    ```
    Example:
        Homepage: http://localhost/
        Sonarr: http://localhost/sonarr

    !!Note!!
    When Configuring Sonarr/Radarr/Jacket/hydra do not use above urls need to use IP and PORT

    Default Ports:
        Sonarr: 8989  
        Radarr: 7878
        Jackett: 9117
        Hydra: 5076
        qBit: 8080
        Plex: 32400
    ```

- ## Upgrade all containers
    `ansible-playbook -i inventory.yml site.yml --tags="update"`

## Home Page
![](../assets/Homepage.png)

# Setup media server via ansible. (Script)
   - Run `bash setup.sh` to setup media server
   - Run `bash setup.sh -u` to update all containers