#!/bin/bash

#clean up public
echo -e "\033[0;32mDeleting old copy...\033[0m"
rm -rf deployment/*



# Build the project.

echo -e "\033[0;32mBuilding Project...\033[0m"

npm run build > success.log

# copy build contents to deployment folder

echo -e "\033[0;32mCopying files to deployment directory...\033[0m"

cp -r build/* deployment


echo -e "\033[0;32mDeploying new updates to server...\033[0m"
# Go To Public folder
cd deployment
# Add changes to git.
git add .

# Commit changes.
msg="rebuilding portfolio `date`"
if [ $# -eq 1 ]
then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

# Come Back up to the Project Root
cd ..

# commit change in main repo about deployment
echo -e "\033[0;32mPushing all changes updates to GitHub...\033[0m"
git add .

deploymentMsg="deployed portfolio on `date`"
if [ $# -eq 1 ]
then deploymentMsg="$1"
fi
git commit -m "$deploymentMsg"

git push origin master

echo -e "\033[0;32mSafe exit from script...\033[0m"