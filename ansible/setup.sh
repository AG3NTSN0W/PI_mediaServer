#!/bin/bash
echo '____________________________________________________________________'
echo '
 _____  _   _  _____  _    _    ___  ___ _____ ______  _____   ___  
/  ___|| \ | ||  _  || |  | |   |  \/  ||  ___||  _  \|_   _| / _ \ 
\ `--. |  \| || | | || |  | |   | .  . || |__  | | | |  | |  / /_\ \
 `--. \| . ` || | | || |/\| |   | |\/| ||  __| | | | |  | |  |  _  |
/\__/ /| |\  |\ \_/ /\  /\  /   | |  | || |___ | |/ /  _| |_ | | | |
\____/ \_| \_/ \___/  \/  \/    \_|  |_/\____/ |___/   \___/ \_| |_/                                                                                                                               
'   
echo '____________________________________________________________________'
echo ''
# Use system time zone
export TZ=$(cat /etc/timezone)
TAG="install"

while getopts 'uir' opt; do
  case "$opt" in
    u)
      TAG="upgrade"
      break
      ;;
    i)
      TAG="install"
      break
      ;;
    r)
      TAG="rebuild"
      break  
  esac
done

if [[ $TAG == "install" || $TAG == "rebuild" ]]
then
    # Installing pip
    echo "Instaling PIP3"
    sudo apt-get install python3-pip -y &> /dev/null

    # Installing ansible
    echo "Instaling Ansible"
    python3 -m pip install --user ansible &> /dev/null
fi

# Check if ansible is available
if ! ansible --version &> /dev/null
then
    echo "add ~/.local/bin to PATH"
    # Add ansible to path || Can add it to your ~/.bashrc
    export PATH="~/.local/bin:$PATH" # ansible was giving me problems
fi

if [[ $TAG == "install" || $TAG == "rebuild" ]]
then
    # Install ansible requirements
    echo "Instaling Ansible requirements"
    ansible-galaxy install -r requirements.yml &> /dev/null
fi

# Stating to setup media server
echo "$TAG media server"
ansible-playbook -i inventory.yml site.yml --tags=$TAG 