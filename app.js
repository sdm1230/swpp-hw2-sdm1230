// TODO: edit this file

// This is a list where your records should be stored. See `parseAndSave`.
let records = [];

// `parseAndSave(text)` is a function called with one argument `text`, the content of the babyname CSV file.
// It is invoked only once at the start of application.
// TODO: parse the csv text and save data records into the global variable `records` properly,
// so that the other functions use them with ease. After calling this function, `records` should
// contain the parsed data of every year like below.
//     e.g. records: [{year: 2001, rank: 1, name: "Jacob", gender: "M", rankChange: null},
//                    {year: 2001, rank: 2, name: "Michael", gender: "M", rankChange: null},
//                    ...]
// Note: a CSV text can end with trailing line-break character '\n'. Whether it exists or not, 
// the function should parse `text` correctly. Also, records should be stored in the same order
// in which they appear in a csv text. You can assume that at the first line is always a csv header.
function parseAndSave(text) {
    // TODO: Fill this function. (3 points)
    let textlines = text.split('\n');
    let headers = textlines[0].split(',');

    for (let i = 1; i < textlines.length; i++) {
        let data = textlines[i].split(',');

        let list = headers.map((header, index) => {
            if (header == 'rank_delta') return {key: "rankChange",value: data[index] === "" ? null : data[index]};
            return {key: header,value: data[index]};
        });
        let dict = Object.assign({}, ...list.map((obj)=> ({[obj.key]: obj.value})));

        records.push(dict);
    }
}


// `provideYearData(year)` is a function that receives a year and returns an array of data object corresponding to that year.
// Note that male and female record with the same rank should be joined together to form one object.
// TODO: return all data objects of a specific year, that are joined and organized by rank in an ascending order.
// The example of returned array is as follows.
//     e.g. [{rank: 1, male: "Jacob", maleRankChange: 0, female: "Isabella", femaleRankChange: 0},
//           {rank: 2, male: "Ethan", maleRankChange: 0, female: "Sophia", femaleRankChange: -2},    
//           ...,
//           {rank: 1000, male: "Keshawn", maleRankChange: 113, female: "Karley", femaleRankChange: 17}]
function provideYearData(year) {
    // TODO: Fill in this function. (5 points)
    let givenyear = [];

    for (rank = 1; rank <= records.filter(obj => obj.year == year && obj.gender == 'M').length; rank++) {
        let male = records.filter(obj => obj.rank == rank && obj.gender == 'M' && obj.year == year);
        let female = records.filter(obj => obj.rank == rank && obj.gender == 'F' && obj.year == year);
        givenyear.push({ rank: rank, male: male[0]?.name, maleRankChange: male[0]?.rankChange, female: female[0]?.name, femaleRankChange: female[0]?.rankChange });
    }
    // This is just a reference for the return value's format. Delete this and fill your own 
    // proper code to return the correct data.
    return givenyear;
}

// provideChartData(name, gender) is a function called when a user wants
// to see the chart showing the year-on-year change of rank of a specific name.
// TODO: return a list of all objects from 2001 to 2018 in the format of `{year: <year>, rank: <rank>}`
// of a specific name specified by the arguments, name and gender.
// If there are no records with the name and gender for some years,
// either you can set the values of the ranks to `undefined` or not return those records at all.
// The example of return data is as follow.
//     e.g. [{year: 2001, rank: undefined},
//           {year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
// You can also return data excluding `undefined` value as below.
//     e.g. [{year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
function provideChartData(name, gender) {
    // TODO: Fill in this function. (2 points)
    let ranklist = [];
    for (year = 2001; year <= 2018; year++) {
        let data = records.filter(obj => obj.name == name && obj.gender == gender && obj.year == year)
        ranklist.push({ year: year, rank: data[0]?.rank })
    }
    // This is just a reference for the return value's format. Delete this and fill your own 
    // proper code to return the correct data.
    return ranklist;
}


// `handleSignUpFormSubmit(form)` is called when a user submits the sign up form.
// `form` is the target HTML form element (L82~ in index.html).
// TODO: validate the form. (5 points)
function handleSignUpFormSubmit(form) {
    let alertMessage = "";
    // TODO: Fill in the rest of function to get the HTML form element as above.
    let firstname = form['first-name'].value;
    let lastname = form['last-name'].value;
    let email = form['email'].value;
    let birth = form['date-of-birth'].value;

    let valid_firstname = false;
    let valid_lastname = false;
    let valid_email = false;
    let valid_birth = false;

    if (/[A-Z][a-z]+/.exec(firstname) == firstname) valid_firstname = true;
    else {
        valid_firstname = false;
        alertMessage += "First name\n"
    }

    if (/[A-Z][a-z]+/.exec(lastname) == lastname) valid_lastname = true;
    else {
        valid_lastname = false;
        alertMessage += "Last name\n"
    }

    if (/[^@\s]+@[^@\s.]+.[A-Za-z]{2,3}/.exec(email) == email) valid_email = true;
    else {
        valid_email = false;
        alertMessage += "Email\n"
    }

    if (/\d{4}-\d{2}-\d{2}/.exec(birth) == birth) {
        let date = birth.split('-')
        let year = date[0]
        let month = date[1]
        let day = date[2]
        if (1900 <= year && 2020 >= year && 1 <= month && 12 >= month && 1 <= day && 31 >= day) valid_birth = true;
        else {
            valid_birth = false;
            alertMessage += "Date-of-birth\n"
        }
    } else {
        valid_birth = false;
        alertMessage += "Date-of-birth\n"
    }

    // Hint: you can use the `RegExp` class for matching a string.

    // The return data format is as follows. For the given `form` argument, you should
    // correctly process the validation, filling in `alertMessage`, and `validationResults`. 
    // When you deal with `validationResults`, the values of `message` should be set to `null`
    // for the valid input fields. (See the example below.)
    // Below is just a reference for the return value's format. Delete this and fill your own
    // proper code to return the correct data.

    // IMPORTANT NOTE: You must use the argument `form` rather than directly using APIs such as `document.getElementId` or `document.querySelector`.
    //                 Plus, please do not call `alert` function here.
    //                 For debugging purpose, you can use `console.log`.
    return {
        alertMessage: alertMessage ? "You must correct:\n\n" + alertMessage : "Successfully Submitted!",
        validationResults: [
            { name: "first-name", valid: valid_firstname, message: valid_firstname ? null : "Invalid first name" },
            { name: "last-name", valid: valid_lastname, message: valid_lastname ? null : "Invalid last name" },
            { name: "email", valid: valid_email, message: valid_email ? null : "Invalid email" },
            { name: "date-of-birth", valid: valid_birth, message: valid_birth ? null : "Invalid date of birth" }
        ]
    };
}
