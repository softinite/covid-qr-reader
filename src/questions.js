export const questions = [
    {
        idx: 1,
        text: '1-A. Does the child/student or anyone in the household have this new or worsening symptom, today, or in the last 5 days?',
        footprints: [
            'If the symptom is from a known health condition that gives them the symptom, select “No”. If the symptom is new, different or getting worse, select “Yes”',
            'Anyone who is sick or has any symptoms of illness, should stay home and seek assessment from their health care provider if needed.'
        ],
        symptoms: [
            { name: 'Fever > 37.8 C and/or chills', image: '/images/fever.png', actionCode: 'homeAndIsolate'},
            { name: 'Cough', image: '/images/cough.png', actionCode: 'homeAndIsolate'},
            { name: 'Difficulty breathing', image: '/images/difficulty_breathing.png', actionCode: 'homeAndIsolate'},
            { name: 'Decrease or loss of taste/smell', image: '/images/smell.png', actionCode: 'homeAndIsolate'}
        ]
    },
    {
        idx: 2,
        text: '1-B. Does the child/student or anyone in the household have this new or worsening symptom today, or in the last 5 days?',
        footprints: [
            'If the symptom is from a known health condition that gives them the symptom, select “No”. If the symptom is new, different or getting worse, select “Yes”',
            'If there is mild tiredness, sore muscles or joints within 48 hours after a COVID-19 vaccine, select “No”. If longer than 48 hours, select “Yes.”',
            'Anyone who is sick or has any symptoms of illness, should stay home and seek assessment from their health care provider if needed.',
            'If child/student has one symptom stay home until symptoms improve for at least 24 hours or 48 hours if nausea/vomiting/diarrhea.'
        ],
        symptoms: [
            { name: 'Sore throat', image: '/images/sore_throat.png', actionCode: 'home24'},
            { name: 'Headache', image: '/images/headache.png', actionCode: 'home24'},
            { name: 'Feeling very tired', image: '/images/tired.png', actionCode: 'home24'},
            { name: 'Runny nose/nasal congestion', image: '/images/runny_nose.png', actionCode: 'home24'},
            { name: 'Muscle aches/joint pain', image: '/images/aches.png', actionCode: 'home24'},
            { name: 'Nausea, vomiting or diarrhea', image: '/images/nausea.png', actionCode: 'home48'}
        ]
    },
    {
        idx: 3,
        text: '2. Has the student/child or anyone in the household had a positive COVID-19 test in the last 5, or has the student/child been told to stay home and self-isolate?',
        footprints: [],
        symptoms: [
            { name: 'Tested positive for COVID-19', image: '/images/positive.png', actionCode: 'homeAndIsolate'}
        ]
    },
    {
        idx: 4,
        text: '3. In the last 10 days has the student/child been notified as a close contact of someone with COVID-19, or received a COVID Alert notification?',
        footprints: [
            'If the person is not a household member AND the student/child is fully vaccinated or public health has told you that you do not need to self-isolate, select “No”'
        ],
        symptoms: [
            { name: 'Close contact notification', image: '/images/close_contact.png', actionCode: 'homeAndIsolate'}
        ]
    },
    {
        idx: 5,
        text: '4. In the last 14 days, has the student/child travelled outside of Canada?',
        footprints: [],
        symptoms: [
            { name: 'Travelled outside of Canada', image: '/images/travel.png', actionCode: 'federalQuarantine'}
        ]
    }
]
