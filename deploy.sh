#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"


#clean up public
echo -e "\033[0;32mDeleting old copy...\033[0m"
rm -rf deployment/*

# Build the project.
npm run build

# copy build contents to deployment folder
cp -vr build/* deployment

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

git add .

deploymentMsg="deployed portfolio on `date`"

git commit -m "$deploymentMsg"

git push origin master
