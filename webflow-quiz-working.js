(function() {
  "use strict";

  const state = {
    step: 0,
    totalSteps: 9,
    answers: {},
    claims: [],
    salary: 35000,
    amountOwed: 0,
    start: Date.now(),
    contact: {}
  };

  function h(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function mount() {
    const root = document.getElementById('employment-quiz-app');
    if (!root) {
      console.error('Quiz App: Root element #employment-quiz-app not found.');
      return;
    }

    root.innerHTML = '';
    const styles = `
      <style>
        .wfq-container { max-width: 800px; margin: 0 auto; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
        .wfq-progress { width: 100%; background: #e5e7eb; border-radius: 999px; height: 12px; margin-bottom: 24px; overflow: hidden; }
        #wfq-progress-fill { background: linear-gradient(to right, #3b82f6, #1e40af); height: 100%; border-radius: 999px; transition: width 0.4s ease-in-out; }
        .wfq-step { display: none; padding: 24px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); margin-bottom: 16px; }
        .wfq-step.active { display: block; }
        .wfq-step h2 { font-size: 1.6rem; font-weight: 700; margin: 0 0 8px; color: #111827; text-align: center; }
        .wfq-step p { color: #6b7280; margin: 0 0 24px; text-align: center; font-size: 1.1rem; }
        .wfq-btn-group { display: flex; flex-direction: column; gap: 12px; }
        .wfq-btn, .wfq-nav-btn { width: 100%; box-sizing: border-box; padding: 14px 18px; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; cursor: pointer; text-align: left; transition: all 0.2s ease-in-out; font-weight: 600; font-size: 1rem; }
        .wfq-btn:hover { border-color: #9ca3af; }
        .wfq-btn.selected { background-color: #3b82f6; color: #fff; border-color: #3b82f6; }
        .wfq-nav-btn-container { display: flex; justify-content: space-between; margin-top: 24px; gap: 12px; }
        .wfq-nav-btn { text-align: center; }
        .wfq-nav-btn.wfq-continue-btn { background: #3b82f6; color: #fff; border-color: #3b82f6; }
        .wfq-nav-btn.wfq-continue-btn:hover { background-color: #2563eb; }
        .wfq-nav-btn.wfq-back-btn { background-color: #f3f4f6; border-color: #e5e7eb; }
        .wfq-nav-btn.wfq-back-btn:hover { background-color: #e5e7eb; }
        .wfq-nav-btn:disabled { cursor: not-allowed; background-color: #9ca3af; border-color: #9ca3af; color: #e5e7eb; }
        .wfq-claim-label { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; cursor: pointer; transition: all 0.2s ease-in-out; font-weight: 600; }
        .wfq-claim-label:has(input:checked) { background-color: #eff6ff; border-color: #3b82f6; }
        .wfq-claim-label span { flex-grow: 1; }
        input[type="number"], input[type="text"], input[type="email"], input[type="tel"] { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 16px; box-sizing: border-box; }
        .wfq-conditional-section { margin-bottom: 24px; padding: 20px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
        .wfq-conditional-section h3 { font-size: 1.25rem; font-weight: 600; margin: 0 0 12px; color: #111827; }
        .wfq-welcome-points { list-style: none; padding: 0; margin: 24px 0; display: flex; flex-direction: column; gap: 12px; text-align: center; color: #4b5563; }
        .wfq-salary-container { display: flex; flex-direction: column; gap: 16px; }
        .wfq-salary-display { display: flex; justify-content: space-between; align-items: center; }
        .wfq-salary-display span { font-size: 1.5rem; font-weight: 700; color: #3b82f6; background-color: #f3f4f6; padding: 8px 12px; border-radius: 8px; }
        .wfq-microcopy { font-size: 0.8rem; text-align: center; color: #9ca3af; margin-top: 16px; }
        #wfq-results-content h2 { font-size: 2rem; } #wfq-results-content p { font-size: 1.25rem; }
        .wfq-results-box { background:#f9fafb; border-radius:12px; padding:24px; margin:24px 0; border: 1px solid #e5e7eb; }
        .wfq-human-element { display: flex; align-items: center; gap: 16px; margin-top: 32px; padding: 16px; background-color: #f9fafb; border-radius: 12px; }
        .wfq-human-element img { width: 60px; height: 60px; border-radius: 50%; }
      </style>
    `;
    
    const quizHtml = `
      <div class="wfq-container">
        <div class="wfq-progress"><div id="wfq-progress-fill"></div></div>
        <div id="wfq-steps-container"></div>
      </div>
    `;
    
    root.innerHTML = styles + quizHtml;
    buildSteps();
    attachListeners();
    updateView();
  }

  function buildSteps() {
    const container = document.getElementById('wfq-steps-container');
    container.innerHTML = `
      <div id="wfq-step-0" class="wfq-step">
        <h2>Find Out if You Have a Claim in Under 3 Minutes</h2>
        <ul class="wfq-welcome-points">
          <li>✅ 100% Free & Confidential</li>
          <li>✅ No Obligation Assessment</li>
          <li>✅ Instant Compensation Estimate</li>
        </ul>
        <button class="wfq-nav-btn wfq-continue-btn" data-step="1">Start My Claim Assessment →</button>
      </div>

      <div id="wfq-step-1" class="wfq-step">
        <h2>What is your current employment status?</h2><p>This helps us understand your situation.</p>
        <div class="wfq-btn-group">${renderButtons(['employed', 'recently-dismissed', 'dismissed-long-ago', 'self-employed'], 1)}</div>
      </div>

      <div id="wfq-step-2" class="wfq-step">
        <h2>When did the main events happen?</h2><p>This is crucial for claim deadlines.</p>
        <div class="wfq-btn-group">${renderButtons(['within-3-months', '3-6-months', '6-12-months', 'more-than-12-months'], 2)}</div>
        ${renderNavButtons(0, 3)}
      </div>

      <div id="wfq-step-3" class="wfq-step">
        <h2>What type of treatment did you experience?</h2><p>Select all that apply.</p>
        <div class="wfq-btn-group">${renderClaimCheckboxes()}</div>
        ${renderNavButtons(2, 4)}
      </div>

      <div id="wfq-step-4" class="wfq-step">
        <h2>How long were you employed there?</h2><p>This affects the types of claims you can make.</p>
        <div class="wfq-btn-group">${renderButtons(['less-than-2-years', '2-5-years', '5-10-years', 'more-than-10-years'], 4)}</div>
        ${renderNavButtons(3, 5)}
      </div>

      <div id="wfq-step-5" class="wfq-step">
        <h2>Tell us more about your situation</h2><p>Just a few more details for an accurate estimate.</p>
        <div id="wfq-conditional-questions"></div>
        ${renderNavButtons(4, 6)}
      </div>

      <div id="wfq-step-6" class="wfq-step">
        <h2>What is your approximate annual salary?</h2><p>Used to calculate your potential compensation.</p>
        <div class="wfq-salary-container">
          <div class="wfq-salary-display">
            <label for="wfq-salary-input">Salary:</label>
            <span>£<span id="wfq-salary-value-display">35,000</span></span>
          </div>
          <input type="range" id="wfq-salary-slider" min="15000" max="200000" value="35000" step="1000">
          <input type="number" id="wfq-salary-input" value="35000" style="display:none;">
        </div>
        ${renderNavButtons(5, 7)}
      </div>

      <div id="wfq-step-7" class="wfq-step">
        <h2>Do you have any outstanding pay owed?</h2><p>e.g., Unpaid wages, holiday pay, or bonuses.</p>
        <input type="number" id="wfq-owed" value="0" placeholder="0" />
        ${renderNavButtons(6, 8)}
      </div>

      <div id="wfq-step-8" class="wfq-step">
        <h2>See Your Personalized Claim Estimate</h2><p>Enter your details to view your results instantly.</p>
        <form id="wfq-contact-form" style="display:flex; flex-direction:column; gap:16px;">
          <input type="text" id="wfq-name" placeholder="Full Name" required />
          <input type="email" id="wfq-email" placeholder="Email Address" required />
          <input type="tel" id="wfq-phone" placeholder="Phone Number (Optional)" />
          <label style="font-size: 0.9rem; color: #6b7280;"><input type="checkbox" id="wfq-consent" required /> I consent to being contacted about my claim.</label>
          <button type="submit" class="wfq-nav-btn wfq-continue-btn">View My Claim Estimate</button>
        </form>
        <p class="wfq-microcopy">🔒 Your details are 100% confidential and protected.</p>
        ${renderNavButtons(7, null)}
      </div>

      <div id="wfq-step-9" class="wfq-step">
        <div id="wfq-results-content"></div>
      </div>
    `;
  }

  function renderButtons(options, step) {
    return options.map(opt => `<button class="wfq-btn" data-value="${opt}" data-step="${step}">${opt.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`).join('');
  }
  
  function renderClaimCheckboxes() {
    const claims = [
        { id: 'unfair-dismissal', icon: '🚫' },
        { id: 'discrimination', icon: '⚖️' },
        { id: 'harassment', icon: '🗣️' },
        { id: 'bullying', icon: '😞' },
        { id: 'pay-claims', icon: '💰' },
        { id: 'whistleblowing', icon: '📣' },
        { id: 'redundancy', icon: '✂️' },
        { id: 'constructive-dismissal', icon: '🚶' },
        { id: 'victimisation', icon: '🎯' },
        { id: 'age-discrimination', icon: '👴' },
        { id: 'disability-discrimination', icon: '♿' },
        { id: 'pregnancy-discrimination', icon: '🤱' }
    ];
    return claims.map(claim => `<label class="wfq-claim-label">${claim.icon} <span>${claim.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span><input type="checkbox" data-claim="${claim.id}" /></label>`).join('');
  }
  
  function renderNavButtons(backStep, nextStep) {
    const backBtn = backStep !== null ? `<button class="wfq-nav-btn wfq-back-btn" data-step="${backStep}">Back</button>` : '<div></div>';
    const nextBtn = nextStep ? `<button class="wfq-nav-btn wfq-continue-btn" data-step="${nextStep}">Continue</button>` : '';
    return `<div class="wfq-nav-btn-container">${backBtn}${nextBtn}</div>`;
  }

  function attachListeners() {
    const root = document.getElementById('employment-quiz-app');
    
    root.addEventListener('click', e => {
      const navBtn = e.target.closest('.wfq-nav-btn');
      const choiceBtn = e.target.closest('.wfq-btn');

      if (navBtn) {
        e.preventDefault();
        if (navBtn.disabled) return;
        const targetStep = parseInt(navBtn.dataset.step, 10);
        goToStep(targetStep);
      }
      
      if (choiceBtn) {
        e.preventDefault();
        const step = parseInt(choiceBtn.dataset.step, 10);
        const value = choiceBtn.dataset.value;
        
        const group = choiceBtn.closest('.wfq-btn-group');
        group.querySelectorAll('.wfq-btn').forEach(btn => btn.classList.remove('selected'));
        choiceBtn.classList.add('selected');
        state.answers[`step_${step}`] = value;

        if ([1, 4].includes(step)) {
            setTimeout(() => goToStep(step + 1), 200);
        }
        updateView();
      }
    });

    root.addEventListener('change', e => {
      if (e.target.matches('input[type="checkbox"][data-claim]')) {
        state.claims = Array.from(root.querySelectorAll('input[data-claim]:checked')).map(el => el.dataset.claim);
        updateView();
      }
    });

    // Salary slider sync
    const salarySlider = root.querySelector('#wfq-salary-slider');
    const salaryInput = root.querySelector('#wfq-salary-input');
    const salaryDisplay = root.querySelector('#wfq-salary-value-display');
    
    if (salarySlider && salaryDisplay) {
      const salarySync = (e) => {
        const value = e.target.value;
        salarySlider.value = value;
        salaryInput.value = value;
        salaryDisplay.textContent = parseInt(value, 10).toLocaleString();
        state.salary = parseInt(value, 10);
      };
      salarySlider.addEventListener('input', salarySync);
      if (salaryInput) salaryInput.addEventListener('input', salarySync);
    }

    // Form submission - FIXED VERSION
    document.addEventListener('submit', e => {
      if (e.target.id === 'wfq-contact-form') {
        e.preventDefault();
        console.log('Form submitted!'); // Debug log
        
        state.contact.name = document.getElementById('wfq-name').value;
        state.contact.email = document.getElementById('wfq-email').value;
        state.contact.phone = document.getElementById('wfq-phone').value;
        state.amountOwed = parseInt(document.getElementById('wfq-owed').value, 10) || 0;
        
        console.log('Contact data:', state.contact); // Debug log
        
        const result = calculateResult();
        console.log('Result:', result); // Debug log
        
        sendSubmission(result);
        renderResults(result);
        goToStep(9);
      }
    });
  }

  function goToStep(stepNumber) {
    console.log('Going to step:', stepNumber); // Debug log
    state.step = stepNumber;
    updateView();
  }

  function updateView() {
    document.querySelectorAll('.wfq-step').forEach(el => el.classList.remove('active'));
    const currentStep = document.getElementById(`wfq-step-${state.step}`);
    if (currentStep) currentStep.classList.add('active');

    const progress = state.step >= 8 ? 100 : ((state.step) / (state.totalSteps - 2)) * 100;
    const progressFill = document.getElementById('wfq-progress-fill');
    if (progressFill) progressFill.style.width = `${progress}%`;

    // Validation
    const step2Btn = document.querySelector('#wfq-step-2 .wfq-continue-btn');
    if(step2Btn) step2Btn.disabled = !state.answers.step_2;
    
    const step3Btn = document.querySelector('#wfq-step-3 .wfq-continue-btn');
    if(step3Btn) step3Btn.disabled = state.claims.length === 0;

    if (state.step === 5) renderConditionalQuestions();
  }

  function renderConditionalQuestions() {
    const container = document.getElementById('wfq-conditional-questions');
    if (state.claims.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#9ca3af;">Please go back and select a claim type first.</p>`;
        return;
    }
    
    let html = '';
    state.claims.forEach(claim => {
        const questions = getConditionalQuestionsFor(claim);
        if (questions) {
            html += `
              <div class="wfq-conditional-section">
                <h3>${questions.title}</h3>
                <p>${questions.prompt}</p>
                <div class="wfq-btn-group">${renderButtons(questions.options, `conditional_${claim}`)}</div>
              </div>
            `;
        }
    });
    container.innerHTML = html;
  }

  function getConditionalQuestionsFor(claim) {
    const allQuestions = {
        'unfair-dismissal': { 
            title: 'Unfair Dismissal Details',
            prompt: 'What was the reason given for your dismissal?',
            options: ['performance', 'conduct', 'redundancy', 'no-reason-given', 'capability', 'other']
        },
        'discrimination': { 
            title: 'Discrimination Details',
            prompt: 'On what grounds do you feel you were discriminated against?',
            options: ['age', 'gender', 'race', 'disability', 'religion', 'sexual-orientation', 'pregnancy', 'other']
        },
        'harassment': { 
            title: 'Harassment Details',
            prompt: 'What type of harassment did you experience?',
            options: ['sexual-harassment', 'verbal-abuse', 'threats', 'intimidation', 'isolation', 'other']
        },
        'bullying': { 
            title: 'Bullying Details',
            prompt: 'Who was responsible for the bullying?',
            options: ['manager', 'colleague', 'multiple-people', 'systematic', 'other']
        },
        'pay-claims': { 
            title: 'Pay Claims Details',
            prompt: 'What type of pay issues do you have?',
            options: ['unpaid-wages', 'holiday-pay', 'overtime', 'bonus', 'commission', 'notice-pay', 'other']
        },
        'whistleblowing': { 
            title: 'Whistleblowing Details',
            prompt: 'What did you report?',
            options: ['health-safety', 'financial-misconduct', 'legal-violation', 'ethical-concern', 'other']
        },
        'redundancy': { 
            title: 'Redundancy Details',
            prompt: 'Was the redundancy genuine?',
            options: ['genuine', 'fake-redundancy', 'no-consultation', 'insufficient-notice', 'other']
        },
        'constructive-dismissal': { 
            title: 'Constructive Dismissal Details',
            prompt: 'What forced you to resign?',
            options: ['breach-of-contract', 'hostile-environment', 'forced-resignation', 'other']
        },
        'victimisation': { 
            title: 'Victimisation Details',
            prompt: 'What happened after you complained?',
            options: ['dismissal', 'demotion', 'harassment', 'isolation', 'other']
        },
        'age-discrimination': { 
            title: 'Age Discrimination Details',
            prompt: 'How were you treated differently due to your age?',
            options: ['dismissal', 'overlooked-promotion', 'redundancy', 'comments', 'other']
        },
        'disability-discrimination': { 
            title: 'Disability Discrimination Details',
            prompt: 'How were you treated due to your disability?',
            options: ['no-reasonable-adjustments', 'dismissal', 'harassment', 'overlooked-promotion', 'other']
        },
        'pregnancy-discrimination': { 
            title: 'Pregnancy Discrimination Details',
            prompt: 'How were you treated during pregnancy?',
            options: ['dismissal', 'harassment', 'overlooked-promotion', 'redundancy', 'other']
        }
    };
    return allQuestions[claim];
  }

  function calculateResult() {
    let score = Math.min(100, 20 + (state.claims.length * 15));
    const weeklyPay = Math.min(parseInt(state.salary, 10) / 52, 643);
    const basicAward = weeklyPay * 1.5 * 10;
    const compensatoryAward = Math.min(parseInt(state.salary, 10), 105707);
    let compensation = basicAward + compensatoryAward + state.amountOwed;
    return { score, compensation: Math.round(compensation) };
  }

  function sendSubmission(result) {
    const payload = { ...state, result, quizDuration: Date.now() - state.start };
    console.log("Submission Payload:", payload);
  }

  function renderResults(result) {
    const { score, compensation } = result;
    let strength = score > 60 ? 'Strong' : 'Moderate';
    
    const contentEl = document.getElementById('wfq-results-content');
    contentEl.innerHTML = `
      <div style="text-align:center;">
        <h2>Your Case Assessment: <span style="color: #3b82f6;">${strength}</span></h2>
        <p>This is an estimate based on the information you provided.</p>
        <div class="wfq-results-box">
          <h3>Estimated Compensation Range</h3>
          <p style="font-size:2.2rem; font-weight:700; color:#1e40af;">£${(compensation * 0.8).toLocaleString('en-GB', {maximumFractionDigits:0})} - £${(compensation * 1.2).toLocaleString('en-GB', {maximumFractionDigits:0})}</p>
          <p style="font-size:0.9rem; color:#6b7280; margin-top:8px;">This estimate includes statutory awards and potential compensatory awards based on your salary.</p>
        </div>
        <h3>Next Step: Book Your Free Consultation</h3>
        <p>Your next step is to discuss your case with a specialist. There is no cost or obligation.</p>
        
        <div id="calendly-embed-container" style="min-height:700px; margin-top:24px; border: 1px solid #e5e7eb; border-radius:12px;">
           <p style="padding-top:40px;">Your Calendly embed will load here.</p>
           <p>For now, click the button below:</p>
           <a href="https://calendly.com/your-link" target="_blank" class="wfq-nav-btn wfq-continue-btn" style="max-width:300px; margin:20px auto; text-align:center; display:block;">Book My Free Call</a>
        </div>

        <div class="wfq-human-element">
          <img src="https://via.placeholder.com/60" alt="Legal Assistant">
          <div>
            <p style="text-align:left; margin:0; font-weight:bold; color:#111827;">Have Questions?</p>
            <p style="text-align:left; margin:0; font-size: 0.9rem;">"I'm here to help. Your submission has been received and we will contact you shortly." - Jane D., Senior Paralegal</p>
          </div>
        </div>
        <p style="font-size:0.8rem; color:#9ca3af; margin-top:24px;">Employment claims have strict time limits. We recommend booking a consultation as soon as possible to ensure you don't lose your right to claim.</p>
      </div>
    `;
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
