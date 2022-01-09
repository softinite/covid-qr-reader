export const questions = [
    {
        idx: 1,
        text: '1-A. Does the child/student or anyone in the household have this new or worsening symptom, today, or in the last 5 or 10 days?',
        footnotes: [
            {
                label: 'What about pre-existing conditions?',
                description:  'If the symptom is from a known health condition that gives them the symptom, select “No”. If the symptom is new, different or getting worse, select “Yes”'
            },
            {
                label: 'Can an adult who is feeling unwell pick up/drop off a child with no symptoms?',
                description: 'Anyone who is sick or has any symptoms of illness, should stay home and seek assessment from their health care provider if needed.'
            },
            {
                label: 'When to use 5 vs 10 days?',
                description: 'Use 5 days: If the person is fully vaccinated or 11 years or younger. Use 10 days: If they are 12 years or older and not fully vaccinated; or immune compromised.'
            },
            {
                label: 'Whom to consider fully vaccinated?',
                description: 'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
            }
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
        text: '1-B. Does the child/student or anyone in the household have this new or worsening symptom today, or in the last 5 or 10 days?',
        footnotes: [
            {
              label: 'What about pre-existing conditions?',
              description:  'If the symptom is from a known health condition that gives them the symptom, select “No”. If the symptom is new, different or getting worse, select “Yes”'
            },
            {
                label: 'What about symptoms caused by COVID-19 vaccine?',
                description: 'If there is mild tiredness, sore muscles or joints within 48 hours after a COVID-19 vaccine, select “No”. If longer than 48 hours, select “Yes.”'
            },
            {
                label: 'Can an adult who is feeling unwell pick up/drop off a child with no symptoms?',
                description: 'Anyone who is sick or has any symptoms of illness, should stay home and seek assessment from their health care provider if needed.'
            },
            {
                label: 'When to use 5 vs 10 days?',
                description: 'Use 5 days: If the person is fully vaccinated or 11 years or younger. Use 10 days: If they are 12 years or older and not fully vaccinated; or immune compromised.'
            },
            {
                label: 'Whom to consider fully vaccinated?',
                description: 'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
            }
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
        text: '2. Has the student/child or anyone in the household had a positive COVID-19 test in the last 5 or 10 days, or has the student/child been told to stay home and self-isolate?',
        footnotes: [
            {
                label: 'When to use 5 vs 10 days?',
                description: 'Use 5 days: If the person is fully vaccinated or 11 years or younger. Use 10 days: If they are 12 years or older and not fully vaccinated; or immune compromised.'
            },
            {
                label: 'Whom to consider fully vaccinated?',
                description: 'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
            }
        ],
        symptoms: [
            { name: 'Tested positive for COVID-19', image: '/images/positive.png', actionCode: 'homeAndIsolate'}
        ]
    },
    {
        idx: 4,
        text: '3. In the last 10 days has the student/child been notified as a close contact of someone with COVID-19, or received a COVID Alert notification?',
        footnotes: [
            {
                label: 'What are the exemptions?',
                description: 'If the person is not a household member AND the student/child is fully vaccinated or public health has told you that you do not need to self-isolate, select “No”'
            },
            {
                label: 'Whom to consider fully vaccinated?',
                description: 'Fully vaccinated means 14 days or more after a second dose of a COVID-19 vaccine series, or as defined by the Ontario Ministry of Health.'
            }
        ],
        symptoms: [
            { name: 'Close contact notification', image: '/images/close_contact.png', actionCode: 'homeAndIsolate'}
        ]
    },
    {
        idx: 5,
        text: '4. In the last 14 days, has the student/child travelled outside of Canada?',
        footnotes: [],
        symptoms: [
            { name: 'Travelled outside of Canada', image: '/images/travel.png', actionCode: 'federalQuarantine'}
        ]
    }
]
