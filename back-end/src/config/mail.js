import {google} from 'googleapis';

async function mailConfig() {
const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URL)
oauth2client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})
    
const access_token = await oauth2client.getAccessToken()

const config = {
    service:"gmail",
    auth: {
        type: "OAuth2",
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: access_token,
      },
      tls:{
        rejectUnauthorized:true,
      },
    };

    return config;
}

export default mailConfig;