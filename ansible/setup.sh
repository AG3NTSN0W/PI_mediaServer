#!/bin/bash

GREEN=`tput setaf 2`
RED='\033[0;31m'
NC='\033[0m' # No Color
BLUE='\033[1;34m'
CHECK='\xE2\x9C\x94'
CROSS='\xE2\x9D\x8C'


echo -e ${BLUE}'____________________________________________________________________'
echo '
 _____  _   _  _____  _    _    ___  ___ _____ ______  _____   ___  
/  ___|| \ | ||  _  || |  | |   |  \/  ||  ___||  _  \|_   _| / _ \ 
\ `--. |  \| || | | || |  | |   | .  . || |__  | | | |  | |  / /_\ \
 `--. \| . ` || | | || |/\| |   | |\/| ||  __| | | | |  | |  |  _  |
/\__/ /| |\  |\ \_/ /\  /\  /   | |  | || |___ | |/ /  _| |_ | | | |
\____/ \_| \_/ \___/  \/  \/    \_|  |_/\____/ |___/   \___/ \_| |_/                                                                                                                               
'   
echo '____________________________________________________________________'
echo -e ${NC}''


function wasSuccess () {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}${CHECK}${NC} ${1}"
  else
    echo -e "${RED}${CROSS}${NC} ${1}${RED}: Failed${NC}"
    exit 2
  fi
}


# Use system time zone
export TZ=$(cat /etc/timezone)
TAG="install"

while getopts 'uir' opt; do
  case "$opt" in
    u)
      # Running script with -u will pull and restart all the docker images
      TAG="update"
      break
      ;;
    i)
      # Running the sciprt witl -i or with no args will setup the media server
      TAG="install"
      break
      ;;
    r)
      # Running the sciprt witl -r will rebuild the server. Get all the containes up and running.
      TAG="rebuild"
      break  
  esac
done

echo -e "${BLUE}${TAG}ing media server... ${NC}"

if [[ $TAG == "install" || $TAG == "rebuild" ]]
then
    # Installing pip
    sudo apt-get install python3-pip -y &> /dev/null
    wasSuccess "PIP3 Installed"

    # Installing ansible
    python3 -m pip install --user ansible &> /dev/null
    wasSuccess "Ansible Installed"
fi

# Check if ansible is available
if ! ansible --version &> /dev/null
then
    echo -e "${GREEN}add ~/.local/bin to PATH${NC}"
    # Add ansible to path || Can add it to your ~/.bashrc
    export PATH="~/.local/bin:$PATH" # ansible was giving me problems
fi

# Check if ansible is available
if ! ansible --version &> /dev/null
then
  echo -e "${RED}Ansible not found${NC}"
  exit 2
fi

if [[ $TAG == "install" || $TAG == "rebuild" ]]
then
    # Install ansible requirements
    echo -e "${BLUE}Staring to install Ansible requirements${NC}"
    ansible-galaxy install -r requirements.yml &> /dev/null
    wasSuccess "Requirements Installed"
    
fi

# Starting to setup media server
ansible-playbook -i inventory.yml site.yml --tags=$TAG 
wasSuccess "Media server setup"