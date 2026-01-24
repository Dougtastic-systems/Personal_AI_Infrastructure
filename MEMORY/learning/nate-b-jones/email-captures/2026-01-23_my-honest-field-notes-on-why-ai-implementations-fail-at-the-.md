# My honest field notes on why AI implementations fail at the task level + the 10 prompt templates I built to fix it

**Date:** 2026-01-23
**Source:** Email (paid subscriber content)
**Captured:** 2026-01-24T04:28:38.312Z

---

My honest field notes on why AI implementations fail at the task level + the 10 prompt templates I built to fix it







**









From:
**Nate from Nate’s Substack <natesnewsletter@substack.com> on behalf of Nate from Nate’s Substack <natesnewsletter@substack.com>**
Reply-To: **Nate from Nate’s Substack <reply+2zliv2&8r1h1&&4b7c2f6ac7b19f7c697920a811d569f1cbdbf11212e61ba67fb314fa4801f1c5@mg1.substack.com>**
Date: **Friday, December 5, 2025 at 7:03 AM**
To: **Doug Snyder <dsnyder@cydcor.com>**
Subject: **My honest field notes on why AI implementations fail at the task level + the 10 prompt templates I built to fix it












This email has been sent from an external source










Watch now | Stop asking which model. Start asking which task.




͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­























[View
in browser](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL3AvZ3JhYi10aGUtMTAtcHJvbXB0cy1pLXVzZS10by1kZWNvbXBvc2U_dXRtX2NhbXBhaWduPWVtYWlsLXBvc3Qmcj04cjFoMSZ0b2tlbj1leUoxYzJWeVgybGtJam94TkRZNU9EVTBPU3dpY0c5emRGOXBaQ0k2TVRnd056SXpNVE0wTENKcFlYUWlPakUzTmpRNU5EWTVPREVzSW1WNGNDSTZNVGMyTnpVek9EazRNU3dpYVhOeklqb2ljSFZpTFRFek56TXlNekVpTENKemRXSWlPaUp3YjNOMExYSmxZV04wYVc5dUluMC5DMk8wdHo4VFFSSllvWml0WGh5dmVUVGEtbi0yYlNmLUhab2FWd0xQVXRzIiwicCI6MTgwNzIzMTM0LCJzIjoxMzczMjMxLCJmIjpmYWxzZSwidSI6MTQ2OTg1NDksImlhdCI6MTc2NDk0Njk4MSwiZXhwIjoyMDgwNTIyOTgxLCJpc3MiOiJwdWItMCIsInN1YiI6ImxpbmstcmVkaXJlY3QifQ.2rsT_QDHWf-AuaXnArrRbZUWIlSbVXVDh4TOetV8ROY?)














Look at you getting killer career perspective and the full AI picture. Give yourself a pat on the back for diving in on AI and go get a coffee
☕












