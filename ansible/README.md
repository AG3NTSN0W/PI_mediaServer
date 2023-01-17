# Setup media server via ansible.

- ## Install Pip
    `sudo apt-get install python3-pip`

- ## Install ansible via PIP
    `sudo python -m pip install ansible`

- ## Run setup playbook
    `ansible-playbook -i inventory.yml setup.yml` <br>
    Restart once Playbook is done.

- ## Update variable for playbook
    Variables are located in the folder `groupe_vars` folder and update the `all` file <br>


- ## Run site playbook    
    If you dont need samba and static Ip remove them for the site.yml file <br>
    `ansible-playbook -i inventory.yml site.yml` <br>
