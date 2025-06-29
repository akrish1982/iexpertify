#!/bin/bash

# Check if git command is available
if ! command -v git &> /dev/null; then
    echo -e "\033[0;31mGit is not installed or not available in the PATH.\033[0m"
    exit 1
fi

# Ensure we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    echo -e "\033[0;31mThis is not a git repository.\033[0m"
    exit 1
fi

# Get the current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [[ "$current_branch" == "main" ]]; then
    echo -e "\033[0;33mYou are on the 'main' branch. Please switch to a feature branch.\033[0m"
    exit 1
fi

# Fetch the latest changes for the main branch
git fetch origin main

# Get the latest commit on the main branch
main_commit=$(git rev-parse origin/main)

# Get the latest commit on the current branch
current_branch_commit=$(git rev-parse HEAD)

# Generate the diff between the latest commit on main and the current branch
diff_file="diff.patch"
git diff "$main_commit" "$current_branch_commit" > "$diff_file"

# Check if the diff file was generated successfully
if [[ -f "$diff_file" ]]; then
    echo -e "\033[0;32mDiff file generated successfully: $diff_file\033[0m"
else
    echo -e "\033[0;31mFailed to generate diff file.\033[0m"
fi

