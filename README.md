# PI_mediaServer.
a raspberry Pi media server. <br>
Using docker to run all the programmes/apps <br>
Using a headless installation of Raspberry Pi OS (previously called Raspbian) 


- ## Update raspberry pi
    `sudo apt-get update` <br>
    `sudo apt-get dist-upgrade`

- ## Vim (its a text editor)
    `sudo apt-get install vim`

- ## [Change Password](https://www.raspberrypi.org/documentation/linux/usage/users.md)
    `passwd`

- ## [Enable ssh](https://www.raspberrypi.org/documentation/remote-access/ssh/)
    add file ssh onto the boot partition


- ## [Docker](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/)
    `curl -sSL https://get.docker.com | sh`<br>
    To use docker without sudo <br>
    `sudo usermod -aG docker $USER`

- ## [Docker compose](https://dev.to/rohansawant/installing-docker-and-docker-compose-on-the-raspberry-pi-in-5-simple-steps-3mgl) 
    `sudo apt-get install -y libffi-dev libssl-dev` <br>
    `sudo apt-get install -y python3 python3-pip` <br>
    `sudo apt-get remove python-configparser` 

- ## [Containers](https://www.linuxserver.io/our-images)
    [Sonarr](https://hub.docker.com/r/linuxserver/sonarr) <br>
    - `docker run -d --restart=unless-stopped --name=sonarr
        -p 8989:8989 -e PUID=0 -e PGID=0 
        -v <config DIR>/sonarr:/config -v <series DIR>:/tv -v <downloads DIR>:/downloads 
        linuxserver/sonarr:arm32v6-latest`

    [Radarr](https://hub.docker.com/r/lsioarmhf/radarr/)
    - `docker run -d --restart=unless-stopped --name=radarr 
        -p 7878:7878 -e PUID=0 -e PGID=0 
        -v <config DIR>/radarr/:/config -v <movie DIR>:/movies -v <downloads DIR>:/downloads 
        linuxserver/radarr:arm32v6-latest`

    [Jackett](https://hub.docker.com/r/linuxserver/jackett)
    - `docker run -d --restart=unless-stopped --name=jackett 
        -p 9117:9117 -e PGID=1000 -e PUID=1000 -e TZ=Europe/London
        -v <config DIR>/jackett/:/config
        linuxserver/jackett:arm32v6-latest`

    [qBittorrent](https://hub.docker.com/r/linuxserver/qbittorrent)
    - `docker run -d --restart=unless-stopped --name=qBit 
        -e PUID=0 -e PGID=0 -e TZ=Europe/London -e UMASK_SET=022
        -p 6881:6881 -p 6881:6881/udp -p 8080:8080
        -v <download DIR>/:/downloads -v <config DIR>:/config 
        linuxserver/qbittorrent:arm32v6-latest`    

- ## [Mount hdd on boot](https://www.howtogeek.com/howto/38125/htg-explains-what-is-the-linux-fstab-and-how-does-it-work/)

    - get the UUID <br>
        `blkid /dev/sda1 <-- note it might not always be sda1 `

    - sudo vim /etc/fstab <br>
        `UUID=<UUID> /home/<user>/<dir> <file Type> auto,exec,rw 0 0`

- ## [Use ntfs file system](https://www.raspberrypi.org/forums/viewtopic.php?t=19653) (Might not be needed.)
    `NOTE <file Type> = ntfs-3g` <br>
    `sudo apt-get install ntfs-3g`      

- ## Static ip (optional)
    `sudo vim /etc/dhcpcd.conf`<br>
    And add <br>
    `interface eth0`<br>
    `static ip_address=127.0.0.1/24`<br>
    `static routers=127.0.0.1`<br>
    `static domain_name_servers=127.0.0.1`<br>

- ## samba server



- ## Folder structure
    - HDD
        - downloads (all current downloads will be in here.)
        - series (this is where all the series will be saved.)
        - movies (this is where all the movies will be saved.)
        - config 
            - sonarr 
            - jackett 
            - torrent 