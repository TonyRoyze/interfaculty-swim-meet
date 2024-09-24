interface EventLeaderboardProps {
    type: 'men' | 'women';
    event: string;
}

export const fetchEventLeaderboardData = async ({ type, event = "100free" }: EventLeaderboardProps) => {
    try {
        const url = `https://script.google.com/macros/s/AKfycbxGneTdRxUksYri3plBFoCSGOWW46V6v4po634ylEx7AQEd2H0TWJzlbXdgPPRaizx8/exec?timestamp=${new Date().getTime()}`; // Added timestamp
        const res = await fetch(url, { next: { revalidate: 300 } });

        const { events } = await res.json();

        return (type === 'men' ? events[`M${event}`] : events[`W${event}`]);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

/*
 * export const fetchEventLeaderboardData = async ({type, event}: EventLeaderboardProps ) => {
 *
 *     //Auth
 *     const auth = new google.auth.GoogleAuth({
 *         credentials:{
 *             client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
 *             private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,'\n'),
 *         },
 *         scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
 *     });
 *
 *     const sheets = google.sheets({
 *         auth,
 *         version: 'v4'
 *     });
 *
 *     let range: string ='M100free!A1:C';
 *
 *     if (type === 'men') {
 *         //freestyle
 *         if (event === '50free')
 *             range ='M50free!A1:C';
 *
 *         else if (event === '100free')
 *             range ='M100free!A1:C';
 *
 *         else if (event === '200free')
 *             range ='M200free!A1:C';
 *
 *         //backstroke
 *         else if (event === '50back')
 *             range ='M50back!A1:C';
 *
 *         else if (event === '100back')
 *             range ='M100back!A1:C';
 *
 *         else if (event === '200back')
 *             range ='M200back!A1:C';
 *
 *         //breaststroke
 *         else if (event === '50breast')
 *             range ='M50breast!A1:C';
 *
 *         else if (event === '100breast')
 *             range ='M100breast!A1:C';
 *
 *         else if (event === '200breast')
 *             range ='M200breast!A1:C';
 *
 *         //butterfly
 *         else if (event === '50fly')
 *             range ='M50fly!A1:C';
 *
 *         else if (event === '100fly')
 *             range ='M100fly!A1:C';
 *
 *         else if (event === '200fly')
 *             range ='M200fly!A1:C';
 *
 *         //Individual Medley
 *         else if (event === '100IM')
 *             range ='M100IM!A1:C';
 *
 *         else if (event === '200IM')
 *             range ='M200IM!A1:C';
 *
 *         //Relay
 *         else if (event === 'freerelay')
 *             range ='Mfreerelay!A1:B';
 *
 *         else if (event === 'medleyrelay')
 *             range ='Mmedleyrelay!A1:B';
 *
 *     } else {
 *         //freestyle
 *         if (event === '50free')
 *             range ='W50free!A1:C';
 *
 *         else if  (event === '100free')
 *             range ='W100free!A1:C';
 *
 *         else if (event === '200free')
 *             range ='W200free!A1:C';
 *
 *         //backstroke
 *         else if (event === '50back')
 *             range ='W50back!A1:C';
 *
 *         else if (event === '100back')
 *             range ='W100back!A1:C';
 *
 *         else if (event === '200back')
 *             range ='W200back!A1:C';
 *
 *         //breaststroke
 *         else if (event === '50breast')
 *             range ='W50breast!A1:C';
 *
 *         else if (event === '100breast')
 *             range ='W100breast!A1:C';
 *
 *         else if (event === '200breast')
 *             range ='W200breast!A1:C';
 *
 *         //butterfly
 *         else if (event === '50fly')
 *             range ='W50fly!A1:C';
 *
 *         else if (event === '100fly')
 *             range ='W100fly!A1:C';
 *
 *         else if (event === '200fly')
 *             range ='W200fly!A1:C';
 *
 *         //Individual Medley
 *         else if (event === '100IM')
 *             range ='W100IM!A1:C';
 *
 *         else if (event === '200IM')
 *             range ='W200IM!A1:C';
 *
 *         //Relay
 *         else if (event === 'freerelay')
 *             range ='Wfreerelay!A1:B';
 *
 *         else if (event === 'medleyrelay')
 *             range ='Wmedleyrelay!A1:B';
 *     }
 *
 *
 *     try {
 *         const response = await sheets.spreadsheets.values.get({
 *             spreadsheetId: process.env.GOOGLE_SHEET_ID,
 *             range,
 *         });
 *
 *         const values = response.data.values;
 *
 *         if (values && values.length > 0) {
 *             const [, ...rows] = values;
 *
 *             return rows.map(row => {
 *                 const [faculty, name, time = ''] = row;
 *                 return {
 *                     faculty,
 *                     name,
 *                     time,
 *                 };
 *             });
 *         } else {
 *             return [];
 *         }
 *
 *     } catch (error) {
 *         console.error('Error fetching data:', error);
 *         return [];
 *     }
 * }
 */
