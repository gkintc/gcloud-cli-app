#!/bin/bash

# Fetch all disks with their creation timestamps and users
disk_list=$(gcloud compute disks list --format="json(name, creationTimestamp, users)")

# Get the current epoch time
current_epoch=$(date +%s)

# Print header
echo "Orphaned Disk Name | Creation Time | Time Orphaned"

# Process each disk
echo $disk_list | jq -r '.[] | select(.users == []) | "\(.name) | \(.creationTimestamp)"' | while IFS=' | ' read -r name creation_time; do
    # Convert creation time to epoch seconds
    creation_epoch=$(date -d "$creation_time" +%s)
    
    # Calculate time orphaned
    time_orphaned_seconds=$((current_epoch - creation_epoch))
    time_orphaned_days=$((time_orphaned_seconds / 86400))
    time_orphaned_hours=$(( (time_orphaned_seconds % 86400) / 3600 ))
    time_orphaned_minutes=$(( (time_orphaned_seconds % 3600) / 60 ))
    
    # Format time orphaned
    time_orphaned_formatted="${time_orphaned_days}d ${time_orphaned_hours}h ${time_orphaned_minutes}m"

    # Print the result
    echo "$name | $creation_time | $time_orphaned_formatted"
done
