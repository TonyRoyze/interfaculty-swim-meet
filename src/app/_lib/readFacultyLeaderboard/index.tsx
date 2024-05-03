export const fetchFacultyLeaderboardData = async () => {
    try {
        const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=-4bBHk2Vlr9jLhaRfB8zbTWczK6urAHk_Vhu0JOnUeGKDigKARf_ItZ0AqlbWvaLrqYlh1smfZnCcNAfl6FGtjBtAzGjbST8m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBOdkMsABEe2q5Sr9YHdUJTLD4nHyP6xe_TF0c5F7I6orYSbKcrDJ26cQiE-Ur7DtL_mCvKrfUwy2vpZ9d57ib0wMbBwNU5Kaw&lib=M8PlsH9Q1J1ugY6fQdW57yK6t_ZkxQVm5",
            {next: {revalidate: 300}});
        const {facultyLeaderboard} = await res.json();
        return facultyLeaderboard;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


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
