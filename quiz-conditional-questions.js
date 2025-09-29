// Extended conditional questions for all claim types
const CONDITIONAL_QUESTIONS = {
    'unfair-dismissal': {
        title: 'Unfair Dismissal Details',
        questions: [
            {
                type: 'multi-select',
                question: 'What reason were you given for dismissal?',
                options: [
                    { value: 'no-reason', text: 'No reason given' },
                    { value: 'performance', text: 'Performance issues' },
                    { value: 'misconduct', text: 'Misconduct allegations' },
                    { value: 'redundancy', text: 'Redundancy (but others kept on)' },
                    { value: 'other', text: 'Other reason' }
                ]
            },
            {
                type: 'single-select',
                question: 'Did your employer follow proper dismissal procedures?',
                options: [
                    { value: 'no-process', text: 'No investigation or meetings' },
                    { value: 'brief-process', text: 'Very brief/unfair process' },
                    { value: 'some-process', text: 'Some process but felt unfair' },
                    { value: 'not-sure', text: 'Not sure about the process' }
                ]
            }
        ]
    },
    'pay-claims': {
        title: 'Pay Claims Details',
        questions: [
            {
                type: 'multi-select',
                question: 'What type of pay issue?',
                options: [
                    { value: 'unpaid-wages', text: 'Unpaid wages/salary' },
                    { value: 'unpaid-holiday', text: 'Unpaid holiday pay' },
                    { value: 'unpaid-overtime', text: 'Unpaid overtime' },
                    { value: 'unpaid-bonuses', text: 'Unpaid bonuses/commission' },
                    { value: 'incorrect-deductions', text: 'Incorrect final pay/deductions' }
                ]
            },
            {
                type: 'number-input',
                question: 'How much are you owed approximately?',
                placeholder: '£0'
            }
        ]
    },
    'sex-discrimination': {
        title: 'Sex/Gender Discrimination Details',
        questions: [
            {
                type: 'multi-select',
                question: 'How did this discrimination manifest?',
                options: [
                    { value: 'passed-over', text: 'Passed over for promotion' },
                    { value: 'paid-less', text: 'Paid less than male colleagues' },
                    { value: 'inappropriate-comments', text: 'Inappropriate comments about gender' },
                    { value: 'pregnancy-treatment', text: 'Treated differently due to pregnancy/maternity' },
                    { value: 'excluded-opportunities', text: 'Excluded from opportunities' },
                    { value: 'other-gender', text: 'Other gender-based treatment' }
                ]
            }
        ]
    },
    'disability-discrimination': {
        title: 'Disability Discrimination Details',
        questions: [
            {
                type: 'multi-select',
                question: 'What happened?',
                options: [
                    { value: 'refused-adjustments', text: 'Refused reasonable adjustments' },
                    { value: 'dismissed-sickness', text: 'Dismissed due to sickness/disability' },
                    { value: 'harassment-disability', text: 'Harassment about disability' },
                    { value: 'denied-opportunities', text: 'Denied equal opportunities' },
                    { value: 'disciplined-absence', text: 'Disciplined for disability-related absence' }
                ]
            }
        ]
    },
    'race-discrimination': {
        title: 'Race/Ethnicity Discrimination Details',
        questions: [
            {
                type: 'multi-select',
                question: 'How did this occur?',
                options: [
                    { value: 'racial-slurs', text: 'Racial slurs or comments' },
                    { value: 'passed-over-race', text: 'Passed over for promotion' },
                    { value: 'different-treatment', text: 'Different treatment from colleagues' },
                    { value: 'excluded-activities', text: 'Excluded from workplace activities' },
                    { value: 'harsh-discipline', text: 'Disciplined more harshly than others' }
                ]
            }
        ]
    },
    'age-discrimination': {
        title: 'Age Discrimination Details',
        questions: [
            {
                type: 'multi-select',
                question: 'What happened?',
                options: [
                    { value: 'age-comments', text: 'Comments about my age' },
                    { value: 'passed-over-age', text: 'Passed over for promotion due to age' },
                    { value: 'redundancy-age', text: 'Made redundant (younger staff kept)' },
                    { value: 'excluded-training', text: 'Excluded from training/opportunities' },
                    { value: 'pressured-retire', text: 'Pressured to retire' }
                ]
            }
        ]
    },
    'constructive-dismissal': {
        title: 'Constructive Dismissal Details',
        questions: [
            {
                type: 'multi-select',
                question: 'What made your position untenable?',
                options: [
                    { value: 'role-changes', text: 'Significant changes to role/responsibilities without agreement' },
                    { value: 'pay-reduction', text: 'Reduction in pay or benefits' },
                    { value: 'bullying-management', text: 'Bullying or harassment by management' },
                    { value: 'health-safety', text: 'Breach of health and safety obligations' },
                    { value: 'grievance-failure', text: 'Failure to investigate grievances properly' },
                    { value: 'impossible-conditions', text: 'Impossible working conditions or unrealistic demands' }
                ]
            }
        ]
    },
    'sexual-harassment': {
        title: 'Sexual Harassment Details',
        questions: [
            {
                type: 'multi-select',
                question: 'What type of harassment occurred?',
                options: [
                    { value: 'physical-contact', text: 'Unwanted physical contact or touching' },
                    { value: 'sexual-comments', text: 'Sexual comments or jokes' },
                    { value: 'sexual-favors', text: 'Requests for sexual favors' },
                    { value: 'sexual-images', text: 'Displaying sexual images or materials' },
                    { value: 'sexual-messages', text: 'Inappropriate sexual messages/emails' },
                    { value: 'hostile-environment', text: 'Creating a sexually hostile work environment' }
                ]
            }
        ]
    },
    'maternity-discrimination': {
        title: 'Maternity Discrimination Details',
        questions: [
            {
                type: 'multi-select',
                question: 'How were you treated unfairly?',
                options: [
                    { value: 'dismissed-pregnant', text: 'Dismissed or made redundant during pregnancy/maternity' },
                    { value: 'denied-promotion', text: 'Denied promotion due to pregnancy/maternity plans' },
                    { value: 'role-changed', text: 'Role changed or responsibilities reduced' },
                    { value: 'refused-flexible', text: 'Refused flexible working or reasonable adjustments' },
                    { value: 'harassment-maternity', text: 'Harassment about pregnancy/maternity leave' },
                    { value: 'different-return', text: 'Different treatment upon return from maternity leave' }
                ]
            }
        ]
    },
    'sexual-orientation-discrimination': {
        title: 'Sexual Orientation Discrimination Details',
        questions: [
            {
                type: 'multi-select',
                question: 'How did this discrimination occur?',
                options: [
                    { value: 'offensive-comments', text: 'Offensive comments about sexual orientation' },
                    { value: 'excluded-social', text: 'Excluded from workplace social activities' },
                    { value: 'passed-over-orientation', text: 'Passed over for promotion due to sexual orientation' },
                    { value: 'different-treatment-orientation', text: 'Different treatment from colleagues' },
                    { value: 'harassment-orientation', text: 'Harassment or bullying related to sexual orientation' },
                    { value: 'denied-benefits', text: 'Denied equal opportunities or benefits' }
                ]
            }
        ]
    },
    'workplace-bullying': {
        title: 'Workplace Bullying Details',
        questions: [
            {
                type: 'multi-select',
                question: 'What bullying behavior did you experience?',
                options: [
                    { value: 'verbal-abuse', text: 'Verbal abuse, shouting, or aggressive behavior' },
                    { value: 'public-humiliation', text: 'Public humiliation or embarrassment' },
                    { value: 'excessive-criticism', text: 'Excessive criticism or impossible targets' },
                    { value: 'exclusion-meetings', text: 'Exclusion from meetings or workplace activities' },
                    { value: 'spreading-rumors', text: 'Spreading rumors or undermining reputation' },
                    { value: 'threats-intimidation', text: 'Threats or intimidation' }
                ]
            }
        ]
    },
    'whistleblowing': {
        title: 'Whistleblowing Details',
        questions: [
            {
                type: 'multi-select',
                question: 'What happened after you raised concerns?',
                options: [
                    { value: 'dismissed-whistle', text: 'Dismissed or made redundant' },
                    { value: 'demoted', text: 'Demoted or role changed' },
                    { value: 'excluded-decisions', text: 'Excluded from meetings or decision-making' },
                    { value: 'colleagues-turned', text: 'Colleagues turned against me' },
                    { value: 'inadequate-investigation', text: 'Investigation was inadequate or biased' },
                    { value: 'victimization', text: 'Suffered harassment or victimization' }
                ]
            },
            {
                type: 'multi-select',
                question: 'What type of wrongdoing did you report?',
                options: [
                    { value: 'health-safety-violations', text: 'Health and safety violations' },
                    { value: 'financial-misconduct', text: 'Financial misconduct or fraud' },
                    { value: 'legal-breaches', text: 'Legal breaches or regulatory violations' },
                    { value: 'environmental-damage', text: 'Environmental damage or concerns' },
                    { value: 'cover-up', text: 'Cover-up of wrongdoing' },
                    { value: 'public-health', text: 'Danger to public health or safety' }
                ]
            }
        ]
    }
};

