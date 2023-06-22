#!/bin/bash
function start_gui_dev_mode() {
    if ! command -v npm
    then
        echo "npm is NOT Installed on your machine."	
    else
    source getotps.sh
    npm run start:dev
    fi
}

function start_gui_prod_mode() {
    if ! command -v npm
    then
        echo "npm is NOT Installed on your machine."	
    else
        source getotps.sh
     	npm run build
        npm run start
    fi
}

function start_gui_docker_mode() {
    npm run build
}

while getopts ":dcp" gopts;
    do
        case ${gopts} in 
        d)  
            start_gui_dev_mode
            echo  "development mode"
            ;;
        p)  
            start_gui_prod_mode
            echo  "production mode"
            ;;
        c)
            start_gui_docker_mode
            echo "docker mode"
            ;;
        \?) 
            echo "exit, use d or c options"
            ;;
        esac
    done
