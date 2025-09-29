// Employment Law Quiz Loader
(function() {
    'use strict';
    
    // Check if quiz container exists
    const container = document.getElementById('employment-quiz');
    if (!container) {
        console.error('Employment quiz container not found');
        return;
    }
    
    // Quiz state
    const state = {
        step: 1,
        total: 8,
        answers: {},
        claims: [],
        salary: 35000,
        timeline: null,
        amountOwed: 0,
        start: Date.now()
    };
    
    // Helper function to create HTML elements
    function h(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }
    
    // Mount the quiz
    function mount() {
        container.innerHTML = '';
        container.appendChild(h(`
            <div class="wfq-container" style="max-width:800px;margin:0 auto;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
                <div class="wfq-progress" style="width:100%;background:#e5e7eb;border-radius:12px;height:12px;margin-bottom:24px">
                    <div id="wfq-progress-fill" style="background:linear-gradient(to right,#3b82f6,#1e40af);height:12px;border-radius:12px;transition:width .4s;width:12.5%"></div>
                </div>
                <div id="wfq-steps"></div>
            </div>
        `));
        buildSteps();
        attach();
        updateProgress();
    }
    
    // Build all quiz steps
    function buildSteps() {
        const steps = document.getElementById('wfq-steps');
        steps.innerHTML = '';
        
        // Step 1: Employment Status
        steps.appendChild(h(`
            <div id="wfq-step-1" class="wfq-step" style="display:block;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <h2 style="font-size:1.5rem;font-weight:600;margin:0 0 8px;color:#111827">What is your current employment status?</h2>
                <p style="color:#6b7280;margin:0 0 16px">This helps us understand your situation</p>
                <div id="wfq-status" style="display:flex;flex-direction:column;gap:10px"></div>
            </div>
        `));
        
        // Step 2: Timeline
        steps.appendChild(h(`
            <div id="wfq-step-2" class="wfq-step" style="display:none;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <h2 style="font-size:1.5rem;font-weight:600;margin:0 0 8px;color:#111827">When did this happen?</h2>
                <p style="color:#6b7280;margin:0 0 16px">Select the timeframe that best describes your situation</p>
                <div id="wfq-timeline" style="display:flex;flex-direction:column;gap:10px"></div>
            </div>
        `));
        
        // Step 3: Claim Types
        steps.appendChild(h(`
            <div id="wfq-step-3" class="wfq-step" style="display:none;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <h2 style="font-size:1.5rem;font-weight:600;margin:0 0 8px;color:#111827">What Type of Treatment Did You Experience?</h2>
                <p style="color:#6b7280;margin:0 0 16px">Select all that apply - most workplace issues fall into multiple categories</p>
                <div id="wfq-claims" style="display:flex;flex-direction:column;gap:10px"></div>
                <div style="display:flex;justify-content:space-between;margin-top:24px">
                    <button class="wfq-nav-btn wfq-back-btn" data-target-step="2" style="padding:10px 20px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer">← Back</button>
                    <button id="wfq-continue-3" class="wfq-nav-btn wfq-continue-btn" data-target-step="4" disabled style="padding:10px 20px;border-radius:8px;border:1px solid #3b82f6;background:#3b82f6;color:#fff;cursor:not-allowed;opacity:0.6">Continue →</button>
                </div>
            </div>
        `));
        
        // Step 4: Employment Duration
        steps.appendChild(h(`
            <div id="wfq-step-4" class="wfq-step" style="display:none;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <h2 style="font-size:1.5rem;font-weight:600;margin:0 0 8px;color:#111827">How long have you been employed?</h2>
                <p style="color:#6b7280;margin:0 0 16px">This affects your potential compensation</p>
                <div id="wfq-employment" style="display:flex;flex-direction:column;gap:10px"></div>
                <div style="display:flex;justify-content:space-between;margin-top:24px">
                    <button class="wfq-nav-btn wfq-back-btn" data-target-step="3" style="padding:10px 20px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer">← Back</button>
                    <button class="wfq-nav-btn wfq-continue-btn" data-target-step="5" style="padding:10px 20px;border-radius:8px;border:1px solid #3b82f6;background:#3b82f6;color:#fff;cursor:pointer">Continue →</button>
                </div>
            </div>
        `));
        
        // Step 5: Conditional Questions
        steps.appendChild(h(`
            <div id="wfq-step-5" class="wfq-step" style="display:none;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <h2 style="font-size:1.5rem;font-weight:600;margin:0 0 8px;color:#111827">Tell Us More About Your Situation</h2>
                <p style="color:#6b7280;margin:0 0 16px">We'll ask specific questions based on your selections</p>
                <div id="wfq-conditional"></div>
                <div style="display:flex;justify-content:space-between;margin-top:24px">
                    <button class="wfq-nav-btn wfq-back-btn" data-target-step="4" style="padding:10px 20px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer">← Back</button>
                    <button class="wfq-nav-btn wfq-continue-btn" data-target-step="6" style="padding:10px 20px;border-radius:8px;border:1px solid #3b82f6;background:#3b82f6;color:#fff;cursor:pointer">Continue →</button>
                </div>
            </div>
        `));
        
        // Step 6: Salary
        steps.appendChild(h(`
            <div id="wfq-step-6" class="wfq-step" style="display:none;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <h2 style="font-size:1.5rem;font-weight:600;margin:0 0 8px;color:#111827">What is your annual salary?</h2>
                <p style="color:#6b7280;margin:0 0 16px">This helps calculate potential compensation</p>
                <div style="margin-bottom:16px">
                    <input type="number" id="wfq-salary" placeholder="Enter your annual salary" style="width:100%;padding:12px;border:1px solid #e5e7eb;border-radius:8px;font-size:16px" value="35000">
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:24px">
                    <button class="wfq-nav-btn wfq-back-btn" data-target-step="5" style="padding:10px 20px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer">← Back</button>
                    <button class="wfq-nav-btn wfq-continue-btn" data-target-step="7" style="padding:10px 20px;border-radius:8px;border:1px solid #3b82f6;background:#3b82f6;color:#fff;cursor:pointer">Continue →</button>
                </div>
            </div>
        `));
        
        // Step 7: Outstanding Pay
        steps.appendChild(h(`
            <div id="wfq-step-7" class="wfq-step" style="display:none;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <h2 style="font-size:1.5rem;font-weight:600;margin:0 0 8px;color:#111827">Do you have any outstanding pay owed?</h2>
                <p style="color:#6b7280;margin:0 0 16px">This includes unpaid wages, holiday pay, or bonuses</p>
                <div style="margin-bottom:16px">
                    <input type="number" id="wfq-owed" placeholder="Enter amount owed (leave blank if none)" style="width:100%;padding:12px;border:1px solid #e5e7eb;border-radius:8px;font-size:16px" value="0">
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:24px">
                    <button class="wfq-nav-btn wfq-back-btn" data-target-step="6" style="padding:10px 20px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer">← Back</button>
                    <button class="wfq-nav-btn wfq-continue-btn" data-target-step="8" style="padding:10px 20px;border-radius:8px;border:1px solid #3b82f6;background:#3b82f6;color:#fff;cursor:pointer">Continue →</button>
                </div>
            </div>
        `));
        
        // Step 8: Contact Form
        steps.appendChild(h(`
            <div id="wfq-step-8" class="wfq-step" style="display:none;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <h2 style="font-size:1.5rem;font-weight:600;margin:0 0 8px;color:#111827">Get Your Results</h2>
                <p style="color:#6b7280;margin:0 0 16px">Please provide your contact details to receive your personalized assessment</p>
                <form id="wfq-form" style="display:flex;flex-direction:column;gap:16px">
                    <div style="display:flex;gap:12px">
                        <input type="text" id="wfq-fn" placeholder="First Name" required style="flex:1;padding:12px;border:1px solid #e5e7eb;border-radius:8px;font-size:16px">
                        <input type="text" id="wfq-ln" placeholder="Last Name" required style="flex:1;padding:12px;border:1px solid #e5e7eb;border-radius:8px;font-size:16px">
                    </div>
                    <input type="email" id="wfq-email" placeholder="Email Address" required style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;font-size:16px">
                    <input type="tel" id="wfq-phone" placeholder="Phone Number" style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;font-size:16px">
                    <select id="wfq-contact" style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;font-size:16px">
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="either">Either</option>
                    </select>
                    <div style="display:flex;flex-direction:column;gap:8px">
                        <label style="display:flex;align-items:center;gap:8px;font-size:14px;color:#6b7280">
                            <input type="checkbox" id="wfq-consent" required> I consent to being contacted about my employment law claim
                        </label>
                        <label style="display:flex;align-items:center;gap:8px;font-size:14px;color:#6b7280">
                            <input type="checkbox" id="wfq-consent-opt"> I would like to receive updates about employment law
                        </label>
                    </div>
                    <button type="submit" style="padding:12px 24px;background:#3b82f6;color:#fff;border:none;border-radius:8px;font-size:16px;cursor:pointer">Get My Results</button>
                </form>
                <div style="display:flex;justify-content:space-between;margin-top:24px">
                    <button class="wfq-nav-btn wfq-back-btn" data-target-step="7" style="padding:10px 20px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer">← Back</button>
                </div>
            </div>
        `));
        
        // Results
        steps.appendChild(h(`
            <div id="wfq-step-results" class="wfq-step" style="display:none;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);margin-bottom:16px">
                <div id="wfq-results-content"></div>
            </div>
        `));
        
        // Render all steps
        renderStep1();
        renderStep2();
        renderStep3();
        renderStep4();
        renderStep6();
        renderStep7();
        renderStep8();
    }
    
    // Render Step 1: Employment Status
    function renderStep1() {
        const container = document.getElementById('wfq-status');
        container.innerHTML = '';
        ['employed', 'recently-dismissed', 'dismissed-long-ago', 'self-employed'].forEach(status => {
            const btn = h(`<button class="wfq-btn" data-val="${status}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
    }
    
    // Render Step 2: Timeline
    function renderStep2() {
        const container = document.getElementById('wfq-timeline');
        container.innerHTML = '';
        ['within-1-month', '1-3-months', '3-6-months', '6-12-months', 'more-12-months'].forEach(time => {
            const btn = h(`<button class="wfq-btn" data-val="${time}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${time.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
    }
    
    // Render Step 3: Claim Types
    function renderStep3() {
        const container = document.getElementById('wfq-claims');
        container.innerHTML = '';
        ['unfair-dismissal', 'discrimination', 'harassment', 'bullying', 'pay-claims', 'whistleblowing', 'redundancy', 'constructive-dismissal'].forEach(claim => {
            const checkbox = h(`<label style="display:flex;align-items:center;gap:8px;padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;transition:all 0.2s"><input type="checkbox" data-claim="${claim}" style="margin:0"><span>${claim.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></label>`);
            container.appendChild(checkbox);
        });
    }
    
    // Render Step 4: Employment Duration
    function renderStep4() {
        const container = document.getElementById('wfq-employment');
        container.innerHTML = '';
        ['less-than-1-year', '1-2-years', '2-5-years', '5-10-years', 'more-than-10-years'].forEach(period => {
            const btn = h(`<button class="wfq-btn" data-val="${period}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${period.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
    }
    
    // Render Step 6: Salary
    function renderStep6() {
        const salaryInput = document.getElementById('wfq-salary');
        if (salaryInput) {
            salaryInput.addEventListener('input', function() {
                state.salary = parseInt(this.value) || 35000;
            });
        }
    }
    
    // Render Step 7: Outstanding Pay
    function renderStep7() {
        const owedInput = document.getElementById('wfq-owed');
        if (owedInput) {
            owedInput.addEventListener('input', function() {
                state.amountOwed = parseInt(this.value) || 0;
            });
        }
    }
    
    // Render Step 8: Contact Form
    function renderStep8() {
        // Contact form is already rendered in HTML
    }
    
    // Attach event listeners
    function attach() {
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.wfq-btn');
            const navBtn = e.target.closest('.wfq-nav-btn');
            
            if (btn && btn.dataset && btn.dataset.val) {
                e.preventDefault();
                const val = btn.dataset.val;
                if (state.step === 3) {
                    // Handled by checkboxes, no direct next() call here
                } else {
                    state.answers['step_' + state.step] = val;
                    if (state.step === 4) {
                        state.timeline = val;
                        const warn = document.getElementById('wfq-time-warn');
                        if (warn) warn.style.display = (val === '6-12-months' || val === 'more-12-months') ? 'block' : 'none';
                    }
                    next();
                }
            } else if (navBtn) {
                e.preventDefault();
                if (navBtn.classList.contains('wfq-back-btn')) {
                    prev();
                } else if (navBtn.classList.contains('wfq-continue-btn') && !navBtn.disabled) {
                    next();
                }
            }
        });
        
        document.addEventListener('change', function(e) {
            const cl = e.target.getAttribute && e.target.getAttribute('data-claim');
            if (cl) {
                if (e.target.checked) {
                    if (!state.claims.includes(cl)) state.claims.push(cl);
                } else {
                    state.claims = state.claims.filter(x => x !== cl);
                }
                updateContinueButton();
            }
        });
        
        const form = document.getElementById('wfq-form');
        document.addEventListener('submit', function(e) {
            if (e.target === form) {
                e.preventDefault();
                if (!document.getElementById('wfq-consent').checked) return;
                state.contact = {
                    firstName: document.getElementById('wfq-fn').value.trim(),
                    lastName: document.getElementById('wfq-ln').value.trim(),
                    email: document.getElementById('wfq-email').value.trim(),
                    phone: document.getElementById('wfq-phone').value.trim(),
                    best: document.getElementById('wfq-contact').value,
                    consent: document.getElementById('wfq-consent').checked,
                    consentOpt: document.getElementById('wfq-consent-opt').checked
                };
                showResults(calc());
            }
        });
    }
    
    // Update continue button for step 3
    function updateContinueButton() {
        const continueBtn = document.getElementById('wfq-continue-3');
        if (continueBtn) {
            continueBtn.disabled = state.claims.length === 0;
            continueBtn.style.cursor = state.claims.length === 0 ? 'not-allowed' : 'pointer';
            continueBtn.style.opacity = state.claims.length === 0 ? '0.6' : '1';
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const pct = (state.step / state.total) * 100;
        const fill = document.getElementById('wfq-progress-fill');
        if (fill) fill.style.width = pct + '%';
    }
    
    // Next step
    function next() {
        const cur = document.getElementById('wfq-step-' + state.step);
        if (cur) cur.style.display = 'none';
        state.step++;
        if (state.step === 5) renderConditional();
        if (state.step <= state.total) {
            const nx = document.getElementById('wfq-step-' + state.step);
            if (nx) nx.style.display = 'block';
            updateProgress();
        } else {
            const nx = document.getElementById('wfq-step-results');
            if (nx) nx.style.display = 'block';
        }
    }
    
    // Previous step
    function prev() {
        const cur = document.getElementById('wfq-step-' + state.step);
        if (cur) cur.style.display = 'none';
        state.step--;
        if (state.step < 1) state.step = 1;
        const px = document.getElementById('wfq-step-' + state.step);
        if (px) px.style.display = 'block';
        updateProgress();
        if (state.step === 3) updateContinueButton();
    }
    
    // Render conditional questions
    function renderConditional() {
        const container = document.getElementById('wfq-conditional');
        container.innerHTML = '';
        
        if (state.claims.includes('unfair-dismissal')) {
            container.appendChild(sectionUnfairDismissal());
        }
        if (state.claims.includes('discrimination')) {
            container.appendChild(sectionDiscrimination());
        }
        if (state.claims.includes('pay-claims')) {
            container.appendChild(sectionPayClaims());
        }
        if (state.claims.includes('harassment')) {
            container.appendChild(sectionHarassment());
        }
        if (state.claims.includes('bullying')) {
            container.appendChild(sectionBullying());
        }
        if (state.claims.includes('whistleblowing')) {
            container.appendChild(sectionWhistleblowing());
        }
        if (state.claims.includes('redundancy')) {
            container.appendChild(sectionRedundancy());
        }
        if (state.claims.includes('constructive-dismissal')) {
            container.appendChild(sectionConstructiveDismissal());
        }
    }
    
    // Conditional sections
    function sectionUnfairDismissal() {
        const section = h('<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e5e7eb"><h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:#111827">Unfair Dismissal Details</h3><div id="wfq-unfair-dismissal" style="display:flex;flex-direction:column;gap:10px"></div></div>');
        const container = section.querySelector('#wfq-unfair-dismissal');
        ['reason-given', 'no-reason', 'disciplinary', 'performance', 'capability', 'conduct', 'redundancy', 'other'].forEach(reason => {
            const btn = h(`<button class="wfq-btn" data-val="${reason}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${reason.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
        return section;
    }
    
    function sectionDiscrimination() {
        const section = h('<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e5e7eb"><h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:#111827">Discrimination Details</h3><div id="wfq-discrimination" style="display:flex;flex-direction:column;gap:10px"></div></div>');
        const container = section.querySelector('#wfq-discrimination');
        ['age', 'disability', 'gender', 'race', 'religion', 'sexual-orientation', 'pregnancy', 'other'].forEach(type => {
            const btn = h(`<button class="wfq-btn" data-val="${type}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
        return section;
    }
    
    function sectionPayClaims() {
        const section = h('<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e5e7eb"><h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:#111827">Pay Claims Details</h3><div id="wfq-pay-claims" style="display:flex;flex-direction:column;gap:10px"></div></div>');
        const container = section.querySelector('#wfq-pay-claims');
        ['unpaid-wages', 'holiday-pay', 'overtime', 'bonus', 'commission', 'redundancy-pay', 'notice-pay', 'other'].forEach(type => {
            const btn = h(`<button class="wfq-btn" data-val="${type}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
        return section;
    }
    
    function sectionHarassment() {
        const section = h('<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e5e7eb"><h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:#111827">Harassment Details</h3><div id="wfq-harassment" style="display:flex;flex-direction:column;gap:10px"></div></div>');
        const container = section.querySelector('#wfq-harassment');
        ['sexual-harassment', 'verbal-abuse', 'threats', 'intimidation', 'isolation', 'other'].forEach(type => {
            const btn = h(`<button class="wfq-btn" data-val="${type}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
        return section;
    }
    
    function sectionBullying() {
        const section = h('<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e5e7eb"><h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:#111827">Bullying Details</h3><div id="wfq-bullying" style="display:flex;flex-direction:column;gap:10px"></div></div>');
        const container = section.querySelector('#wfq-bullying');
        ['manager-bullying', 'colleague-bullying', 'systematic-bullying', 'exclusion', 'undermining', 'other'].forEach(type => {
            const btn = h(`<button class="wfq-btn" data-val="${type}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
        return section;
    }
    
    function sectionWhistleblowing() {
        const section = h('<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e5e7eb"><h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:#111827">Whistleblowing Details</h3><div id="wfq-whistleblowing" style="display:flex;flex-direction:column;gap:10px"></div></div>');
        const container = section.querySelector('#wfq-whistleblowing');
        ['health-safety', 'financial-misconduct', 'legal-violation', 'ethical-concern', 'other'].forEach(type => {
            const btn = h(`<button class="wfq-btn" data-val="${type}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
        return section;
    }
    
    function sectionRedundancy() {
        const section = h('<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e5e7eb"><h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:#111827">Redundancy Details</h3><div id="wfq-redundancy" style="display:flex;flex-direction:column;gap:10px"></div></div>');
        const container = section.querySelector('#wfq-redundancy');
        ['genuine-redundancy', 'fake-redundancy', 'no-consultation', 'insufficient-notice', 'other'].forEach(type => {
            const btn = h(`<button class="wfq-btn" data-val="${type}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
        return section;
    }
    
    function sectionConstructiveDismissal() {
        const section = h('<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e5e7eb"><h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:#111827">Constructive Dismissal Details</h3><div id="wfq-constructive-dismissal" style="display:flex;flex-direction:column;gap:10px"></div></div>');
        const container = section.querySelector('#wfq-constructive-dismissal');
        ['breach-of-contract', 'hostile-environment', 'forced-resignation', 'other'].forEach(type => {
            const btn = h(`<button class="wfq-btn" data-val="${type}" style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;cursor:pointer;text-align:left;transition:all 0.2s">${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>`);
            container.appendChild(btn);
        });
        return section;
    }
    
    // Calculate results
    function calc() {
        let score = 0;
        let compensation = 0;
        
        if (state.claims.includes('unfair-dismissal')) { score += 25; compensation += 15000; }
        if (state.claims.includes('discrimination')) { score += 30; compensation += 20000; }
        if (state.claims.includes('harassment')) { score += 35; compensation += 25000; }
        if (state.claims.includes('bullying')) { score += 20; compensation += 12000; }
        if (state.claims.includes('pay-claims')) { score += 15; compensation += state.amountOwed; }
        if (state.claims.includes('whistleblowing')) { score += 40; compensation += 30000; }
        if (state.claims.includes('redundancy')) { score += 10; compensation += 8000; }
        if (state.claims.includes('constructive-dismissal')) { score += 25; compensation += 18000; }
        
        if (state.timeline === 'within-1-month') { score += 10; }
        if (state.timeline === '1-3-months') { score += 5; }
        if (state.timeline === '3-6-months') { score += 0; }
        if (state.timeline === '6-12-months') { score -= 5; }
        if (state.timeline === 'more-12-months') { score -= 10; }
        
        return { score, compensation: Math.max(compensation, 5000) };
    }
    
    // Show results
    function showResults(result) {
        const container = document.getElementById('wfq-results-content');
        let strength = 'Weak';
        let color = '#ef4444';
        
        if (result.score >= 70) { strength = 'Very Strong'; color = '#10b981'; }
        else if (result.score >= 50) { strength = 'Strong'; color = '#3b82f6'; }
        else if (result.score >= 30) { strength = 'Moderate'; color = '#f59e0b'; }
        
        container.innerHTML = `
            <div style="text-align:center;padding:32px">
                <h2 style="font-size:2rem;font-weight:700;margin:0 0 16px;color:${color}">${strength} Case</h2>
                <p style="font-size:1.25rem;color:#6b7280;margin:0 0 24px">Based on your answers, your case has a ${strength.toLowerCase()} chance of success</p>
                <div style="background:#f8fafc;border-radius:12px;padding:24px;margin:24px 0">
                    <h3 style="font-size:1.5rem;font-weight:600;margin:0 0 16px;color:#111827">Estimated Compensation</h3>
                    <p style="font-size:2rem;font-weight:700;color:#3b82f6;margin:0">£${result.compensation.toLocaleString()}</p>
                </div>
                <div style="background:#f8fafc;border-radius:12px;padding:24px;margin:24px 0">
                    <h3 style="font-size:1.5rem;font-weight:600;margin:0 0 16px;color:#111827">Next Steps</h3>
                    <p style="color:#6b7280;margin:0 0 16px">Based on your case strength, we recommend:</p>
                    <ul style="text-align:left;color:#6b7280;margin:0;padding-left:20px">
                        <li>Contacting an employment law specialist</li>
                        <li>Gathering evidence and documentation</li>
                        <li>Considering mediation or tribunal proceedings</li>
                    </ul>
                </div>
                <div style="margin-top:32px">
                    <button onclick="window.location.href='https://calendly.com/your-link'" style="padding:16px 32px;background:#3b82f6;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:600;cursor:pointer;margin-right:16px">Book Free Consultation</button>
                    <button onclick="window.open('https://wa.me/your-number')" style="padding:16px 32px;background:#10b981;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:600;cursor:pointer">WhatsApp Us</button>
                </div>
            </div>
        `;
        updateProgress();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
