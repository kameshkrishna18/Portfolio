document.addEventListener('DOMContentLoaded', () => {
    // 1. SUPABASE SETUP
    const SUPABASE_URL = 'https://ywxsrfhjgomvsubbyomo.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3eHNyZmhqZ29tdnN1YmJ5b21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4ODg1OTQsImV4cCI6MjEwNTQ2NDU5NH0.6LTpZnxQOCtVaXsAKMluH6-TG6Dlb-a1MEFjpEwQp20';

    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 2. FORM SUBMISSION LOGIC
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            formStatus.style.display = 'block';
            formStatus.style.color = '#333';
            formStatus.innerText = 'Sending message...';

            try {
                const { data, error } = await supabaseClient
                    .from('contact_messages')
                    .insert([{ name: name, email: email, message: message }]);

                if (error) {
                    console.error('Supabase Error:', error);
                    formStatus.style.color = 'red';
                    formStatus.innerText = 'Error sending message. Check console for details.';
                } else {
                    formStatus.style.color = 'green';
                    formStatus.innerText = 'Message sent successfully!';
                    contactForm.reset(); 
                }
            } catch (err) {
                console.error("Code Error:", err);
                formStatus.style.color = 'red';
                formStatus.innerText = 'An unexpected error occurred.';
            }
        });
    }

    // 3. SMOOTH SCROLLING 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});