[](https://substack.com/app-link/post?publication_id=1373231&post_id=180723134&utm_source=podcast-email&play_audio=true&r=8r1h1&utm_campaign=email-play-on-substack&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgwNzIzMTM0LCJpYXQiOjE3NjQ5NDY5ODEsImV4cCI6MTc2NzUzODk4MSwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.C2O0tz8TQRJYoZitXhyveTTa-n-2bSf-HZoaVwLPUts&utm_content=watch_now_gif)

































[**Watch
now**](https://substack.com/app-link/post?publication_id=1373231&post_id=180723134&utm_source=podcast-email&play_audio=true&r=8r1h1&utm_campaign=email-play-on-substack&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgwNzIzMTM0LCJpYXQiOjE3NjQ5NDY5ODEsImV4cCI6MTc2NzUzODk4MSwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.C2O0tz8TQRJYoZitXhyveTTa-n-2bSf-HZoaVwLPUts&utm_content=watch_now_button)




























# [My
honest field notes on why AI implementations fail at the task level + the 10 prompt templates I built to fix it](https://substack.com/app-link/post?publication_id=1373231&post_id=180723134&utm_source=post-email-title&utm_campaign=email-post-title&isFreemail=false&r=8r1h1&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgwNzIzMTM0LCJpYXQiOjE3NjQ5NDY5ODEsImV4cCI6MTc2NzUzODk4MSwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.C2O0tz8TQRJYoZitXhyveTTa-n-2bSf-HZoaVwLPUts)


###
Stop asking which model. Start asking which task.















[Nate](https://substack.com/@natesnewsletter)
















Dec 5











∙







Paid






















[](https://substack.com/@natesnewsletter)





































[](https://substack.com/app-link/post?publication_id=1373231&post_id=180723134&utm_source=substack&isFreemail=false&submitLike=true&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgwNzIzMTM0LCJyZWFjdGlvbiI6IuKdpCIsImlhdCI6MTc2NDk0Njk4MSwiZXhwIjoxNzY3NTM4OTgxLCJpc3MiOiJwdWItMTM3MzIzMSIsInN1YiI6InJlYWN0aW9uIn0.WFYRPxzGT6w0hevf61v0El5pnf5HfKEsbXVf2ILi9t0&utm_medium=email&utm_campaign=email-reaction&r=8r1h1)













[](https://substack.com/app-link/post?publication_id=1373231&post_id=180723134&utm_source=substack&utm_medium=email&isFreemail=false&comments=true&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgwNzIzMTM0LCJpYXQiOjE3NjQ5NDY5ODEsImV4cCI6MTc2NzUzODk4MSwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.C2O0tz8TQRJYoZitXhyveTTa-n-2bSf-HZoaVwLPUts&r=8r1h1&utm_campaign=email-half-magic-comments&action=post-comment&utm_source=substack&utm_medium=email)













[](https://substack.com/app-link/post?publication_id=1373231&post_id=180723134&utm_source=substack&utm_medium=email&utm_content=share&utm_campaign=email-share&action=share&triggerShare=true&isFreemail=false&r=8r1h1&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgwNzIzMTM0LCJpYXQiOjE3NjQ5NDY5ODEsImV4cCI6MTc2NzUzODk4MSwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.C2O0tz8TQRJYoZitXhyveTTa-n-2bSf-HZoaVwLPUts)













[](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9vcGVuLnN1YnN0YWNrLmNvbS9wdWIvbmF0ZXNuZXdzbGV0dGVyL3AvZ3JhYi10aGUtMTAtcHJvbXB0cy1pLXVzZS10by1kZWNvbXBvc2U_dXRtX3NvdXJjZT1zdWJzdGFjayZ1dG1fbWVkaXVtPWVtYWlsJnV0bV9jYW1wYWlnbj1lbWFpbC1yZXN0YWNrLWNvbW1lbnQmYWN0aW9uPXJlc3RhY2stY29tbWVudCZyPThyMWgxJnRva2VuPWV5SjFjMlZ5WDJsa0lqb3hORFk1T0RVME9Td2ljRzl6ZEY5cFpDSTZNVGd3TnpJek1UTTBMQ0pwWVhRaU9qRTNOalE1TkRZNU9ERXNJbVY0Y0NJNk1UYzJOelV6T0RrNE1Td2lhWE56SWpvaWNIVmlMVEV6TnpNeU16RWlMQ0p6ZFdJaU9pSndiM04wTFhKbFlXTjBhVzl1SW4wLkMyTzB0ejhUUVJKWW9aaXRYaHl2ZVRUYS1uLTJiU2YtSFpvYVZ3TFBVdHMiLCJwIjoxODA3MjMxMzQsInMiOjEzNzMyMzEsImYiOmZhbHNlLCJ1IjoxNDY5ODU0OSwiaWF0IjoxNzY0OTQ2OTgxLCJleHAiOjIwODA1MjI5ODEsImlzcyI6InB1Yi0wIiwic3ViIjoibGluay1yZWRpcmVjdCJ9.CUJS4gnG3XcT5AnB_qjEVxeEDRw4R83EeW0p0NGN7P4?&utm_source=substack&utm_medium=email)






















[](https://open.substack.com/pub/natesnewsletter/p/grab-the-10-prompts-i-use-to-decompose?utm_source=email&redirect=app-store&utm_campaign=email-read-in-app)


[READ
IN APP](https://open.substack.com/pub/natesnewsletter/p/grab-the-10-prompts-i-use-to-decompose?utm_source=email&redirect=app-store&utm_campaign=email-read-in-app)































*Everyone wants to know which AI to use. It’s the wrong question, and it’s quietly become one of the most expensive mistakes I see.*



*The pattern is always the same. A team picks a model—usually whatever’s newest or whatever IT approved—then throws entire workflows at it. Summarize these interviews. Write this report. Analyze
this data. When outputs disappoint, they blame the model, upgrade to something more expensive, and repeat. I’ve seen companies burn through three enterprise contracts in a year this way.*



*Almost nobody tells you this explicitly: AI doesn’t fail at the workflow level. It fails at the task level. And most workflows contain five or six tasks pretending to be one.*



*“Generate a PRD” sounds like one thing. It’s actually customer synthesis, UI analysis, feature design, roadmap alignment, and document construction. Each requires different capabilities. When you
throw them all at ChatGPT, you get a document that looks professional and falls apart under scrutiny. Not because the model is bad—because you asked a specialist to be a generalist.*



*McKinsey says 80% of organizations use AI somewhere. BCG says 74% haven’t seen tangible value. It’s not just skills or data quality. In the implementations I see, the deeper gap is that we’re planning
at one level of abstraction and executing at another.*



*Here’s what I’ll cover:*


-
*The task decomposition framework I use to break workflows into AI-ready pieces—with real examples from regulatory reporting, customer success, and product development*
-
*Which models I’ve found work best for which cognitive tasks—not benchmarks, but patterns from dozens of implementations*
-
*What multi-model setups actually cost in practice, and why they quietly beat “one model for everything” once you do the math*
-
*How to build model intuition through deliberate practice—the skill that separates teams getting value from teams getting frustrated*



*No theory. No benchmarks. Just what I’ve seen work.*






Subscribers get all these newsletters!





[**Subscribed**](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL2FjY291bnQiLCJwIjoxODA3MjMxMzQsInMiOjEzNzMyMzEsImYiOmZhbHNlLCJ1IjoxNDY5ODU0OSwiaWF0IjoxNzY0OTQ2OTgxLCJleHAiOjIwODA1MjI5ODEsImlzcyI6InB1Yi0wIiwic3ViIjoibGluay1yZWRpcmVjdCJ9.Kr0jYUX0Ebgim-VUDs7gsKtOdKc0F_SF7L1PX2gqzrw?)





##
**[Grab
the prompt.](https://substack.com/redirect/6f0f69ed-42da-4fd2-b47a-d573f2765c3c?j=eyJ1IjoiOHIxaDEifQ.bBvEbuUaT64-3FYFS8XubQvPw9CPsnWNsoHgk_rgvzU)**



I’ve built a complete task decomposition system you can use immediately. Most people read about frameworks then struggle to apply them. This prompt walks you through breaking any workflow into atomic tasks, identifying cognitive
types, and matching model capabilities—no theory required. Copy it, use it today on your worst workflow, and you’ll see exactly why “which model should I use?” is the wrong question. Then I’ll show you why this approach works through real examples.


##
**The Framework: Five Types of Cognitive Work**



Most workflows break into five cognitive types requiring fundamentally different capabilities. Think about replying to a complex email: you extract key requests from a noisy thread, synthesize them into a single view, analyze what
matters, generate a response, then validate it for accuracy. Five different types of work. In my experience, they often benefit from different tools.



**Extraction**: pulling specific information from unstructured sources—action items from meeting notes, risk factors from contracts, entities from documents.
For high-volume structured pulls, I’ve found smaller models work well: Claude Haiku, GPT-4o mini. Fast, cheap, accurate enough. No reason to burn expensive tokens finding phone numbers.



**Synthesis:** combining multiple inputs into a coherent picture. Taking fifty customer interviews and finding the three patterns that matter. When I
need to hold massive context—hours of transcripts, hundreds of pages—I’ve had better results with Gemini’s longer context windows. Claude and GPT-4 handle shorter synthesis tasks competitively; the differences show up when inputs get truly large. Your results
will vary with prompt design and domain.



**Analysis**: applying logic, calculations, or rules to structured problems. Computing financial ratios, evaluating architectural tradeoffs, determining
regulatory compliance. In my deployments, GPT-4 and o1-style reasoning models have been most reliable for multi-step calculations where precision matters. Claude is competitive on many reasoning tasks—some evaluations find it stronger in certain domains—but
when a twelve-step calculation needs to be exactly right, I tend to reach for GPT-4 first.



**Generation**: creating new content meeting specific requirements—narratives, documentation, responses. Claude Sonnet and Opus have earned their reputation
for voice-consistent long-form writing that holds up across revisions. GPT-4 produces technically correct prose that can read flat without careful prompting. Gemini surprises me with creative outputs but requires more curation. All three produce quality work;
in my experience, Claude tends to need less steering on tone.



**Validation**: checking correctness against rules or requirements—verifying calculations, ensuring compliance, catching inconsistencies. I often split
this: GPT-4 for hard rule checking, Claude for nuanced review that surfaces business logic problems the rules don’t cover. When stakes are high, I run both.



These are starting points I’ve developed through practice, not universal truths. Models update quarterly. Your domain shapes everything. But matching task types to model strengths beats hoping one tool can handle it all.


##
**When $3,100 Beats $1,200**



Fortune 500 financial services company, Q3 2024. They’d bought ChatGPT Enterprise for regulatory reporting—MiFID II compliance, hundreds of rules about trade disclosure with specific thresholds and exceptions. The promise: feed in
transaction data, get out quarterly reports.



Six weeks in, their Head of Compliance called the outputs “technically correct but practically useless.”



I watched an analyst work. Four hundred pages of transaction records dumped into ChatGPT with instructions to generate the report. What came back looked perfect. Proper sections, regulatory references, professional formatting. But
buried inside were errors that took senior analysts hours to find. The model confused pre-trade and post-trade transparency requirements. It applied wrong calculation thresholds to different instrument types. These weren’t obvious mistakes—they were the kind
that slip past review and surface months later when regulators start asking questions.



The Head of Compliance said something I think about constantly: “It knows all the words but doesn’t understand the work.”



We mapped what human analysts actually do. Six distinct steps: cleaning data, classifying transactions, applying calculations, running logic trees by instrument class, generating variance narratives, cross-referencing regulatory
updates. Six cognitive tasks with different requirements, collapsed into one prompt and one prayer.



Rebuilt with task decomposition—lightweight models for cleaning, Gemini for classification, GPT-4 for calculations, Claude for narratives—accuracy went from “hours of cleanup” to “minor edits.” Monthly cost tripled from $1,200 to
$3,100. Weekly analyst time saved: 60 hours. At $150/hour loaded cost, that’s $36,000 monthly in recovered capacity.



The math worked. But more interesting was *why* it worked: we stopped asking the model to understand compliance and started asking it to do specific things it was actually
good at.


##
**When Accuracy isn’t Intelligence**



Series B SaaS startup, November 2024. They wanted AI-generated quarterly business reviews. First attempts produced decks full of statistics without meaning. Logins up 27%. Tickets down 12%. Feature requests listed alphabetically.



The problem wasn’t accuracy—every number was correct. The problem was intelligence. When senior CSMs prepare QBRs, they don’t just report that logins increased. They notice that heavy workflow automation combined with ignored analytics
means a customer is tactical, not strategic—a retention risk hiding behind good usage numbers. They recognize twelve different support tickets as symptoms of one root cause. They read frustration between the lines of polite feature requests.



The model could count. It couldn’t see.



Different failure than the compliance case. There, the model made precision errors in rule application. Here, it lacked the contextual judgment to know what numbers meant. Same symptom—professional-looking output that missed the
point—but different underlying breakdown.



We rebuilt with that distinction in mind. Data aggregation stayed with a lightweight model. Pattern recognition in usage data went to Gemini. Root cause analysis of tickets went to GPT-4. Narrative construction went to Claude. Each
model handled what it handled well. The final deck required twenty minutes of customization instead of a full rewrite.


##
**Building Intuition: Why You Can’t Skip the Practice**



Here’s something uncomfortable: you can’t read your way to model intuition. You develop it by doing the work.



Tech company, December 2024. Training product managers on AI-assisted requirements. Week one, I presented the framework. Everyone nodded. Everyone went back to using ChatGPT for everything. Week two, I made them track results. Average
output quality: 3.2 out of 5. Week three, paired work.



Two PMs, same requirements task. PM #1 used ChatGPT throughout—forty-five minutes, extensive revisions needed. PM #2 decomposed the work: customer quotes to one model, technical constraints to another, user stories to a third, acceptance
criteria to a fourth. Thirty-five minutes, minimal revisions.



But PM #2 couldn’t have made those routing decisions on day one. The choices came from weeks of feeding the same tasks to different models and observing what happened. Noticing that one model kept consistent formatting across revisions
while another drifted. Seeing that one handled ambiguous inputs gracefully while another demanded precision. That kind of knowledge doesn’t transfer through documentation. It transfers through reps.



Most teams would save more by spending a few hundred dollars on deliberate experiments than they lose rewriting mediocre first drafts for months.


##
**What Multi-Model Actually Costs**



ChatGPT Plus at $20/month is fine for casual use. It’s not a production strategy.



Teams running production workflows typically spend $110-220 monthly across multiple tools: small models for extraction, reasoning models for analysis, Claude for generation, specialized tools for specific needs. That’s five to ten
times the basic subscription. It’s also less than one hour of knowledge worker compensation. The question isn’t whether you can afford multiple models. It’s whether you can afford outputs that need constant cleanup.


##
**A Few Edge Cases Worth Knowing**



Once you’re routing by cognitive type, a few situational patterns emerge. Multimodal work—especially long video and audio—is where I’ve seen Gemini pull ahead in my projects. Massive context windows, same story: Gemini’s million-token
capacity handles inputs that choke other models. Agentic workflows are more nuanced; Claude handles structured, code-centric automations well, while ChatGPT’s agent mode has worked better for me on broad SaaS integrations. Predictability matters in regulated
environments, and Claude models tend to show consistent behavior across edge cases—though predictability comes as much from prompt discipline as model choice.



None of this is permanent. These are observations from deployments over the past year, not laws of physics.


##
**The Shift**



Portkey’s analysis of two trillion tokens found that advanced users increasingly route across multiple providers, cutting costs 30-40% while improving quality. The pattern holds: treating AI like a toolkit beats treating it like
a vendor relationship.



But the real shift is conceptual. We’ve been approaching AI like enterprise software—standardize on one solution, train everyone the same way, measure adoption. That mental model is why Gartner forecasts that roughly a third of generative
AI projects will be abandoned after proof of concept by end of 2025.



Companies getting value have made a different realization. “Write a document” isn’t one task. It’s twelve tasks that happen to produce one artifact. Each might benefit from different capabilities. That’s not a bug in how AI works.
It’s the nature of knowledge work—complexity we’ve been hiding behind human flexibility for so long we forgot it existed.



Stop asking which model for your workflow. Start asking which model for each task inside it.



It won’t magically fix your AI strategy. But it will finally align how these systems work with how your work actually gets done.






I make this Substack thanks to readers like you!
[
Learn about all my Substack tiers here](https://substack.com/redirect/80af29dc-5ced-43c4-8ba2-1f59133680d0?j=eyJ1IjoiOHIxaDEifQ.bBvEbuUaT64-3FYFS8XubQvPw9CPsnWNsoHgk_rgvzU) and
[
grab my prompt tool here](https://substack.com/redirect/960fd4d2-f340-486b-a3ba-a0e47f91b59b?j=eyJ1IjoiOHIxaDEifQ.bBvEbuUaT64-3FYFS8XubQvPw9CPsnWNsoHgk_rgvzU)





[**Subscribed**](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL2FjY291bnQiLCJwIjoxODA3MjMxMzQsInMiOjEzNzMyMzEsImYiOmZhbHNlLCJ1IjoxNDY5ODU0OSwiaWF0IjoxNzY0OTQ2OTgxLCJleHAiOjIwODA1MjI5ODEsImlzcyI6InB1Yi0wIiwic3ViIjoibGluay1yZWRpcmVjdCJ9.Kr0jYUX0Ebgim-VUDs7gsKtOdKc0F_SF7L1PX2gqzrw?)











[](https://substack.com/redirect/4f7d8611-8dc7-4dd4-b512-bdc3dbb85321?j=eyJ1IjoiOHIxaDEifQ.bBvEbuUaT64-3FYFS8XubQvPw9CPsnWNsoHgk_rgvzU)











Invite your friends and earn rewards


If you enjoy Nate’s Substack, share it with your friends and earn rewards when they subscribe.



[**Invite
Friends**](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL2xlYWRlcmJvYXJkP3JlZmVycmVyX3Rva2VuPThyMWgxJnI9OHIxaDEmdXRtX2NhbXBhaWduPWVtYWlsLWxlYWRlcmJvYXJkIiwicCI6MTgwNzIzMTM0LCJzIjoxMzczMjMxLCJmIjpmYWxzZSwidSI6MTQ2OTg1NDksImlhdCI6MTc2NDk0Njk4MSwiZXhwIjoyMDgwNTIyOTgxLCJpc3MiOiJwdWItMCIsInN1YiI6ImxpbmstcmVkaXJlY3QifQ.HqwDYkreNsqihe5-9f_FFga1mqeaBx1y33UIp-hoWHc?&utm_source=substack&utm_medium=email&utm_content=postcta)


























[Like](https://substack.com/app-link/post?publication_id=1373231&post_id=180723134&utm_source=substack&isFreemail=false&submitLike=true&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgwNzIzMTM0LCJyZWFjdGlvbiI6IuKdpCIsImlhdCI6MTc2NDk0Njk4MSwiZXhwIjoxNzY3NTM4OTgxLCJpc3MiOiJwdWItMTM3MzIzMSIsInN1YiI6InJlYWN0aW9uIn0.WFYRPxzGT6w0hevf61v0El5pnf5HfKEsbXVf2ILi9t0&utm_medium=email&utm_campaign=email-reaction&r=8r1h1)













[Comment](https://substack.com/app-link/post?publication_id=1373231&post_id=180723134&utm_source=substack&utm_medium=email&isFreemail=false&comments=true&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgwNzIzMTM0LCJpYXQiOjE3NjQ5NDY5ODEsImV4cCI6MTc2NzUzODk4MSwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.C2O0tz8TQRJYoZitXhyveTTa-n-2bSf-HZoaVwLPUts&r=8r1h1&utm_campaign=email-half-magic-comments&action=post-comment&utm_source=substack&utm_medium=email)













[Restack](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9vcGVuLnN1YnN0YWNrLmNvbS9wdWIvbmF0ZXNuZXdzbGV0dGVyL3AvZ3JhYi10aGUtMTAtcHJvbXB0cy1pLXVzZS10by1kZWNvbXBvc2U_dXRtX3NvdXJjZT1zdWJzdGFjayZ1dG1fbWVkaXVtPWVtYWlsJnV0bV9jYW1wYWlnbj1lbWFpbC1yZXN0YWNrLWNvbW1lbnQmYWN0aW9uPXJlc3RhY2stY29tbWVudCZyPThyMWgxJnRva2VuPWV5SjFjMlZ5WDJsa0lqb3hORFk1T0RVME9Td2ljRzl6ZEY5cFpDSTZNVGd3TnpJek1UTTBMQ0pwWVhRaU9qRTNOalE1TkRZNU9ERXNJbVY0Y0NJNk1UYzJOelV6T0RrNE1Td2lhWE56SWpvaWNIVmlMVEV6TnpNeU16RWlMQ0p6ZFdJaU9pSndiM04wTFhKbFlXTjBhVzl1SW4wLkMyTzB0ejhUUVJKWW9aaXRYaHl2ZVRUYS1uLTJiU2YtSFpvYVZ3TFBVdHMiLCJwIjoxODA3MjMxMzQsInMiOjEzNzMyMzEsImYiOmZhbHNlLCJ1IjoxNDY5ODU0OSwiaWF0IjoxNzY0OTQ2OTgxLCJleHAiOjIwODA1MjI5ODEsImlzcyI6InB1Yi0wIiwic3ViIjoibGluay1yZWRpcmVjdCJ9.CUJS4gnG3XcT5AnB_qjEVxeEDRw4R83EeW0p0NGN7P4?&utm_source=substack&utm_medium=email)






































© 2025 Nate

548 Market Street PMB 72296, San Francisco, CA 94104

[Unsubscribe](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL2FjdGlvbi9kaXNhYmxlX2VtYWlsP3Rva2VuPWV5SjFjMlZ5WDJsa0lqb3hORFk1T0RVME9Td2ljRzl6ZEY5cFpDSTZNVGd3TnpJek1UTTBMQ0pwWVhRaU9qRTNOalE1TkRZNU9ERXNJbVY0Y0NJNk1UYzVOalE0TWprNE1Td2lhWE56SWpvaWNIVmlMVEV6TnpNeU16RWlMQ0p6ZFdJaU9pSmthWE5oWW14bFgyVnRZV2xzSW4wLmE0ZVZUbHhXSnFvcjVUZWl6VUVGUGJzTzZ5S0JEbjRzUlNnLVRSRlNycEkiLCJwIjoxODA3MjMxMzQsInMiOjEzNzMyMzEsImYiOmZhbHNlLCJ1IjoxNDY5ODU0OSwiaWF0IjoxNzY0OTQ2OTgxLCJleHAiOjIwODA1MjI5ODEsImlzcyI6InB1Yi0wIiwic3ViIjoibGluay1yZWRpcmVjdCJ9.xyKQpIpqHS5HtoSylBUtByEyQwpLo6vEomn40Sqb4qw?)




[](https://substack.com/redirect/caa3ee7d-f999-4e43-881e-c66c4df44f1d?j=eyJ1IjoiOHIxaDEifQ.bBvEbuUaT64-3FYFS8XubQvPw9CPsnWNsoHgk_rgvzU)[](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9zdWJzdGFjay5jb20vc2lnbnVwP3V0bV9zb3VyY2U9c3Vic3RhY2smdXRtX21lZGl1bT1lbWFpbCZ1dG1fY29udGVudD1mb290ZXImdXRtX2NhbXBhaWduPWF1dG9maWxsZWQtZm9vdGVyJmZyZWVTaWdudXBFbWFpbD1kc255ZGVyQGN5ZGNvci5jb20mcj04cjFoMSIsInAiOjE4MDcyMzEzNCwicyI6MTM3MzIzMSwiZiI6ZmFsc2UsInUiOjE0Njk4NTQ5LCJpYXQiOjE3NjQ5NDY5ODEsImV4cCI6MjA4MDUyMjk4MSwiaXNzIjoicHViLTAiLCJzdWIiOiJsaW5rLXJlZGlyZWN0In0.VlHLO3bDmESESxCe7vyhcBe6_q6SGbOinWui3sCQ4Rc?)















This message and any attached documents contains confidential and/or proprietary information of Cydcor LLC and/or its subsidiaries, agents, vendors, subcontractors and clients, and is not to be shared with others without the prior written consent of Cydcor
LLC. This information may not be reproduced, copied, disseminated or used for any purpose other than the purpose for which it was delivered to the recipient, without prior written consent of Cydcor LLC. Upon the request of Cydcor LLC, this information must
be, without delay, returned or destroyed, in accordance with the instructions of Cydcor LLC., without the recipient retaining copies or notes of any kind or nature of this document or derived from it. If you are not the intended recipient, you may not read,
copy, distribute, or use this information. If you are not the intended recipient, please notify the sender by return email and immediately delete this message.

---
*Captured via gmail-fetch from forwarded Substack email*
