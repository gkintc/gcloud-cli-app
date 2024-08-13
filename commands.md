
[root@node-97847 wsf]# gcloud secrets create gcloudcliapp-sa-key --replication-policy="automatic"
Created secret [gcloudcliapp-sa-key].


[root@node-97847 wsf]# gcloud secrets versions add gcloudcliapp-sa-key --data-file="/home/wsf/gcloudcliapp-sa.json"
Created version [1] of the secret [gcloudcliapp-sa-key].


[root@node-97847 wsf]# gcloud secrets add-iam-policy-binding gcloudcliapp-sa-key --member="serviceAccount:gcloudcliapp@articulate-rain-321323.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
Updated IAM policy for secret [gcloudcliapp-sa-key].
bindings:
- members:
  - serviceAccount:gcloudcliapp@articulate-rain-321323.iam.gserviceaccount.com
  role: roles/secretmanager.secretAccessor
etag: BwYfeKYbkXM=
version: 1



gcloud projects add-iam-policy-binding articulate-rain-321323 \
    --member="serviceAccount:gcloudcliapp@articulate-rain-321323.iam.gserviceaccount.com" \
    --role="roles/logging.logWriter"



curl -X POST http://localhost:5000/execute-command \
     -H "Content-Type: application/json" \
     -d '{"command": "gcloud compute instances list"}'



docker-compose pull

docker-compose up --force-recreate -d
