import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const faqs = [
    {
        question: "What warranties do I have for installation?",
        answer: "Nor is there anyone who loves or pursues or desires to obtain pain of itself, because which toil and pain can procuresteady steady. The point of using is that it has a mores normal fact that a reader will be distracted by the readable content.",
        category: "General",
        display_order: 1
    },
    {
        question: "How long does it take to build a new website?",
        answer: "The timeline depends on the complexity of your project. A simple website can take 2-4 weeks, while more complex projects with custom features may take 6-12 weeks. We'll provide a detailed timeline during our initial consultation.",
        category: "Services",
        display_order: 2
    },
    {
        question: "What do you need to start making me a website?",
        answer: "We'll need your brand assets (logo, colors, fonts), content (text, images), a clear understanding of your goals, and examples of websites you admire. We'll guide you through our onboarding process to gather everything needed.",
        category: "Services",
        display_order: 3
    },
    {
        question: "How to soft launch your business?",
        answer: "A soft launch involves releasing your product to a limited audience first. This allows you to gather feedback, identify issues, and make improvements before a full public launch. We can help you strategize the best approach.",
        category: "Business",
        display_order: 4
    }
];

async function seedFAQs() {
    console.log('Seeding FAQs...');

    for (const faq of faqs) {
        // Check if exists
        const { data: existing } = await supabase
            .from('faqs')
            .select('id')
            .eq('question', faq.question)
            .single();

        if (!existing) {
            const { error } = await supabase
                .from('faqs')
                .insert(faq);

            if (error) {
                console.error(`Error inserting FAQ "${faq.question}":`, error);
            } else {
                console.log(`Inserted FAQ: "${faq.question}"`);
            }
        } else {
            console.log(`FAQ already exists: "${faq.question}"`);
        }
    }

    console.log('Done!');
}

seedFAQs();
