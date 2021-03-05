# Web UI for AWS VoD Solutions

AWS provide ready-to-use media solutions to cost-effectively deliver video-on-demand (VOD) in this link:
https://aws.amazon.com/solutions/implementations/video-on-demand-on-aws/

This web UI is intended to show converted video assets results with ability to play it direcly in web browser using videojs (https://videojs.com/)
This simple web app leverage Cognito for user authentication, API Gateway as proxy for Lambda that read the list of video in DynamoDB.

We also provide CloudFormation templates for Cognito, API Gateway and Lambda. However, some manual additional setup is still needed.

Cognito authentication using assets from this blog:
https://aws.amazon.com/blogs/security/how-to-add-authentication-single-page-web-application-with-amazon-cognito-oauth2-implementation/

1. Deploy AWS VOD solutions from here: https://aws.amazon.com/solutions/implementations/video-on-demand-on-aws/ please choose "Video on Demand on AWS" instead of "Video on Demand on AWS Foundation".
2. Configure Cognito, API Gateway and Lambda using CloudFormation template
3. Modify DynamoDB table name in lambda environment variable
4. Add "title" column in DynamoDB Table, you need to manually fill in the title for each video, or you can just display video url.
5. Create Cognito domain in Cognito
6. Create user in Cognito
7. Create App Client in Cognito, tick on "Cognito User Pool" and provide Callback URL with your CloudFront url from step. 1 + video.html (eq. https://123.cloudfront.net/video.html). On OAuth 2.0 section, tick on "Authorization code grant" and "openid" option
8. Edit userprofile.js and set your domain, region, appClientId, userPoolId and redirectURI from Cognito configuration
9. Edit data.js and set your API Gateway URL endpoint (eq. https://123.execute-api.ap-southeast-1.amazonaws.com/dev/vod)
10. Upload all files to VoD "Destination" folder in S3.
11. Access the UI via your CloudFront address (eq. https://123.cloudfront.net/video.html)
