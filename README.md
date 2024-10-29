

### Front End Env Setup
1. Git clone the repo 
2. Download latest version of node.js
3. Download latest version of npm 
#### How to run 
```
 cd motiv-pup
 npm install
```
```
 npm run dev 
``` 
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Configure Environment Variables:

Create a .env.local file in the root directory.
Add the following variables, replacing values with your AWS keys:

```
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-aws-region
```

The Next.js frontend has one primary endpoint:

/api/detectEmotion/route.js (POST):
Captures an image from the webcam, analyzes it using AWS Rekognition, and returns the detected emotion.
Used internally by the chatbot interface in src/page.js.

Sends a JSON payload to https://localhost:8080/recieve(modify it in page.js and create that endpoint in the backend) containing:

{
  "message": "User's message",
  "emotion": "Detected emotion of the user"
}
and awaits for the reponse body:
{
  "message": "Message from backend"
}

###AWS setup assistance:
Sign in to the AWS Management Console:

Go to AWS Management Console.
Go to the IAM Console:

In the search bar, type "IAM" and select IAM (Identity and Access Management) from the services list.
Create a New IAM User:

In the IAM dashboard, click on Users, then click Add users.
User Name: Enter a username for your user, such as rekognition-user.
Access Type: Select Access key - Programmatic access to enable API access (this will create an Access Key ID and Secret Access Key).
Set Permissions for the IAM User:

On the next screen, select Attach policies directly.
Search for and select the AmazonRekognitionFullAccess policy if you need full access to Rekognition and proceed to save it
Click Next: Review, review the settings, and then click Create user.
Download the .csv file or Copy Access Key ID and Secret Access Key:

After the user is created, AWS will show the Access Key ID and Secret Access Key for this user.
Copy these values or download the .csv file with the credentials. This is the only time the Secret Access Key will be shown, so make sure to save it securely.
Configure Your Project with the AWS Credentials and the region.

