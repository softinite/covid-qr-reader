export const questions = [
    {
        idx: 1,
        text: 'Does the child/student or anyone in the household have 1 or more of these new or worsening symptoms, today, or in the last 5 or 10 days?',
        footprints: [
            'If the symptom is from a known health condition that gives them the symptom, select “No”. If the symptom is new, different or getting worse, select “Yes”',
            'Anyone who is sick or has any symptoms of illness, should stay home and seek assessment from their health care provider if needed.',
            'Use 5 days: If the person is fully vaccinated or 11 years or younger. Use 10 days: If they are 12 years or older and not fully vaccinated; or immune compromised.',
            'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
        ],
        symptoms: [
            { name: 'Fever > 37.8 C and/or chills', image: '/images/fever.png', actionCode: 'homeAndIsolate'},
            { name: 'Cough', image: '', actionCode: 'homeAndIsolate'},
            { name: 'Difficulty breathing', image: '', actionCode: 'homeAndIsolate'},
            { name: 'Decrease or loss of taste/smell', image: '', actionCode: 'homeAndIsolate'}
        ]
    },
    {
        idx: 2,
        text: 'Does the child/student or anyone in the household have 2 or more of these new or worsening symptoms today, or in the last 5 or 10 days?',
        footprints: [
            'If the symptom is from a known health condition that gives them the symptom, select “No”. If the symptom is new, different or getting worse, select “Yes”',
            'If there is mild tiredness, sore muscles or joints within 48 hours after a COVID-19 vaccine, select “No”. If longer than 48 hours, select “Yes.”',
            'Anyone who is sick or has any symptoms of illness, should stay home and seek assessment from their health care provider if needed.',
            'If child/student has one symptom stay home until symptoms improve for at least 24 hours or 48 hours if nausea/vomiting/diarrhea.',
            'Use 5 days: If the person is fully vaccinated or 11 years or younger. Use 10 days: If they are 12 years or older and not fully vaccinated; or immune compromised.',
            'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
        ],
        symptoms: [
            { name: 'Sore throat', image: '', actionCode: 'home24'},
            { name: 'Headache', image: '', actionCode: 'home24'},
            { name: 'Feeling very tired', image: '', actionCode: 'home24'},
            { name: 'Runny nose/nasal congestion', image: '', actionCode: 'home24'},
            { name: 'Muscle aches/joint pain', image: '', actionCode: 'home24'},
            { name: 'Nausea, vomiting or diarrhea', image: '', actionCode: 'home48'}
        ]
    },
    {
        idx: 3,
        text: 'Has the student/child or anyone in the household had a positive COVID-19 test in the last 5 or 10 days*, or has the student/child been told to stay home and self-isolate?',
        footprints: [
            'Use 5 days: If the person is fully vaccinated or 11 years or younger. Use 10 days: If they are 12 years or older and not fully vaccinated; or immune compromised.',
            'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
        ],
        symptoms: [
            { name: 'Tested positive for COVID-19', image: '', actionCode: 'homeAndIsolate'}
        ]
    },
    {
        idx: 4,
        text: 'In the last 10 days has the student/child been notified as a close contact of someone with COVID-19, or received a COVID Alert notification?',
        footprints: [
            'If the person is not a household member AND the student/child is fully vaccinated or public health has told you that you do not need to self-isolate, select “No”',
            'Use 5 days: If the person is fully vaccinated or 11 years or younger. Use 10 days: If they are 12 years or older and not fully vaccinated; or immune compromised.',
            'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
        ],
        symptoms: [
            { name: 'Close contact notification', image: '', actionCode: 'homeAndIsolate'}
        ]
    },
    {
        idx: 5,
        text: 'n the last 14 days, has the student/child travelled outside of Canada?',
        footprints: [
            'Use 5 days: If the person is fully vaccinated or 11 years or younger. Use 10 days: If they are 12 years or older and not fully vaccinated; or immune compromised.',
            'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
        ],
        symptoms: [
            { name: 'Close contact notification', image: '', actionCode: 'federalQuarantine'}
        ]
    }
]
