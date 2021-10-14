const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
let nextSyncToken;

app.use(express.json());

const calendarId = '[CALENDAR_ID]'; 

const auth = new google.auth.GoogleAuth({
    keyFile: '[CREDENDTIALS_JSON]',
    scopes: 'https://www.googleapis.com/auth/calendar',
});


//Endpoints
app.get('/google****', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/sendNotifications', async (req, res) => {
    const response = watchEvents();
    res.send(response);
});

app.post('/notifications', async (req, res) => {
    const events = await listEvents(res);
    console.log('EVENTOS', events);

    res.send(events);
});


//Functions
const watchEvents = async () => {
    const authClientObject = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClientObject });

    return calendar.events.watch({
        auth: auth,
        calendarId: calendarId,
        requestBody: {
            id: '[CHANNEL_NAME]', //
            type: 'web_hook',
            address: '[DOMAIN]/notifications', 
            params: {
                ttl: '6400'
            }, //Param to determine the duration time of the channel
        }
    }).then(res => {
        console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}

const listEvents = async () => {
    const authClientObject = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClientObject });

    return calendar.events.list({
        auth: auth,
        calendarId: calendarId,
        syncToken: nextSyncToken
    }).then(res => {
        nextSyncToken = res.data.nextSyncToken;
        return res.data.items;
    }).catch(err => {
        console.log(err);
    })
}


app.listen(port, () => {
    console.log('Server running on ' + port);
});