const data = {
    facultyLeaderboard: [
        {
            name: "FIM",
            points: {
                men: 91,
                women: 12,
                overall: 103,
            },
        },
        {
            name: "FMF",
            points: {
                men: 85,
                women: 71,
                overall: 156,
            },
        },
        {
            name: "FOA",
            points: {
                men: 10,
                women: 10,
                overall: 20,
            },
        },
        {
            name: "FOL",
            points: {
                men: 39,
                women: 30,
                overall: 69,
            },
        },
        {
            name: "FOM",
            points: {
                men: 36,
                women: 37,
                overall: 73,
            },
        },
        {
            name: "FON",
            points: {
                men: 15,
                women: 17,
                overall: 0,
            },
        },
        {
            name: "FOS",
            points: {
                men: 4,
                women: 8,
                overall: 12,
            },
        },
        {
            name: "FOT",
            points: {
                men: 6,
                women: 9,
                overall: 15,
            },
        },
    ],
};

export const fetchFacultyLeaderboardData = async () => {
    return data.facultyLeaderboard;
};

// export const fetchFacultyLeaderboardData = async () => {
//     try {
//         const url = `https://script.google.com/macros/s/AKfycbxGneTdRxUksYri3plBFoCSGOWW46V6v4po634ylEx7AQEd2H0TWJzlbXdgPPRaizx8/exec?timestamp=${new Date().getTime()}`; // Added timestamp
//         const res = await fetch(url, { next: { revalidate: 300 } });
//         const { facultyLeaderboard } = await res.json();
//         return facultyLeaderboard;
//     }
//     catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }

/*export const fetchFacultyLeaderboardData = async () => {

    //Auth
    const auth = new google.auth.GoogleAuth({
        credentials:{
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,'\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const sheets = google.sheets({
        auth,
        version: 'v4'
    });

    //Query
    const range: string = 'FacultyLeaderboard!A1:D';

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range,
        });


        const values = response.data.values;

        if (values && values.length > 0) {
            const [, ...rows] = values;

            return rows.map(row => {
                const [name, men, women, overall] = row;
                return {
                    name,
                    points: {
                        men: parseInt(men),
                        women: parseInt(women),
                        overall: parseInt(overall)
                    }
                };
            });
        } else {
            return [];
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}*/
