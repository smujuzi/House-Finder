$file_name="houseFinderProject"
$current_time = (Get-Date).ToString("dd-MM-yyyy_HH-mm-ss")
$new_fileName=$file_name +"_"+ $current_time +".zip"
New-Item -Path . -Name $new_fileName  -ItemType "file" 
Compress-Archive -Path C:\Users\Stuart\OneDrive\AWS\House-Finder\* -DestinationPath C:\Users\Stuart\OneDrive\AWS\House-Finder\$new_fileName -Force

aws s3 cp $new_fileName s3://house-finder-bucket
aws cloudformation update-stack --stack-name house-finder-stack --template-body file://C:/Users/Stuart/OneDrive/AWS/House-Finder/cloudFormation/lambda_cloud_formation_template.yaml --parameters ParameterKey=newFileName,ParameterValue=$new_fileName
Remove-Item -path C:\Users\Stuart\OneDrive\AWS\House-Finder\$new_fileName