// Enhanced compensation calculations
const ENHANCED_COMPENSATION = {
    calculateUnfairDismissal: function(quizData) {
        const weeklySalary = quizData.salary / 52;
        const yearsService = this.getYearsService(quizData.answers.step_2);
        const ageMultiplier = this.getAgeMultiplier();
        
        const basicAward = Math.min(weeklySalary * yearsService * ageMultiplier, 17130);
        const compensatoryAward = Math.min(weeklySalary * 52, 115115);
        
        // Adjust based on evidence strength
        const evidenceMultiplier = this.getEvidenceMultiplier(quizData);
        
        return {
            type: 'Unfair Dismissal',
            min: Math.round(basicAward * evidenceMultiplier.min),
            max: Math.round((basicAward + compensatoryAward) * evidenceMultiplier.max),
            breakdown: {
                basicAward: Math.round(basicAward),
                compensatoryAward: Math.round(compensatoryAward),
                evidenceMultiplier: evidenceMultiplier
            }
        };
    },
    
    calculateDiscrimination: function(claimType, quizData) {
        const baseAmounts = {
            'sex-discrimination': { lower: 1100, middle: 11200, upper: 33700 },
            'disability-discrimination': { lower: 1100, middle: 11200, upper: 33700 },
            'race-discrimination': { lower: 1100, middle: 11200, upper: 33700 },
            'age-discrimination': { lower: 1100, middle: 11200, upper: 33700 },
            'sexual-orientation-discrimination': { lower: 1100, middle: 11200, upper: 33700 },
            'maternity-discrimination': { lower: 1100, middle: 11200, upper: 33700 }
        };
        
        const amounts = baseAmounts[claimType] || baseAmounts['sex-discrimination'];
        const evidenceStrength = this.getEvidenceMultiplier(quizData);
        
        return {
            type: this.getClaimTypeName(claimType),
            min: Math.round(amounts.lower * evidenceStrength.min),
            max: Math.round(amounts.upper * evidenceStrength.max),
            breakdown: {
                injuryToFeelings: amounts,
                evidenceStrength: evidenceStrength
            }
        };
    },
    
    calculatePayClaims: function(quizData) {
        const amountOwed = quizData.amountOwed || 0;
        const evidenceStrength = this.getEvidenceMultiplier(quizData);
        
        return {
            type: 'Pay Claims',
            min: Math.max(amountOwed * evidenceStrength.min, 1000),
            max: Math.max(amountOwed * evidenceStrength.max * 1.5, 5000),
            breakdown: {
                amountOwed: amountOwed,
                evidenceStrength: evidenceStrength
            }
        };
    },
    
    getYearsService: function(duration) {
        const durations = {
            'less-2-years': 1,
            '2-5-years': 3.5,
            '5-10-years': 7.5,
            'more-10-years': 12
        };
        return durations[duration] || 2;
    },
    
    getAgeMultiplier: function() {
        // In a real implementation, you'd collect age data
        // For now, using a reasonable default
        return 1.5;
    },
    
    getEvidenceMultiplier: function(quizData) {
        let score = 0;
        
        // Evidence scoring
        const evidenceCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        score += evidenceCheckboxes.length * 10;
        
        // Witnesses
        if (quizData.answers.step_7 === 'yes-supportive') score += 25;
        else if (quizData.answers.step_7 === 'yes-reluctant') score += 15;
        
        // Formal complaint
        if (quizData.answers.step_7 === 'yes-formal') score += 20;
        else if (quizData.answers.step_7 === 'yes-informal') score += 10;
        
        // Impact
        if (quizData.answers.step_7 === 'severe') score += 25;
        else if (quizData.answers.step_7 === 'moderate') score += 15;
        
        if (score >= 70) return { min: 0.8, max: 1.0 };
        if (score >= 40) return { min: 0.6, max: 0.8 };
        return { min: 0.4, max: 0.6 };
    },
    
    getClaimTypeName: function(claimType) {
        const names = {
            'unfair-dismissal': 'Unfair Dismissal',
            'pay-claims': 'Pay Claims',
            'sex-discrimination': 'Sex Discrimination',
            'disability-discrimination': 'Disability Discrimination',
            'race-discrimination': 'Race Discrimination',
            'age-discrimination': 'Age Discrimination',
            'constructive-dismissal': 'Constructive Dismissal',
            'sexual-harassment': 'Sexual Harassment',
            'maternity-discrimination': 'Maternity Discrimination',
            'sexual-orientation-discrimination': 'Sexual Orientation Discrimination',
            'workplace-bullying': 'Workplace Bullying',
            'whistleblowing': 'Whistleblowing'
        };
        return names[claimType] || claimType;
    }
};

// Export for use in main quiz
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONDITIONAL_QUESTIONS, ENHANCED_COMPENSATION };
}
