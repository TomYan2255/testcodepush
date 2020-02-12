#!/bin/bash

PS3='Please enter your choice: '
options_env=("Development" "Production" "Cancel")
options_system=("Android" "iOS" "Cancel")
RED='\033[0;31m'
NC='\033[0m' # No Color

echo; echo 'Development or Production ?'
select opt in "${options_env[@]}"
do
	case $opt in
		"Development")
			dev=true; break
			;;
		"Production")
			dev=false; break
			;;
		"Cancel")
			exit 0
			;;
		*) echo "invalid option $REPLY";;
	esac
done

echo; echo -e "$RED$opt$NC"

echo; echo 'Android or iOS ?'
select opt in "${options_system[@]}"
do
	case $opt in
		"Android")
			if ! [ -e ./android/app/src/main/assets ]
			then
				eval "mkdir ./android/app/src/main/assets"
			fi
			com="react-native bundle --platform android --dev $dev --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/"
			break
			;;
		"iOS")
			com="react-native bundle --platform ios --dev $dev --entry-file index.ios.js --bundle-output ios/main.jsbundle --assets-dest ios"
			break
			;;
		"Cancel")
			exit 0
			;;
		*) echo "invalid option $REPLY";;
	esac
done

echo; echo -e "$RED$com$NC"
eval $com

