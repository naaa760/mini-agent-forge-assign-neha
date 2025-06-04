#!/bin/bash

echo "Adding changes..."
git add ser/

echo "Committing..."
git commit -m "FINAL FIX: Completely disable Redis in production"

echo "Pushing..."
git push

echo "Done! Check Render for redeploy..." 