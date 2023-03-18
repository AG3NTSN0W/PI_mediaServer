# Setup media server via ansible.

- ## Install Pip
    `sudo apt-get install python3-pip`

- ## Install ansible via PIP
    `python -m pip install ansible`

- ## Install ansible requirements
    `ansible-galaxy install -r requirements.yml &> /dev/null`    

- ## Update variable for playbook
    Variables are located in the `groupe_vars` folder and update the `all` file <br>


- ## Run site playbook    
    If you dont need samba and static Ip remove them for the site.yml file <br>
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
    ```

## Home Page
![](../assets/Homepage.png)